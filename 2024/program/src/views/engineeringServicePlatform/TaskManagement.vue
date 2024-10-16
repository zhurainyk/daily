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
      @edit-fn="editFn"
      @new-fn="newFn"
      showHCheckBoxPorp
      :is-clear-check-box="true"
      :selectablefn="selectablefn"
    >
      <template #actionOhther="{ scope }">
        <span class="edit" @click="editDetailFn(scope.row)">
          {{ $t('common.detail') }}</span
        >
        <span
          class="edit"
          v-if="
            scope.row.db_taskState == '03' &&
            scope.row.ui_hasDynamicWorkItem == '01'
          "
          @click="openDynamic(scope.row)"
        >
          {{ $t('business.dynamicWorkItem') }}</span
        >
        <!-- <span class="edit" @click="editDetailPrintFn(scope.row)">打印</span> -->
      </template>
      <template #customize="{ selectedList, searchBtnList }">
        <div>
          <el-button
            type="primary"
            @click="dialog.visiableTaskSchedue = true"
            >{{ $t('business.scheduling') }}</el-button
          >
        </div>
        <div>
          <el-button type="primary" @click="openModifyDialog(selectedList)">{{
            $t('common.batchModify')
          }}</el-button>
        </div>
        <div>
          <el-button
            type="primary"
            @click="cancelBatchTask(selectedList, searchBtnList)"
            >{{ $t('common.batchCancel') }}</el-button
          >
        </div>
        <!-- <div>
          <el-button type="primary" @click="printTaskFn(selectedList)"
            >批量打印</el-button
          >
        </div> -->
      </template>
      <template #headui_executeUserName="{ scope }">
        <span>{{ userExcuter(scope.row) }}</span>
      </template>
    </ListComponet>

    <el-dialog
      v-if="dialog.visiableDialog"
      v-model="dialog.visiableDialog"
      :show-close="false"
      class="max-dialog"
    >
      <EditTask
        :current-data="currentData"
        @close="dialog.visiableDialog = false"
        @close-task="dialog.visiableDialog = false"
        @success="successFn"
      >
      </EditTask>
    </el-dialog>

    <el-dialog
      v-if="dialog.visiableDetail"
      v-model="dialog.visiableDetail"
      class="middle-dialog"
    >
      <DetailTask :current-data="currentData"> </DetailTask>
      <template #footer>
        <span
          v-if="
            currentData.db_taskState != '09' &&
            currentData.db_taskState != '10' &&
            currentData.db_taskState != '11'
          "
          class="dialog-footer"
        >
          <el-button @click="cancelTask">{{
            $t('common.cancelTask')
          }}</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-if="dialog.visiableTaskSchedue"
      v-model="dialog.visiableTaskSchedue"
      class="max-dialog"
      :show-close="false"
    >
      <TaskScheduing
        :current-data="currentData"
        @close-task="dialog.visiableTaskSchedue = false"
      >
      </TaskScheduing>
    </el-dialog>

    <el-dialog
      v-if="dialog.visiableModify"
      v-model="dialog.visiableModify"
      class="min-dialog"
      :show-close="false"
    >
      <Modify
        :current-data="modelDataModify"
        dbkey="kkk"
        :save-api="updateBathTaskByidApi"
        :add-model="addModePropUpdate"
        @close="dialog.visiableModify = false"
        @success="successFn"
      >
        <template #headtitle>
          <label>{{ $t('common.batchModify') }}</label>
        </template>
      </Modify>
    </el-dialog>

    <el-dialog
      v-if="dialog.visiableDynamic"
      v-model="dialog.visiableDynamic"
      class="min-dialog"
      :show-close="false"
    >
      <Modify
        :current-data="modelDataDynamic"
        dbkey="kkk"
        :save-api="updateTaskDynamicByidApi"
        :add-model="addModeDataDynamicPropUpdate"
        @close="dialog.visiableDynamic = false"
      >
        <template #headtitle>
          <label>{{ $t('business.addDynamicWorkItem') }}</label>
        </template>
      </Modify>
    </el-dialog>
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
import { useI18n } from 'vue-i18n'
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
import { getUserMapLoginApi, getProjectMapLoginApi } from '@/api/module/login'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_TaskInfo } from '@/module.ts/Elevator_TaskInfo'
import EditTask from './components/editTask'
import DetailTask from './components/detailTask'
import TaskScheduing from './components/taskScheduing'
import { menulist } from '@/router/menu'
import { getwebEnginUserByProjectIdApi } from '@/api/module/projectManage'
import Modify from '@/components/singlelist/components/addEdit'
import { getIsBindHelmetApi } from '@/api/module/helmet'
import { Elevator_DynamicWorkItem } from '@/module.ts/Elevator_DynamicWorkItem'
import { selectByConditionApi as selectByConditionDynamicWorkItApi } from '@/api/module/dynamicWorkIt'
import {
  getPropCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getInsuCompanyMapLoginApi
} from '@/api/module/login'
import BatchPrintTask from '@/components/task/batchPrintTask'
import { batchprint } from '@/utils/hooks/batchPrint'
import { selectAccountByposiTypeApi } from '@/api/module/user'

