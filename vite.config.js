import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const baseUrl = env.VITE_BASE_URL || '/';

  return {
    base: baseUrl,
    root: '.',
    publicDir: 'public',
    plugins: [tailwindcss()],
    build: {
      outDir: 'dist',
      target: 'esnext',
    },
    server: {
      port: 3000,
      open: true,
    },
    optimizeDeps: {
      exclude: ['@wasmer/sdk'],
    },
  };
});