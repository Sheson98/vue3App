<template>
        <header>
        <div class="tooltip_bread">
          <ToolTipLeft/>
          <BreadCrumb/>
        </div>
        <ToolTipRight/>
      </header>
</template>

<script setup lang="ts">
import BreadCrumb from '../breadcrumb/index.vue'
import { GlobalStore } from '@/stores';
import { computed, ref } from 'vue';
import  ToolTipLeft from './toolTipLeft.vue'
import  ToolTipRight from './tooltipRight.vue'

</script>

<style  lang="less" scoped>
  header{
    display: flex;
    justify-content: space-between;
    justify-items: center;
    height: 50px;
    box-shadow:0 1px 4px #00152914;
    background-color: white;
    .tooltip_bread{
      display: flex;
      
    }
  }
</style>