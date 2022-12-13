
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
        language: ''
    }),
    getters:{
        GetToken:(state)=>state.token
    },
    actions:{
        setToken(token:string){
            this.token = token
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