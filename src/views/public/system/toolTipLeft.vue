
<template>
   <el-icon v-show="isCollapse" :size="30" @click="()=>{handleCollapse(false)}"><Expand  /></el-icon>
    <el-icon v-show="!isCollapse" :size="30" @click="()=>{handleCollapse(true)}"><Fold /></el-icon>
</template>

<script setup  lang="ts">
import { computed } from "vue"

import { GlobalStore } from "@/stores"

const globalStore = GlobalStore()
const isCollapse = computed(()=>globalStore.isCollapse)

const handleCollapse = (is:boolean)=>{
    globalStore.setIsCollapse(is)
}
</script>

<style lang="less">
    .el-icon{
        align-self: center;
    }
</style>