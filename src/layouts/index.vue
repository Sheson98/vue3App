<template>
  <el-container>
    <MenuVue :menuList="authMenuListGet" class="menubar" />
    <el-main>
      <el-scrollbar>
        <Header />
        <TabsVue />
        <keep-alive>
          <Transition>
            <Main />
          </Transition>
        </keep-alive>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AuthStore from "@/stores/modules/auth";
import MenuVue from "@/views/public/system/menu.vue";
import Header from "@/views/public/system/header.vue";
import Main from "@/views/public/main.vue";
import TabsVue from "@/views/public/system/tabs.vue";
const store = AuthStore();
const authMenuListGet = ref(store.authMenuListGet);
</script>

<style lang="less">
.el-container {
  height: 100%;
  .el-main {
    padding: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
