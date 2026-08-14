import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://echilibru.ro',
  output: 'server',
  adapter: cloudflare({
    // Add any necessary adapter options here
  }),
});
