import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite' //自动按需引入
import Components from 'unplugin-vue-components/vite'//自动按需引入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' //自动按需引入
import { resolve } from "path";
// https://vitejs.dev/config/npm

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
      },
    },
  },
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    
  ],

})
