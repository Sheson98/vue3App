
<template>
    <el-menu
        :collapse="isCollapse"
        @select="handleSelect"
        :default-active="defaultActive"
        :router="false"
        class="el-menu-vertical-demo"
      >
      
      <SubMenu :menuList="menuList" />
      </el-menu>
</template>

<script setup lang="ts">
import SubMenu from './subMenu.vue'
import { Menu } from '@/api/interface';
import { GlobalStore } from '@/stores';
import { computed, ref } from '@vue/reactivity';
import router from '@/routers';
import TabsStore from '@/stores/modules/tabstore';
import AuthStore from '@/stores/modules/auth';
import { onMounted } from 'vue'

  const tabsStore = TabsStore()
  const authStore =AuthStore()
  
  const {menuList} =   defineProps<{ menuList:Menu.MenuOptions[]}>();
  const gobalStore = GlobalStore()
  const isCollapse = computed(() => gobalStore.isCollapse);
  const defaultActive = computed(()=>tabsStore.currentTabGet.name)
  const handleSelect = (path:any,indexPath:any,item:any,routeResult:any)=>{
    const flatRouter = authStore.flatRouters
    const route = flatRouter.find(m=>m.path===path);
    tabsStore.addTab({
        title:route?.meta.title??"",
        name:path
    })
    router.push(path)
  }


</script>

<style scoped>
        .el-menu-vertical-demo:not(.el-menu--collapse) {
    height:100vh 

  }
</style>