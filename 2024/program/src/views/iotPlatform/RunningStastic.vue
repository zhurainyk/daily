<template>
    <div class="page-list">
        <ListComponet :select-by-condition-api="stasticselectByConditionApi"
            :select-count-by-condition-api="stasticselectCountByConditionApi" :model-data="modelData"
            :table-map="tableMap" :search-where-model-prop="searchWhereModelProp" :show-new-porp="false"
            :pagesizes="[100,200,300,400]" :default-page-size="100" :show-action-detail-porp="true"
            :show-action-edit-porp="false" :show-action-delete-porp="false" :show-h-check-box-porp="false"
            :isClearCheckBox="true" :showResetSearch="true" :showActionPorp="false" exportExcelName="电梯周月运行统计"
            dbkey="actionlog">
            <template #searchHead="{ selectedList, exportExcel }">
                <div>
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
    stasticselectByConditionApi,
    stasticselectCountByConditionApi,
    getEventCodeNameMap
} from '@/api/module/runningData'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getProjectList, getElevatorByProjectId } from '@/api/module/customerBI'
const modelData = reactive({
    projectId: '',
    registerCode: '',
    elevId: '',
    time: '',
    freq: '01',
})

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
        name: '时间'
    },
    {
        dbkey: 'totalDoorTimes',
        name: '开关门次数'
    },
    {
        dbkey: 'totalRunDuration',
        name: '运行时长(小时)'
    },
    {
        dbkey: 'totalRunMileage',
        name: '运行里程(千米)'
    },
    {
        dbkey: 'totalRunTimes',
        name: '运行次数'
    },

]
const addModelProp = []
const changeProject = (args, addModel, item, dialogModel) => {
    console.log('改变', { args, addModel, item, dialogModel })
    getElevatorByProjectId({ projectid: args }).then(res => {
        if (res?.data?.data?.data?.length) {
            const temp = searchWhereModelProp.find(x => x.dbkey == "elevId")
            temp.list = []
            res.data.data.data.forEach(x => {
                temp.list.push({ label: x.elevatorName, value: x.elevatorId })
            })
            const id = temp.list.find(x => x.value == dialogModel.elevId)
            if (!id) {
                dialogModel.elevId = ''
            }
        } else {
            const temp = searchWhereModelProp.find(x => x.dbkey == "elevId")
            temp.list = []
            dialogModel.elevId = ''
        }
    })
}
const searchWhereModelProp = reactive([
    {
        name: '项目名称',
        dbkey: 'projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        changefn: changeProject
    },
    {
        name: '电梯',
        dbkey: 'elevId',
        isreuqired: true,
        isSelect: true,
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
        valueFormat: 'YYYY-MM-DD ',
        format: 'YYYY-MM-DD ',
        multipledata: [],
        isRules: true,
        list: [],

    },

    {
        name: '周/月',
        dbkey: 'freq',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [
            { value: '01', label: '周' },
            { value: '02', label: '月' }
        ]
    },
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
  