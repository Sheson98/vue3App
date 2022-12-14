
/**
 * @param 
 * axios 封装
 */
import { GlobalStore } from "@/stores";
import axios,{AxiosInstance,AxiosRequestConfig,AxiosError,AxiosResponse}  from 'axios'
import { ElMessage } from "element-plus";
import router from "@/routers";
import {ResultEnum,ResultData, Result} from '@/api/interface'


const config = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（10s）
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true
};

class RequestHttp{
    service:AxiosInstance;
    constructor(config:AxiosRequestConfig){
        //实例化axios
        this.service = axios.create(config)

        /**
         * 请求拦截器
         * 
         */
        this.service.interceptors.request.use((config:AxiosRequestConfig)=>{
            const globalStore = GlobalStore();//全局状态存储token
            return { ...config, headers: { ...config.headers, "x-access-token": globalStore.token } };
        },(reason)=>{
            return Promise.reject(reason)
        })

        /**
         * 响应拦截器
         */
        this.service.interceptors.response.use((response:AxiosResponse)=>{
            const {data} = response;
            const globalStore = GlobalStore();
            if(data.code == ResultEnum.OVERDUE){//超时 请求失效
                ElMessage.error(data.msg)
                globalStore.setToken("");
                router.replace('/login');//回到登录页
                return Promise.reject(data.msg)
            }
            if(data.code == ResultEnum.ERROR){
                ElMessage.error(data.msg)
                return Promise.reject(data.msg)
            }
            if(data.code == ResultEnum.SUCCESS){
                return  Promise.resolve(data.data)
            }
            if(data.code == ResultEnum.ERROR){
                ElMessage.error(data.msg)
                return Promise.reject(data.msg)
            }
            
            return  data
            
        },(reason:AxiosError)=>{
            return Promise.reject(reason)
        })
    }
    // * 常用请求方法封装
	get<T>(url: string, params?: object, _object = {}): Promise<T> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}

}

export default  new  RequestHttp(config)