<template>
    <div class="page-list">
        <div class="page-head">
            <el-tabs v-model="selectTabs" @tab-change="handleClick">
                <el-tab-pane v-for="tab in tabList" :label="tab.label" :name="tab.name">

                </el-tab-pane>


            </el-tabs>
        </div>
        <actionlog v-if="selectTabs == 'actionlog'"></actionlog>
        <loginlog v-if="selectTabs == 'loginlog'"></loginlog>
        <abnormallog v-if="selectTabs == 'abnormallog'"></abnormallog>
    </div>

</template>

<script   setup>
import actionlog from './components/actionlog.vue'
import loginlog from './components/loginlog.vue'
import abnormallog from './components/abnormallog.vue'

import { reactive, onMounted, ref } from 'vue'

const tabList = reactive([
    { label: '操作日志', name: 'actionlog' },
    { label: '登陆日志', name: 'loginlog' },
    { label: '异常日志', name: 'abnormallog' },
])
const selectTabs = ref('actionlog')

const handleClick = (tab, event) => {
    console.log(tab, event)
}

</script>

<style lang="scss" scoped>
.page-list {
    background-color: white;

    .page-body {
        /* height: calc(100% - 220px); */
    }
}
</style>
