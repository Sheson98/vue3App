<template>
   <div class="demo-type">
  <el-popover
    width="80"
    trigger="click"
  >
    <template #reference>
      <el-avatar :size="40"  @error="errorHandler"  src="/assets/schoolboy.1a64b25c.png" class="avatar">
    </el-avatar>
    </template>
    <template #default>
     <ul>
        <li class="myli">
         <div class="imgContaienr"> 
          <el-icon :size="24"><Open /></el-icon>
          <span>个人设置</span>
         </div>
        </li>
        <li class="myli">
         <div class="imgContaienr"> 
          <el-icon :size="24"><Open /></el-icon>
          <span>修改密码</span>
         </div>
        </li>
        <li class="myli">
         <div class="imgContaienr"> 
          <el-icon :size="24"><Open /></el-icon>
          <span>退出登陆</span>
         </div>
        </li>
     </ul>
    </template>
  </el-popover>
  </div>
</template>

<script setup lang="ts">
import AvatarDropDown from './avatarDropDown.vue'
const errorHandler = () => true
</script>

<style  lang="less" scoped>
  .avatar{
    margin: 5px;
  }
  ul{
    padding: 0;
  }
  .myli{
    list-style-type: none;
    list-style: none;
    height: 30px;
    line-height: 30px;
    .imgContaienr{
      display: flex;
      justify-content: space-evenly;
    }
  }
  ul li div{
    display: inline-flex;
  }
</style>