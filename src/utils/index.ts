
import {Menu} from '@/api/interface'
/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArr(menuList: Menu.MenuOptions[]) {
	let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
	return newMenuList.reduce((pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
		if(current.meta.isServiceRouter){
			let flatArr = [...pre, current];
			if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)];
			return flatArr;
		}else{
			return [...pre]
		}
		
		
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