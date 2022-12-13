
import {defineStore ,createPinia} from 'pinia'
import { getFlatArr } from "@/utils";
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
    }),
    getters:{
        // 后端返回的菜单列表 ==> 这里没有经过任何处理
		authMenuListGet: state => state.authMenuList,
        getRouteName:state=> state.routeName,   
        flatMenuListGet:state => getFlatArr(state.authMenuList),
    },
    actions:{
        // getAuthMenuList
		async getAuthMenuList() {
			 getAuthMenuListApi().then((data)=>{
                this.authMenuList = data;
             });
            
			
		},
        async setRouteName(routeName:string){
            this.routeName = routeName
        },
        async getAuthButtonList() {
			const  data  = await getAuthButtonListApi();
			this.authButtonList = data;
		},
    }
})

export default AuthStore