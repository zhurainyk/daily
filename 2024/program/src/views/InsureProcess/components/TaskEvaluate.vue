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
          v-if="scope.row.db_taskState == '10'"
          @click="passOrder(scope.row)"
          >评价</span
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
        <label>评价</label>
      </template>
      <template #detailmain="{ detailModel }">
        <div class="tranfrom-user">
          <div>
            <label>评分</label>
            <el-rate v-model="detailModel.score" clearable />
          </div>
          <div>
            <label>内容</label>
            <el-input v-model="detailModel.content"></el-input>
          </div>
          <div class="images">
            <label>图片</label>
            <el-upload
              v-model:file-list="detailModel.list"
              class="avatar-uploader imgs"
              list-type="picture-card"
              :show-file-list="true"
              multiple
              :http-request="
                (...argument) => beforeAvatarsUpload(...argument, detailModel)
              "
            >
              <el-icon class="avatar-uploader-icon2">+</el-icon>
            </el-upload>
          </div>
        </div>
      </template>
      <template #detailfooter="{ closefn, detailModel }">
        <el-button type="primary" @click="passBySuperior(detailModel, closefn)"
          >评价</el-button
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
  selectTaskListByConditionApi as selectByConditionApi,
  selectCountTaskListByConditionApi as selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  updateBathTaskByidApi,
  updateTaskDynamicByidApi,
  evaluateTaskApi
} from '@/api/module/taskInfo'
import {
  getProjectMapLoginApi,
  getPropCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getInsuCompanyMapLoginApi
} from '@/api/module/login'
import {
  selectByAllApi,
  selectByAllTypeApi,
  uploadIOFilesApi
} from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_OrderInfo } from '@/module.ts/Elevator_OrderInfo'
import { menulist } from '@/router/menu'
import { getwebEnginUserByProjectIdApi } from '@/api/module/projectManage'
import { getIsBindHelmetApi } from '@/api/module/helmet'
import { Elevator_DynamicWorkItem } from '@/module.ts/Elevator_DynamicWorkItem'
import { selectByConditionApi as selectByConditionDynamicWorkItApi } from '@/api/module/dynamicWorkIt'
import Detail from '@/components/singlelist/components/detail'
import { passByPropUserByIdApi } from '@/api/module/taskedit'

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
    const dialog = reactive({
      visiableDialog: false,
      visiableDetail: false,
      visiableTaskSchedue: false,
      visiableModify: false,
      visiableDynamic: false,
      visiabletranform: false
    })
    const beforeAvatarsUpload = (args: any, model: any) => {
      if (
        args.file.name.indexOf('.jpg') > -1 ||
        args.file.name.indexOf('.png') > -1 ||
        args.file.name.indexOf('.jpeg') > -1
      ) {
        const uid = args.file.uid
        uploadIOFilesApi({
          serverName: 'evaluate',
          tableName: 'evaluate',
          urlName: `evaluateurl`,
          multipartFiles: args.file
        }).then(x => {
          if (x.data.success) {
            const temp = model.list.find(x => x.uid == uid)
            temp.url = x.data.data
          }
        })

        // dialogModel.value[`db_${model.filekey}Name`] = args.file.name

        return true
      }
      return false
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
    const addModelProp = []
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
        name: '任务类型',
        dbkey: 'db_taskTypeCode',
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
      delete ars.ui_typeTask
      currentData.value = ars
      currentData.value.score = 5
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

    const passBySuperior = (arg, closeFn) => {
      let imgs = (arg.list || []).map(x => x.url).join(',')
      let evaluation = JSON.stringify({
        content: arg.content || '',
        imgUrls: imgs,
        score: arg.score
      })
      evaluateTaskApi({
        db_id: arg.db_id,
        db_evaluation: evaluation
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
          x => x.dbkey == 'db_taskTypeCode'
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
      passOrder,
      beforeAvatarsUpload
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
    &.images {
      width: 100% !important;
      flex-wrap: nowrap !important;
      align-items: flex-start !important;
      > div {
        width: 100% !important;
      }
    }
    > div {
      width: 180px !important;
      margin-left: 10px;
    }
  }
}
</style>
