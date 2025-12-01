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
git add .
git commit -m "Fix base URL case"
git push

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
