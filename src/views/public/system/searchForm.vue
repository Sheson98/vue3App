<template>
    <div class="SearchForm" v-if="columns.length">
        <el-card class="box-card">
            <el-form v-model="userQueryParam" label-width="120px" inline="true">
              <template v-for="item in searchParam">
                <el-form-item label="">
                    <el-input v-model="userQueryParam.queryParam.loginName" placeholder="请输入登陆账号" />
                </el-form-item>
              </template>
                <el-form-item>
                    <el-button type="primary">提交</el-button>
                    <el-button type="default">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script setup lang="ts">import { ColumnProps } from '@/typings/modules/table';
import { PageQuery, ReqUser } from '@/typings/modules/User';
import { reactive } from '@vue/reactivity';

interface ProTableProps {
	columns?: ColumnProps[]; // 搜索配置列
	searchParam?: { [key: string]: any }; // 搜索参数
	search: (params: any) => void; // 搜索方法
	reset: (params: any) => void; // 重置方法
}
// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    searchParam: () => ({})
});
const userQueryParam = reactive<PageQuery<ReqUser>>({
    pageNum: 1,
    pageSize: 50,
    queryParam: {
        loginName: "",
        phonenumber: "",
        status: 0
    },
})

</script>
<style lang="less" scoped >

</style>