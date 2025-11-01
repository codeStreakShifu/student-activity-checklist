import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace the base path with your repo name
export default defineConfig({
  plugins: [react()],
  base: '/student-activity-checklist/',
})
