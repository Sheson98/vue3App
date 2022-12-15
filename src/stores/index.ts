
import {defineStore,createPinia} from 'pinia'
import {GlobalState} from '@/api/interface'
import { PersistedStateOptions } from "pinia-plugin-persistedstate";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
export const GlobalStore = defineStore({
    id:"GlobalStore",
    state:():GlobalState =>({
        token:'',
        userInfo: '',
        assemblySize: '',
        language: '',
        isCollapse:false,//是否折叠面板
    }),
    getters:{
        GetToken:(state)=>state.token,
        getIsCollapse:(state)=>state.isCollapse
    },
    actions:{
        setToken(token:string){
            this.token = token
        },
        setIsCollapse(is:boolean){
            this.isCollapse = is
        }
    },
    persist:[ {
		key:"GlobalStore",
		storage: window.localStorage,
		// storage: window.sessionStorage,
	}]

});
// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia