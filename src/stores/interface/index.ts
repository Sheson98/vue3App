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
	serviceRouters:Menu.MenuOptions[];
}
/* AuthState */
export interface TabProps{
	title:string,
	name:string,
}
export interface TabsState {
	beadCrumbs:BeadCrumb[];
	currentTab: TabProps;
	tabs:TabProps[]
}
export interface BeadCrumb{
	to?:string,
	title?:string
}
