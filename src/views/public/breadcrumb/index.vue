<template>
  <div class="header">
    <el-breadcrumb  separator="|">
      <el-breadcrumb-item v-for="item in beadCrumbs" :to="{path:item.to}">{{ item.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
  
<script setup lang="ts">
import { GlobalStore } from '@/stores';
import TabsStore from '@/stores/modules/tabstore';
import router from '@/routers';
import { computed } from '@vue/runtime-core';
const gobalStote =  GlobalStore()
const tabsStore = TabsStore()
const beadCrumbs = computed(()=>tabsStore.beadCrumbs)
console.log(tabsStore.beadCrumbs)
const handleLogOut =  async ()=>{
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