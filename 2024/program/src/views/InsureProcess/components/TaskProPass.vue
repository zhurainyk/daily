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
          v-if="scope.row.db_orderState == '07'"
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
        <label>验收</label>
      </template>
      <template #detailmain="{ detailModel }">
        <div class="propass-user">
          <label>请签名</label>
          <div>
            <canvas
              @mousedown="canvesdown"
              @mouseup="canvesup"
              @mouseleave="canvesup"
              id="canvas"
            ></canvas>
          </div>
          <el-button type="primary" @click="resetCanvas">重置</el-button>
        </div>
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
  passByPropUserByIdApi,
  backToDealOrderByIdApi
} from '@/api/module/taskedit'
import { uploadIOFileApi } from '@/api/module/commont'

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
    modelData.ui_type = 'L0'

    const currentData: any = ref({})
    const isSig = ref(false)
    const dialog = reactive({
      visiableDialog: false,
      visiableDetail: false,
      visiableTaskSchedue: false,
      visiableModify: false,
      visiableDynamic: false,
      visiabletranform: false
    })

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
    const passOrder = ars => {
      currentData.value = ars
      dialog.visiabletranform = true
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

    const passBySuperior = (arg, closeFn) => {
      if (!isSig.value) {
        ElMessage.warning('请签名')
        return
      }
      if (
        currentData.value.ui_typeOrder &&
        currentData.value.ui_typeOrder.length > 0
      ) {
        let canvasDom = document.getElementById('canvas') as HTMLCanvasElement
        canvasDom.toBlob((blob: any) => {
          const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
          uploadIOFileApi({
            serverName: 'order',
            tableName: 'order',
            urlName: `order`,
            multipartFile: file
          }).then(f => {
            if (f.data.success) {
              passByPropUserByIdApi(arg.db_orderTypeCode)({
                db_id: currentData.value.ui_typeOrder[0].db_id,
                orderInfo: {
                  db_proElecSignatureUrl: f.data.data
                }
              }).then(x => {
                if (x.data.success) {
                  ElMessage.success('操作成功')
                  closeFn()
                  successFn()
                } else {
                  ElMessage.error('操作失败')
                }
              })
            } else {
              ElMessage.error('操作失败')
            }
          })
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
    const canvesdown = e => {
      isSig.value = true
      const ctx = $(e.target)[0].getContext('2d')
      ctx.beginPath()
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
      $(e.target).on('mousemove', e => {
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
      })
    }
    const canvesup = e => {
      $(e.target).off('mousemove')
    }
    const resetCanvas = e => {
      isSig.value = false
      const ctx = (
        document.getElementById('canvas') as HTMLCanvasElement
      ).getContext('2d')
      ctx?.clearRect(0, 0, 400, 400)
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
      passBySuperior,
      backToDealOrder,
      passOrder,
      canvesdown,
      canvesup,
      resetCanvas
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
.propass-user {
  margin-top: 10px;
  justify-content: center;
  label {
    font-size: 24px;
    width: 100%;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
  canvas {
    width: 300px;
    height: 200px;
    margin-bottom: 10px;
    box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
    margin-top: 10px;
  }
  > div {
    width: 100% !important;
    display: flex;
    justify-content: center;
  }
}
</style>
