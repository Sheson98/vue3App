import { Menu } from "@/api/interface";

/* AuthState */
export interface AuthState {
	routeName: string;
	authButtonList: {
		[key: string]: {
			[key: string]: boolean;
		};
	};
	authMenuList: Menu.MenuOptions[];
}
