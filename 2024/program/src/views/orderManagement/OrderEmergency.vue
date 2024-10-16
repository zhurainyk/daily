<template>
    <div class="page-list">
        <ListComponet :select-by-condition-api="Emergency_selectByConditionApi"
            :select-count-by-condition-api="Emergency_selectCountByConditionApi" :save-api="Emergency_saveApi"
            :delete-by-id-api="Emergency_deleteByIdApi" :select-by-id-api="Emergency_selectByIdApi"
            :update-by-id-api="Emergency_updateByIdApi" :model-data="modelData" :table-map="tableMap"
            :add-model-prop="addModelProp" :search-where-model-prop="searchWhereModelProp" :show-new-porp="true"
            :pagesizes="[100, 200, 300, 400]" :default-page-size="100" :show-action-detail-porp="false"
            :show-action-edit-porp="true" :show-action-delete-porp="true" :show-h-check-box-porp="false"
            :dialogMount="dialogMount" :isClearCheckBox="true" :fullscreen="false" :maxwidth="true" :showResetSearch="true"
            :showActionPorp="true" exportExcelName="" dbkey="db_id">

        </ListComponet>
    </div>
</template>

<script  setup >
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
    Emergency_selectByConditionApi,
    Emergency_selectCountByConditionApi, Emergency_selectByIdApi, Emergency_updateByIdApi, Emergency_saveApi, Emergency_deleteByIdApi
} from '@/api/module/ordermanagement'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getElevatorByProjectId } from '@/api/module/customerBI'
const modelData = {

}
const event_priority = ref({})
const tableMap = [
    {
        dbkey: 'db_orderId',
        name: '公共工单id'
    },
    {
        dbkey: 'db_projectId',
        name: '项目名称',
        filters: {}
    },
    {
        dbkey: 'db_registCode',
        name: '电梯注册代码'
    },
    {
        dbkey: 'db_elevId',
        name: '电梯'
    },
    {
        dbkey: 'ui_trappedTime',
        name: '被困时间'
    },

    {
        dbkey: 'ui_alarmTime',
        name: '接警时间'
    },
    {
        dbkey: 'db_trappedUser',
        name: '被困人员信息'
    },

    {
        dbkey: 'ui_policeTime',
        name: '出警时间'
    },
    {
        dbkey: 'ui_arriveTime',
        name: '到达时间'
    },
    {
        dbkey: 'ui_rescueTime',
        name: '解救时间'
    },
    {
        dbkey: 'db_alarmNumber',
        name: '解救人数'
    },





]
const changeProject = (args, addModel, item, dialogModel) => {
    getElevatorByProjectId({ projectid: args }).then(res => {
        if (res?.data?.data?.data?.length) {
            const temp = addModel.find(x => x.dbkey == "db_elevId")
            temp.list = []
            res.data.data.data.forEach(x => {
                temp.list.push({ label: x.elevatorName, value: x.elevatorId })
            })
            const id = temp.list.find(x => x.value == dialogModel.db_elevId)
            if (!id) {
                dialogModel.db_elevId = ''
            }
        }
    })
}
const addModelProp = reactive([
    {
        name: '公共工单id',
        dbkey: 'db_orderId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
    },

    {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [], fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_Project' },
        changefn: changeProject
    },

    {
        name: '电梯',
        dbkey: 'db_elevId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '被困时间',
        dbkey: 'db_trappedTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '接警时间',
        dbkey: 'db_alarmTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '被困人员信息',
        dbkey: 'db_trappedUser',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '救援等级',
        dbkey: 'db_rescueLevel',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'rescue_level' }
    },
    {
        name: '出警时间',
        dbkey: 'db_policeTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '到达时间',
        dbkey: 'db_arriveTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '解救时间',
        dbkey: 'db_rescueTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '解救人数',
        dbkey: 'db_alarmNumber',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '困人原因',
        dbkey: 'db_trappedReason',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'fault_reasonAnalysis' }
    },



])
const searchWhereModelProp = [
    {
        name: '公共工单id',
        dbkey: 'db_orderId',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
    },

    {
        name: '项目名称',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
    },

    {
        name: '电梯注册代码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
    },
    {
        name: '解救人数',
        dbkey: 'db_alarmNumber',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
    },
    {
        name: '困人原因',
        dbkey: 'db_trappedReason',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
    },
]

onMounted(() => {


    selectByAllApi({ tableName: 'Elevator_Project' }).then(x => {
        const temp = searchWhereModelProp.find(x => x.dbkey == 'db_projectId')

        const temp2 = tableMap.find(x => x.dbkey == 'db_projectId')
        Object.entries(x.data.data).forEach(([key, v]) => {
            temp.list.push({
                value: key,
                label: v
            })

            temp2.filters[key] = v
        })
    })
    selectByAllTypeApi({ constType: 'fault_reasonAnalysis' }).then(x => {
        const temp = searchWhereModelProp.find(x => x.dbkey == 'db_trappedReason');
        Object.entries(x.data.data).forEach(([key, v]) => {
            temp.list.push({
                value: key,
                label: v
            })
        })
    })

})

const dialogMount = (args, item) => {
    if (!args.db_projectId) return
    getElevatorByProjectId({ projectid: args.db_projectId }).then(res => {
        if (res?.data?.data?.data?.length) {
            const temp = item.find(x => x.dbkey == "db_elevId")
            temp.list = []
            res.data.data.data.forEach(x => {
                temp.list.push({ label: x.elevatorName, value: x.elevatorId })
            })

        }
    })
}
</script>

<style lang="scss" scoped>
.page-list {
    background-color: white;

    .page-body {

        /* height: calc(100% - 220px); */
        .page-body-head {
            .search-where {
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>
