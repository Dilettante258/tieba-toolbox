import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from "tailwindcss"
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './components'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  }
})
