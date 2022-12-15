import { createRouter, createWebHashHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import NProgress from "@/api/config/nprogress";
import { GlobalStore } from "@/stores";
import AuthStore from "@/stores/modules/auth";
import initDynamicRouter from '@/routers/dynamicRouter';



/**
 * 静态路由表
 */
export const staticRouters:RouteRecordRaw[]= [
    {
		path: "/",
		redirect: '/home/index',
	},
    {
        path:"/login",
        name:"login",
        component:()=>import('@/views/login/index.vue'),
        meta:{
            title:"登陆页",

        }
    },
	{
		path:"/home/index",
		name:"home",
		children:[],
		component:()=>import('@/views/home/index.vue'),
		meta:{
            title:"主页",
        }
	},

    {
        path:"/layout",
        name:"layout",
        redirect:"/home/index",
		component: () => import("@/layouts/index.vue"),
		children:[]
    }
]

/**
 * 
 */

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter:RouteRecordRaw[] = [
	{
		path: "/403",
		name: "403",
		component: () => {},
		meta: {
			title: "403页面"
		}
	},
	{
		path: "/404",
		name: "404",
		component: () => {},
		meta: {
			title: "404页面"
		}
	},
	{
		path: "/500",
		name: "500",
		component: () => {},
		meta: {
			title: "500页面"
		}
	}
];

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
	path: "/1313",
	name: "notFound",
	redirect: { name: "404" }
};
 const router = createRouter({
    history:createWebHashHistory(),
    routes:[...staticRouters,...errorRouter,notFoundRouter],
    strict:false,
    scrollBehavior:()=>({
        left:0,
        top:0
    })
    

 })
 router.beforeEach(async (to,from,next)=>{
	NProgress.start()
	const globalStore = GlobalStore();
	if(to.path === "/login"){
		//没有token跳转登录页 有token停留当前页面
		if(!globalStore.GetToken){
			return  next()
		}else{
			return next(from.fullPath)
		}
	}	
	if(globalStore.GetToken ){
		const authStore = AuthStore() 
		authStore.setRouteName(to.fullPath)
		if(!authStore.authMenuListGet.length){
			//没有路由表 加载动态路由
			await initDynamicRouter();
			return next({...to,replace:true})
			
		}else{
			 next()
		}
		}else{
			return next("/login")
		}
 })
 /**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
	NProgress.done();
});
/**
 * @description 路由跳转错误
 * */
router.onError(error => {
	NProgress.done();
	console.warn("路由错误", error.message);
});

 export default router