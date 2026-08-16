# Echilibru Web - Cloudflare Deployment Guide

## Quick Setup

This project has been migrated from Netlify to Cloudflare Pages/Free Tier. All configuration is now using Cloudflare-specific setup.

## Key Changes Made

### CSS/Asset Pathing Fixed
- Removed `<link rel="stylesheet" href="theme.css" />` from `src/layouts/Layout.astro`
- Added `import '../styles/theme.css';` at top of Layout.astro frontmatter for proper Vite/PostCSS processing
- Moved theme.css from `public/styles/theme.css` to `src/styles/theme.css`

### Build Configuration
- Removed conflicting Vite configuration from `astro.config.mjs` — Astro uses PostCSS config automatically
- PostCSS plugins are configured in `postcss.config.cjs` (postcss-import, tailwindcss, autoprefixer)
- Tailwind content paths configured in `tailwind.config.js` to scan all Astro components

### Files Changed
- `src/layouts/Layout.astro`: Removed manual link, added CSS import
- `astro.config.mjs`: Cleaned up to just adapter config
- `src/styles/theme.css`: Moved to source directory for build processing
- `postcss.config.cjs`: PostCSS plugin configuration

## How It Works Now
1. The CSS import in Layout.astro frontmatter lets Vite process the Tailwind directives
2. PostCSS config applies tailwindcss + autoprefixer
3. Build output generates hashed CSS file (e.g., `/_astro/page-ssr.Hxh43aac.css`)
4. Astro automatically injects the stylesheet link in the HTML head

## Next Steps
1. Run `npm run build` to generate the CSS file
2. Verify that `dist/client/_astro/*.css` is created during build
3. Ensure Cloudflare Pages deployment includes the built assets

## Troubleshooting

If experiencing 404 errors on CSS:
1. Verify the build output contains the CSS file in `dist/client/_astro/`
2. Check that Astro's automatic stylesheet injection is working
3. Confirm the CSS import is in the Layout.astro frontmatter
