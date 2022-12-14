<template>
  <div class="header">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item >promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="sysHelper">
      <el-button type="primary" @click="handleClick">退出</el-button>
    </div>
  </div>
    <el-tag
    v-for="tag in tags"
    :key="tag.name"
    class="mx-1"
    closable
    :type="tag.type"
  >
    {{ tag.name }}
  </el-tag>
  </template>
  
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { GlobalStore } from '@/stores';
import router from '@/routers';
const tags = ref([
  { name: 'Tag 1', type: '' },
  { name: 'Tag 2', type: 'success' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 4', type: 'warning' },
  { name: 'Tag 5', type: 'danger' },
])
const handleClick =  async ()=>{
  const gobalStote = await GlobalStore()
  gobalStote.setToken("")
  router.push('/login')
}
</script>

<style style="less" scoped>
.el-breadcrumb{
    height: 40px;
    line-height: 40px;
}
.header{
  display: flex;
  justify-content: space-between;
 
}


</style>