<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :select-by-id-api="selectByIdApi"
      :save-api="saveApi"
      :delete-by-id-api="deleteByIdApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :show-new-porp="true"
      :pagesizes="[100, 200, 300, 400]"
      :update-by-id-api="updateByIdApi"
      :default-page-size="100"
      :show-action-detail-porp="false"
      :show-action-edit-porp="true"
      :show-action-delete-porp="true"
      :show-h-check-box-porp="false"
      :dialogMount="dialogMount"
      :isClearCheckBox="true"
      :fullscreen="true"
      :maxwidth="true"
      :showResetSearch="true"
      :showActionPorp="true"
      exportExcelName=""
      dbkey="db_id"
      :empty="true"
    >
    </ListComponet>
  </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  updateByIdApi,
  selectByIdApi,
  saveApi,
  deleteByIdApi
} from '@/api/module/ordermanagement'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getProjectList, getElevatorByProjectId } from '@/api/module/customerBI'
import { selectByConditionApi as selectUserByConditionApi } from '@/api/module/user'
const modelData = {}
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
const changeProject2 = (args, addModel, item, dialogModel) => {
  getElevatorByProjectId({ projectid: args }).then(res => {
    if (res?.data?.data?.data?.length) {
      const temp = searchWhereModelProp.find(x => x.dbkey == 'db_elevId')
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
    dbkey: 'db_id_orderName',
    name: '工单名称'
  },
  {
    dbkey: 'db_projectId',
    name: '项目名称',

    filters: {}
  },
  {
    dbkey: 'ui_orderType',
    name: '工单类型'
  },
  {
    dbkey: 'ui_taskName',
    name: '关联计划'
  },
  {
    dbkey: 'ui_orderStateDesc',
    name: '工单状态'
  },
  {
    dbkey: 'ui_orderPriority',
    name: '优先级'
  },
  {
    dbkey: 'ui_createUserName',
    name: '创建人'
  },
  {
    dbkey: 'ui_createtime',
    name: '创建时间'
  },
  {
    dbkey: 'ui_followUserName',
    name: '执行人'
  },
  {
    dbkey: 'ui_executeUserName',
    name: '协助人'
  },

  {
    dbkey: 'ui_dealStarttime',
    name: '开始作业时间'
  },

  {
    dbkey: 'ui_dealEndtime',
    name: '完成作业时间'
  }
]
const addModelProp = reactive([
  {
    name: 'id',
    dbkey: 'db_id',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    disabled: true,
    multipledata: [],
    list: []
  },
  {
    name: '工单名称',
    dbkey: 'db_id_orderName',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '工单类型',
    dbkey: 'db_orderTypeCode',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '工单详情',
    dbkey: 'db_orderDetail',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '关联任务',
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
    name: '创建人',
    dbkey: 'db_createUserId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '执行人',
    dbkey: 'db_followUserId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '协助人',
    dbkey: 'db_executeUserId',
    isreuqired: false,
    isSelect: true,
    multiple: true,
    multipledata: [],
    list: []
  },
  {
    name: '上级验收人',
    dbkey: 'db_superiorPassUserId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '物业验收人',
    dbkey: 'db_propPassUserId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '创建时间',
    dbkey: 'db_createtime',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    type: 'datetime',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multipledata: [],
    list: []
  },

  {
    name: '开始处理时间',
    dbkey: 'db_dealStarttime',
    isreuqired: false,
    isSelect: true,
    type: 'datetime',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multiple: false,
    multipledata: [],
    list: []
  },

  {
    name: '完成处理时间',
    dbkey: 'db_dealEndtime',
    isreuqired: false,
    isSelect: true,
    type: 'datetime',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multiple: false,
    multipledata: [],
    list: []
  },

  {
    name: '完成工单耗时(秒)',
    dbkey: 'db_dealEndDuration',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '挂起处理时间',
    dbkey: 'db_hangStarttime',
    isreuqired: false,
    isSelect: true,
    type: 'datetime',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '挂起原因',
    dbkey: 'db_hangReasonCode',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '挂起耗时',
    dbkey: 'db_hangDuration',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '优先级',
    dbkey: 'db_orderPriorityCode',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '工单状态',
    dbkey: 'db_orderState',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '实际开始停梯时间',
    dbkey: 'db_stopActualTime',
    isreuqired: false,
    isSelect: true,
    type: 'datetime',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '停梯时长(秒)',
    dbkey: 'db_stopDuration',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '流转记录json',
    maxlength: 10000,
    dbkey: 'db_flowRecords',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '验收通过次数',
    dbkey: 'db_passCount',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '源id',
    dbkey: 'db_srcId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: false,
    list: [],
    fn: selectUserByConditionApi,
    fnArgs: {
      ui_type: 'A1',
      ui_currentPage: 1,
      ui_pageSize: 0,
      db_isSrc: '01'
    },
    key: 'db_id',
    value: 'db_id_username'
  },
  {
    name: '备注',
    dbkey: 'db_note',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: []
  },
  {
    name: '开始处理打卡水印图地址',
    dbkey: 'db_dealStartImgUrl',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    type: 'imgs',
    list: []
  },
  {
    name: '结束处理打卡水印图地址',
    dbkey: 'db_dealEndImgUrl',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    list: [],
    type: 'imgs'
  }
])
const searchWhereModelProp = reactive([
  {
    name: '任务id',
    dbkey: 'db_taskId',
    isreuqired: true,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '工单id',
    dbkey: 'db_id',
    isreuqired: true,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '工单名称',
    dbkey: 'db_id_orderName',
    isreuqired: true,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '工单类型',
    dbkey: 'db_orderTypeCode',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '工单状态',
    dbkey: 'db_orderState',
    isreuqired: true,
    isSelect: true,
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
    list: [],
    changefn: changeProject2
  },
  {
    name: '电梯',
    dbkey: 'db_elevId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '电梯注册码',
    dbkey: 'db_registCode',
    isreuqired: true,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },

  {
    name: '创建人',
    dbkey: 'db_createUserId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '跟进人',
    dbkey: 'db_followUserId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '上级验收人',
    dbkey: 'db_superiorPassUserId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '物业验收人',
    dbkey: 'db_propPassUserId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },

  {
    name: '创建时间',
    dbkey: 'ui_start_createtime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    type: 'datetimerange',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    format: 'YYYY-MM-DD HH:mm:ss',

    multipledata: [modelData.ui_start_createtime, modelData.ui_end_createtime],
    isRules: true,
    list: [],
    changefn: (args, addModel, item, dialogModel) => {
      if (args.length && args.length == 2) {
        dialogModel.ui_start_createtime = args[0]
        dialogModel.ui_end_createtime = args[1]
      } else {
        dialogModel.ui_start_createtime = ''
        dialogModel.ui_end_createtime = ''
      }
    }
  },

  {
    name: '预计开始时间',
    dbkey: 'ui_start_preEndtime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    type: 'datetimerange',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multipledata: [modelData.ui_start_preEndtime, modelData.ui_end_preEndtime],
    isRules: true,
    list: [],
    changefn: (args, addModel, item, dialogModel) => {
      if (args.length && args.length == 2) {
        dialogModel.ui_start_preEndtime = args[0]
        dialogModel.ui_end_preEndtime = args[1]
      } else {
        dialogModel.ui_start_preEndtime = ''
        dialogModel.ui_end_preEndtime = ''
      }
    }
  },
  {
    name: '完成时间',
    dbkey: 'ui_start_dealEndtime',
    isreuqired: true,
    isSelect: true,
    multiple: true,
    type: 'datetimerange',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multipledata: [
      modelData.ui_start_dealEndtime,
      modelData.ui_end_dealEndtime
    ],
    isRules: true,
    list: [],
    changefn: (args, addModel, item, dialogModel) => {
      if (args.length && args.length == 2) {
        dialogModel.ui_start_dealEndtime = args[0]
        dialogModel.ui_end_dealEndtime = args[1]
      } else {
        dialogModel.ui_start_dealEndtime = ''
        dialogModel.ui_end_dealEndtime = ''
      }
    }
  }
])
onBeforeMount(() => {
  selectByAllApi({ tableName: 'Elevator_Project' }).then(x => {
    const temp = searchWhereModelProp.find(x => x.dbkey == 'db_projectId')

    const temp2 = tableMap.find(x => x.dbkey == 'db_projectId')

    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })

      temp2.filters[key] = v
      // temp2.list.push({
      //     value: key,
      //     label: v
      // })
    })
  })
})
onMounted(() => {
  selectByAllTypeApi({ constType: 'taskOrder_type' }).then(x => {
    const temp = addModelProp.find(x => x.dbkey == 'db_orderTypeCode')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })
  selectByAllTypeApi({ constType: 'task_priority' }).then(x => {
    const temp = addModelProp.find(x => x.dbkey == 'db_orderPriorityCode')
    Object.entries(x.data.data).forEach(([key, v]) => {
      temp.list.push({
        value: key,
        label: v
      })
    })
  })
  selectByAllTypeApi({ constType: 'taskOrder_state' }).then(x => {
    const temp = addModelProp.find(x => x.dbkey == 'db_orderState')
    const temp1 = searchWhereModelProp.find(x => x.dbkey == 'db_orderState')
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
  selectByAllTypeApi({ constType: 'taskOrder_type' }).then(x => {
    const temp = addModelProp.find(x => x.dbkey == 'db_orderTypeCode')
    const temp1 = searchWhereModelProp.find(x => x.dbkey == 'db_orderTypeCode')
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
  selectByAllApi({ tableName: 'Usercenter_Account' }).then(x => {
    {
      const temp = addModelProp.find(x => x.dbkey == 'db_executeUserId')
      Object.entries(x.data.data).forEach(([key, v]) => {
        temp.list.push({
          value: key,
          label: v
        })
      })
    }
    {
      const temp = addModelProp.find(x => x.dbkey == 'db_followUserId')
      Object.entries(x.data.data).forEach(([key, v]) => {
        temp.list.push({
          value: key,
          label: v
        })
      })
    }
    {
      const temp = addModelProp.find(x => x.dbkey == 'db_createUserId')
      Object.entries(x.data.data).forEach(([key, v]) => {
        temp.list.push({
          value: key,
          label: v
        })
      })
    }
    {
      const temp = addModelProp.find(x => x.dbkey == 'db_superiorPassUserId')
      const temp1 = searchWhereModelProp.find(
        x => x.dbkey == 'db_superiorPassUserId'
      )
      const temp2 = searchWhereModelProp.find(
        x => x.dbkey == 'db_propPassUserId'
      )

      Object.entries(x.data.data).forEach(([key, v]) => {
        temp.list.push({
          value: key,
          label: v
        })
        temp1.list.push({
          value: key,
          label: v
        })
        temp2.list.push({
          value: key,
          label: v
        })
      })
    }
    {
      const temp = addModelProp.find(x => x.dbkey == 'db_propPassUserId')
      Object.entries(x.data.data).forEach(([key, v]) => {
        temp.list.push({
          value: key,
          label: v
        })
      })
      const temp1 = searchWhereModelProp.find(x => x.dbkey == 'db_createUserId')
      Object.entries(x.data.data).forEach(([key, v]) => {
        temp1.list.push({
          value: key,
          label: v
        })
      })
      const temp2 = searchWhereModelProp.find(x => x.dbkey == 'db_followUserId')
      Object.entries(x.data.data).forEach(([key, v]) => {
        temp2.list.push({
          value: key,
          label: v
        })
      })
    }
  })
})

const dialogMount = (args, item) => {
  const temp = item.find(x => x.dbkey == 'db_executeUserId')
  temp.multipledata = args.db_executeUserId
    ? args.db_executeUserId.split(',')
    : []

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
  if (!args.db_projectId) return
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

  :deep() .page-search {
    min-height: 190px;
  }

  :deep() .page-body {
    height: calc(100% - 340px);
  }

  :deep().dialog-mian .dialog-body {
    height: auto !important;
  }
}
</style>
