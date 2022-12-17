<template>
    <!-- <div class="container">
      <div class="aside">
        <div class="sysName">xxx管理系统</div>
        <MenuVue :menuList="authMenuListGet"/>
      </div>
      <div class="mainContainer">
        <Header/>
        <TabsVue/>
        <Main/>
      </div>
      
    </div> -->

    <el-container>
      <el-aside>

      <MenuVue :menuList="authMenuListGet"/>
    </el-aside>
    <el-main>
        <el-scrollbar>
          <Header/>
        <TabsVue/>
        <Main/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </template>
   
 
  <script lang="ts" setup>
  import { ref } from 'vue'
  import  AuthStore from '@/stores/modules/auth';
  import MenuVue from '@/views/public/system/menu.vue';
  import Header from '@/views/public/system/header.vue';
  import Main from '@/views/public/main.vue';
  import TabsVue from '@/views/public/system/tabs.vue';
  const store=  AuthStore()
  const authMenuListGet = ref(store.authMenuListGet)

    console.log(authMenuListGet)
  </script>
  
  <style lang="less">
    .el-container{
        height: 100%;
        .el-main{
        padding: 0;
   }
        
    }
   
  
    
  </style>
  
