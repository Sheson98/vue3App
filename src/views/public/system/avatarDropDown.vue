<template>
   <el-dropdown>
    <span class="el-dropdown-link">
      Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item  :icon="Plus" command="a">Action 1</el-dropdown-item>
        <el-dropdown-item  :icon="Plus" command="b">Action 2</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
</script>

<style>

</style>