import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://echilibru.ro',
  output: 'server',
  adapter: cloudflare(),
  vite: {
    css: {
      postcss: {
        plugins: [
          'tailwindcss',
          'autoprefixer',
        ],
      },
    },
  },
});