<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="Emergency_selectByConditionApi"
      :select-count-by-condition-api="Emergency_selectCountByConditionApi"
      :saveApi="saveEmergencyTaskByIdApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModePropUpdate"
      :search-where-model-prop="searchWhereModelProp"
      :show-new-porp="true"
      :pagesizes="[100, 200, 300, 400]"
      :default-page-size="100"
      :show-action-detail-porp="true"
      :dialogMount="dialogMount"
      :fullscreen="false"
      :maxwidth="false"
      :showResetSearch="true"
      :showActionPorp="true"
      @detail-fn="editDetailFn"
      :submitBeforeFn="submitBeforeFn"
    >
      <template #headui_projectName="{ scope }">
        <span>{{ scope.row.orderInfo.db_id_orderName }}</span>
      </template>
    </ListComponet>
  </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Emergency_selectByConditionApi,
  Emergency_selectCountByConditionApi
} from '@/api/module/ordermanagement'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getProjectMapLoginApi } from '@/api/module/login'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { Elevator_TaskEmergency } from '@/module.ts/Elevator_TaskEmergency'
import { saveEmergencyTaskByIdApi } from '@/api/module/taskedit'

const modelData = new Elevator_TaskEmergency()
const event_priority = ref({})
const tableMap = [
  {
    dbkey: 'db_orderId',
    name: '公共工单id'
  },
  {
    dbkey: 'ui_projectName',
    name: '任务名称'
  },
  {
    dbkey: 'db_registCode',
    name: '电梯注册代码'
  },
  // {
  //   dbkey: 'db_elevId',
  //   name: '电梯'
  // },
  {
    dbkey: 'ui_trappedTime',
    name: '被困时间'
  },

  {
    dbkey: 'ui_alarmTime',
    name: '接警时间'
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
  {
    dbkey: 'ui_trappedReasonDesc',
    name: '困人原因'
  }
]

const searchWhereModelProp = reactive([
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
  {
    name: '被困时间',
    dbkey: 'ui_start_trappedTime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    multipledata: [],
    type: 'daterange',
    list: [],
    changefn: (args, addModel, x, dialogModel) => {
      if (args) {
        dialogModel.ui_start_trappedTime = args[0]
        dialogModel.ui_end_trappedTime = args[1]
      } else {
        dialogModel.ui_start_trappedTime = ''
        dialogModel.ui_end_trappedTime = ''
      }
    }
  },
  {
    name: '接警时间',
    dbkey: 'ui_start_alarmTime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    multipledata: [],
    type: 'daterange',
    list: [],
    changefn: (args, addModel, x, dialogModel) => {
      if (args) {
        dialogModel.ui_start_alarmTime = args[0]
        dialogModel.ui_end_alarmTime = args[1]
      } else {
        dialogModel.ui_start_alarmTime = ''
        dialogModel.ui_end_alarmTime = ''
      }
    }
  },
  {
    name: '出警时间',
    dbkey: 'ui_start_policeTime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    multipledata: [],
    type: 'daterange',
    list: [],
    changefn: (args, addModel, x, dialogModel) => {
      if (args) {
        dialogModel.ui_start_policeTime = args[0]
        dialogModel.ui_end_policeTime = args[1]
      } else {
        dialogModel.ui_start_policeTime = ''
        dialogModel.ui_end_policeTime = ''
      }
    }
  },
  {
    name: '到达时间',
    dbkey: 'ui_start_arriveTime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    multipledata: [],
    type: 'daterange',
    list: [],
    changefn: (args, addModel, x, dialogModel) => {
      if (args) {
        dialogModel.ui_start_arriveTime = args[0]
        dialogModel.ui_end_arriveTime = args[1]
      } else {
        dialogModel.ui_start_arriveTime = ''
        dialogModel.ui_end_arriveTime = ''
      }
    }
  },
  {
    name: '解救时间',
    dbkey: 'ui_start_rescueTime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    multipledata: [],
    type: 'daterange',
    list: [],
    changefn: (args, addModel, x, dialogModel) => {
      if (args) {
        dialogModel.ui_start_rescueTime = args[0]
        dialogModel.ui_end_rescueTime = args[1]
      } else {
        dialogModel.ui_start_rescueTime = ''
        dialogModel.ui_end_rescueTime = ''
      }
    }
  }
])

const changeProjectEdit = (args, addModel, item, dialogModel) => {
  const elevator = new Elevator_Elevator()

  elevator.db_projectId = args
  const tempItem = addModel.find(x => x.dbkey == 'db_elevId')

  if (item) {
    dialogModel.db_elevId = ''
    dialogModel.db_registCode = ''
    dialogModel.db_projectNum = ''
  }

  if (tempItem) {
    tempItem.list = []
    tempItem.multipledata = []
    if (!args) return
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
    })
  }
}
const submitBeforeFn = arg => {
  arg.taskInfo.db_preEndtime = arg.db_preEndtime
  arg.taskInfo.db_projectId = arg.db_projectId
  arg.taskInfo.db_projectNum = arg.db_projectNum
  arg.taskInfo.db_taskDetail = arg.db_taskDetail
}
const changeElevartor = (args, addModel, item, dialogModel) => {
  if (item) {
    dialogModel.db_registCode = ''
    dialogModel.db_projectNum = ''
  }
  if (args) {
    const tempE = item.list.find(x => x.value == args)
    dialogModel.db_registCode = tempE?.db_registCode
    dialogModel.db_projectNum = tempE?.db_id_projectNum
  }
}
const addModePropUpdate = reactive([
  {
    name: '项目',
    dbkey: 'db_projectId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: [],
    fn: getProjectMapLoginApi,
    fnArgs: {},
    changefn: changeProjectEdit
  },
  {
    name: '电梯',
    dbkey: 'db_elevId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: [],
    changefn: changeElevartor
  },
  {
    name: '应急发生时间',
    dbkey: 'db_trappedTime',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    type: 'datetime',
    multipledata: [],
    list: []
  }
  // {
  //   name: '应急内容',
  //   dbkey: 'db_taskDetail',
  //   isreuqired: false,
  //   isSelect: false,
  //   multiple: false,
  //   multipledata: [],
  //   list: []
  // }
  // {
  //   name: '被困时间',
  //   dbkey: 'db_trappedTime',
  //   isreuqired: false,
  //   isSelect: true,
  //   multiple: false,
  //   type: 'datetime',
  //   multipledata: [],
  //   list: []
  // },
  // {
  //   name: '接警时间',
  //   dbkey: 'db_alarmTime',
  //   isreuqired: false,
  //   isSelect: true,
  //   multiple: false,
  //   type: 'datetime',
  //   multipledata: [],
  //   list: []
  // },

  // {
  //   name: '救援等级',
  //   dbkey: 'db_rescueLevel',
  //   isreuqired: false,
  //   isSelect: true,
  //   multiple: false,
  //   multipledata: [],
  //   list: [],

  //   fn: selectByAllTypeApi,
  //   fnArgs: { constType: 'rescue_level' }
  // },
  // {
  //   name: '出警时间',
  //   dbkey: 'db_policeTime',
  //   isreuqired: false,
  //   isSelect: true,
  //   multiple: false,
  //   multipledata: [],
  //   type: 'datetime',
  //   list: []
  // },
  // {
  //   name: '到达时间',
  //   dbkey: 'db_arriveTime',
  //   isreuqired: false,
  //   isSelect: true,
  //   multiple: false,
  //   multipledata: [],
  //   type: 'datetime',
  //   list: []
  // },
  // {
  //   name: '解救时间',
  //   dbkey: 'db_rescueTime',
  //   isreuqired: false,
  //   isSelect: true,
  //   multiple: false,
  //   multipledata: [],
  //   type: 'datetime',
  //   list: []
  // },
  // {
  //   name: '解救人数',
  //   dbkey: 'db_alarmNumber',
  //   isreuqired: false,
  //   isSelect: false,
  //   multiple: false,
  //   multipledata: [],
  //   list: []
  // },
  // {
  //   name: '被困人员信息',
  //   dbkey: 'db_trappedUser',
  //   isreuqired: false,
  //   isSelect: false,
  //   multiple: false,
  //   multipledata: [],
  //   list: []
  // },
  // {
  //   name: '困人原因',
  //   dbkey: 'db_trappedReason',
  //   isreuqired: false,
  //   isSelect: true,
  //   multiple: false,
  //   multipledata: [],
  //   list: [],

  //   fn: selectByAllTypeApi,
  //   fnArgs: { constType: 'fault_reasonAnalysis' }
  // }
])
const $router = useRouter()
const editDetailFn = args => {
  let url = $router.resolve({
    name: menulist.OrderDetail.name,
    params: {
      id: args.db_id,
      type: 'Emergency'
    }
  }).href
  window.open(url, '_blank')
}

onMounted(() => {
  getProjectMapLoginApi({}).then(x => {
    const temp = searchWhereModelProp.find(x => x.dbkey == 'db_projectId')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })
  selectByAllTypeApi({ constType: 'fault_reasonAnalysis' }).then(x => {
    const temp = searchWhereModelProp.find(x => x.dbkey == 'db_trappedReason')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })
})
</script>

<style lang="scss" scoped>
.page-list {
  background-color: white;

  :deep().page-body {
    height: calc(100% - 240px);
  }
}
</style>
