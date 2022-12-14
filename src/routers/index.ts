import { createRouter, createWebHashHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import NProgress from "@/api/config/nprogress";
import { GlobalStore } from "@/stores";
import AuthStore from "@/stores/modules/auth";
import initDynamicRouter from '@/routers/dynamicRouter';



/**
 * 静态路由表
 */
const staticRouters:RouteRecordRaw[]= [
    {
		path: "/",
		redirect: '/home/index',
	},
    {
        path:"/login",
        name:"login",
        components:{
			root:import('@/views/login/index.vue'),
		},
        meta:{
            title:"登陆页",
			isServiceRouter:true
        }
    },
	{
		path:"/home/index",
		name:"home",
		components:{
			root:import('@/views/home/index.vue')
		},
		meta:{
            title:"主页",
			isServiceRouter:true
        }
	},
	{
		path:"/system",
		name:"system",
		meta:{
            title:"系统管理",
			isServiceRouter:true
        },
		children:[
			{
				path:"/system/user",
				name:"user",
				component:()=>import( "@/views/home/systemManagement/user.vue"),
				meta:{
					title:"用户管理",
					isServiceRouter:true
				}
			},
			{
				path:"/system/role",
				name:"role",
				component:()=>import( "@/views/home/systemManagement/role.vue"),
				meta:{
					title:"角色管理",
					isServiceRouter:true
				}
			},
			{
				path:"/system/menu",
				name:"menu",
				component:()=>import( "@/views/home/systemManagement/menu.vue"),
				meta:{
					title:"菜单管理",
					isServiceRouter:true
				}
			}
		]
	},
    {
        path:"/layout",
        name:"layout",
        redirect:"/home/index",
    }
]

/**
 * 
 */

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
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
			
			return next()
		}
		return next()
			
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