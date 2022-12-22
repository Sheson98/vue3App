<template>
   <div>
     <el-card class="box-card">
          <el-form v-model="userQueryParam" label-width="120px" inline="true">
               <el-form-item label="登录账号">
                    <el-input v-model="userQueryParam.loginName"  placeholder="请输入登陆账号"  />
               </el-form-item>
               <el-form-item label="手机号码" >
                    <el-input v-model="userQueryParam.phonenumber"  placeholder="请输入手机号码"/>
               </el-form-item>
               <el-form-item label="用户状态">
                    <el-select v-model="userQueryParam.status" class="m-2" placeholder="" >
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
          <div class="headertools">
               <el-button type="primary">新增</el-button>
               <el-button >修改</el-button>
          </div>
          <Table :data="tableData"/>
     </el-card>
   </div>
</template>
 
<script lang="ts" setup>
import { ReqUser } from '@/typings/modules/User';
import {StatusType} from '@/typings/modules'
import { onMounted, reactive, ref } from 'vue'
import {getUserListApi}  from  '@/api/modules/User/index'
import Table from '@/views/public/system/el-table.vue'
// do not use same name with ref
const userQueryParam = reactive<ReqUser>({
     loginName: '',
     phonenumber: '',
     status: 0,
})
let tableData:any = []
for(let i=0;i<20;i++){
     tableData = [...tableData,{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
     }]
}

// onMounted(() => {
//      // getUserListApi(userQueryParam).then((data)=>{

//      // })
// }),

</script>

<style lang="less" scoped>
 .el-card{
     margin: 10px 0;
 }
</style>