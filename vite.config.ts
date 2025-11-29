import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [react()];
  // Add bundle visualizer when ANALYZE environment variable is true (dynamically imported when requested)
  if (process.env.ANALYZE === 'true') {
    try {
      const mod = await import('rollup-plugin-visualizer');
      if (mod && typeof mod.visualizer === 'function') {
        plugins.push(mod.visualizer({ filename: 'dist/stats.html', open: false }));
      }
    } catch (err) {
      // If the package isn't installed, don't crash - warn so the user can install it if they want analysis
      console.warn('ANALYZE is set but rollup-plugin-visualizer is not installed. Run "npm i -D rollup-plugin-visualizer" to enable bundle analysis.');
    }
  }
  return {
    plugins,
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  }));
