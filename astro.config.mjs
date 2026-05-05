import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',           // SSR — necessário para middleware e handlers POST
  adapter: vercel(),          // Deploy no Vercel (serverless functions)
  integrations: [tailwind()],
});
