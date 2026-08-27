// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://ailly.vercel.app',
  // 'server' habilita el endpoint /api/chat (demo del agente con IA real);
  // todas las páginas siguen prerenderizadas como estáticas (ver `export
  // const prerender = true` en index.astro) — solo el endpoint es dinámico.
  output: 'server',
  adapter: vercel(),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
