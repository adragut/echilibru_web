# Cloudflare Free Tier Migration - Summary of Changes

## Overview
This document summarizes all changes made to migrate the Echilibru website from Netlify to Cloudflare Free Tier while maintaining Decap CMS functionality.

## Issues with Original Configuration

### 1. Adapter Incompatibility
**Problem**: Project used `@astrojs/node` adapter designed for Node.js servers.
**Fix**: Replaced with `@astrojs/cloudflare` adapter for Cloudflare Workers compatibility.

### 2. Netlify Identity / Git Gateway Dependency
**Problem**: Decap CMS was configured with `git-gateway` backend requiring Netlify Identity.
**Fix**: Switched to `github` backend with custom OAuth proxy worker.

### 3. Node.js-only Dependencies
**Problem**: `nodemailer` (used for contact form) requires Node.js SMTP support.
**Fix**: Replaced with HTTP-based email service options (SendGrid, EmailJS, or webhook).

## Files Modified/Created

### Core Configuration
| File | Change |
|------|--------|
| `astro.config.mjs` | Switched from `@astrojs/node` to `@astrojs/cloudflare` adapter |
| `package.json` | Removed `@astrojs/node`, added `@astrojs/cloudflare` and `wrangler` |
| `wrangler.jsonc` | Created Cloudflare Workers configuration |
| `netlify.toml` | Marked for removal (Cloudflare Pages config used instead) |
| `.env.example` | Updated for HTTP-based email services instead of Gmail SMTP |

### Decap CMS Configuration
| File | Change |
|------|--------|
| `public/admin/config.yml` | Changed backend from `git-gateway` to `github` with OAuth proxy |
| `src/pages/admin/index.astro` | Updated to load config from static file |
| `public/admin/index.html` | Updated to load config from static `/admin/config.yml` |
| `src/pages/api/config.yml.ts` | Updated to return static config content |

### Contact Form API
| File | Change |
|------|--------|
| `src/pages/api/contact.ts` | Replaced `nodemailer` SMTP with HTTP-based email API calls |

### OAuth Proxy Worker
| File | Description |
|------|-------------|
| `workers/decap-proxy/wrangler.toml` | Cloudflare Worker configuration for OAuth proxy |
| `workers/decap-proxy/package.json` | Worker package configuration |
| `workers/decap-proxy/src/index.ts` | OAuth proxy implementation |

### Documentation
| File | Description |
|------|-------------|
| `CLAUDE.md` | Comprehensive deployment guide |
| `MIGRATION_SUMMARY.md` | This file - summary of all changes |

## Environment Variables Required

### Main Website (Cloudflare Pages/Workers)
- `EMAIL_SERVICE` - Email provider (sendgrid, emailjs, or webhook)
- `EMAIL_API_KEY` - API key for the email service
- `SENDER_EMAIL` - Verified sender email
- `RECIPIENT_EMAIL` - Contact form recipient email

### OAuth Proxy Worker
- `GITHUB_OAUTH_CLIENT_ID` - GitHub OAuth App Client ID
- `GITHUB_OAUTH_CLIENT_SECRET` - GitHub OAuth App Client Secret
- `COOKIE_SECRET` - Random secret for encrypting auth cookies

## Deployment Architecture

```
┌─────────────────────────────────────┐
│          Cloudflare Pages            │
│  ┌──────────────────────────────┐   │
│  │       Astro Static Site       │   │
│  │  (/index.html, /about, etc.)  │   │
│  └──────────────────────────────┘   │
│                                     │
│  ┌──────────────────────────────┐   │
│  │  Cloudflare Workers         │   │
│  │  /api/* endpoints           │   │
│  │  (contact form, config)     │   │
│  └──────────────────────────────┘   │
│                                     │
│  ┌──────────────────────────────┐   │
│  │  /admin/* (Decap CMS)       │   │
│  └──────────────────────────────┘   │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼──────────────────┐
│    Cloudflare Workers               │
│  decap-proxy (OAuth Proxy)          │
│  ┌───────────────────────────────┐  │
│  │ /auth  → GitHub OAuth         │  │
│  │ /callback → Token exchange    │  │
│  │ /token → Returns access token │  │
│  └───────────────────────────────┘  │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼──────────────────┐
│    GitHub                            │
│  ├── /api/config.yml                 │
│  ├── /api/contact                    │
│  └── /admin/index.html               │
│  ┌───────────────────────────────┐  │
│  │ Decap CMS edits content via   │  │
│  │ GitHub API (commits JSON)     │  │
│  └───────────────────────────────┘  │
└──────────────────────────────────────┘
```

## Next Steps for Completion

1. **Set up GitHub OAuth App**
   - Create at https://github.com/settings/developers
   - Callback URL: `https://decap.echilibru.ro/callback`
   - Note Client ID and Secret

2. **Deploy OAuth Proxy Worker**
   ```bash
   cd workers/decap-proxy
   wrangler deploy
   wrangler secret put GITHUB_OAUTH_CLIENT_ID
   wrangler secret put GITHUB_OAUTH_CLIENT_SECRET
   wrangler secret put COOKIE_SECRET
   ```

3. **Configure Custom Domain**
   - Point `decap.echilibru.ro` to the OAuth proxy worker in Cloudflare DNS

4. **Deploy Main Website**
   ```bash
   npm install
   npm run build
   npx wrangler deploy
   ```

5. **Set Environment Variables**
   - In Cloudflare Pages/Workers dashboard, add EMAIL_SERVICE, EMAIL_API_KEY, etc.

6. **Configure Cloudflare Pages (if using Pages)**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Copy wrangler.jsonc settings

## Testing Checklist

- [ ] CMS at `https://echilibru.ro/admin/` loads without errors
- [ ] GitHub OAuth flow completes successfully
- [ ] Can edit content and publish changes
- [ ] Contact form submits successfully
- [ ] Static assets load correctly
- [ ] No console errors in production

