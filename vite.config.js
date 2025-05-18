// Vite configuration file
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Plugin for React support

// Exporting the Vite configuration
export default defineConfig({
  plugins: [react()], // Adding React plugin for Vite
});
