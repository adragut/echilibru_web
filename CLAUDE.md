# Echilibru Web - Cloudflare Deployment Guide

## Architecture Overview
- **Framework**: Astro 7.x with Tailwind CSS
- **CMS**: Decap CMS (Git-based, GitHub backend)
- **Hosting**: Cloudflare Workers (Free Tier)
- **Auth**: Custom GitHub OAuth Proxy Worker

## Prerequisites
1. Cloudflare account (Free Tier)
2. GitHub repository: `adragut/echilibru_web`
3. GitHub OAuth App credentials
4. Email service API key (SendGrid/EmailJS)

## Deployment Steps

### 1. Set up GitHub OAuth App
1. Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. Authorization callback URL: `https://decap.echilibru.ro/callback`
3. Note the Client ID and Client Secret

### 2. Deploy the OAuth Proxy Worker
```bash
cd workers/decap-proxy
wrangler login
wrangler deploy
```
Set secrets:
```bash
wrangler secret put GITHUB_OAUTH_CLIENT_ID
wrangler secret put GITHUB_OAUTH_CLIENT_SECRET
wrangler secret put COOKIE_SECRET  # Generate: openssl rand -base64 32
```
Configure custom domain in Cloudflare dashboard:
- Proxy domain: `decap.echilibru.ro`

### 3. Deploy the Main Website
```bash
npm install
npm run build
wrangler deploy
```
Set secrets (encrypted environment variables):
```bash
wrangler secret put RESEND_API_KEY     # Your Resend API key
wrangler secret put RECIPIENT_EMAIL    # terapie.echilibru@gmail.com
```
The `NODE_ENV` and `SENDER_EMAIL` variables are already set in `wrangler.jsonc`. `SENDER_EMAIL` defaults to `onboarding@resend.dev` which works for testing without domain verification.

### 4. Configure Cloudflare Pages (Alternative)
If using Cloudflare Pages instead of Workers:
1. Connect GitHub repository in Cloudflare Pages
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Copy `wrangler.jsonc` settings to Pages configuration

## Key Files
- `astro.config.mjs` - Cloudflare adapter configuration
- `wrangler.jsonc` - Main worker configuration
- `workers/decap-proxy/` - OAuth proxy worker
- `public/admin/config.yml` - Decap CMS configuration
- `src/pages/api/contact.ts` - Contact form endpoint

## Troubleshooting
- **CMS won't load**: Check that `/admin/config.yml` is accessible
- **Auth fails**: Verify OAuth proxy domain matches `base_url` in config.yml
- **[object Object] errors**: Ensure `disable_nodejs_process_v2` flag is set
- **Email not sending**: Run `wrangler secret list` to verify `RESEND_API_KEY` is set. Test locally with `RESEND_API_KEY=<key> npm run dev` then submit the contact form.

## Migration Notes
- Removed Netlify Identity/Git Gateway (not available on Cloudflare)
- Replaced `nodemailer` SMTP with HTTP-based email service
- Added OAuth proxy for GitHub authentication
- Switched from `@astrojs/node` to `@astrojs/cloudflare` adapter
