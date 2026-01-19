import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import path from 'path';

export default defineConfig({
  output: 'static',
  integrations: [react(), tailwind()],
  vite: {
    ssr: {
      external: ['framer-motion']
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@assets': path.resolve('./public/assets'),
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5000
  },
  outDir: '../static'
});