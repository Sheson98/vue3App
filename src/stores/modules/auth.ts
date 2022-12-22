
import {defineStore ,storeToRefs} from 'pinia'
import { getFlatArr ,getServiceRouter,getRouterTree} from "@/utils";
import {Menu} from '@/api/interface'
import { getAuthMenuListApi ,getAuthButtonListApi} from "@/api/modules/login";
import { AuthState } from "@/stores/interface";
const AuthStore = defineStore({
    id:"AuthStore",
    state:():AuthState=>({
        authMenuList:[],//后端返回的菜单列表，多维数组需要扁平化处理
        routeName:"",
        // 按钮权限列表
		authButtonList: {},
        serviceRouters:[]
    }),
    getters:{
        // 后端返回的菜单列表 ==> 这里没有经过任何处理
		authMenuListGet: state => state.authMenuList,
        getRouteName:state=> state.routeName,   
        flatRouters:state => getFlatArr(state.authMenuList),
        routerTree:state=>{
            	//拼接根路由root
            const menuListRoot:Menu.MenuOptions[] = [{
                name:"root",
                path:"/",
                hidden:false,
                meta:{
                    title:"root",
                    icon:"",
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: false,
                    isServiceRouter:false
                },
                children:[...state.authMenuList]
            }]
           return getRouterTree(menuListRoot)
        }
    },
    actions:{
        // getAuthMenuList
		async getAuthMenuList() {
			await  getAuthMenuListApi().then((data)=>{
                this.authMenuList = data
             });
		},
        async setRouteName(routeName:string){
            this.routeName = routeName
        },
        async getAuthButtonList() {
			
			//this.authButtonList = data;
		},
        
    },
    persist:[ {
		key:"AuthStore",
		storage: window.localStorage,
        paths:["routeName","authButtonList","serviceRouters"]
		// storage: window.sessionStorage,
	}]
})

export default AuthStore