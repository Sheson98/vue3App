<template>
  <el-tabs
    v-model="editableTab.name"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="removeTab"
    @tab-change="changeTab"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      class="tabpane"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { TabProps } from '@/stores/interface'
import { computed, ref } from 'vue'
import TabsStore from '@/stores/modules/tabstore';
const tabstore = TabsStore()
const editableTab = computed(()=>tabstore.currentTab)

const editableTabs = computed(()=>tabstore.tabs)

const removeTab = (targetName: string) => {
  tabstore.removeTab(targetName);
}
const changeTab = (targetName: string)=>{
  tabstore.changeTab(targetName);
}
</script>
<style style="less">
.demo-tabs {
  height: 60px;
  line-height: 60px;
}
.el-tabs__item{
    background-color: white;
    border-radius: 5px;
    margin:0 10px;
  }
</style>