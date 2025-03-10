import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import babel from 'vite-plugin-babel' //使用babel插件
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babel(),
    vue(),
    vueJsx(),
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
