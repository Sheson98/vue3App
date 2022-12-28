
import {Menu, Tree} from '@/api/interface'
import { BeadCrumb, TabProps } from '@/stores/interface';
import AuthStore from '@/stores/modules/auth';
import { now } from '@vueuse/shared';
import { MenuProps } from 'element-plus';
import { ResDept } from "@/typings/modules/Dept";
/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArr(menuList: Menu.MenuOptions[]) {
	let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
	return newMenuList.reduce((pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
		let flatArr = [...pre, current];
		if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)];
		return flatArr;
		
	}, []);
}
/**
 * @description 只保留业务路由用于界面显示
 */
export function getServiceRouter(menuList: Menu.MenuOptions[]){
	return menuList.reduce((pre: Menu.MenuOptions[], current: Menu.MenuOptions)=>{
		return	current.meta.isServiceRouter?[...pre,current]:[...pre]
	},[])
}
/**
 * 获取路由树
 */
export function getRouterTree(menuList: Menu.MenuOptions[]):Tree[]{
	return  menuList.reduce((pre:Tree[],now:Menu.MenuOptions)=>(Array.isArray(now.children)&&now.children.length>0?[...pre,{
		label:now.meta.title,
		value:now.path,
		children:getRouterTree(now.children)
	}]:[...pre,{
		label:now.meta.title,
		value:now.path,
	}]),[])
}
/**
 * @description 根据当前页卡路径找到他的所有顶层
 */
export function getBeadCrumbPath(currentTab:TabProps):BeadCrumb[]{
	const authStore = AuthStore()
	const rootPath =   authStore.authMenuList
	let list:BeadCrumb[] = []
	const beadCrumbs  =  getBeadCrumb(rootPath)
	
	return beadCrumbs
	function getBeadCrumb(arr:Array<Menu.MenuOptions>,route?:Menu.MenuOptions):BeadCrumb[]{
		// return arr.reduce((pre:BeadCrumb[],now:Menu.MenuOptions)=>currentTab.title==now.meta.title?[...pre,{
		// 	to:now.path,
		// 	title:now.meta.title
		// }]:Array.isArray(now.children)&&now?.children?.length>0?getBeadCrumb(now.children):[...pre],[])
		arr.forEach((item:Menu.MenuOptions)=>{
			if(currentTab.title==item.meta.title){
				list = [...list,{
					to:route?.path,
					title:route?.meta.title
				},{
					to:item.path,
					title:item.meta.title
				}]
				return
			}else{
				Array.isArray(item.children)&&item?.children?.length>0 && getBeadCrumb(item.children,item)
			}

		})
		return list
	}
	
}
export function getDeptTree(resDepts: ResDept[]):Tree[]{
	return  resDepts.reduce((pre:Tree[],now:ResDept)=>(Array.isArray(now.children)&&now.children.length>0?[...pre,{
		label:now.label,
		value:now.id.toString(),
		children:getDeptTree(now.children)
	}]:[...pre,{
		label:now.label,
		value:now.id.toString(),
	}]),[])
}