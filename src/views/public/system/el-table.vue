<template>
    <div class="tableContainer">
        <div class="table_toolbar">
            <div class="headertools">
                <el-button type="primary" @click="centerDialogVisible = true">新增</el-button>
                <el-button>修改</el-button>
            </div>
            <div class="right_bartools">
                <el-tooltip class="box-item" effect="dark" content="切换斑马线" placement="top">
                    <el-switch v-model="changeStatus" size="large" @change="!changeStatus" />
                </el-tooltip>
                <el-tooltip class="box-item" effect="dark" content="刷新" placement="top">
                    <el-icon size="20">
                        <RefreshLeft />
                    </el-icon>
                </el-tooltip>
                <el-popover placement="bottom" width="80" trigger="click">
                    <ul class="el-popover-ul" style="list-style: none; padding: 0;">
                        <li>紧凑</li>
                        <li>默认</li>
                        <li>宽松</li>
                    </ul>
                    <template #reference>
                        <el-icon size="20">
                            <el-tooltip class="box-item" effect="dark" content="密度" placement="top">
                                <Crop />
                            </el-tooltip>
                        </el-icon>
                    </template>
                </el-popover>
                <el-icon size="20">
                    <FullScreen />
                </el-icon>
                <el-icon size="20">
                    <Tools />
                </el-icon>
            </div>
        </div>
        <el-table :data="tableData" style="width: 100%" max-height="250" :stripe="changeStatus">
            <template v-for="item in props.columns">
                <el-table-column v-bind:="item" />
            </template>
        </el-table>
        <el-pagination v-if="props.pagination" background layout="total, sizes, prev, pager, next, jumper"
            :total="pageable.total" v-model:current-page="pageable.pageNum" v-model:page-sizes="pageable.pageSize"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        <el-dialog v-model="centerDialogVisible" ref="formRef" title="新增" width="50%" align-center >
            <el-form label-width="120px" v-model="userinfo" :inline="true" class="dialogForm">
                <el-form-item label="用户名称"  required>
                    <el-input  v-model="userinfo.nickName" />
                </el-form-item>
                <el-form-item label="归属部门"  required>
                    <el-tree-select v-model="userinfo.deptId" :data="deptTree"  check-strictly :render-after-expand="false" />
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="userinfo.phonenumber"  />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="userinfo.email" />
                </el-form-item>
                <el-form-item label="用户名称" required>
                    <el-input v-model="userinfo.userName" />
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="userinfo.password" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="userinfo.sex" placeholder="请选择性别">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="userinfo.status">
                        <el-radio :label="3">正常</el-radio>
                        <el-radio :label="6">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="岗位">
                    <el-select v-model="userinfo.postIds" placeholder="请选择">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="userinfo.postIds" placeholder="请选择">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input
                        v-model="userinfo.remark"
                        type="textarea"
                        rows="3"
                        style="width:300px"
                        placeholder="Please input"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSubmit(formRef)">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script  lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue';
import SearchForm from '../system/searchForm.vue'
import { useTable } from '../hooks/useTable';
import { ElTable, FormInstance, TableColumnCtx, TableProps } from "element-plus";
import { BreakPoint, ColumnProps } from '@/typings/modules/table';
import { ResUser } from '@/typings/modules/User';
import {getUserDeptTree,updateUser} from '@/api/modules/User'
import {getDeptTree} from '@/utils'
const formRef = ref<FormInstance>();
interface ProTableProps extends Partial<Omit<TableProps<any>, "data">> {
    columns: ColumnProps[]; // 列配置项
    requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
    dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
    pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
    initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
    border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
    toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
    selectId?: string; // 当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
    searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    pagination: true,
    initParam: {},
    border: true,
    toolButton: true,
    selectId: "id",
    searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
})

const changeStatus = ref(false)
const pageSize = computed(() => {
    const total = tableData?.value.length ?? 0
    const step: number = total / 4
    return [step, step * 2, 3 * step, 4 * step]
})


// 表格操作 Hooks
const { tableData, pageable, searchParam, searchInitParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
    useTable(props.requestApi, props.initParam, props.pagination,);

const centerDialogVisible = ref(false)
const userinfo =  reactive<ResUser>({
    nickName:"",
    deptId:undefined,
    phonenumber:undefined,
    email:undefined,
    userName:undefined,
    password:undefined,
    sex:undefined,
    status:undefined,
    postIds:undefined,
    roleId:undefined,
    remark:undefined
    

})
const deptTree = ref()
getUserDeptTree().then(res=>{
        deptTree.value = getDeptTree(res??[])
    })
const handleSubmit = (formRef :FormInstance | undefined)=>{
    if(!formRef) return
    formRef.validate(async(valid,fields)=>{
        updateUser().then((res)=>{
            debugger
        })
    })
    centerDialogVisible.value =false
}    
</script>
<style lang="less" >
.el-popover {
    min-width: 60px !important;
    cursor: pointer;

    ul {
        li {
            text-align: center;
            padding: 5px;
        }

        li:hover {
            background-color: #c6e2ffed;
            color: var(--el-color-primary);
        }

        li:not(:hover) {
            background-color: none;
        }
    }
}

.tableContainer {

    .table_toolbar {
        height: 32px;
        width: 100%;

        .right_bartools {
            float: right;
            display: flex;
            align-items: center;

            >* {
                margin: 0 5px;
                cursor: pointer;
            }
        }
    }

    .el-popper {
        min-width: 60px !important;

        .el-popover-ul {
            padding-left: 0 !important;
            list-style: none !important;
            list-style-type: none;

            li::marker {
                list-style: none !important;
                list-style-type: none;
            }

        }
    }

    .el-pagination {
        padding: 20px;
        float: right;
    }
    .dialogForm>.el-form-item{
        >*{
            width: 200px;
        }
    }
}
</style>