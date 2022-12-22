import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite' //自动按需引入
import Components from 'unplugin-vue-components/vite'//自动按需引入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' //自动按需引入
import IconsResolver from 'unplugin-icons/resolver'
import { resolve } from "path";
import Icons from 'unplugin-icons/vite'
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
  server:{
    open:true,
    port:3000,
    proxy:{
      '/dev-api':{
        target:"http://localhost:8000",
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/dev-api/,'')
      }
    }
  },
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver(),

       // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        })],
      
      
    }),
    Components({
      resolvers: [ElementPlusResolver(), // 自动注册图标组件
      IconsResolver({
        enabledCollections: ['ep'],
      }),
    ],
    }),
    Icons({
      autoInstall: true,
    }),
    vue(),
    
  ],

})
