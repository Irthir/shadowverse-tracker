import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Remplace "tonNomUtilisateur" et "shadowverse-tracker" par ton nom GitHub et le nom du repo
export default defineConfig({
  base: '/shadowverse-tracker/', 
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
});
