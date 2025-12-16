import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/samuraijs-new/',
  server: {
    proxy: {
      '/api': {
        target: 'https://social-network.samuraijs.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
