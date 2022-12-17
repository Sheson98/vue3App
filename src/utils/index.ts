
import {Menu, RouterTree} from '@/api/interface'
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
export function getRouterTree(menuList: Menu.MenuOptions[]):RouterTree[]{
	return menuList.reduce((pre:RouterTree[],now:Menu.MenuOptions)=>(Array.isArray(now.children)&&now.children.length>0?[{
		label:now.meta.title,
		value:now.path,
		children:getRouterTree(now.children)
	}]:[...pre,{
		label:now.meta.title,
		value:now.path,
	}]),[])


}