import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set the development server to run on port 3000
    // strictPort: true,   // Do not fall back to another port
  },
})
