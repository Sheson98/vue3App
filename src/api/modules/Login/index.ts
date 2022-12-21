import { Login ,Menu} from "@/api/interface";

import http from "@/api";
export   const loginApi = (loginUser:Login.ReqLoginUser)=>{
    return http.post<Login.ResLogin>('/login',loginUser)
}
// * 获取菜单列表
export const getAuthMenuListApi =   () => {	
	return  http.get<Menu.MenuOptions[]>( `/menu/list`, {}, { headers: { noLoading: true } });
};
// * 获取按钮权限
export const getAuthButtonListApi = () => {
	return http.get<string>( `/buttons`, {}, { headers: { noLoading: true } });
};