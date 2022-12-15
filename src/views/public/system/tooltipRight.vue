<template>
   <div class="demo-type">
    <el-avatar :size="40" src="https://empty" @error="errorHandler">
      <img
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
      />
    </el-avatar>
  </div>
</template>

<script setup lang="ts">
const errorHandler = () => true
</script>

<style style="less" scoped>
  .demo-type{
    height: 100%;
  }
</style>