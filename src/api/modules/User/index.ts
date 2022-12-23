import http from "@/api";
import { PageRes } from "@/typings/modules/User";
import {PageQuery, ReqUser,ResUser}from '@/typings/modules/User'
export   const getUserListApi = (UserQueryParam:PageQuery<ReqUser>)=>{
    return http.get<PageRes<ResUser>>('/system/user/list?pageSize'+UserQueryParam.pageSize+'pageNum'+UserQueryParam.pageNum)
}
