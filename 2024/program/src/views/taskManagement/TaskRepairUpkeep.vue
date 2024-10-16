<template>
    <div class="page-list">
        <ListComponet :select-by-condition-api="RepairUpkeepselectByConditionApi"
            :select-count-by-condition-api="RepairUpkeepselectCountByConditionApi" :save-api="RepairUpkeepupsaveApi"
            :delete-by-id-api="RepairUpkeepupdeleteByIdApi" :select-by-id-api="RepairUpkeepselectByIdApi"
            :model-data="modelData" :table-map="tableMap" :add-model-prop="addModelProp"
            :search-where-model-prop="searchWhereModelProp" :show-new-porp="true" :pagesizes="[100, 200, 300, 400]"
            :update-by-id-api="RepairUpkeepupdateByIdApi" :default-page-size="100" :show-action-detail-porp="false"
            :show-action-edit-porp="true" :show-action-delete-porp="true" :show-h-check-box-porp="true"
            :isClearCheckBox="true" :maxwidth="true" :empty="true" :showResetSearch="true" :showActionPorp="true"
            exportExcelName="" dbkey="db_id" :dialogMount="dialogMount">
        </ListComponet>
    </div>
</template>

<script  setup >
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
    RepairUpkeepselectByConditionApi,
    RepairUpkeepselectCountByConditionApi, RepairUpkeepupdateByIdApi, RepairUpkeepselectByIdApi, RepairUpkeepupsaveApi, RepairUpkeepupdeleteByIdApi
} from '@/api/module/taskmanagement'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { selectByConditionApi as selectWorkTemplateByConditionApi, } from '@/api/module/workTemplate'
import { getProjectList, getElevatorByProjectId } from '@/api/module/customerBI'
const modelData = {

}
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
const event_priority = ref({})
const tableMap = [

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
        dbkey: 'ui_cllaRepairsUserName',
        name: '报修人'
    },


    {
        dbkey: 'ui_callRepairClassify',
        name: '召修分类'
    },


]
const addModelProp = reactive([
    {
        name: '公共任务id',
        dbkey: 'db_taskId',
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
        // fn: selectByAllApi,
        // fnArgs: { tableName: 'Elevator_Project' },
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
        name: '换件清单json',
        maxlength: 10000,
        dbkey: 'db_partList',
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


])
const searchWhereModelProp = [
    {
        name: '公共任务id',
        dbkey: 'db_taskId',
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


]

onMounted(() => {
    selectByAllApi({ tableName: 'Elevator_Project' }).then(x => {
        const temp = tableMap.find(x => x.dbkey == 'db_projectId')
        const temp2 = searchWhereModelProp.find(x => x.dbkey == 'db_projectId')
        const temp1 = addModelProp.find(x => x.dbkey == 'db_projectId')
        Object.entries(x.data.data).forEach(([key, v]) => {
            temp.filters[key] = v
            temp2.list.push({
                value: key,
                label: v
            })
            temp1.list.push({
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
            const list = args[x.dbkey]?.split(',') || []
            list.forEach(url => {
                x.list.push({
                    url,
                    name: url
                })
            })
            if (!args.db_id) {
                x.list = [] //新增清空
            }
        })
    }
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

        .page-body-head {
            .search-where {
                display: flex;
                align-items: center;
            }
        }
    }

    :deep().dialog-body {
        height: auto !important;
    }
}
</style>
