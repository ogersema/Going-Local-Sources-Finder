import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Going-Local-Sources-Finder/', // GitHub repo name - ANPASSEN falls anders!
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
git add .
git commit -m "Fix base URL case"
git push

