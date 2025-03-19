import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias '@' to 'src' directory
    },
  },
  server: {
    host: '0.0.0.0', // Allow external access
    port: 5173,      // Set port (default: 5173)
  },
});