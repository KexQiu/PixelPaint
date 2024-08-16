import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  // 设置路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
