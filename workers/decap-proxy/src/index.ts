/**
 * GitHub OAuth Proxy for Decap CMS
 *
 * This Cloudflare Worker acts as an OAuth proxy between Decap CMS and GitHub,
 * allowing authentication without Netlify Identity or Git Gateway.
 *
 * Setup instructions:
 * 1. Create a GitHub OAuth App: https://github.com/settings/developers
 *    - Authorization callback URL: https://YOUR-PROXY-DOMAIN/callback
 * 2. Set the following secrets in your Cloudflare Worker:
 *    - GITHUB_OAUTH_CLIENT_ID
 *    - GITHUB_OAUTH_CLIENT_SECRET
 *    - COOKIE_SECRET (random 32+ char string)
 * 3. Deploy the worker to a subdomain like decap.yourdomain.com
 */

interface Env {
  GITHUB_OAUTH_CLIENT_ID: string;
  GITHUB_OAUTH_CLIENT_SECRET: string;
  COOKIE_SECRET: string;
  GITHUB_REPO_PRIVATE?: string; // Set to "1" if repository is private
}

const OAUTH_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const OAUTH_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const BASE_SCOPE = 'public_repo,user';
const PRIVATE_SCOPE = 'repo,user';

function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

async function encryptCookie(value: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('decap-proxy-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(value)
  );
  
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);
  return base64UrlEncode(String.fromCharCode(...combined));
}

async function decryptCookie(value: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('decap-proxy-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  
  const combined = new Uint8Array([...base64UrlDecode(value)].map(c => c.charCodeAt(0)));
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);
  
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );
  
  return new TextDecoder().decode(decrypted);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }
    
    // Root path - health check
    if (url.pathname === '/') {
      return new Response('Hello from Decap Proxy 👋', {
        headers: { 'Content-Type': 'text/plain' },
      });
    }
    
    // OAuth authorization endpoint - redirects to GitHub
    if (url.pathname === '/auth' || url.pathname.endsWith('/auth')) {
      const state = generateState();
      const scope = env.GITHUB_REPO_PRIVATE === '1' ? PRIVATE_SCOPE : BASE_SCOPE;
      
      const params = new URLSearchParams({
        client_id: env.GITHUB_OAUTH_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope,
        state,
      });
      
      return new Response(null, {
        status: 302,
        headers: {
          'Location': `${OAUTH_AUTHORIZE_URL}?${params.toString()}`,
          'Set-Cookie': `state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
        },
      });
    }
    
    // OAuth callback - exchanges code for token
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      const storedState = request.headers.get('Cookie')?.match(/state=([^;]+)/)?.[1];
      
      if (!code) {
        return new Response('Missing authorization code', { status: 400 });
      }
      
      if (!state || !storedState || state !== storedState) {
        return new Response('Invalid state parameter', { status: 400 });
      }
      
      try {
        const tokenResponse = await fetch(OAUTH_TOKEN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            client_id: env.GITHUB_OAUTH_CLIENT_ID,
            client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
            code,
            redirect_uri: `${url.origin}/callback`,
          }),
        });
        
        const tokenData = await tokenResponse.json() as { access_token?: string };
        
        if (!tokenData.access_token) {
          return new Response('Failed to obtain access token', { status: 500 });
        }
        
        const encryptedToken = await encryptCookie(tokenData.access_token, env.COOKIE_SECRET);
        
        // Close the popup window and signal success
        return new Response(
          `<!DOCTYPE html>
          <html>
            <head><title>Authorizing...</title></head>
            <body>
              <script>
                (function() {
                  if (window.opener) {
                    window.opener.postMessage('authorization:success', window.location.origin);
                    window.close();
                  } else {
                    window.location.href = '/';
                  }
                })();
              </script>
              <p>Authorization successful. You can close this window.</p>
            </body>
          </html>`,
          {
            status: 200,
            headers: {
              'Content-Type': 'text/html',
              'Set-Cookie': `token=${encryptedToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
            },
          }
        );
      } catch (error) {
        console.error('Token exchange error:', error);
        return new Response('Token exchange failed', { status: 500 });
      }
    }
    
    // Token endpoint - returns the encrypted token to Decap CMS
    if (url.pathname === '/token' || url.pathname.endsWith('/token')) {
      const cookieHeader = request.headers.get('Cookie') || '';
      const tokenMatch = cookieHeader.match(/token=([^;]+)/);
      
      if (!tokenMatch) {
        return new Response(JSON.stringify({ error: 'No token found' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      try {
        const decryptedToken = await decryptCookie(tokenMatch[1], env.COOKIE_SECRET);
        return new Response(JSON.stringify({ token: decryptedToken }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (error) {
        console.error('Token decryption error:', error);
        return new Response(JSON.stringify({ error: 'Invalid token' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
    
    // Logout endpoint
    if (url.pathname === '/logout' || url.pathname.endsWith('/logout')) {
      return new Response('Logged out', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Set-Cookie': 'token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
        },
      });
    }
    
    return new Response('Not found', { status: 404 });
  },
};
