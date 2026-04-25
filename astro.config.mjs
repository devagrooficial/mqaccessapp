import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  // View Transitions API habilitado globalmente
  // Cada layout deve incluir <ViewTransitions /> no <head>
});
