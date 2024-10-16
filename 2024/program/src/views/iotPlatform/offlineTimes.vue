<template>
    <div class="page-list">
        <ListComponet :select-by-condition-api="iofflineselectByConditionApi"
            :select-count-by-condition-api="iofflineCountByConditionApi" :model-data="modelData" :table-map="tableMap"
            :add-model-prop="addModelProp" :search-where-model-prop="searchWhereModelProp" :show-new-porp="false"
            :pagesizes="[100, 200, 300, 400]" :default-page-size="100" :show-action-detail-porp="true"
            :show-action-edit-porp="false" :show-action-delete-porp="false" :show-h-check-box-porp="true"
            :isInitApi="true" :isClearCheckBox="true" :showResetSearch="true" :showActionPorp="false"
            @detail-fn="detailLog" exportExcelName="电梯离线次数">


            <template #searchHead="{ selectedList, exportExcel }">
                <div>
                    <!-- <el-button type="primary" @click="resetElevator(selectedList)"
            >重置</el-button
          >
          <el-button type="primary" @click="sendEvent(selectedList)"
            >模拟事件</el-button
          > -->
                    <el-button type="primary" @click="exportExcel">导出</el-button>
                </div>
            </template>
        </ListComponet>
    </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
    iofflineselectByConditionApi,
    iofflineCountByConditionApi,
    getEventCodeNameMap
} from '@/api/module/runningData'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getProjectList } from '@/api/module/customerBI'
const modelData = {
    projectId: '',
    registerCode: '',
    time: '',
    elevatorName: ''
}

const userList = reactive([])
const event_priority = ref({})
const tableMap = [
    {
        dbkey: 'projectName',
        name: '项目名称'
    },
    {
        dbkey: 'projectNum',
        name: '电梯名称'
    },
    {
        dbkey: 'registerCode',
        name: '注册码'
    },
    {
        dbkey: 'dataDate',
        name: '日期'
    },
    {
        dbkey: 'offlineTimes',
        name: '离线次数'
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
    // {
    //     dbkey: 'db_actionContent',
    //     name: '操作地址'
    //     // fn: args => {
    //     //   return event_priority.value[args.priority]
    //     // }
    // },
]
const addModelProp = []
const searchWhereModelProp = reactive([
    {
        name: '项目名称',
        dbkey: 'projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
    },


    {
        name: '电梯名称',
        dbkey: 'elevatorName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
    },
    {
        name: '注册码',
        dbkey: 'registerCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
    },

    {
        name: '时间',
        dbkey: 'time',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        format: 'YYYY-MM-DD',
        multipledata: [],
        isRules: true,
        list: [],

    }
])
const $router = useRouter()
const detailLog = data => {
    $router.push({
        name: menulist.LogManagement.name,
        params: {
            id: data.elevatorId
        }
    })
}
onMounted(() => {
    getEventCodeNameMap({ ui_type: 'A0' }).then(res => {
        console.log(res.data.data)
        let arr = []
        Object.entries(res.data.data).forEach(([k, v]) => {
            arr.push({
                label: v,
                value: k
            })
        })
        searchWhereModelProp.forEach(item => {
            if (item.dbkey === 'db_eventCode') {
                item.list.push(...arr)
            }
        })
    })
    getProjectList()
        .then(res => {
            if (res.data.data?.length) {
                let arr = res.data.data
                // options.push(...res.data.data)

                searchWhereModelProp.forEach(item => {
                    if (item.dbkey === 'projectId') {
                        item.list.push(
                            ...arr.reduce((pre, cur) => {
                                return [...pre, { label: cur.name, value: cur.id }]
                            }, [])
                        )
                    }
                })
            }
        })
        .catch(e => {
            console.log({ e })
        })
    selectByAllTypeApi({ constType: 'online_type' }).then(x => {
        console.log(x.data.data)
        const data = x.data?.data
        if (Object.keys(data).length) {
            const list = []
            Object.keys(data).forEach(key => {
                const obj = {
                    label: data[key],
                    value: key
                }

                searchWhereModelProp.forEach(x => {
                    if (x.dbkey == 'onlineCode') {
                        x.list.push(obj)
                    }
                })

            })
        }
    })
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
