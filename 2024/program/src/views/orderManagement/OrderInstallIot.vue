<template>
    <div class="page-list">
        <ListComponet :select-by-condition-api="InstallIot_selectByConditionApi"
            :select-count-by-condition-api="InstallIot_selectCountByConditionApi" :save-api="InstallIot_saveApi"
            :delete-by-id-api="InstallIot_deleteByIdApi" :select-by-id-api="InstallIot_selectByIdApi"
            :update-by-id-api="InstallIot_updateByIdApi" :model-data="modelData" :table-map="tableMap"
            :add-model-prop="addModelProp" :search-where-model-prop="searchWhereModelProp" :show-new-porp="true"
            :pagesizes="[100, 200, 300, 400]" :default-page-size="100" :show-action-detail-porp="false"
            :show-action-edit-porp="true" :show-action-delete-porp="true" :show-h-check-box-porp="true"
            :dialogMount="dialogMount" :isClearCheckBox="true" :fullscreen="false" :maxwidth="true"
            :showResetSearch="true" :showActionPorp="true" exportExcelName="" dbkey="db_id" :empty="true">

        </ListComponet>
    </div>
</template>

<script  setup >
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
    InstallIot_selectByConditionApi,
    InstallIot_selectCountByConditionApi, InstallIot_selectByIdApi, InstallIot_updateByIdApi, InstallIot_saveApi, InstallIot_deleteByIdApi
} from '@/api/module/ordermanagement'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getProjectList, getElevatorByProjectId } from '@/api/module/customerBI'
const modelData = {}
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
    // {
    //     dbkey: 'db_iotPlanTypeCode',
    //     name: '方案类型'
    // },
    {
        dbkey: 'ui_iotPlanName',
        name: '物联网方案'
    },
    {
        dbkey: 'ui_firstOnlineTime',
        name: '首次在线时间'
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
const planChangeFn = (args, addModel, item, dialogModel) => {
    console.log({ args, addModel, item, dialogModel })//Elevator_IotRunMonitorPlan  Elevator_IotVideoMonitorPlan Elevator_IotEmergencyPlan
    let tableName
    switch (args) {
        case "IotRunMonitor": {
            tableName = 'Elevator_IotRunMonitorPlan'
            break;
        }
        case 'IotVideoMonitor': {
            tableName = 'Elevator_IotVideoMonitorPlan'
            break;
        }
        case 'IotEmergency': {
            tableName = 'Elevator_IotEmergencyPlan'
            break;
        }
    }
    selectByAllApi({ tableName }).then(x => {


        const temp = addModelProp.find(x => x.dbkey == 'db_iotPlanId')
        temp.list = []
        Object.entries(x.data.data).forEach(([key, v]) => {
            temp.list.push({
                value: key,
                label: v
            })
        })
        const temp1 = addModel.find(x => x.dbkey == "db_iotPlanId")
        const id = temp1.list.find(x => x.value == dialogModel.db_iotPlanId)

        if (!Object.entries(x.data.data).length || !id) {
            dialogModel.db_iotPlanId = ''

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
        list: [],
        fn: selectByAllApi,
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
        name: '方案类型',
        dbkey: 'db_iotPlanTypeCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: planChangeFn
    },
    {
        name: '方案',
        dbkey: 'db_iotPlanId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '设备id',
        dbkey: 'db_deviceId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
    },


    {
        name: '在线状态',
        dbkey: 'db_onlineState',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '首次在线时间',
        dbkey: 'db_firstOnlineTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        multipledata: [],
        list: [],
    },
    {
        name: '完成图片地址',
        dbkey: 'db_endImgUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'imgs'
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
        name: '方案类型',
        dbkey: 'db_iotPlanTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        changefn: (args, addModel, item, dialogModel) => {
            let tableName
            switch (args) {
                case "IotRunMonitor": {
                    tableName = 'Elevator_IotRunMonitorPlan'
                    break;
                }
                case 'IotVideoMonitor': {
                    tableName = 'Elevator_IotVideoMonitorPlan'
                    break;
                }
                case 'IotEmergency': {
                    tableName = 'Elevator_IotEmergencyPlan'
                    break;
                }
            }
            dialogModel.db_iotPlanId = ''
            selectByAllApi({ tableName }).then(x => {
                const temp = addModel
                    .find(x => x.dbkey == 'db_iotPlanId')
                temp.list = []
                Object.entries(x.data.data).forEach(([key, v]) => {
                    temp.list.push({
                        value: key,
                        label: v
                    })
                })
            })
        }
    },
    {
        name: '方案',
        dbkey: 'db_iotPlanId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],

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
        name: '设备id',
        dbkey: 'db_deviceId',
        isreuqired: true,
        isSelect: false,
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

    selectByAllTypeApi({ constType: 'iotInstall_type' }).then(x => {
        const temp = addModelProp.find(x => x.dbkey == 'db_iotPlanTypeCode')
        const temp1 = searchWhereModelProp.find(x => x.dbkey == 'db_iotPlanTypeCode')
        Object.entries(x.data.data).forEach(([key, v]) => {
            temp.list.push({
                value: key,
                label: v
            })
            temp1.list.push({
                value: key,
                label: v
            })

        })
    })
    selectByAllTypeApi({ constType: 'online_state' }).then(res => {
        console.log(res.data.data)
        const temp = addModelProp.find(x => x.dbkey == 'db_onlineState')
        Object.entries(res.data.data).forEach(([key, v]) => {
            temp.list.push({
                value: key,
                label: v
            })
        })
    })





})

const dialogMount = (args, item) => {

    const temp2 = item.filter(x => x.type == 'imgs')
    if (temp2?.length) {
        temp2.forEach(x => {
            x.list = []
            const list = args[x.dbkey]?.split(',') || []
            list.forEach(url => {
                x.list.push({
                    url,
                    name: url
                })
            })
        })
    }
    
    let tableName
    switch (args.db_iotPlanTypeCode) {
        case "IotRunMonitor": {
            tableName = 'Elevator_IotRunMonitorPlan'
            break;
        }
        case 'IotVideoMonitor': {
            tableName = 'Elevator_IotVideoMonitorPlan'
            break;
        }
        case 'IotEmergency': {
            tableName = 'Elevator_IotEmergencyPlan'
            break;
        }
    }
    selectByAllApi({ tableName }).then(x => {
        const temp = item.find(x => x.dbkey == 'db_iotPlanId')
        temp.list = []
        Object.entries(x.data.data).forEach(([key, v]) => {
            temp.list.push({
                value: key,
                label: v
            })
        })
    })
    if(!args.db_projectId)return 
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
