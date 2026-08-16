import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

export default defineConfig({
  site: 'https://echilibru.ro',
  output: 'server',
  adapter: cloudflare(),
  vite: {
    css: {
      postcss: {
        plugins: [
          postcssImport(),
          tailwindcss(),
          autoprefixer(),
        ],
      },
    },
  },
});