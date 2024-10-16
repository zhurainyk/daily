<template>
  <div class="page-list">
    <ListComponet :select-by-condition-api="CallRepair_selectByConditionApi"
      :select-count-by-condition-api="CallRepair_selectCountByConditionApi" :save-api="CallRepair_saveApi"
      :delete-by-id-api="CallRepair_deleteByIdApi" :select-by-id-api="CallRepair_selectByIdApi"
      :update-by-id-api="CallRepair_updateByIdApi" :model-data="modelData" :table-map="tableMap"
      :add-model-prop="addModelProp" :search-where-model-prop="searchWhereModelProp" :show-new-porp="true"
      :pagesizes="[100, 200, 300, 400]" :default-page-size="100" :show-action-detail-porp="false"
      :show-action-edit-porp="true" :show-action-delete-porp="true" :show-h-check-box-porp="false"
      :dialogMount="dialogMount" :isClearCheckBox="true" :fullscreen="true" :maxwidth="true" :showResetSearch="true"
      :showActionPorp="true" exportExcelName="" dbkey="db_id">
    </ListComponet>
  </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  CallRepair_selectByConditionApi,
  CallRepair_saveApi,
  CallRepair_deleteByIdApi,
  CallRepair_selectCountByConditionApi,
  CallRepair_selectByIdApi,
  CallRepair_updateByIdApi
} from '@/api/module/ordermanagement'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { getProjectMapLoginApi } from '@/api/module/login'
import { getElevatorByProjectId } from '@/api/module/customerBI'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
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
  {
    dbkey: 'ui_cllaRepairsUser',
    name: '报修人'
  },

  {
    dbkey: 'ui_callRepairClassify',
    name: '召修分类'
  }
]
const changeProject = (args, addModel, item, dialogModel) => {
  dialogModel.db_elevId = ''
  dialogModel.db_upkeepType = ''
  dialogModel.db_workTemplateId = ''
  if (args) {
    dialogMount2(args, addModel)
  }
}
const dialogMount2 = (args, addModel, fn) => {
  const elevator = new Elevator_Elevator()
  elevator.db_projectId = args
  const tempItem = addModel.find(x => x.dbkey == 'db_elevId')
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
    list: []
  },
  // {
  //     name: '保养类型',
  //     dbkey: 'db_upkeepType',
  //     isreuqired: false,
  //     isSelect: true,
  //     multiple: false,
  //     multipledata: [],
  //     list: [],
  //     fn: selectByAllTypeApi,
  //     fnArgs: { constType: 'maint_type' }
  // },
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
    name: '故障现象',
    dbkey: 'db_faultAppearanceId',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
    // fn: selectByAllTypeApi,
    // fnArgs: { constType: 'fault_appearance' }
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
    multipledata: []
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
    name: '使用状态等json',
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
    type: 'imgs',
    filekey: 'faultAppearance',
    multipledata: [],
    list: [],
    changefn: (arg, model) => {
      console.log(arg, model)
    }
  }
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

  // args.db_faultAppearanceUrl = reactive(arr);
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
    /* height: calc(100% - 220px); */
    height: calc(100% - 220px);

    .page-body-head {
      .search-where {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
