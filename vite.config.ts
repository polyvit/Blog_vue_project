import { fileURLToPath, URL } from 'node:url'
import inject from '@rollup/plugin-inject'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools()
    // inject({
    //   'window.Quill': 'quill/dist/quill.js',
    //   Quill: 'quill/dist/quill.js'
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
