import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import babel from 'vite-babel-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), babel()],
});
