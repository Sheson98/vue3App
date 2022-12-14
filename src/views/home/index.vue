<template>
    <div class="container">
      <div class="aside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      style="height:100vh"
      @select="handleSelect"
      :router="true"
    >
    <div style="text-align:right">
      <el-icon v-show="isCollapse" :size="30" @click="()=>{isCollapse =!isCollapse}"><Expand  /></el-icon>
      <el-icon v-show="!isCollapse" :size="30" @click="()=>{isCollapse =!isCollapse}"><Fold /></el-icon>
      <el-icon>
    <Delete />
  </el-icon>
    </div>
    <h4 style="text-align:center">xxx管理系统</h4>
      <el-sub-menu index="1" v-for="router in routers" :key="router.path">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{router.meta.title}}</span>
        </template>
        <template v-if="router.children?.length">
          <el-menu-item :index="child.path"  v-for="child in router.children" :key="child.path">{{child.meta.title}}</el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
    </div>
    <div class="main">
      <header>
        <BreadCrumb/>
      </header>
      <el-main>
        <router-view >
          
        </router-view>
      </el-main>
    </div>
    </div>
  </template>
   
 
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import BreadCrumb  from '../public/breadcrumb/index.vue'
  import router from '@/routers';
  import  AuthStore from '@/stores/modules/auth';
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    Expand,
    Fold
  } from '@element-plus/icons-vue'
  
  const isCollapse = ref(true)
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }  
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const authStore = AuthStore()
  const routers =  ref(authStore.serviceRouter)
  const handleSelect = (_:any,indexPath:any,item:any,routeResult:any)=>{
    console.log(indexPath,item,routeResult)
  }
 
  onMounted(()=>{
    
    console.log()
  })

  </script>
  
  <style lang="less">
    .container{
      display: flex;
      height: 100vh;
      width: 100vw;
      .aside{
        height: 100%;
      }
      .main{

      flex: 1;
    }

    }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
  }
  content{
    width: 100%;
  }
  
  </style>
  
