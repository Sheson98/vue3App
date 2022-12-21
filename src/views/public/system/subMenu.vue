<template>
    <template  v-for="router in menuList" :key="router.path">
    <el-sub-menu   v-if="router.children?.length" :index="router.path">
            <template #title >
                <el-icon >
					<component :is="router.meta.icon"></component>
				</el-icon>
                <span>{{router.meta.title}}</span>
            </template>
            <SubMenu :menuList ="router.children"/>
    </el-sub-menu>
    <el-menu-item  v-else  :index="router.path"  :key="router.path"> 	
        <el-icon >
				<component :is="router.meta.icon"></component>
		</el-icon>
        <template #title>
				<span>{{ router.meta.title }}</span>
			</template>
    </el-menu-item>
    </template>
</template>

<script setup lang="ts">
import { Menu } from '@/api/interface';
import  SubMenu from './subMenu.vue'

const {menuList} =   defineProps<{ menuList:Menu.MenuOptions[]}>();

</script>

<style  lang="less" scoped>
    
</style>