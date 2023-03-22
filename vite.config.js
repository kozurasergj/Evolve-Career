import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        html1: './index.html',
        html2: './modules.html'
      }
    }
  },

});
