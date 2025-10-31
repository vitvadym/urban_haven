import { defineConfig } from 'vite';
// import { baseUrl } from './src/constanst';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: baseUrl,
  //       secure: false,
  //     },
  //   },
  // },
  plugins: [react()],
});
