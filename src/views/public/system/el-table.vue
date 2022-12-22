<template>
    <div class="tableContainer">
        <div class="table_toolbar">
            <div class="right_bartools">
                <el-switch v-model="changeStatus" size="large" @change="!changeStatus" />
                <el-icon size="20">
                    <RefreshLeft />
                </el-icon>
                
                <el-popover placement="bottom"  width="80"   trigger="click" >
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
        <el-table :data="data" style="width: 100%" max-height="250" :stripe="changeStatus">
            <el-table-column fixed prop="date" label="Date" width="150" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="state" label="State" width="120" />
            <el-table-column prop="city" label="City" width="120" />
            <el-table-column prop="address" label="Address" width="600" />
            <el-table-column prop="zip" label="Zip" width="120" />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small">
                        Remove
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="data?.length"
            v-model:current-page="currentPage" v-model:page-sizes="pageSize" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>
<script  lang="ts" setup>
import { ref, computed } from 'vue';
const props = defineProps({
    data: Array,
})
defineEmits([])
const { data } = props
const changeStatus = ref(false)
const pageSize = computed(() => {
    const total = data?.length ?? 0
    const step: number = total / 4
    return [step, step * 2, 3 * step, 4 * step]
})

const currentPage = ref(4)
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
const handleStatusChange = () => {

}
</script>
<style lang="less" >
   .el-popover{
        min-width:60px !important;
        cursor: pointer;
        ul{
            li{
                text-align: center;
                padding: 5px;
            }
            li:hover{
                background-color: #c6e2ffed;
                color: var(--el-color-primary);
            }
            li:not(:hover){
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
    .el-popper{
        min-width: 60px !important;
        .el-popover-ul{
            padding-left: 0 !important;
            list-style: none !important;
            list-style-type: none;
            li::marker{
                list-style: none !important;
            list-style-type: none;
            }
            
        }
    }
    .el-pagination {
        padding: 20px;
        float: right;
    }
}
</style>