export default defineComponent({
  components: {
    ListComponet,
    EditTask,
    DetailTask,
    TaskScheduing,
    Modify,
    BatchPrintTask
  },
  setup() {
    const modelData = new Elevator_TaskInfo()
    const { t } = useI18n()
    const modelDataModify = {
      db_id: '',
      db_followUserId: '',
      db_isVideo: '00',
      db_preEndtime: ''
    }
    const arrprints = ref([])
    const modelDataDynamic = {
      db_id: '',
      db_elevId: '',
      db_dynamicWorkItem: ''
    }
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
        name: t('business.dynamicWorkItem'),
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
        name: t('business.executor'),
        dbkey: 'db_followUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changefollowUserId
      },
      {
        name: t('business.recordVideo'),
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
        name: t('business.scheduledStartDate'),
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
        ElMessage.warning(t('business.checkTask'))
      } else {
        modelDataModify.db_id = args.map(x => x.db_id).join(',')
        getwebEnginUserByProjectIdApi({ db_id: args[0].db_projectId }).then(
          x => {
            if (x.data.success) {
              let temp: any = addModePropUpdate.find(
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
        ElMessage.warning(t('business.checkTask'))
        return
      }
      ElMessageBox.confirm('是否取消', t('common.prompt'), {
        confirmButtonText: t('common.yes'),
        cancelButtonText: t('common.no'),
        type: 'warning'
      })
        .then(() => {
          updateBathTaskByidApi({
            db_id: args.map(x => x.db_id).join(','),
            db_taskState: '09'
          }).then(x => {
            if (x.data.success) {
              ElMessage.success(t('common.success'))
              fn()
            } else {
              ElMessage.error(t('common.fail'))
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
        name: t('business.taskName')
      },
      {
        dbkey: 'ui_createUserName',
        name: t('business.createUserName')
      },
      {
        dbkey: 'ui_executeUserName',
        name: t('business.executor')
      },
      {
        dbkey: 'ui_taskStateDesc',
        name: t('business.taskStatus')
      },
      {
        dbkey: 'ui_useCompanyName',
        name: t('business.useCompanyName')
      },

      {
        dbkey: 'ui_maintCompanyName',
        name: t('business.maintCompanyName')
      },

      {
        dbkey: 'ui_insuCompanyName',
        name: t('business.insuCompanyName')
      },
      {
        dbkey: 'ui_preEndtime',
        name: t('business.estimatedStartTime'),
        sortablekey: 'db_preEndtime'
      },
      {
        dbkey: 'ui_createtime',
        name: t('business.createTime'),
        sortablekey: 'db_createtime'
      },
      {
        dbkey: 'ui_dealStarttime',
        name: t('business.startHomeworkTime')
      },
      {
        dbkey: 'ui_dealEndtime',
        name: t('business.CompletedHomeworkTime')
      }
    ]
    const addModelProp = []
    const list: any = ref(null)
    const searchWhereModelProp = reactive([
      {
        name: t('business.taskName'),
        dbkey: 'db_id_taskName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: t('business.projectName'),
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        changefn: (arg, searchWhereModelPropArgs, x, searchWhere) => {
          searchWhere.db_followUserId = ''
          const tmepFollow = searchWhereModelPropArgs.find(
            x => x.dbkey == 'db_followUserId'
          )
          if (tmepFollow) {
            tmepFollow.list = []
            if (arg) {
              getwebEnginUserByProjectIdApi({ db_id: arg }).then(x => {
                if (x.data.success) {
                  x.data.data.forEach(y => {
                    tmepFollow.list.push({
                      value: y.db_id,
                      label: y.db_id_username
                    })
                  })
                }
              })
            }
          }
        }
      },
      {
        name: t('business.taskType'),
        dbkey: 'db_taskTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: t('business.taskStatus'),
        dbkey: 'db_taskState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: t('business.executor'),
        dbkey: 'db_followUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: t('business.useCompanyName'),
        dbkey: 'db_useCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: t('business.maintCompanyName'),
        dbkey: 'db_maintCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: t('business.insuCompanyName'),
        dbkey: 'db_insuCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: t('business.estimatedStartTime'),
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
        name: t('business.createTime'),
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
        name: t('business.startHomeworkTime'),
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
        name: t('business.CompletedHomeworkTime'),
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
      }
    ])

    const editFn = args => {
      currentData.value = args
      dialog.visiableDialog = true
    }
    const $router = useRouter()
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
      ElMessageBox.confirm(t('business.cancelTaskOrNot'), t('common.prompt'), {
        confirmButtonText: t('common.yes'),
        cancelButtonText: t('common.no'),
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
                  ElMessage.success(t('common.cancelSuccess'))
                } else {
                  ElMessage.error(t('common.cancelFail'))
                }
              }
            )
          }
        })
        .catch(() => {})
    }
    const currentStore = useStore()
    const editDetailFn = args => {
      let url = $router.resolve({
        name: menulist.taskDetail.name,
        params: {
          id: args.db_id
        }
      }).href
      window.open(url, '_blank')
    }
    const editDetailPrintFn = args => {
      let url = $router.resolve({
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
      if (arr.length <= 0) {
        ElMessage.warning(t('business.checkTask'))
        return
      }
      getPrintTaskByidsApi({ taskId: arr.map(x => x.db_id).join(',') }).then(
        x => {
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
        }
      )
    }
    onMounted(() => {
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
          x => x.dbkey == 'db_taskState'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      // selectAccountByposiTypeApi({ posiType: 'EnginUser' }).then(x => {
      //   const temp: any = searchWhereModelProp.find(
      //     x => x.dbkey == 'db_followUserId'
      //   )
      //   if (x.data.data) {
      //     Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //       temp.list.push({
      //         value: v.db_id,
      //         label: v.db_id_username
      //       })
      //     })
      //   }
      // })
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
