import {GlobalStore } from '@/stores/index'
import AuthStore from '@/stores/modules/auth'
import { ElNotification } from "element-plus";
import { notFoundRouter,staticRouters} from "@/routers";

import router from '@/routers/index'
// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue");

/**
 * @description 动态路由 (根据用户的登陆信息调用后台接口返回的路由)
 * @
 */
const initDynamicRouter= async ()=>{
    const  globalStore = GlobalStore()
    const  authStore = AuthStore()
    try{
        await authStore.getAuthMenuList();
         if(!authStore.authMenuListGet.length){
            ElNotification({
                title: "无权限访问",
                message: "当前账号无任何菜单权限，请联系系统管理员！",
                type: "warning",
                duration: 3000
            });
            
            globalStore.setToken("");
            router.replace("/login");
            return Promise.reject("No permission");
        }
        //动态追加路由
        authStore.flatRouters.forEach((item:any)=>{
            item.children && delete item.children;
            if (item.component) {
                item.component = modules["/src/views" + item.component + ".vue"];
                router.addRoute('layout',item)
			}
        })
        router.addRoute(notFoundRouter)
        console.log("路由添加成功：：" )
        console.log(router.getRoutes())
    }catch(e){
        globalStore.setToken("")
        router.replace('/login')
        return Promise.reject(e)
    }


}
export default initDynamicRouter