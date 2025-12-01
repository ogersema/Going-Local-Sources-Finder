import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/going-local-sources-finder/', // GitHub repo name - ANPASSEN falls anders!
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
