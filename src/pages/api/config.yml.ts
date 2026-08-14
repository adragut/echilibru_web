import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  // Return the static config.yml that's served by Astro (no filesystem access needed)
  // This endpoint provides runtime config for Decap CMS
  const config = `backend:
  name: github
  repo: "adragut/echilibru_web"
  branch: main
  base_url: "https://decap.echilibru.ro"
  auth_endpoint: "auth"
  open_authoring: false

media_folder: "public/assets/images"
public_folder: "/assets/images"

site_url: "https://echilibru.ro"
publish_mode: editorial_workflow

# Collections configuration is served from the static config.yml
`;

  return new Response(config, {
    headers: {
      'Content-Type': 'application/yaml',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
};
