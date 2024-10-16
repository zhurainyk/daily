<template>
  <div class="page-list">
    <ListComponet
      ref="list"
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :maxwidth="true"
      :disabled-edit-btn="true"
      :disabled-new-btn="true"
      :show-action-delete-porp="false"
      :show-action-edit-porp="false"
      :show-new-porp="false"
    >
      <template #actionOhther="{ scope }">
        <span class="edit" @click="editDetailFn(scope.row)"> 详情</span>
        <span
          class="edit"
          v-if="scope.row.db_orderState == '02'"
          @click="transfromFn(scope.row)"
          >转派</span
        >
        <span
          class="edit"
          v-if="scope.row.db_orderState == '06'"
          @click="passOrder(scope.row)"
          >验收</span
        >
      </template>
      <template #headui_executeUserName="{ scope }">
        <span>{{ userExcuter(scope.row) }}</span>
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
      :showList="tableMap"
      @close="dialog.visiabletranform = false"
    >
      <template #title>
        <label v-if="typepage == '00'">转派</label>
        <label v-else>验收</label>
      </template>
      <template #detailmain="{ detailModel }">
        <div class="tranfrom-user" v-if="typepage == '00'">
          <div>
            <label>执行人:</label>
            <el-select
              @change="changefollowUserTranfrom"
              v-model="detailModel.db_followUserId"
            >
              <el-option
                v-for="user in executorDialog"
                :key="user.db_id"
                :value="user.db_id"
                :label="user.db_id_username"
              ></el-option>
            </el-select>
          </div>
          <div v-if="detailModel.db_orderTypeCode == 'CallRepair'">
            <label>是否修改平衡系数:</label>
            <el-radio-group v-model="detailModel.db_isModBCoeff">
              <el-radio label="01">是</el-radio>
              <el-radio label="00">否</el-radio>
            </el-radio-group>
          </div>
          <div v-if="detailModel.db_orderTypeCode == 'CallRepair'">
            <label>预计完成天数:</label>
            <el-input-number
              min="0"
              v-model="detailModel.db_preDuration"
            ></el-input-number>
          </div>

          <div v-if="dynamicWorkItemDialog">
            <label>动态工作项:</label>
            <el-select
              v-model="dynamicWorkItem"
              multiple
              clearable
              collapse-tags
            >
              <el-option
                v-for="dw in dynamicWorkItems"
                :key="dw.value"
                :value="dw.value"
                :label="dw.label"
              ></el-option>
            </el-select>
          </div>
          <div v-if="executorVideoDialog">
            <label>是否录制视频:</label>
            <el-radio-group v-model="detailModel.db_isVideo">
              <el-radio label="01">是</el-radio>
              <el-radio label="00">否</el-radio>
            </el-radio-group>
          </div>
        </div>
      </template>
      <template #detailfooter="{ closefn, detailModel }">
        <el-button
          type="primary"
          v-if="typepage == '00'"
          @click="saveBtn(detailModel, closefn)"
          >转派工单</el-button
        >
        <el-button
          type="primary"
          v-if="typepage != '00'"
          @click="backToDealOrder(detailModel, closefn)"
          >不同意</el-button
        >
        <el-button
          type="primary"
          v-if="typepage != '00'"
          @click="passBySuperior(detailModel, closefn)"
          >同意</el-button
        >
      </template>
    </Detail>
    <!-- <template #footer>
      <span
        v-if="
          currentData.db_taskState != '09' &&
          currentData.db_taskState != '10' &&
          currentData.db_taskState != '11'
        "
        class="dialog-footer"
      >
        <el-button @click="cancelTask">{{ $t('common.cancelTask') }}</el-button>
      </span>
    </template> -->
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
  selectOrderByConditionApi as selectByConditionApi,
  selectCountOrderByConditionApi as selectCountByConditionApi,
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
import { Elevator_OrderInfo } from '@/module.ts/Elevator_OrderInfo'
import { menulist } from '@/router/menu'
import { getwebEnginUserByProjectIdApi } from '@/api/module/projectManage'
import { getIsBindHelmetApi } from '@/api/module/helmet'
import { Elevator_DynamicWorkItem } from '@/module.ts/Elevator_DynamicWorkItem'
import { selectByConditionApi as selectByConditionDynamicWorkItApi } from '@/api/module/dynamicWorkIt'
import Detail from '@/components/singlelist/components/detail'
import {
  TurnToSendOrderByIdApi,
  passBySuperiorByIdApi,
  backToDealOrderByIdApi
} from '@/api/module/taskedit'

