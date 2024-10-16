<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="ialarmListselectByCondition"
      :select-count-by-condition-api="ialarmListselectCountByCondition"
      :model-data="modelData"
      :table-map="tableMap"
      :search-where-model-prop="searchWhereModelProp"
      :show-new-porp="true"
      :pagesizes="[100, 200, 300, 400]"
      :default-page-size="100"
      :show-action-detail-porp="false"
      :show-action-edit-porp="true"
      :isClearCheckBox="true"
      :maxwidth="true"
      :showResetSearch="true"
      :showActionPorp="true"
      :fullscreen="true"
      exportExcelName=""
      :dialogMount="dialogMount"
      dbkey="db_id"
    >
      <template #actionOhther="{ scope }">
        <span class="edit" @click="editAlarm(scope.row)">修改视频</span>
      </template>
    </ListComponet>
  </div>
  <el-dialog
    v-if="dialog.visiableDialog"
    v-model="dialog.visiableDialog"
    class="max-dialog"
    :show-close="false"
    top="2vw"
  >
    <ModifyImgAndVido
      :base-info="currentData"
      @close-dialog="dialog.visiableDialog = false"
    >
    </ModifyImgAndVido>
  </el-dialog>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import {
  ialarmListselectByCondition,
  ialarmListselectCountByCondition,
  getElevatorByProjectId
} from '@/api/module/customerBI'
import ModifyImgAndVido from '@/components/task/components/ModifyImgAndVidoAlarm'
import ListComponet from '@/components/singlelist'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import {
  getLoginUserProPropCompAuthApi,
  getLoginUserProMaintCompAuthApi,
  getLoginUserProInsuCompAuthApi
} from '@/api/module/login'
const modelData = ref({
  ui_start_alarmTime: '',
  ui_end_alarmTime: ''
})

const tableMap = [
  {
    dbkey: 'ui_projectName',
    name: '项目名称'
    // filters: {}
  },
  {
    dbkey: 'db_projectNum',
    name: '电梯名称'
  },
  {
    dbkey: 'db_registCode',
    name: '电梯注册代码'
  },
  {
    dbkey: 'ui_useCompanyId',
    name: '使用单位'
  },
  {
    dbkey: 'ui_maintCompanyId',
    name: '维保公司'
  },
  {
    dbkey: 'ui_insuCompanyId',
    name: '承保公司'
  },
  {
    dbkey: 'ui_alarmSrcCode',
    name: '接警来源'
  },
  {
    dbkey: 'db_srcDetail',
    name: '来源详情'
  },

  {
    dbkey: 'ui_alarmTime',
    name: '接警时间'
  },
  {
    dbkey: 'ui_alarmState',
    name: '接警状态'
  }
]
let currentData = {}
const dialog = reactive({
  visiableDialog: false
})
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
const editAlarm = arg => {
  currentData = arg
  dialog.visiableDialog = true
}
const changeProjectFn = (args, addModel, item, dialogModel) => {
  if (!args) {
    const temp1 = searchWhereModelProp.find(x => x.dbkey == 'db_elevId')
    temp1.list = []
    dialogModel.db_elevId = ''
  }
  getElevatorByProjectId({ projectid: args }).then(res => {
    if (res?.data?.data?.data?.length) {
      const temp1 = searchWhereModelProp.find(x => x.dbkey == 'db_elevId')

      temp1.list = []
      res.data.data.data.forEach(x => {
        temp1.list.push({ label: x.elevatorName, value: x.elevatorId })
      })
      dialogModel.db_elevId = ''
    }
  })
}

const searchWhereModelProp = reactive([
  {
    name: '项目名称',
    dbkey: 'db_projectId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: [],
    changefn: changeProjectFn
  },

  {
    name: '电梯名称',
    dbkey: 'db_elevId',
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
    name: '使用单位',
    dbkey: 'ui_useCompanyName',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },

  {
    name: '维保公司',
    dbkey: 'ui_maintCompanyName',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '承保公司',
    dbkey: 'ui_insuCompanyName',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '接警来源',
    dbkey: 'db_alarmSrcCode',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '接警状态',
    dbkey: 'db_alarmState',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '接警时间',
    dbkey: 'ui_start_alarmTime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    type: 'datetimerange',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    format: 'YYYY-MM-DD HH:mm:ss',
    multipledata: [
      modelData.value.ui_start_alarmTime,
      modelData.value.ui_end_alarmTime
    ],
    isRules: true,
    list: [],
    changefn: (args, addModel, item, dialogModel) => {
      console.log({ args, addModel, item, dialogModel })
      if (args && args.length && args.length == 2) {
        dialogModel.ui_start_alarmTime = args[0]
        dialogModel.ui_end_alarmTime = args[1]
      } else {
        dialogModel.ui_start_alarmTime = ''
        dialogModel.ui_end_alarmTime = ''
      }
    }
  }
])

onMounted(() => {
  selectByAllApi({ tableName: 'Elevator_Project' }).then(x => {
    // const temp = tableMap.find(x => x.dbkey == 'db_projectId')
    const temp2 = searchWhereModelProp.find(x => x.dbkey == 'db_projectId')
    Object.entries(x.data.data).forEach(([key, v]) => {
      // temp.filters[key] = v
      temp2.list.push({
        value: key,
        label: v
      })
    })
  })
  selectByAllTypeApi({ constType: 'alarm_state' }).then(x => {
    const temp = searchWhereModelProp.find(x => x.dbkey == 'db_alarmState')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })
  selectByAllTypeApi({ constType: 'alarm_src' }).then(x => {
    const temp = searchWhereModelProp.find(x => x.dbkey == 'db_alarmSrcCode')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })

  getLoginUserProMaintCompAuthApi({}).then(x => {
    if (x.data.success) {
      const tempSearch = searchWhereModelProp.find(
        x => x.dbkey == 'db_maintCompanyId'
      )
      Object.entries(x.data.data).forEach(([key, v]) => {
        tempSearch.list.push({
          value: key,
          label: v
        })
      })
    }
  })

  getLoginUserProPropCompAuthApi({}).then(x => {
    if (x.data.success) {
      const tempSearch = searchWhereModelProp.find(
        x => x.dbkey == 'db_useCompanyId'
      )

      Object.entries(x.data.data).forEach(([key, v]) => {
        tempSearch.list.push({
          value: key,
          label: v
        })
      })
    }
  })

  getLoginUserProInsuCompAuthApi({}).then(x => {
    if (x.data.success) {
      const tempSearch = searchWhereModelProp.find(
        x => x.dbkey == 'db_insuCompanyId'
      )

      Object.entries(x.data.data).forEach(([key, v]) => {
        tempSearch.list.push({
          value: key,
          label: v
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
    height: calc(100% - 240px);

    .page-body-head {
      .search-where {
        display: flex;
        align-items: center;
      }
    }
  }

  :deep().dialog-mian .dialog-body {
    height: auto !important;
  }
}
</style>
