import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',           // SSR — necessário para middleware e handlers POST
  adapter: vercel(),          // Deploy no Vercel (serverless functions)
  integrations: [tailwind()],

  vite: {
    ssr: {
      // Força o bundler a injetar o código desses pacotes diretamente no
      // chunk do servidor, evitando que o ambiente serverless da Vercel
      // tente resolvê-los em node_modules (onde podem ser podados).
      noExternal: ['@astrojs/vercel'],
    },
  },
});

