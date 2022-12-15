<template>
      <el-main>
        <router-view  v-slot="{ Component, route }">
          <keep-alive>
            <component
                  :is="Component"
                  :key="route.meta.path ? route.path : undefined" 
                />
          </keep-alive>
        </router-view>
      </el-main>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>

</style>

