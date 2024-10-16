<template>
  <div class="page-list">
    <ListComponet
      ref="list"
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :save-api="saveApi"
      :update-by-id-api="updateByIdApi"
      :delete-by-id-api="deleteByIdApi"
      :select-by-id-api="selectByIdApi"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :maxwidth="true"
      :disabled-edit-btn="true"
      :disabled-new-btn="true"
      :show-action-delete-porp="false"
      :show-action-edit-porp="false"
      :show-new-porp="false"
      :is-have-export-btn="true"
      export-excel-name="任务"
      :isexport-current-page="true"
      @edit-fn="editFn"
      @new-fn="newFn"
      @detail-fn="detailFn"
      showHCheckBoxPorp
      :is-clear-check-box="true"
    >
      <template #customize="{ selectedList }">
        <div>
          <authority-button
            type="primary"
            apiUrl="/elevator_order/multiPrint"
            @click="printTaskFn(selectedList)"
          >
            批量打印
          </authority-button>
        </div>
      </template>
      <template #actionOhther="{ scope }">
        <span class="edit" @click="editDetailFn(scope.row)"> 详情</span>
      </template>
      <template #headui_executeUserName="{ scope }">
        <span>{{ userExcuter(scope.row) }}</span>
      </template>
    </ListComponet>
  </div>
  <batch-print-task v-show="false" :arrList="arrprints"></batch-print-task>
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
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  cancelMedicalApi,
  cancelCallRepairApi,
  cancelCleanUpkeepApi,
  cancelRepairUpkeepApi,
  cancelRegularUpkeepApi,
  cancelInstallIotApi,
  updateBathTaskByidApi,
  updateTaskDynamicByidApi,
  getPrintTaskByidsApi
} from '@/api/module/taskInfo'
import {
  getUserMapLoginApi,
  getProjectMapLoginApi,
  getPropCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getInsuCompanyMapLoginApi
} from '@/api/module/login'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_TaskInfo } from '@/module.ts/Elevator_TaskInfo'
import { menulist } from '@/router/menu'
import { getwebEnginUserByProjectIdApi } from '@/api/module/projectManage'
import { getIsBindHelmetApi } from '@/api/module/helmet'
import { Elevator_DynamicWorkItem } from '@/module.ts/Elevator_DynamicWorkItem'
import { selectByConditionApi as selectByConditionDynamicWorkItApi } from '@/api/module/dynamicWorkIt'
import BatchPrintTask from '@/components/task/batchPrintTask'
import { batchprint } from '@/utils/hooks/batchPrint'

