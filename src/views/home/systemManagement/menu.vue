

<template>
    <el-card class="box-card">
            菜单权限管理
    </el-card>
    <el-container>
      <el-aside>
        <el-card>
          <el-select v-model="value" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        </el-card>
      </el-aside>
      <el-main>
        <el-button text @click="outerVisible = true">
    open the outer Dialog
  </el-button>

  <el-dialog v-model="outerVisible" title="菜单权限" class="el-dialog" :show-close="false">
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">取消</el-button>
        <el-button type="primary" @click="innerVisible = true">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
      </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const value = ref('')
const outerVisible = ref(false)
const innerVisible = ref(false)
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

</script>

<style lang="less" >
  .el-dialog{
    height: 100vh;
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
    width: 20vw;
  }
</style>