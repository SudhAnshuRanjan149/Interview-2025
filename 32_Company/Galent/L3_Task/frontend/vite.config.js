import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/fleet': 'http://localhost:8002',
      '/alerts': 'http://localhost:8002',
      '/vehicles': 'http://localhost:8002',
      '/depots': 'http://localhost:8002',
    }
  },
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
      process.env.VITE_API_BASE_URL || 'http://localhost:8002'
    ),
    'import.meta.env.VITE_WS_BASE_URL': JSON.stringify(
      process.env.VITE_WS_BASE_URL || 'ws://localhost:8002'
    ),
  }
})
