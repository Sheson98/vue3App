import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import pinia from '@/stores/index'
import  router  from '@/routers';
const app = createApp(App)
app.use(ElementPlus).use(pinia).use(router)
app.mount('#app')
