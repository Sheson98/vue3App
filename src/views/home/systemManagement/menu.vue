

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
    <el-form :model="form" label-width="180px">
    <el-form-item label="路径">
      <el-input v-model="form.path" />
    </el-form-item>
    <el-form-item label="路由名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="上级路由名称（未实现）">
      <el-input  />
    </el-form-item>
    <el-divider />
    <span>菜单信息</span>
    <el-form-item label="图标">
      <el-input   v-model="form.meta.icon"  />
    </el-form-item>
    <el-form-item label="菜单名称">
      <el-input   v-model="form.meta.title"  />
    </el-form-item>
    <el-form-item label="是否全屏显示">
      <el-switch v-model="form.meta.isFull"  />
    </el-form-item>
    <el-form-item label="是否默认隐藏">
      <el-switch  v-model="form.meta.isHide"  />
    </el-form-item>
    <el-form-item label="跳转地址">
      <el-input   v-model="form.meta.isLink"  />
    </el-form-item>
    <el-form-item label="是否是业务菜单">
      <el-switch  v-model="form.meta.isServiceRouter"  />
    </el-form-item>
    <el-form-item label="是否启用keepAlive">
      <el-switch  v-model="form.meta.isKeepAlive"  />
    </el-form-item>
  </el-form>

  </el-dialog>
      </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { reactive } from 'vue'
import { Menu } from "@/api/interface";
// do not use same name with ref
const form = reactive<Menu.MenuOptions>({
  path:"",
  name:"",
  meta:{
    icon: "",
		title: "",
		isLink: "",//跳转的地址
		isHide: false,
		isFull: false,
		isAffix: false,
		isKeepAlive: false,
		isServiceRouter:true
  },
  children:[]
});
const onSubmit = () => {
  console.log('submit!')
}

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
    width: 30vw;
  }
</style>