export default defineComponent({
  components: { ListComponet, BatchPrintTask },
  setup() {
    const $router = useRouter()
    const $route = useRoute()
    const modelData = new Elevator_TaskInfo()
    modelData.ui_overdue = $route.query.ui_overdue || ''
    if ($route.query) {
      Object.entries<string>($route.query).forEach(([key, v]) => {
        modelData[key] = v
      })
    }
    if ($route.query.db_taskState) {
      modelData.db_taskState = $route.query.db_taskState
      modelData.db_taskState_web = $route.query.db_taskState
    } else {
      modelData.db_taskState = '01,02,03,04,05,06,07,08,10,11'
    }

    const modelDataModify = {
      db_id: '',
      db_followUserId: '',
      db_isVideo: '00',
      db_preEndtime: ''
    }

    const modelDataDynamic = {
      db_id: '',
      db_elevId: '',
      db_dynamicWorkItem: ''
    }
    const arrprints = ref([])
    const changedynamicWorkItem = (args, addModel, item, dialogModel) => {
      dialogModel.db_dynamicWorkItem = ''
      if (args && args.length > 0) {
        const tempWorkItems = item.list.filter(
          (x: any) => args.findIndex(y => y == x.value) > -1
        )
        if (tempWorkItems.length > 0) {
          dialogModel.db_dynamicWorkItem = JSON.stringify(
            tempWorkItems.map((x: any) => {
              return {
                db_id: x.db_id,
                db_content: x.db_content,
                db_dealLabelCode: x.db_dealLabelCode
              }
            })
          )
        }
      }
    }
    const addModeDataDynamicPropUpdate = reactive([
      {
        name: '动态工作项',
        dbkey: 'db_dynamicWorkItem',
        isreuqired: false,
        isSelect: true,
        multiple: true,
        multipledata: [],
        list: [],
        changefn: changedynamicWorkItem
      }
    ])
    const currentData: any = ref({})
    const dialog = reactive({
      visiableDialog: false,
      visiableDetail: false,
      visiableTaskSchedue: false,
      visiableModify: false,
      visiableDynamic: false
    })
    const openDynamic = args => {
      modelDataDynamic.db_id = args.db_id
      const tempmodelData = new Elevator_DynamicWorkItem()
      tempmodelData.db_elevId = args.db_elevId
      tempmodelData.db_dealLabelCode = '00'
      const temp = addModeDataDynamicPropUpdate.find(
        x => x.dbkey == 'db_dynamicWorkItem'
      )
      if (temp) {
        temp.multipledata = []
        temp.list = []
      }
      selectByConditionDynamicWorkItApi({
        ...tempmodelData,
        ui_type: 'A0',
        ui_pageSize: 0,
        ui_currentPage: 0
      }).then(x => {
        const { objectList, condition } = x.data.data
        objectList.forEach(y => {
          temp?.list.push({
            value: y.db_id,
            label: y.db_content,
            ...y
          })
        })
        dialog.visiableDynamic = true
      })
    }
    const selectablefn = (row, index) => {
      if (row.db_taskState == '03') return true
      return false
    }
    const changefollowUserId = (args, addModel, item, dialogModel) => {
      const tempVido = addModel.find((x: any) => x.dbkey == 'db_isVideo')
      if (tempVido) {
        dialogModel.db_isVideo = '00'
        tempVido.isDisable = true
      }
      if (args) {
        if (tempVido) {
          getIsBindHelmetApi({ db_userId: args }).then(x => {
            if (x.data.success) {
              if (x.data.data) {
                tempVido.isDisable = false
                dialogModel.db_isVideo = '01'
              }
            }
          })
        }
      }
    }
    const addModePropUpdate = reactive([
      {
        name: '执行人',
        dbkey: 'db_followUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changefollowUserId
      },
      {
        name: '是否录制视频',
        dbkey: 'db_isVideo',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        isDisable: true,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'public_whether' }
      },
      {
        name: '计划开始日期',
        dbkey: 'db_preEndtime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        list: []
      }
    ])
    const openModifyDialog = (args: Array<any>) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选任务')
      } else {
        modelDataModify.db_id = args.map(x => x.db_id).join(',')
        getwebEnginUserByProjectIdApi({ db_id: args[0].db_projectId }).then(
          x => {
            if (x.data.success) {
              const temp: any = addModePropUpdate.find(
                (x: any) => (x.dbkey = 'db_followUserId')
              )
              temp.list = []
              x.data.data.forEach(y => {
                temp.list.push({
                  value: y.db_id,
                  label: y.db_id_username
                })
              })
              dialog.visiableModify = true
            }
          }
        )
      }
    }
    const cancelBatchTask = (args: Array<any>, fn) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选任务')
        return
      }
      ElMessageBox.confirm('是否删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(() => {
          updateBathTaskByidApi({
            db_id: args.map(x => x.db_id).join(','),
            db_taskState: '09'
          }).then(x => {
            if (x.data.success) {
              ElMessage.success('成功')
              fn()
            } else {
              ElMessage.error('失败')
            }
          })
        })
        .catch(() => {})
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
        dbkey: 'ui_executeUserName',
        name: '执行人'
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
        name: '预计开始时间',
        sortablekey: 'db_preEndtime'
      },
      {
        dbkey: 'ui_createtime',
        name: '创建时间',
        sortablekey: 'db_createtime'
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
    const addModelProp = []
    const list: any = ref(null)
    const changeStatus = (val, searchwhereProp, item, searchWhere) => {
      if (val) {
        searchWhere.db_taskState = val
      } else {
        searchWhere.db_taskState = item.list.map(x => x.value).join(',')
      }
    }
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
        name: '任务类型',
        dbkey: 'db_taskTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '任务状态',
        dbkey: 'db_taskState_web',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeStatus
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
      },

      {
        name: '开始作业时间',
        dbkey: 'ui_start_dealStarttime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_dealStarttime = args[0]
            dialogModel.ui_end_dealStarttime = args[1]
          } else {
            dialogModel.ui_start_dealStarttime = ''
            dialogModel.ui_end_dealStarttime = ''
          }
        }
      },
      {
        name: '完成作业时间',
        dbkey: 'ui_start_dealEndtime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_dealEndtime = args[0]
            dialogModel.ui_end_dealEndtime = args[1]
          } else {
            dialogModel.ui_start_dealEndtime = ''
            dialogModel.ui_end_dealEndtime = ''
          }
        }
      },
      {
        name: '超期状态',
        dbkey: 'ui_overdue',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            value: '01',
            label: '维保计划超期'
          },
          {
            value: '02',
            label: '维保超期'
          },
          {
            value: '03',
            label: '回召转派超期'
          },
          {
            value: '04',
            label: '回召超期'
          }
        ]
      },
      {
        name: '关联单位',
        dbkey: 'ui_isByCompany',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [
          {
            value: '01',
            label: '物业单位相关'
          },
          {
            value: '02',
            label: '维保单位相关'
          },
          {
            value: '03',
            label: '保险单位相关'
          }
        ]
      }
    ])
    if ($route.query.ui_start_preEndtime) {
      modelData.ui_start_preEndtime = $route.query.ui_start_preEndtime
      modelData.ui_end_preEndtime = $route.query.ui_end_preEndtime
      const tempT = searchWhereModelProp.find(
        x => x.dbkey == 'ui_start_preEndtime'
      )
      tempT.multipledata = [
        $route.query.ui_start_preEndtime,
        $route.query.ui_end_preEndtime
      ]
    }
    const editFn = args => {
      currentData.value = args
      dialog.visiableDialog = true
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
    const cancelTask = () => {
      ElMessageBox.confirm('是否取消任务', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(() => {
          let canceApi: any = null
          if (currentData.value.db_taskTypeCode == 'Medical') {
            canceApi = cancelMedicalApi
          } else if (currentData.value.db_taskTypeCode == 'CallRepair') {
            canceApi = cancelCallRepairApi
          } else if (currentData.value.db_taskTypeCode == 'CleanUpkeep') {
            canceApi = cancelCleanUpkeepApi
          } else if (currentData.value.db_taskTypeCode == 'RepairUpkeep') {
            canceApi = cancelRepairUpkeepApi
          } else if (currentData.value.db_taskTypeCode == 'RegularUpkeep') {
            canceApi = cancelRegularUpkeepApi
          } else if (currentData.value.db_taskTypeCode == 'InstallIot') {
            canceApi = cancelInstallIotApi
          }
          if (canceApi) {
            canceApi({ db_id: currentData.value.ui_typeTask[0].db_id }).then(
              x => {
                if (x.data.success) {
                  dialog.visiableDetail = false
                  successFn()
                  ElMessage.success('取消成功')
                } else {
                  ElMessage.error('取消失败')
                }
              }
            )
          }
        })
        .catch(() => {})
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
    const editDetailPrintFn = args => {
      const url = $router.resolve({
        name: menulist.taskDetailPrint.name,
        params: {
          id: args.db_id
        }
      }).href
      window.open(url, '_blank')
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
    const printTaskFn = arr => {
      if (
        arr.findIndex(x => x.db_taskTypeCode != 'RegularUpkeep') > -1 ||
        arr.findIndex(
          x =>
            x.db_taskTypeCode == 'RegularUpkeep' &&
            !(x.db_taskState == '10' || x.db_taskState == '11')
        ) > -1
      ) {
        ElMessage.warning('勾选已完成或已评价的常规保养任务')
        return
      }
      if (
        arr.filter(
          x =>
            x.db_taskTypeCode == 'RegularUpkeep' &&
            (x.db_taskState == '10' || x.db_taskState == '11')
        ).length <= 0
      ) {
        ElMessage.warning('勾选已完成或已评价的常规保养任务')
        return
      }
      getPrintTaskByidsApi({
        taskId: arr
          .filter(
            x =>
              x.db_taskTypeCode == 'RegularUpkeep' &&
              (x.db_taskState == '10' || x.db_taskState == '11')
          )
          .map(x => x.db_id)
          .join(',')
      }).then(x => {
        if (x.data.data) {
          x.data.data.forEach(y => {
            if (y.db_workItemList) {
              y.db_workItemList = JSON.parse(y.db_workItemList)
            } else {
              y.db_workItemList = []
            }
          })
          arrprints.value = x.data.data
          nextTick(() => {
            batchprint('batch-print-task')
            arrprints.value = []
          })
        }
        console.log(x)
      })
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
      selectByAllTypeApi({ constType: 'taskOrder_type' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_taskTypeCode'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'taskOrder_state' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_taskState_web'
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
      cancelTask,
      currentUser,
      editDetailFn,
      editDetailPrintFn,
      userExcuter,
      addModePropUpdate,
      selectablefn,
      modelDataModify,
      openModifyDialog,
      cancelBatchTask,
      updateBathTaskByidApi,
      openDynamic,
      modelDataDynamic,
      addModeDataDynamicPropUpdate,
      updateTaskDynamicByidApi,
      printTaskFn,
      arrprints
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
</style>
