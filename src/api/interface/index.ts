export namespace Login{
  export  interface ReqLoginUser{
    username: string;
		password: string;
    code?:string
    }
	export interface ResLogin {
		token: string;
	}
	export interface ResAuthButtons {
		[key: string]: {
			[key: string]: boolean;
		};
	}
}
/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: string;
	language: string;
	isCollapse:boolean;
}
// * 请求枚举配置
/**
 * @description：请求配置
 */
export enum ResultEnum {
	SUCCESS = 200,
	ERROR = 500,
	OVERDUE = 599,
	TIMEOUT = 10000,
	TYPE = "success"
}
// * Menu
export declare namespace Menu {
	interface MenuOptions {
		path: string;
		name: string;
		component?: string | (() => Promise<any>);
		redirect?: string;
		meta: MetaProps;
		children?: MenuOptions[];
	}
	interface MetaProps {
		icon: string;
		title: string;
		activeMenu?: string;
		isLink?: string;
		isHide: boolean;
		isFull: boolean;
		isAffix: boolean;
		isKeepAlive: boolean;
		isServiceRouter:boolean
	}
}
// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}
// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}
