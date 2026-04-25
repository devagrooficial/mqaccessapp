/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // === MQ ACCESS — Design System Colors ===
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E8D5A3',
          dark: '#8C6D3F',
        },
        surface: {
          0: '#000000',   // Background raiz (Preto Puro)
          1: '#0A0A0A',   // Cards primários
          2: '#111111',   // Cards elevados / Modais
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#A0A0A0',
          muted: '#4A4A4A',
        },
      },
      fontFamily: {
        // Headlines e títulos de produto
        serif: ['Playfair Display', 'Georgia', 'serif'],
        // UI, menus, tabelas, listas
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderColor: {
        subtle: 'rgba(255, 255, 255, 0.05)',
        base: 'rgba(255, 255, 255, 0.08)',
        emphasis: 'rgba(255, 255, 255, 0.15)',
        'gold-subtle': 'rgba(201, 169, 110, 0.2)',
      },
      transitionTimingFunction: {
        // Material Emphasized — padrão para entradas
        'emphasized': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        'slow': '400ms',
      },
    },
  },
  plugins: [],
};
