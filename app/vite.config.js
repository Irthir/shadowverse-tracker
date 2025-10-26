// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // <<< changer de '/shadowverse-tracker/' à './'
  plugins: [react({ babel: { plugins: [['babel-plugin-react-compiler']] } })],
});
