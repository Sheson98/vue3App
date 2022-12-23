<template>
   <div>
     <el-card class="box-card">
          <el-form v-model="searchParam" label-width="120px" inline="true">
               <el-form-item label="登录账号">
                    <el-input v-model="searchParam.loginName"  placeholder="请输入登陆账号"  />
               </el-form-item>
               <el-form-item label="手机号码" >
                    <el-input v-model="searchParam.phonenumber"  placeholder="请输入手机号码"/>
               </el-form-item>
               <el-form-item label="用户状态">
                    <el-select v-model="searchParam.status" class="m-2" placeholder="" >
                         <el-option label="启用" value="0" />
                         <el-option label="停用" value="1" />
                    </el-select>
               </el-form-item>
               <el-form-item>
                    <el-button type="primary">提交</el-button>
                    <el-button type="default">重置</el-button>
               </el-form-item>
          </el-form>

     </el-card>
     <el-card>
          <Table  :request-api="getUserListApi"  :init-param="searchParam"   :columns="columns" />
     </el-card>
   </div>
</template>
 
<script lang="ts" setup>
import { PageQuery, ReqUser, ResUser } from '@/typings/modules/User';
import {StatusType} from '@/typings/modules'
import { onMounted, reactive, ref } from 'vue'
import {getUserListApi}  from  '@/api/modules/User/index'
import Table from '@/views/public/system/el-table.vue'
import { ColumnProps } from '@/typings/modules/table';
// do not use same name with ref

const searchParam = {
     loginName:"",
     phonenumber:"",
     status:""
}

const columns: ColumnProps[] = [
     {prop: "nickName", label: "用户姓名",},
     {prop: "phonenumber", label: "电话号码",},
     {prop: "sex", label: "性别",},
     {prop: "remark", label: "备注",},
]
</script>

<style lang="less" scoped>
 .el-card{
     margin: 10px 0;
 }
</style>