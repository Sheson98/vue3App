<template>
  <div class="loginContainer">
    <div class="loginAside"></div>
    <div class="loginMain">
        <el-form :model="loginUser"  ref="loginForm"  :rules="loginRules" class="loginForm">
              <h1>后台登陆</h1>
              <el-form-item    :rules="[ { required: true, message: '请输入姓名', trigger: 'blur' }]" >
                <el-input v-model="loginUser.username" placeholder="请输入姓名"    :prefix-icon="User"></el-input>
              </el-form-item>
              <el-form-item  :rules="[ { required: true, message: '请输入密码', trigger: 'blur' }]">
                <el-input v-model="loginUser.password" placeholder="请输入密码"  type="password" :prefix-icon="View"></el-input>
              </el-form-item>
              <el-form-item  :rules="[ { required: true, message: '请输入验证码', trigger: 'blur' }]">
                <el-input v-model="loginUser.code" placeholder="请输入验证码" :prefix-icon="Lock"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login(loginForm)">现在登录</el-button>
              </el-form-item>
              
        </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>

import {Login} from '@/api/interface'
import type { ElForm } from "element-plus";
import { ElNotification } from "element-plus";
import md5 from "js-md5";
import { ref ,reactive} from "vue";
import {loginApi} from '@/api/modules/Login'
import { GlobalStore } from '@/stores';
import { Calendar, Search, User,View ,Lock} from '@element-plus/icons-vue'
import initDynamicRouter from '@/routers/dynamicRouter';
import router from '@/routers';
import { debug } from 'console';
type FormInstance = InstanceType<typeof ElForm>;
  const loginForm = ref<FormInstance>();
  const loginUser = reactive<Login.ReqLoginUser>({
    username:"",
    password:"",
    code:""
  })
  const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

    const login = (loginForm:FormInstance|undefined)=>{
      if (!loginForm) return;
      loginForm.validate( valid=>{
        try{
          loginApi({...loginUser,password:md5(loginUser.password)}).then(async (data)=>{
            const gobalStote =  GlobalStore();
            gobalStote.setToken(data.data.token)
            
            	// 2.添加动态路由
			      await initDynamicRouter();

            
             // 4.跳转到首页
			       router.push('/home/index')
            ElNotification({
            title: "",
            message: "欢迎登录 Geeker-Admin",
            type: "success",
            duration: 3000
          });

          })
        }catch(e){

        }
      })
      
    }


</script>
<style lang="less" scoped>
    .loginContainer{
        width: 1200px;
        height: 784px;
        display: flex;
        h1{
          color: rgb(43, 193, 123);
          font-weight: 300;
          font-size: 3rem;

        }
        .loginAside{
            width: 450px;
            height: 100%;
            background-color: rgb(43, 193, 123);
        }
        .loginMain{
            width: 750px;
            padding:150px 200px ;
            .loginForm{
                .el-form-item{
                  width: 100%;
                  height: 65px;

                  border: none;
                  .el-input,.el-input__wrapper{
                    height: 100%;
                    border: none;
                    border:  0px #979797 solid;
                    background-color: #F5F9FA;
                  }
                  .el-button{
                    height: 65px;
                    background-color: #2bc17b;
                    width: 255px;
                    border-radius: 32.5px;
                    margin: 0 auto;
                  }
                }
            }

        }
    }
</style>
