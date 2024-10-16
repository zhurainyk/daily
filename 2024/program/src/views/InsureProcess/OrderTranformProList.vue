<template>
  <div class="page-list">
    <ListComponet
      ref="list"
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :saveApi="saveRepairTaskByIdApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :maxwidth="false"
      :disabled-edit-btn="true"
      :show-action-delete-porp="false"
      :show-action-edit-porp="false"
      :editModal="modelDataCallRepari"
      :submitBeforeFn="submitBeforeFn"
    >
      <template #actionOhther="{ scope }">
        <span class="edit" @click="editDetailFn(scope.row)"> 详情</span>
        <span
          v-if="scope.row.db_taskState == '01'"
          class="edit"
          @click="passOrder(scope.row)"
          >处理</span
        >
        <span class="edit" v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </template>
    </ListComponet>
  </div>
  <el-dialog
    v-if="dialog.visiabletranform"
    v-model="dialog.visiabletranform"
    class="max-dialog"
    :show-close="false"
  >
    <Detail
      :current-data="currentData"
      :show-list="showlist"
      @close="dialog.visiabletranform = false"
    >
      <template #title>
        <label>待确认</label>
      </template>
      <template #detailfooter="{ closefn, detailModel }">
        <el-button type="primary" @click="backToDealOrder(detailModel, closefn)"
          >不同意</el-button
        >
        <el-button type="primary" @click="passBySuperior(detailModel, closefn)"
          >同意</el-button
        >
      </template>
    </Detail>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  computed,
  nextTick
} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { uniq } from 'lodash'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import {
  selectTaskListByConditionApi as selectByConditionApi,
  selectCountTaskListByConditionApi as selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  updateBathTaskByidApi,
  updateTaskDynamicByidApi
} from '@/api/module/taskInfo'
import {
  getProjectMapLoginApi,
  getPropCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getInsuCompanyMapLoginApi
} from '@/api/module/login'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_TaskInfo } from '@/module.ts/Elevator_TaskInfo'
import { menulist } from '@/router/menu'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import Detail from '@/components/singlelist/components/detail'
import { Elevator_TaskCallRepair } from '@/module.ts/Elevator_TaskCallRepair'
import {
  getOrderListByTaskIdApi,
  comfirmRepairTaskByIdApi,
  rejectRepairTaskByIdApi,
  saveRepairTaskByIdApi
} from '@/api/module/taskedit'

