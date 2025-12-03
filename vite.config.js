import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,     // permite conexiones externas
    port: 5173      // opcional, define el puerto
  }
})
