import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer/',            // Polyfill for buffer
      stream: 'stream-browserify',  // Polyfill for stream
      util: 'util',                 // Polyfill for util
      // Add other modules as needed
    },
  },
  define: {
    global: 'window', // Sets global variable to window for browser compatibility
  },
  build: {
    rollupOptions: {
      external: ['util'], // Exclude util if it is not directly needed
    },
  },
});
