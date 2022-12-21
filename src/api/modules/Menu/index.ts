import { Login ,Menu} from "@/api/interface";
import http from "@/api";
// * 新增菜单
export const addMenuApi = (menu:Menu.MenuOptions) => {
	return http.post<string>( `/menu/addmenu`, {...menu}, { headers: { noLoading: true } });
};