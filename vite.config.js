// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(), // Habilita JSX, Fast Refresh y optimizaciones de React
  ],

  resolve: {
    alias: {
      // Alias @ para importar desde src/ sin rutas relativas largas
      // En lugar de '../../components/Button' puedes escribir '@/components/Button'
      '@': resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',        // Carpeta de salida del build
    sourcemap: false,       // No generar sourcemaps en producción (más seguro y más liviano)
    minify: 'esbuild',      // esbuild es el minificador más rápido (viene incluido en Vite)
    rollupOptions: {
      output: {
        // Dividir el bundle en chunks para mejor caché del navegador
        manualChunks: {
          vendor: ['react', 'react-dom'], // React va en su propio chunk separado
        },
      },
    },
  },

  server: {
    port: 5173,   // Puerto del servidor de desarrollo
    open: true,   // Abre el navegador automáticamente al correr npm run dev
  },
});