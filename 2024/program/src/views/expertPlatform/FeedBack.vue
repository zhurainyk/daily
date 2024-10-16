<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :save-api="saveApi"
      :update-by-id-api="updateByIdApi"
      :delete-by-id-api="deleteByIdApi"
      :select-by-id-api="selectByIdApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="[]"
      :showActionDeletePorp="false"
      :search-where-model-prop="searchWhereModelProp"
      :showNewPorp="false"
      :showActionEditPorp="false"
      :dialogMount="dialogMount"
    >
      <template #actionOhther="{ scope }">
        <span class="edit auto-edit" @click="commentdialog(scope.row)"
          >回复</span
        >
      </template>
    </ListComponet>
    <el-dialog
      v-if="dialog.visiableDialog"
      v-model="dialog.visiableDialog"
      :show-close="false"
      class="middle-dialog"
    >
      <FeedBackComments
        v-if="dialog.visiableDialog"
        :selectByidApi="selectByIdApi"
        :updateByIdApi="updateByIdApi"
        @close="dialog.visiableDialog = false"
        :currentData="currentData"
      >
      </FeedBackComments>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { getProjectMapLoginApi, getUserMapLoginApi } from '@/api/module/login'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi
} from '@/api/module/feedback'
import ListComponet from '@/components/singlelist'
import { Elevator_Feedback } from '@/module.ts/Elevator_Feedback'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import FeedBackComments from './components/FeedBackComments'

export default defineComponent({
  components: { ListComponet, FeedBackComments },
  setup() {
    const modelData = new Elevator_Feedback()
    const dialog = reactive({
      visiableDialog: false
    })
    const currentData = ref({})
    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名'
      },
      {
        dbkey: 'db_projectNum',
        name: '电梯名'
      },

      {
        dbkey: 'db_registCode',
        name: '电梯注册码'
      },
      {
        dbkey: 'ui_createTime',
        name: '创建时间'
      },
      {
        dbkey: 'ui_createUserName',
        name: '创建人'
      },
      {
        dbkey: 'ui_sureTime',
        name: '确认时间'
      },
      {
        dbkey: 'ui_sureLabel',
        name: '确认标识'
      },
      {
        dbkey: 'ui_sureUserName',
        name: '确认人'
      },
      {
        dbkey: 'db_content',
        name: '描述内容'
      },
      {
        dbkey: 'ui_updateTime',
        name: '更新时间'
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
    const changeElevartor = (args, addModel, item, dialogModel) => {
      const tempItemtask = addModel.find((x: any) => x.dbkey == 'db_relateId')
      tempItemtask.list = []
      tempItemtask.multipledata = []
      if (item) {
        dialogModel.db_registCode = ''
        dialogModel.db_projectNum = ''
      }
      if (args) {
        const tempE = item.list.find(x => x.value == args)
        dialogModel.db_registCode = tempE?.db_registCode
        dialogModel.db_projectNum = tempE?.db_projectNum
      }
    }
    const addModelProp = []
    const changeProject = (arg, searchWhereModelProp, x, searchWhere) => {
      const elevator = new Elevator_Elevator()
      elevator.db_projectId = arg
      const tempItem = searchWhereModelProp.find(
        (x: any) => x.dbkey == 'db_elevId'
      )
      searchWhere.db_elevId = ''

      if (tempItem) {
        tempItem
        tempItem.list = []
        tempItem.multipledata = []
        if (!arg) return
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
    const searchWhereModelProp = reactive([
      {
        name: '项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        changefn: changeProject
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
        name: '确认标识',
        dbkey: 'db_sureLabelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '创建时间',
        dbkey: 'ui_start_createTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_createTime = args[0]
            dialogModel.ui_end_createTime = args[1]
          } else {
            dialogModel.ui_start_createTime = ''
            dialogModel.ui_end_createTime = ''
          }
        }
      },
      {
        name: '确认时间',
        dbkey: 'ui_start_sureTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_sureTime = args[0]
            dialogModel.ui_end_sureTime = args[1]
          } else {
            dialogModel.ui_start_sureTime = ''
            dialogModel.ui_end_sureTime = ''
          }
        }
      },
      {
        name: '更新时间',
        dbkey: 'ui_start_updateTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_updateTime = args[0]
            dialogModel.ui_end_updateTime = args[1]
          } else {
            dialogModel.ui_start_updateTime = ''
            dialogModel.ui_end_updateTime = ''
          }
        }
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
        name: '确认人',
        dbkey: 'db_sureUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ])

    const sysList: any = ref([])
    const dialogMount = (dialogModel, addModel) => {
      changeProjectEdit(dialogModel.db_projectId, addModel, null, dialogModel)
    }
    const commentdialog = arg => {
      currentData.value = arg
      console.log(currentData)
      dialog.visiableDialog = true
    }
    onMounted(() => {
      getProjectMapLoginApi({}).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_projectId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllApi({ tableName: 'Usercenter_Account' }).then(x => {
        if (x.data.success) {
          const tempcreateUser: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_createUserId'
          )
          const tempsureUser: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_sureUserId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempcreateUser.list.push({
              value: key,
              label: v
            })
            tempsureUser.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      selectByAllTypeApi({ constType: 'bi_sureLabel' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_sureLabelCode'
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
      changeProject,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      selectByIdApi,
      dialogMount,
      dialog,
      commentdialog,
      currentData
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  :deep().page-body {
    height: calc(100% - 230px);
  }
}
</style>
