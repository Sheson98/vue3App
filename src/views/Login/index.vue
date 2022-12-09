<template>
  <div class="loginContainer">
    <div class="loginAside"></div>
    <div class="loginMain">
        <el-form :model="loginUser"  ref="loginForm"  :rules="loginRules" class="loginForm">
              <el-form-item  :rules="[ { required: true, message: '请输入姓名', trigger: 'blur' }]">
                <el-input v-model="loginUser.username"></el-input>
              </el-form-item>
              <el-form-item  :rules="[ { required: true, message: '请输入姓名', trigger: 'blur' }]">
                <el-input v-model="loginUser.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login(loginFormRef)">现在登录</el-button>
              </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>

import {Login} from '@/api/interface'
import type { ElForm } from "element-plus";
import { ref ,reactive} from "vue";
type FormInstance = InstanceType<typeof ElForm>;
  const loginFormRef = ref<FormInstance>();
  const loginUser = reactive<Login.ReqLoginUser>({
    username:"",
    password:""
  })
  const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

    const login = (loginFormRef:FormInstance|undefined)=>{
      if (!loginFormRef) return;
      loginFormRef.validate(valid=>{

      })
    }


</script>
<style lang="less" scoped>
    .loginContainer{
        width: 1200px;
        height: 784px;
        display: inline;
        .loginAside{
            width: 450px;
            height: 100%;
            background-color: rgb(43, 193, 123);
        }
        .loginMain{
            width: 100%;
            padding:50px ;
            .loginForm{
                .el-form-item{
                  width: 100%;
                  height: 65px;
                }
            }

        }
    }
</style>
