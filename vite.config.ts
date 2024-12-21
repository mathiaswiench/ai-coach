import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';

dotenv.config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    DB_URL: JSON.stringify(process.env.REACT_APP_DATABASE_URL),
  },
});
