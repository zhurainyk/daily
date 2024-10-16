<template>
    <div class="page-list">
        <ListComponet :select-by-condition-api="Medical_selectByConditionApi"
            :select-count-by-condition-api="Medical_selectCountByConditionApi" :select-by-id-api="Medical_selectByIdApi"
            :save-api="Medical_saveApi" :delete-by-id-api="Medical_deleteByIdApi"
            :update-by-id-api="Medical_updateByIdApi" :model-data="modelData" :table-map="tableMap"
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
    Medical_selectByConditionApi,
    Medical_selectCountByConditionApi, Medical_selectByIdApi, Medical_updateByIdApi, Medical_saveApi, Medical_deleteByIdApi
} from '@/api/module/ordermanagement'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getElevatorByProjectId } from '@/api/module/customerBI'
import { selectByConditionApi } from '@/api/module/workTemplate'
import { getProjectList } from '@/api/module/customerBI'
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
        dbkey: 'ui_workTemplateName',
        name: '工作模板'
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
        list: [],
        changefn: changeProject



    },
    // {
    //     name: '电梯注册代码',
    //     dbkey: 'db_registCode',
    //     isreuqired: false,
    //     isSelect: false,
    //     multiple: false,
    //     multipledata: [],
    //     list: [],
    // },
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
        dbkey: 'db_elevState',
        maxlength: 10000,
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
    selectByConditionApi({ "db_templateTypeCode": "Medical", "ui_type": "A0" }).then(x => {

        if (x.data.data?.objectList?.length) {
            const data = x.data.data.objectList
            const arr = []
            data.forEach(x => {
                arr.push({ label: x.db_id_templateName, value: x.db_id })
            })
            const temp = addModelProp.find(x => x.dbkey == 'db_workTemplateId')
            temp.list.push(...arr)

        }
    })

    // selectByAllTypeApi({ constType: 'taskOrder_type' }).then(x => {
    //     const temp = addModelProp.find(
    //         x => x.dbkey == 'db_orderTypeCode'
    //     )
    //     Object.entries(x.data.data).forEach(([key, v]) => {
    //         temp.list.push({
    //             value: key,
    //             label: v
    //         })
    //     })
    // })
    // selectByAllTypeApi({ constType: 'task_priority' }).then(x => {
    //     const temp = addModelProp.find(
    //         x => x.dbkey == 'db_orderPriorityCode'
    //     )
    //     Object.entries(x.data.data).forEach(([key, v]) => {
    //         temp.list.push({
    //             value: key,
    //             label: v
    //         })
    //     })
    // })
    // selectByAllTypeApi({ constType: 'taskOrder_state' }).then(x => {
    //     const temp = addModelProp.find(
    //         x => x.dbkey == 'db_orderState'
    //     )
    //     Object.entries(x.data.data).forEach(([key, v]) => {
    //         temp.list.push({
    //             value: key,
    //             label: v
    //         })
    //     })
    // })
    // selectByAllApi({ tableName: 'Usercenter_Account' }).then(x => {

    //     {
    //         const temp = addModelProp.find(x => x.dbkey == 'db_executeUserId')
    //         Object.entries(x.data.data).forEach(([key, v]) => {
    //             temp.list.push({
    //                 value: key,
    //                 label: v
    //             })
    //         })
    //     }
    //     {
    //         const temp = addModelProp.find(x => x.dbkey == 'db_followUserId')
    //         Object.entries(x.data.data).forEach(([key, v]) => {
    //             temp.list.push({
    //                 value: key,
    //                 label: v
    //             })
    //         })
    //     }
    //     {
    //         const temp = addModelProp.find(x => x.dbkey == 'db_createUserId')
    //         Object.entries(x.data.data).forEach(([key, v]) => {
    //             temp.list.push({
    //                 value: key,
    //                 label: v
    //             })
    //         })
    //     }
    //     {
    //         const temp = addModelProp.find(x => x.dbkey == 'db_superiorPassUserId')
    //         Object.entries(x.data.data).forEach(([key, v]) => {
    //             temp.list.push({
    //                 value: key,
    //                 label: v
    //             })
    //         })
    //     }
    //     {
    //         const temp = addModelProp.find(x => x.dbkey == 'db_propPassUserId')
    //         Object.entries(x.data.data).forEach(([key, v]) => {
    //             temp.list.push({
    //                 value: key,
    //                 label: v
    //             })
    //         })
    //     }


    // })
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
