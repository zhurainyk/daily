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
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :dialog-mount="dialogMount"
      :pagesizes="[50, 100, 200, 300]"
      :default-page-size="50"
      :is-clear-check-box="true"
      :show-h-check-box-porp="true"
      ref="listRef"
    >
      <!-- <template #detailaction="{ scope }">
        <div>
          <span class="edit auto-detail">专家建议</span>
          <span class="edit auto-detail"></span>
          <span class="edit auto-detail"></span>
          <span class="edit auto-detail"></span>
        </div>
      </template> -->
      <template #searchHead="{ exportExcel, addBtn, selectedList }">
        <div>
          <el-button type="primary" @click="openModifyDialog(selectedList)"
            >批量修改</el-button
          >
          <el-button
            v-if="addBtn"
            type="primary"
            class="auto-new-list"
            @click="openAddIssueDialog(selectedList)"
            >新建专家建议</el-button
          >
          <el-button
            v-if="addBtn"
            type="primary"
            class="auto-new-list"
            @click="openAddDynamicDialog(selectedList)"
            >新建动态工作</el-button
          >
          <el-button
            v-if="addBtn"
            type="primary"
            class="auto-new-list"
            @click="openAddBiDialog(selectedList)"
            >新建技术分析</el-button
          >
          <el-button
            v-if="addBtn"
            type="primary"
            class="auto-new-list"
            @click="openAddServiceDialog(selectedList)"
            >新建服务报告</el-button
          >
          <el-button @click="exportExcel" type="primary">导出</el-button>
        </div>
      </template>
      <template #editaction="{ editFn, scope }">
        <span
          v-if="
            scope.row['db_classifyCode'] == 'A' ||
            scope.row['db_classifyCode'] == 'B' ||
            scope.row['db_classifyCode'] == 'C' ||
            scope.row['db_classifyCode'] == 'D'
          "
          class="edit auto-edit"
          @click="editOnlyFn(scope.row)"
          >编辑</span
        >
        <span v-else class="edit auto-edit" @click="editFn(scope.row)"
          >编辑标识</span
        >
      </template>
      <template #deleteaction="{ deleteFn, scope }">
        <span
          class="delete auto-delete"
          v-if="scope.row['db_classifyCode'] == 'A'"
          @click="deleteFn(scope.row)"
          >删除</span
        >
        <span v-else></span>
      </template>
    </ListComponet>
    <el-dialog
      v-if="dialog.visiableIssueDialog"
      v-model="dialog.visiableIssueDialog"
      class="min-dialog"
      :show-close="false"
    >
      <AddEdit
        :current-data="modelDataIssueList"
        :save-api="saveApi"
        :select-by-id-api="selectByIdApi"
        :update-by-id-api="updateByIdApi"
        :add-model="addModelIssueAddProp"
        :dialog-mount="dialogMount"
        @close="dialog.visiableIssueDialog = false"
      >
        <template #headtitle>
          <label>新增专家建议</label>
        </template>
      </AddEdit>
    </el-dialog>

    <el-dialog
      v-if="dialog.visiableDynamicDialog"
      v-model="dialog.visiableDynamicDialog"
      class="min-dialog"
      :show-close="false"
    >
      <AddEdit
        :current-data="modelDynamicData"
        :save-api="saveDynamicApi"
        :add-model="addModelDynamicAddProp"
        :dialog-mount="dialogMount"
        @close="dialog.visiableDynamicDialog = false"
      >
        <template #headtitle>
          <label>新建动态工作</label>
        </template>
      </AddEdit>
    </el-dialog>

    <el-dialog
      v-if="dialog.visiableBiDialog"
      v-model="dialog.visiableBiDialog"
      class="min-dialog"
      :show-close="false"
    >
      <AddEdit
        :current-data="modelBiData"
        :save-api="saveBiApi"
        :add-model="addBiModelProp"
        :dialog-mount="dialogMount"
        @close="dialog.visiableBiDialog = false"
      >
        <template #headtitle>
          <label>新建技术分析</label>
        </template>
      </AddEdit>
    </el-dialog>

    <el-dialog
      v-if="dialog.visiableServiceDialog"
      v-model="dialog.visiableServiceDialog"
      class="min-dialog"
      :show-close="false"
    >
      <AddEdit
        :current-data="modelServerData"
        :save-api="saveServiceApi"
        :add-model="addModelServiceProp"
        :dialog-mount="dialogMount"
        @close="dialog.visiableServiceDialog = false"
      >
        <template #headtitle>
          <label>新建服务报告</label>
        </template>
      </AddEdit>
    </el-dialog>

    <el-dialog
      v-if="dialog.visiableIssueOnlyDialog"
      v-model="dialog.visiableIssueOnlyDialog"
      class="min-dialog"
      :show-close="false"
    >
      <AddEdit
        :current-data="modelOnlyData"
        :save-api="saveApi"
        :select-by-id-api="selectByIdApi"
        :update-by-id-api="updateByIdApi"
        :add-model="addModelOnlyProp"
        @close="dialog.visiableIssueOnlyDialog = false"
        @success="successFn"
      >
        <template #headtitle>
          <label>编辑</label>
        </template>
      </AddEdit>
    </el-dialog>

    <el-dialog
      v-if="dialog.visiableModify"
      v-model="dialog.visiableModify"
      class="min-dialog"
      :show-close="false"
    >
      <AddEdit
        :current-data="modelDataModify"
        dbkey="kkk"
        :save-api="updateLabelByIdListApi"
        :add-model="addModePropUpdate"
        @close="dialog.visiableModify = false"
        @success="successFn"
      >
        <template #headtitle>
          <label>批量修改</label>
        </template>
      </AddEdit>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  updateLabelByIdListApi
} from '@/api/module/issueList'
import { saveApi as saveDynamicApi } from '@/api/module/dynamicWorkIt'
import { saveApi as saveBiApi } from '@/api/module/BICommentArea'
import { saveApi as saveServiceApi } from '@/api/module/serviceReport'
import { selectByConditionApi as selectByConditionForelevatorApi } from '@/api/module/projectManage'
import ListComponet from '@/components/singlelist'
import { Elevator_IssueList } from '@/module.ts/Elevator_IssueList'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getProjectMapLoginApi, getUserMapLoginApi } from '@/api/module/login'
import { Elevator_DynamicWorkItem } from '@/module.ts/Elevator_DynamicWorkItem'
import { Elevator_BICommentArea } from '@/module.ts/Elevator_BICommentArea'
import { Elevator_ServiceReport } from '@/module.ts/Elevator_ServiceReport'
import AddEdit from '@/components/singlelist/components/addEdit'

