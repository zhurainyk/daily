<template>
    <div class="page-list">
        <ListComponet :select-by-condition-api="selectByConditionAbnormalApi"
            :select-count-by-condition-api="selectCountByConditionAbnormalApi" :model-data="modelData"
            :table-map="tableMap" :add-model-prop="addModelProp" :search-where-model-prop="searchWhereModelProp"
            :show-new-porp="false" :pagesizes="[100, 200, 300, 400]" :default-page-size="100"
            :show-action-detail-porp="true" :show-action-edit-porp="false" :show-action-delete-porp="false"
            :show-h-check-box-porp="true" :isClearCheckBox="true" :showResetSearch="true" :showActionDetailPorp="true"
            exportExcelName="异常日志" dbkey="actionlog" @detail-fn="detailLog" :queryHeadStyle="queryHeadStyle">
            <!-- <template #headpriority="{ scope }">
        <span>{{ event_priority[scope.row['priority']] }}</span>
      </template> -->
            <template #queryHead>
                <el-button @click="uploadlog('06')">上传日志</el-button>
                <el-button @click="uploadlog('07')">清空日志</el-button>
            </template>
        </ListComponet>
        <el-dialog v-model="logListShow" width="60%" :show-close="false">
            <div style="padding:20px">
                <el-table :data="logList" style="width: 100%">
                    <el-table-column width="280" prop="serviceName" label="服务名称" />
                    <el-table-column width="120" prop="dateTime" label="日期" />
                    <el-table-column prop="logName" label="日志名称" />

                    <el-table-column label="操作" fixed="right" width="160">
                        <template #default="scope">
                            <el-button style="margin-left:-35px" type="text" @click="exportLog(scope.row)">导出
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <template #footer>
                <span class="dialog-footer" style="display:flex;justify-content:center">
                    <el-button @click="logListShow = false">关闭</el-button>

                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script   setup>
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
    selectByConditionAbnormalApi,
    selectCountByConditionAbnormalApi,
    exportLog as downloadLog
} from '@/api/module/log'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import {
    imitateRequestDataApi
} from '@/api/module/syscontroller'
const uploadlog = (code) => {
    console.log('xx')
    const data = { "time": "", "days": "", "accumulateFlag": "", "imitateFlag": "", "freq": "", "imitateType": code }
    imitateRequestDataApi(data).then(res => {
        ElMessage({
            type: 'success',
            message: '成功 '
        })
    })
}
const queryHeadStyle = reactive({
    flexGrow: 1,
    marginLeft: '80px'
})
const modelData = {
    serviceName: '',
}
const logListShow = ref(false)
let logList = ref([])
const userList = reactive([])
const event_priority = ref({})
const tableMap = [

    {
        dbkey: 'serviceName',
        name: '服务名称'
    }, {
        dbkey: 'dateTime',
        name: '日期'
    },



    // {
    //     dbkey: 'db_eventCode',
    //     name: '操作',
    //     filters: {
    //         '0101': '困人',
    //         '0202': '电梯运行时安全回路断路',
    //         '0203': '轿厢在开锁区域外停止',
    //         '0401': '停止服务',
    //         '0402': '检修',
    //         '0204': '蹲底',
    //         '0205': '冲顶'
    //     },
    //     fn: args => {
    //         const obj = {
    //             '0101': '困人',
    //             '0202': '电梯运行时安全回路断路',
    //             '0203': '轿厢在开锁区域外停止',
    //             '0401': '停止服务',
    //             '0402': '检修',
    //             '0204': '蹲底',
    //             '0205': '冲顶'
    //         }
    //         return obj[args.db_eventCode]
    //     }
    // },


]
const addModelProp = [

]
const searchWhereModelProp = [
    {
        name: '服务名称',
        dbkey: 'serviceName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
    },

    {
        name: '日期',
        dbkey: 'dateTime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        multipledata: '',
        isRules: true,
        list: []
    },

]
const $router = useRouter()
const detailLog = data => {
    console.log(data.serviceName)
    selectByConditionAbnormalApi({
        serviceName: data.serviceName,
        type: '01'
    }).then(res => {
        console.log(res.data.data.objectList)
        logListShow.value = true;
        logList.value = []
        logList.value.push(...res.data.data.objectList)
    })
}
const exportLog = (data) => {
    console.log(data.logName)
    downloadLog({ logName: data.logName }).then(res => {
        const blob = new Blob([res.data])
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        console.log(a.href)
        a.download = `异常日志${data.dateTime}` // 下载文件的名字
        // a.download = url.split('/')[url.split('/').length -1] //  // 下载文件的名字
        document.body.appendChild(a)
        a.click()

        //在资源下载完成后 清除 占用的缓存资源
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
    })  // 将链接地址字符内容转变成blob地址


}
onBeforeMount(() => {
    // selectByAllTypeApi({ constType: 'provider_code' }).then(x => {
    //     console.log(x.data.data)
    //     const data = x.data?.data
    //     if (Object.keys(data).length) {
    //         const list = []
    //         Object.keys(data).forEach(key => {
    //             const obj = {
    //                 label: data[key],
    //                 value: key
    //             }
    //             if (obj.value == '03') {
    //             } else {
    //                 searchWhereModelProp[0].list.push(obj)
    //             }
    //         })
    //     }
    // })


})



</script>

<style lang="scss" scoped>
.page-list {
    background-color: white;

    :deep() .page-body {

        height: calc(100% - 250px);

        .page-body-head {
            .search-where {
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>
