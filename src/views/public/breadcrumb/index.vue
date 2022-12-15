<template>
  <div class="header">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item >promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
   
  </template>
  
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { GlobalStore } from '@/stores';
import router from '@/routers';

const handleLogOut =  async ()=>{
  const gobalStote = await GlobalStore()
  gobalStote.setToken("")
  router.push('/login')
}
</script>

<style style="less" scoped>
  .header{
    margin: 0 20px;
    
  }
  .el-breadcrumb{
    height: 100%;
    display: flex;
  
}

</style>