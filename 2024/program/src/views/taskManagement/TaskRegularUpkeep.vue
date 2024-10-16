<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="RegularUpkeepselectByConditionApi"
      :select-count-by-condition-api="RegularUpkeepselectCountByConditionApi"
      :save-api="RegularUpkeepsaveApi"
      :delete-by-id-api="RegularUpkeepdeleteByIdApi"
      :select-by-id-api="RegularUpkeepselectByIdApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :show-new-porp="true"
      :pagesizes="[100, 200, 300, 400]"
      :update-by-id-api="RegularUpkeepupdateByIdApi"
      :default-page-size="100"
      :show-action-detail-porp="false"
      :show-action-edit-porp="true"
      :show-action-delete-porp="true"
      :show-h-check-box-porp="true"
      :isClearCheckBox="true"
      :maxwidth="true"
      :showResetSearch="true"
      :showActionPorp="true"
      exportExcelName=""
      dbkey="db_id"
      :dialogMount="dialogMount"
    >
    </ListComponet>
  </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  RegularUpkeepupdateByIdApi,
  RegularUpkeepselectByIdApi,
  RegularUpkeepselectByConditionApi,
  RegularUpkeepselectCountByConditionApi,
  RegularUpkeepsaveApi,
  RegularUpkeepdeleteByIdApi
} from '@/api/module/taskmanagement'
import { selectByConditionApi as selectWorkTemplateByConditionApi } from '@/api/module/workTemplate'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getProjectList, getElevatorByProjectId } from '@/api/module/customerBI'
const modelData = {}
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
    name: '电梯档案id'
  },
  {
    dbkey: 'ui_upkeepTypeDesc',
    name: '保养类型'
  }
]
const changeProject = (args, addModel, item, dialogModel) => {
  getElevatorByProjectId({ projectid: args }).then(res => {
    if (res?.data?.data?.data?.length) {
      const temp = addModel.find(x => x.dbkey == 'db_elevId')
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
    name: '公共任务id',
    dbkey: 'db_taskId',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
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
    list: []
  },
  {
    name: '工作项清单',
    dbkey: 'db_workItemList',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '电梯基本信息',
    dbkey: 'db_baseInfo',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '环境信息',
    dbkey: 'db_environmentState',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '零部件信息',
    dbkey: 'db_sysCompPartState',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '使用状态',
    dbkey: 'db_elevState',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: [],
    fn: selectByAllTypeApi,
    fnArgs: { constType: 'used_state' }
  },
  {
    name: '问题清单',
    dbkey: 'db_issueList',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
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
  }
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
  {
    name: '保养类型',
    dbkey: 'db_upkeepType',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  }
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
  selectByAllTypeApi({ constType: 'maint_type' }).then(x => {
    const temp2 = searchWhereModelProp.find(x => x.dbkey == 'db_upkeepType')

    Object.entries(x.data.data).forEach(([key, v]) => {
      temp2.list.push({
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
      const temp = item.find(x => x.dbkey == 'db_elevId')
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
}
</style>
