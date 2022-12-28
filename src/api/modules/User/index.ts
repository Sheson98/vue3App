import http from "@/api";
import { PageRes } from "@/typings/modules/User";
import {PageQuery, ReqUser,ResUser}from '@/typings/modules/User'
import { ResDept } from "@/typings/modules/Dept";

export   const getUserListApi = (UserQueryParam:PageQuery<ReqUser>)=>{
    return http.get<PageRes<ResUser>>('/system/user/list?pageSize'+UserQueryParam.pageSize+'pageNum'+UserQueryParam.pageNum)
}
export const getUserDeptTree = ()=>{
    return http.get<ResDept[]>('system/user/deptTree')
}
export const updateUser = ()=>{
    return http.post<ResDept[]>('system/user')
}