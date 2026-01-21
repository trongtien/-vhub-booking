import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'order',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: {
        react: {
          requiredVersion: '^19.2.0',
        },
        'react-dom': {
          requiredVersion: '^19.2.0',
        },
        'react-router-dom': {},
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3002,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:3000',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3002,
    }
  },
  base: "/order/",
  preview: {
    port: 3002,
    strictPort: true,
    cors: true,
  },
});
