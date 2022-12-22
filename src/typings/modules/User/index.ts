import {StatusType} from '../index'
export interface  ReqUser{
    loginName:string,
    phonenumber:string,
    status:StatusType,
}
export interface ResUser {
    admin:       boolean;
    avatar:      string;
    createBy:    string;
    createTime:  string;
    delFlag:     string;
    dept:        Dept;
    deptId:      number;
    email:       string;
    loginDate:   string;
    loginIp:     string;
    nickName:    string;
    password:    null;
    phonenumber: string;
    postIds:     null;
    remark:      string;
    roleId:      null;
    roleIds:     null;
    roles:       string[];
    sex:         string;
    status:      string;
    updateBy:    null;
    updateTime:  null;
    userId:      number;
    userName:    string;
}

export interface Dept {
    ancestors:  null;
    children:   string[];
    createBy:   null;
    createTime: null;
    delFlag:    null;
    deptId:     number;
    deptName:   string;
    email:      null;
    leader:     string;
    orderNum:   null;
    parentId:   null;
    parentName: null;
    phone:      null;
    remark:     null;
    status:     null;
    updateBy:   null;
    updateTime: null;
}
export interface PageQuery<T>{
    pageSize:number,
    pageNum:number,
    queryParam:T
}
export interface PageRes<T>{
    code:number,
    rows:T,
    msg:string,
    total:number
}

