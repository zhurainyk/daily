<template>
    <div class="page-list">
        <ListComponet :select-by-condition-api="RegularUpkeep_selectByConditionApi"
            :select-count-by-condition-api="RegularUpkeep_selectCountByConditionApi" :save-api="RegularUpkeep_saveApi"
            :delete-by-id-api="RegularUpkeep_deleteByIdApi" :select-by-id-api="RegularUpkeep_selectByIdApi"
            :update-by-id-api="RegularUpkeep_updateByIdApi" :model-data="modelData" :table-map="tableMap"
            :add-model-prop="addModelProp" :search-where-model-prop="searchWhereModelProp" :show-new-porp="true"
            :pagesizes="[100, 200, 300, 400]" :default-page-size="100" :show-action-detail-porp="false"
            :show-action-edit-porp="true" :show-action-delete-porp="true" :show-h-check-box-porp="false"
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
    RegularUpkeep_selectByConditionApi, RegularUpkeep_saveApi, RegularUpkeep_deleteByIdApi,
    RegularUpkeep_selectCountByConditionApi, RegularUpkeep_selectByIdApi, RegularUpkeep_updateByIdApi,
} from '@/api/module/ordermanagement'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getProjectList, getElevatorByProjectId } from '@/api/module/customerBI'
import { selectByConditionFromJsonApi, selectByConditionApi as selectWorkTemplateByConditionApi, } from '@/api/module/workTemplate'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { getProjectMapLoginApi } from '@/api/module/login'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
const modelData = new Elevator_Elevator()
let worktemplate
const event_priority = ref({})
selectByConditionFromJsonApi({}).then(x => {
    if (x.data) {
        worktemplate = x.data.map((y) => {
            return {
                value: y.db_id,
                label: y.db_id_templateName,
                ...y
            }
        })
    }
})
const changeElevartor = (args, addModel, item, dialogModel) => {
    console.log({ args, addModel, item })
    const tempWork = addModel.find((x) => x.dbkey == 'db_workTemplateId')
    if (tempWork && tempWork.fnArgs.db_templateTypeCode == 'RegularUpkeep') {
        let tempElevator = item.list.find(x => x.value == args)
        let tempArr = worktemplate.filter(
            k =>
                k.db_elevType == tempElevator.db_elevType &&
                k.db_maintModelCode == tempElevator.db_maintModelCode
        )
        tempWork.list = tempArr
    }
}
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
        dbkey: 'ui_upkeepTypeDesc',
        name: '保养类型'
    },

    {
        dbkey: 'ui_workTemplateName',
        name: '工作模板名称'
    },
]
const changeProject = (args, addModel, item, dialogModel) => {
    dialogModel.db_elevId = ''
    // dialogModel.taskInfo.db_followUserId = ''
    dialogModel.db_upkeepType = ''
    dialogModel.db_workTemplateId = ''
    if (args) {
        dialogMount2(args, addModel)
    }
}
const dialogMount2 = (args, addModel, fn) => {
    const elevator = new Elevator_Elevator()
    elevator.db_projectId = args
    const tempItem = addModel.find((x) => x.dbkey == 'db_elevId')
    if (tempItem) {
        tempItem.list = []
        tempItem.multipledata = []
        selectElevatorByConditionApi({
            ...elevator,
            ui_type: 'A0',
            ui_pageSize: 0,
            ui_currentPage: 0
        }).then(x => {
            const { objectList, condition } = x.data.data
            objectList.forEach(y => {
                tempItem.list.push({
                    value: y.db_id,
                    label: y.db_id_projectNum,
                    db_maintModelCode: y.db_maintModelCode,
                    ...y
                })
            })
            if (fn) {
                fn(tempItem.list)
            }
        })
    }
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

        fn: getProjectMapLoginApi,
        fnArgs: {},
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
        changefn: changeElevartor
    },
    {
        name: '保养类型',
        dbkey: 'db_upkeepType',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '工作项清单json',
        maxlength: 10000,
        dbkey: 'db_workItemList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '电梯基本信息json',
        maxlength: 10000,
        dbkey: 'db_baseInfo',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '环境信息json',
        maxlength: 10000,
        dbkey: 'db_environmentState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '零部件信息json',
        maxlength: 10000,
        dbkey: 'db_sysCompPartState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '使用状态等json',
        maxlength: 10000,
        dbkey: 'db_elevState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '问题清单json',
        maxlength: 10000,
        dbkey: 'db_issueList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
    },
    {
        name: '工作模板',
        dbkey: 'db_workTemplateId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectWorkTemplateByConditionApi,
        fnArgs: { db_templateTypeCode: 'RegularUpkeep', ui_type: 'A0' },
        key: 'db_id',
        value: 'db_id_templateName'
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
    }
]

onMounted(() => {


    selectByAllApi({ tableName: 'Elevator_Project' }).then(x => {
        const temp = searchWhereModelProp.find(x => x.dbkey == 'db_projectId')
        const temp1 = addModelProp.find(x => x.dbkey == 'db_projectId')
        const temp2 = tableMap.find(x => x.dbkey == 'db_projectId')
        Object.entries(x.data.data).forEach(([key, v]) => {
            temp.list.push({
                value: key,
                label: v
            })
            temp1.list.push({
                value: key,
                label: v
            })
            temp2.filters[key] = v
        })
    })
    selectByAllTypeApi({ constType: 'maint_type' }).then(res => {
        console.log(res.data.data)
        const temp = addModelProp.find(x => x.dbkey == 'db_upkeepType')
        Object.entries(res.data.data).forEach(([key, v]) => {
            temp.list.push({
                value: key,
                label: v
            })
        })
    })

})

const dialogMount = (args, item) => {
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
