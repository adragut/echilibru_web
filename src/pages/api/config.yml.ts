import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async () => {
  const configPath = path.join(import.meta.dirname, '../../../public/admin/config.local.yml');
  const configContent = fs.readFileSync(configPath, 'utf-8');
  
  return new Response(configContent, {
    headers: {
      'Content-Type': 'application/yaml',
    },
  });
};