export default defineComponent({
  components: { ListComponet, AddEdit },
  setup() {
    const modelData = new Elevator_IssueList()
    const modelDataIssueList = new Elevator_IssueList()
    const modelDynamicData = new Elevator_DynamicWorkItem()
    const modelBiData = new Elevator_BICommentArea()
    const modelServerData = new Elevator_ServiceReport()
    const modelOnlyData = ref(new Elevator_IssueList())
    const listRef: any = ref(null)
    const detailTypeCodes: any = []
    const dialog = reactive({
      visiableIssueDialog: false,
      visiableDynamicDialog: false,
      visiableBiDialog: false,
      visiableServiceDialog: false,
      visiableIssueOnlyDialog: false,
      visiableModify: false
    })
    const modelDataModify = {
      db_id: ''
    }
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
        dbkey: 'ui_classify',
        name: '问题分类'
      },
      {
        dbkey: 'ui_detailType',
        name: '问题细分'
      },
      {
        dbkey: 'ui_weight',
        name: '问题权重'
      },
      {
        dbkey: 'ui_dealLabel',
        name: '处理标识'
      },

      {
        dbkey: 'db_dayLabel',
        name: '标识天数'
      },
      {
        dbkey: 'db_note',
        name: '标识描述'
      },
      {
        dbkey: 'ui_dataDate',
        name: '数据日期'
      },
      {
        dbkey: 'ui_createTime',
        name: '创建时间'
      },
      {
        dbkey: 'db_content',
        name: '描述'
      }
    ]
    const changeProjectEdit = (args, addModel, item, dialogModel) => {
      const elevator = new Elevator_Elevator()

      elevator.db_projectId = args
      const tempItem = addModel.find((x: any) => x.dbkey == 'db_elevId')

      if (item) {
        dialogModel.db_elevId = ''
        dialogModel.db_relateId = ''
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
      if (item) {
        dialogModel.db_registCode = ''
        dialogModel.db_projectNum = ''
      }
      if (args) {
        const tempE = item.list.find(x => x.value == args)
        dialogModel.db_registCode = tempE?.db_registCode
        dialogModel.db_projectNum = tempE?.db_id_projectNum
      }
    }
    const successFn = () => {
      listRef.value.searchInit()
    }
    const addModelProp = reactive([
      // {
      //   name: '项目',
      //   dbkey: 'db_projectId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: getProjectMapLoginApi,
      //   fnArgs: {},
      //   changefn: changeProjectEdit
      // },
      // {
      //   name: '电梯',
      //   dbkey: 'db_elevId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   changefn: changeElevartor
      // },
      // {
      //   name: '问题分类',
      //   dbkey: 'db_classifyCode',
      //   isreuqired: true,
      //   isSelect: true,
      //   isDisable: true,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: []
      // },
      // {
      //   name: '问题细分',
      //   dbkey: 'db_detailTypeCode',
      //   isreuqired: true,
      //   isSelect: true,
      //   isDisable: true,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: []
      // },
      // {
      //   name: '数据日期',
      //   dbkey: 'db_dataDate',
      //   isreuqired: true,
      //   isSelect: true,
      //   type: 'date',
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // },

      // {
      //   name: '问题权重',
      //   dbkey: 'db_weightCode',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectByAllTypeApi,
      //   fnArgs: { constType: 'issue_weight' }
      // },

      {
        name: '处理标识',
        dbkey: 'db_dealLabelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'issue_dealLabel' }
      },
      {
        name: '标识天数',
        dbkey: 'db_dayLabel',
        type: 'number',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '描述内容',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'textarea',
        autosize: { minRows: 3, maxRows: 5 },
        multipledata: [],
        list: []
      }
      // {
      //   name: '描述内容',
      //   dbkey: 'db_content',
      //   isreuqired: false,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // }
    ])
    const addModePropUpdate = reactive([
      {
        name: '处理标识',
        dbkey: 'db_dealLabelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'issue_dealLabel' }
      },
      {
        name: '标识天数',
        dbkey: 'db_dayLabel',
        type: 'number',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ])

    const addModelOnlyProp = reactive([
      {
        name: '处理标识',
        dbkey: 'db_dealLabelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            value: '00',
            label: '新建'
          },
          {
            value: '01',
            label: '已解决'
          }
        ]
      }
    ])

    const addModelIssueAddProp = reactive([
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
        list: [],
        changefn: changeElevartor
      },
      {
        name: '描述内容',
        dbkey: 'db_content',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        type: 'textarea',
        autosize: { minRows: 1, maxRows: 5 },
        multipledata: [],
        list: []
      }
    ])

    const addModelDynamicAddProp = reactive([
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
        list: [],
        changefn: changeElevartor
      },
      {
        name: '描述内容',
        dbkey: 'db_content',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ])

    const addBiModelProp = reactive([
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
        list: [],
        changefn: changeElevartor
      },
      {
        name: '创建人',
        dbkey: 'db_createUserId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' }
      },
      {
        name: '描述内容',
        dbkey: 'db_content',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        type: 'textarea',
        autosize: { minRows: 1, maxRows: 5 },
        multipledata: [],
        list: []
      }
    ])

    const addModelServiceProp = reactive([
      {
        name: '项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getProjectMapLoginApi,
        fnArgs: {}
      },
      {
        name: '服务报告类型',
        dbkey: 'db_reportTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'report_type' }
      },
      // {
      //   name: '电梯',
      //   dbkey: 'db_elevId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   changefn: changeElevartor
      // },
      {
        name: '数据日期',
        dbkey: 'db_dataTime',
        isreuqired: true,
        isSelect: true,
        type: 'date',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '描述内容',
        dbkey: 'db_content',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ])
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
      console.log(arg)
    }
    const changeclassifyCode = (arg, searchWhereModelProp, x, searchWhere) => {
      const tempItem = searchWhereModelProp.find(
        (x: any) => x.dbkey == 'db_detailTypeCode'
      )
      searchWhere.db_detailTypeCode = ''
      tempItem.list = []
      if (arg) {
        tempItem.list = detailTypeCodes.filter(x => x.value.startsWith(arg))
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
        name: '问题分类',
        dbkey: 'db_classifyCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        changefn: changeclassifyCode
      },
      {
        name: '问题细分',
        dbkey: 'db_detailTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '处理标识',
        dbkey: 'db_dealLabelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [
          {
            value: '00',
            label: '新建'
          },
          {
            value: '02',
            label: '标识解决'
          }
        ]
      },
      {
        name: '问题权重',
        dbkey: 'db_weightCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '注册码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '数据时间',
        dbkey: 'ui_start_dataDate',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_dataDate = args[0]
            dialogModel.ui_end_dataDate = args[1]
          } else {
            dialogModel.ui_start_dataDate = ''
            dialogModel.ui_end_dataDate = ''
          }
        }
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
      }
    ])
    const openAddIssueDialog = (args: Array<any>) => {
      if (args.length <= 0) {
        modelDataIssueList.db_projectId = ''
        modelDataIssueList.db_elevId = ''
        modelDataIssueList.db_projectNum = ''
      } else {
        modelDataIssueList.db_projectId = args[0].db_projectId
        modelDataIssueList.db_elevId = args[0].db_elevId
        modelDataIssueList.db_projectNum = args[0].db_projectNum
        modelDataIssueList.db_registCode = args[0].db_registCode
      }
      modelDataIssueList.db_classifyCode = 'A'
      modelDataIssueList.db_detailTypeCode = 'A0001'
      modelDataIssueList.db_weightCode = '03'
      modelDataIssueList.db_dealLabelCode = '00'
      modelDataIssueList.db_dayLabel = '0'
      dialog.visiableIssueDialog = true
    }
    const openAddDynamicDialog = (args: Array<any>) => {
      if (args.length <= 0) {
        modelDynamicData.db_projectId = ''
        modelDynamicData.db_elevId = ''
        modelDynamicData.db_projectNum = ''
      } else {
        modelDynamicData.db_projectId = args[0].db_projectId
        modelDynamicData.db_elevId = args[0].db_elevId
        modelDynamicData.db_projectNum = args[0].db_projectNum
        modelDynamicData.db_registCode = args[0].db_registCode
      }
      modelDynamicData.db_dealLabelCode = '00'

      dialog.visiableDynamicDialog = true
    }
    const currentStore = useStore()

    const openAddBiDialog = (args: Array<any>) => {
      if (args.length <= 0) {
        modelBiData.db_projectId = ''
        modelBiData.db_elevId = ''
        modelBiData.db_projectNum = ''
      } else {
        modelBiData.db_projectId = args[0].db_projectId
        modelBiData.db_elevId = args[0].db_elevId
        modelBiData.db_projectNum = args[0].db_projectNum
        modelBiData.db_registCode = args[0].db_registCode
      }
      modelBiData.db_sureLabelCode = '00'
      modelBiData.db_createUserId = currentStore.state.user.userInfo.db_id
      dialog.visiableBiDialog = true
    }
    const openAddServiceDialog = (args: Array<any>) => {
      if (args.length <= 0) {
        modelServerData.db_projectId = ''
        modelServerData.db_elevId = ''
        modelServerData.db_projectNum = ''
      } else {
        modelServerData.db_projectId = args[0].db_projectId
        // modelServerData.db_elevId = args[0].db_elevId
        // modelServerData.db_projectNum = args[0].db_projectNum
        // modelServerData.db_registCode = args[0].db_registCode
      }

      dialog.visiableServiceDialog = true
    }
    const editOnlyFn = arg => {
      modelOnlyData.value = arg
      dialog.visiableIssueOnlyDialog = true
    }
    const dialogMount = (dialogModel, addModel) => {
      changeProjectEdit(dialogModel.db_projectId, addModel, null, dialogModel)
    }
    const openModifyDialog = (args: Array<any>) => {
      const tempid_arrs = args
        .filter(
          x =>
            !(
              x.db_classifyCode == 'A' ||
              x.db_classifyCode == 'B' ||
              x.db_classifyCode == 'C' ||
              x.db_classifyCode == 'D'
            )
        )
        .map(x => x.db_id)
      if (tempid_arrs.length <= 0) {
        ElMessage.warning('勾选条目')
      } else {
        modelDataModify.db_id = tempid_arrs.join(',')
        dialog.visiableModify = true
      }
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

      selectByAllTypeApi({ constType: 'A_detailType' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          detailTypeCodes.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllTypeApi({ constType: 'B_detailType' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          detailTypeCodes.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'C_detailType' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          detailTypeCodes.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'D_detailType' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          detailTypeCodes.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'E_detailType' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          detailTypeCodes.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllTypeApi({ constType: 'F_detailType' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          detailTypeCodes.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'H_detailType' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          detailTypeCodes.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllTypeApi({ constType: 'I_detailType' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          detailTypeCodes.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllTypeApi({ constType: 'J_detailType' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          detailTypeCodes.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'K_detailType' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          detailTypeCodes.push({
            value: key,
            label: v
          })
        })
      })

      // selectByAllTypeApi({ constType: 'issue_dealLabel' }).then(x => {
      //   const temp: any = searchWhereModelProp.find(
      //     x => x.dbkey == 'db_dealLabelCode'
      //   )
      //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //     temp.list.push({
      //       value: key,
      //       label: v
      //     })
      //   })
      // })
      selectByAllTypeApi({ constType: 'issue_weight' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_weightCode'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllTypeApi({ constType: 'issue_classify' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_classifyCode'
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
      addModelIssueAddProp,
      modelDataIssueList,
      openAddIssueDialog,
      modelDynamicData,
      saveDynamicApi,
      addModelDynamicAddProp,
      openAddDynamicDialog,
      modelBiData,
      saveBiApi,
      addBiModelProp,
      openAddBiDialog,
      saveServiceApi,
      modelServerData,
      addModelServiceProp,
      openAddServiceDialog,
      modelOnlyData,
      addModelOnlyProp,
      editOnlyFn,
      listRef,
      successFn,
      openModifyDialog,
      addModePropUpdate,
      modelDataModify,
      updateLabelByIdListApi
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  :deep().page-body {
    height: calc(100% - 230px);
  }

  :deep().page-search {
    padding-bottom: 10px;
  }
}
</style>
