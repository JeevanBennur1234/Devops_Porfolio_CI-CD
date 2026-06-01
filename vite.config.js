import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))
const versionFile = readFileSync(resolve(__dirname, 'VERSION'), 'utf-8').split('\n')
const buildDate = (versionFile[1] || '').replace('Release Date: ', '').trim()
const buildNumber = process.env.BUILD_NUMBER || 'development'
const commitHash = process.env.GIT_COMMIT || ''

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __APP_BUILD_DATE__: JSON.stringify(buildDate),
    __APP_BUILD_NUMBER__: JSON.stringify(buildNumber),
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }
        }
      },
    },
  },
})
