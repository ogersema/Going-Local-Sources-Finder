import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Going-Local-Sources-Finder/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