export default defineComponent({
  components: { ListComponet, Detail },
  props: {
    typepage: {
      type: String,
      default: '00'
    }
  },
  setup(props) {
    const $router = useRouter()
    const $route = useRoute()
    const modelData = new Elevator_OrderInfo()

    if (props.typepage == '00') {
      modelData.ui_type = 'I0'
    } else {
      modelData.db_orderState = '06'
      modelData.ui_type = 'K0'
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
    const transfromFn = async ars => {
      executorVideoDialog.value = false
      dynamicWorkItemDialog.value = false
      ars.db_isVideo = '00'
      ars.db_isModBCoeff = '00'
      currentData.value = ars
      dynamicWorkItem.value = []
      dynamicWorkItems.value = []
      const tempmodelData = new Elevator_DynamicWorkItem()
      tempmodelData.db_elevId = ars.db_elevId
      tempmodelData.db_dealLabelCode = '00'
      getwebEnginUserByProjectIdApi({ db_id: ars.db_projectId }).then(x => {
        if (x.data.success) {
          executorDialog.value = x.data.data
          dialog.visiabletranform = true
        }
      })
      selectByConditionDynamicWorkItApi({
        ...tempmodelData,
        ui_type: 'A0',
        ui_pageSize: 0,
        ui_currentPage: 0
      }).then(x => {
        const { objectList, condition } = x.data.data
        if (objectList.length > 0) {
          dynamicWorkItemDialog.value = true
          objectList.forEach(y => {
            dynamicWorkItems.value.push({
              value: y.db_id,
              label: y.db_content,
              ...y
            })
          })
        }
      })
    }
    const passOrder = ars => {
      currentData.value = ars
      dialog.visiabletranform = true
    }
    const changefollowUserTranfrom = args => {
      if (args) {
        getIsBindHelmetApi({ db_userId: args }).then(x => {
          if (x.data.success) {
            if (x.data.data) {
              executorVideoDialog.value = true
            }
          }
        })
      }
    }

    const tableMap = [
      // {
      //   dbkey: 'ui_scheduleName',
      //   name: '关联计划名称'
      // },
      {
        dbkey: 'db_id_orderName',
        name: '工单名称'
      },
      {
        dbkey: 'ui_createUserName',
        name: '创建人'
      },
      {
        dbkey: 'ui_orderStateDesc',
        name: '工单状态'
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
    const addModelProp = []
    const list: any = ref(null)

    const searchWhereModelProp = reactive([
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
        name: '工单类型',
        dbkey: 'db_orderTypeCode',
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

    const newFn = () => {
      currentData.value = new Elevator_OrderInfo()
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
          id: args.db_taskId
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
    const saveBtn = (arg, closeFn) => {
      if (arg.db_orderTypeCode == 'CallRepair') {
        if (!arg.db_preDuration) {
          ElMessage.warning('填写预计完成天数')
          return
        }
      }
      if (!arg.db_followUserId) {
        ElMessage.warning('请选择执行人')
        return
      }
      if (
        currentData.value.ui_typeOrder &&
        currentData.value.ui_typeOrder.length > 0
      ) {
        let tempDw = dynamicWorkItems.value
          .filter(y => dynamicWorkItem.value.findIndex(v => v == y.value) > -1)
          .map(y => {
            return {
              db_id: y.db_id,
              db_content: y.db_content,
              db_dealLabelCode: y.db_dealLabelCode
            }
          })
        TurnToSendOrderByIdApi(arg.db_orderTypeCode)({
          db_id: currentData.value.ui_typeOrder[0].db_id,
          db_isModBCoeff: arg.db_isModBCoeff,
          db_orderId: currentData.value.ui_typeOrder[0].db_orderId,
          db_preDuration: arg.db_preDuration,
          orderInfo: {
            db_followUserId: arg.db_followUserId,
            db_isVideo: arg.db_isVideo,
            db_dynamicWorkItem: tempDw.length > 0 ? JSON.stringify(tempDw) : ''
          }
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('转派成功')
            closeFn()
            successFn()
          } else {
            ElMessage.error('转派失败')
          }
        })
      }
    }
    const passBySuperior = (arg, closeFn) => {
      if (
        currentData.value.ui_typeOrder &&
        currentData.value.ui_typeOrder.length > 0
      ) {
        passBySuperiorByIdApi(arg.db_orderTypeCode)({
          db_id: currentData.value.ui_typeOrder[0].db_id
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
    const backToDealOrder = (arg, closeFn) => {
      if (
        currentData.value.ui_typeOrder &&
        currentData.value.ui_typeOrder.length > 0
      ) {
        backToDealOrderByIdApi(arg.db_orderTypeCode)({
          db_id: currentData.value.ui_typeOrder[0].db_id
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
          x => x.dbkey == 'db_orderTypeCode'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
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
      currentUser,
      editDetailFn,
      editDetailPrintFn,
      userExcuter,
      updateBathTaskByidApi,
      updateTaskDynamicByidApi,
      executorVideoDialog,
      executorDialog,
      transfromFn,
      changefollowUserTranfrom,
      dynamicWorkItem,
      dynamicWorkItems,
      dynamicWorkItemDialog,
      saveBtn,
      passOrder,
      passBySuperior,
      backToDealOrder
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  background-color: white;
  padding: 0;
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
