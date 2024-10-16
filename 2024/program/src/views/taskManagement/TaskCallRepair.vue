<template>
  <div class="page-list">
    <ListComponet :update-by-id-api="CallRepairupdateByIdApi" :select-by-id-api="CallRepairselectByIdApi"
      :select-by-condition-api="CallRepairselectByConditionApi" :save-api="CallRepairsaveApi"
      :delete-by-id-api="CallRepairdeleteByIdApi" :select-count-by-condition-api="CallRepairselectCountByConditionApi"
      :model-data="modelData" :table-map="tableMap" :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp" :show-new-porp="true" :pagesizes="[100, 200, 300, 400]"
      :default-page-size="100" :show-action-detail-porp="false" :show-action-edit-porp="true"
      :show-action-delete-porp="true" :show-h-check-box-porp="true" :isClearCheckBox="true" :maxwidth="true"
      :showResetSearch="true" :showActionPorp="true" :fullscreen="true" exportExcelName="" :dialogMount="dialogMount"
      dbkey="db_id">
    </ListComponet>
  </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  CallRepairupdateByIdApi,
  CallRepairselectByIdApi,
  CallRepairselectByConditionApi,
  CallRepairselectCountByConditionApi,
  CallRepairsaveApi,
  CallRepairdeleteByIdApi
} from '@/api/module/taskmanagement'
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
    name: '电梯'
  },
  {
    dbkey: 'ui_cllaRepairsUserName',
    name: '报修人'
  },
  {
    dbkey: 'db_faultAppearanceId',
    name: '故障现象'
  },
  {
    dbkey: 'ui_callRepairClassify',
    name: '召修分类'
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
    name: '距上次维保运行次数',
    dbkey: 'db_lastMaintRunTimes',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '距上次维保运行时长(秒)',
    dbkey: 'db_lastMaintRunDuration',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '距上次维保自然时长(秒)',
    dbkey: 'db_lastMaintDuration',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '距上次维保开关门次数',
    dbkey: 'db_lastMaintDoorTimes',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '距上次维保运行里程（米）',
    dbkey: 'db_lastMaintRunMileage',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '上次维保(常规保养)任务',
    dbkey: 'db_lastMaintTaskId',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
    // fn:CallRepairselectByConditionApi,
    // fnArgs: { tableName: 'Usercenter_Account' }
  },
  {
    name: '距上次召修运行次数',
    dbkey: 'db_lastRepairRunTimes',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '距上次召修运行时长(秒)',
    dbkey: 'db_lastRepairRunDuration',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '距上次召修自然时长(秒)',
    dbkey: 'db_lastRepairDuration',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '距上次召修开关门次数',
    dbkey: 'db_lastRepairDoorTimes',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '距上次召修运行里程（米）',
    dbkey: 'db_lastRepairRunMileage',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '上次召修任务id',
    dbkey: 'db_lastRepairTaskId',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '报修人',
    dbkey: 'db_cllaRepairsUserId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: [],
    fn: selectByAllApi,
    fnArgs: { tableName: 'Usercenter_Account' }
  },
  {
    name: '是否困人',
    dbkey: 'db_isTiring',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: [
      {
        label: '否',
        value: '00'
      },
      {
        label: '困人',
        value: '01'
      }
    ]
  },
  {
    name: '故障现象', //故障现象id组，逗号拼接
    dbkey: 'db_faultAppearanceId',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
    // fn: selectByAllTypeApi,
    // fnArgs: { constType: 'fault_appearance' },
  },

  {
    name: '召修类型',
    dbkey: 'db_callRepairTypeCode',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: [],
    fn: selectByAllTypeApi,
    fnArgs: { constType: 'callrepair_type' }
  },

  {
    name: '召修分类',
    dbkey: 'db_callRepairClassifyCode',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: [],
    fn: selectByAllTypeApi,
    fnArgs: { constType: 'callrepair_classify' }
  },
  {
    name: '故障码id',
    dbkey: 'db_faultCodeId',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '故障码',
    dbkey: 'db_faultCode',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '故障原因分析',
    dbkey: 'db_faultReasonAnalysis',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: [],
    fn: selectByAllTypeApi,
    fnArgs: { constType: 'fault_reasonAnalysis' }
  },
  {
    name: '导致故障原因',
    dbkey: 'db_faultReason',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: [],
    fn: selectByAllTypeApi,
    fnArgs: { constType: 'fault_reason' }
  },
  {
    name: '解决方案',
    dbkey: 'db_solution',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '换件清单json',
    maxlength: 10000,
    dbkey: 'db_partList',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '电梯基本信息json',
    maxlength: 10000,
    dbkey: 'db_baseInfo',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '环境信息json',
    maxlength: 10000,
    dbkey: 'db_environmentState',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '零部件信息json',
    maxlength: 10000,
    dbkey: 'db_sysCompPartState',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '使用状态json',
    maxlength: 10000,
    dbkey: 'db_elevState',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '问题清单json',
    maxlength: 10000,
    dbkey: 'db_issueList',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '故障现象图片地址',
    dbkey: 'db_faultAppearanceUrl',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: [],
    type: 'imgs'
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
    name: '报修人',
    dbkey: 'db_callRepairsUserId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '故障现象',
    dbkey: 'db_faultAppearanceId',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '召修类型',
    dbkey: 'db_callRepairTypeCode',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '召修分类',
    dbkey: 'db_callRepairClassifyCode',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '故障码',
    dbkey: 'db_faultCodeId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '故障原因分析',
    dbkey: 'db_faultReasonAnalysis',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '导致故障原因',
    dbkey: 'db_faultReason',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
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
  selectByAllTypeApi({ constType: 'callrepair_type' }).then(x => {
    const temp = searchWhereModelProp.find(
      x => x.dbkey == 'db_callRepairTypeCode'
    )
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })
  selectByAllTypeApi({ constType: 'fault_reasonAnalysis' }).then(x => {
    const temp = searchWhereModelProp.find(
      x => x.dbkey == 'db_faultReasonAnalysis'
    )
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })
  selectByAllTypeApi({ constType: 'fault_reason' }).then(x => {
    const temp = searchWhereModelProp.find(x => x.dbkey == 'db_faultReason')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })
  selectByAllTypeApi({ constType: 'callrepair_classify' }).then(x => {
    const temp = searchWhereModelProp.find(
      x => x.dbkey == 'db_callRepairClassifyCode'
    )
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })

  selectByAllApi({ tableName: 'Usercenter_Account' }).then(x => {
    const temp = searchWhereModelProp.find(
      x => x.dbkey == 'db_callRepairsUserId'
    )
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })
  // selectByAllTypeApi({ constType: 'iotInstall_type' }).then(res => {
  //     console.log(res.data.data)
  //     const temp = addModelProp.find(x => x.dbkey == 'db_iotPlanTypeCode')
  //     Object.entries(res.data.data).forEach(([key, v]) => {

  //         temp.list.push({
  //             value: key,
  //             label: v
  //         })

  //     })
  // })
  // selectByAllTypeApi({ constType: 'online_state' }).then(res => {
  //     console.log(res.data.data)
  //     const temp = addModelProp.find(x => x.dbkey == 'db_onlineState')
  //     Object.entries(res.data.data).forEach(([key, v]) => {

  //         temp.list.push({
  //             value: key,
  //             label: v
  //         })

  //     })
  // })
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