export default defineComponent({
  components: { ListComponet, Detail },
  setup(props) {
    const $router = useRouter()
    const $route = useRoute()
    const modelData = new Elevator_TaskInfo()
    modelData.ui_type = 'I0'
    modelData.db_taskTypeCode = 'CallRepair'
    const modelDataCallRepari = new Elevator_TaskCallRepair()
    const currentData: any = ref({})
    const dialog = reactive({
      visiableDialog: false,
      visiableDetail: false,
      visiableTaskSchedue: false,
      visiableModify: false,
      visiableDynamic: false,
      visiabletranform: false
    })
    const executorVideoDialog = ref(false)
    const executorDialog = ref([])
    const dynamicWorkItem = ref([])
    const dynamicWorkItems = ref([])
    const dynamicWorkItemDialog = ref(false)

    const passOrder = ars => {
      ars.db_faultAppearanceId = ars.ui_typeTask[0].db_faultAppearanceId
      delete ars.ui_typeTask
      currentData.value = ars
      dialog.visiabletranform = true
    }

    const tableMap = [
      // {
      //   dbkey: 'ui_scheduleName',
      //   name: '关联计划名称'
      // },
      {
        dbkey: 'db_id_taskName',
        name: '任务名称'
      },
      {
        dbkey: 'ui_createUserName',
        name: '创建人'
      },
      {
        dbkey: 'ui_taskStateDesc',
        name: '任务状态'
      },

      {
        dbkey: 'ui_useCompanyName',
        name: '使用单位'
      },

      {
        dbkey: 'ui_maintCompanyName',
        name: '维保单位'
      },

      {
        dbkey: 'ui_insuCompanyName',
        name: '承保单位'
      },

      {
        dbkey: 'ui_preEndtime',
        name: '预计开始时间'
      },
      {
        dbkey: 'ui_createtime',
        name: '创建时间'
      }
    ]
    const changeProjectEdit = (args, addModel, item, dialogModel) => {
      const elevator = new Elevator_Elevator()

      elevator.db_projectId = args
      const tempItem = addModel.find((x: any) => x.dbkey == 'db_elevId')

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
    const showlist = [
      // {
      //   dbkey: 'ui_scheduleName',
      //   name: '关联计划名称'
      // },
      {
        dbkey: 'db_id_taskName',
        name: '任务名称'
      },
      {
        dbkey: 'ui_createUserName',
        name: '创建人'
      },
      {
        dbkey: 'ui_taskStateDesc',
        name: '任务状态'
      },

      {
        dbkey: 'ui_useCompanyName',
        name: '使用单位'
      },

      {
        dbkey: 'ui_maintCompanyName',
        name: '维保单位'
      },

      {
        dbkey: 'ui_insuCompanyName',
        name: '承保单位'
      },
      {
        dbkey: 'ui_createtime',
        name: '创建时间'
      },
      {
        dbkey: 'db_faultAppearanceId',
        name: '故障描述'
      }
    ]
    const addModelProp = reactive([
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
        list: []
      },
      {
        name: '故障描述',
        dbkey: 'db_faultAppearanceId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 4, maxRows: 5 }
      },
      {
        name: '图片',
        dbkey: 'db_faultAppearanceUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'imgs',
        filekey: 'faultAppearance'
      }
    ])
    const list: any = ref(null)

    const searchWhereModelProp = reactive([
      {
        name: '任务名称',
        dbkey: 'db_id_taskName',
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
        name: '任务状态',
        dbkey: 'db_taskState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '使用单位',
        dbkey: 'db_useCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '维保单位',
        dbkey: 'db_maintCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '承保单位',
        dbkey: 'db_insuCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '预计开始时间',
        dbkey: 'ui_start_preEndtime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_preEndtime = args[0]
            dialogModel.ui_end_preEndtime = args[1]
          } else {
            dialogModel.ui_start_preEndtime = ''
            dialogModel.ui_end_preEndtime = ''
          }
        }
      },
      {
        name: '创建时间',
        dbkey: 'ui_start_createtime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_createtime = args[0]
            dialogModel.ui_end_createtime = args[1]
          } else {
            dialogModel.ui_start_createtime = ''
            dialogModel.ui_end_createtime = ''
          }
        }
      }
    ])

    const editFn = args => {
      currentData.value = args
      dialog.visiableDialog = true
    }
    const submitBeforeFn = arg => {
      arg.taskInfo.db_projectId = arg.db_projectId
    }
    const newFn = () => {
      currentData.value = new Elevator_TaskInfo()
      dialog.visiableDialog = true
    }
    const detailFn = ars => {
      currentData.value = ars
      dialog.visiableDetail = true
    }
    const successFn = () => {
      list.value.searchInit()
    }

    const currentStore = useStore()
    const editDetailFn = args => {
      const url = $router.resolve({
        name: menulist.taskDetail.name,
        params: {
          id: args.db_id
        }
      }).href
      window.open(url, '_blank')
    }
    const passBySuperior = async (arg, closeFn) => {
      const temp = await getOrderListByTaskIdApi({ taskId: arg.db_id })
      if (!temp.data.success) {
        ElMessage.error('操作失败')
        return
      }
      const { objectList } = temp.data.data
      if (objectList && objectList.length > 0) {
        comfirmRepairTaskByIdApi({
          db_id: objectList[0].ui_typeOrder[0].db_id
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('操作成功')
            closeFn()
            successFn()
          } else {
            ElMessage.error('操作失败')
          }
        })
      }
    }
    const backToDealOrder = async (arg, closeFn) => {
      const temp = await getOrderListByTaskIdApi({ taskId: arg.db_id })
      if (!temp.data.success) {
        ElMessage.error('操作失败')
        return
      }
      const { objectList } = temp.data.data
      if (objectList && objectList.length > 0) {
        rejectRepairTaskByIdApi({
          db_id: objectList[0].ui_typeOrder[0].db_id
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('操作成功')
            closeFn()
            successFn()
          } else {
            ElMessage.error('操作失败')
          }
        })
      }
    }
    const currentUser = computed(() => currentStore.state.user.userInfo)
    const userExcuter = data => {
      let temp = []
      if (data.ui_executeUserName)
        temp = temp.concat(data.ui_executeUserName.split(','))
      if (data.ui_followUserName)
        temp = temp.concat(data.ui_followUserName.split(','))

      temp = temp.filter(x => x)
      temp = uniq(temp)
      return temp.join(',')
    }
    onMounted(() => {
      getMaintCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_maintCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
      selectByAllTypeApi({ constType: 'taskOrder_state' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_taskState'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          if (key != '09') {
            temp.list.push({
              value: key,
              label: v
            })
          }
        })
      })
      getPropCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_useCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      getInsuCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_insuCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
      getProjectMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_projectId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
    })
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      selectByIdApi,
      successFn,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      newFn,
      editFn,
      dialog,
      currentData,
      list,
      detailFn,
      currentUser,
      editDetailFn,
      userExcuter,
      updateBathTaskByidApi,
      updateTaskDynamicByidApi,
      executorVideoDialog,
      executorDialog,
      dynamicWorkItem,
      dynamicWorkItems,
      dynamicWorkItemDialog,
      passOrder,
      passBySuperior,
      backToDealOrder,
      saveRepairTaskByIdApi,
      modelDataCallRepari,
      submitBeforeFn,
      showlist
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  background-color: white;

  :deep().page-body {
    height: calc(100% - 270px);
    .page-body-head {
      justify-content: flex-start;

      > div {
        margin-right: 10px;
      }

      .search-where {
        display: flex;
        align-items: center;
      }
    }
  }
}
.tranfrom-user {
  margin-top: 50px;
  label {
    text-align: right;
    font-weight: bold;
    margin-bottom: 0 !important;
  }
  > div {
    margin-top: 10px;
    > div {
      width: 180px !important;
      margin-left: 10px;
    }
  }
}
</style>
