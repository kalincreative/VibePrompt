import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { geminiApiPlugin } from './server/api.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Make GEMINI_API_KEY available to the server plugin via process.env
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY

  return {
    plugins: [react(), tailwindcss(), geminiApiPlugin()],
    server: {
      proxy: {
        '/api/nvidia': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/nvidia/, ''),
          headers: {
            'Authorization': `Bearer ${env.VITE_NVIDIA_API_KEY}`,
          },
        },
      },
    },
  }
})
