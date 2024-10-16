<template>
  <div class="page-list insure-body">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :save-api="savestartApi"
      :update-by-id-api="updateByIdApi"
      :select-by-id-api="selectByIdApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :dialogMount="dialogMount"
      :showNewPorp="false"
      :showActionDeletePorp="false"
      :fullscreen="true"
      :maxwidth="true"
    >
      <template #actionOhther="{ scope }">
        <div class="edit-last">
          <span
            class="edit auto-edit"
            @click="openuploadFileDialog('03', scope.row)"
          >
            勘验信息</span
          >
          <span
            class="edit auto-edit"
            @click="openuploadFileDialog('04', scope.row)"
          >
            维修方案</span
          >
          <span
            class="edit auto-edit"
            @click="openuploadFileDialog('06', scope.row)"
          >
            报价信息</span
          >
          <span class="edit auto-edit" @click="openupEditDialog(scope.row)">
            维修图片</span
          >
          <span class="edit auto-edit" @click="editDetailtFn(scope.row)"
            >详情</span
          >
        </div>
      </template>
      <template #searchHead="{ searchBtnList }">
        <div class="search-where">
          <authority-button
            type="primary"
            api-url="/elevator_order/iinsuranceInfo/saveList"
            @click="insuranceInfoTemlepteApi"
            >模板下载</authority-button
          >

          <el-upload
            :show-file-list="false"
            :auto-upload="true"
            :http-request="
              (...argument) =>
                beforeAvatarUploadFile(...argument, null, searchBtnList)
            "
          >
            <authority-button
              type="primary"
              api-url="/elevator_order/iinsuranceInfo/saveList"
              >导入</authority-button
            >
          </el-upload>
        </div>
      </template>
    </ListComponet>
  </div>
  <el-dialog
    v-if="dialog.visiableDialog"
    v-model="dialog.visiableDialog"
    :class="currentstate == '04' ? 'min-dialog' : 'max-dialog'"
    :show-close="false"
    top="2vw"
  >
    <AddSelfImgVue
      :typebtn="currentstate"
      :db_id="currentdb_id"
      @close-dialog="dialog.visiableDialog = false"
    ></AddSelfImgVue>
  </el-dialog>

  <el-dialog
    v-if="dialog.visiableModify"
    v-model="dialog.visiableModify"
    class="min-dialog"
    :show-close="false"
  >
    <Modify
      :current-data="modelDataEdit"
      :update-by-id-api="updateByIdApi"
      :select-by-id-api="selectByIdApi"
      :add-model="addModePropUpdateEdit"
      @close="dialog.visiableModify = false"
    >
      <template #headtitle>
        <label>维修后图片</label>
      </template>
    </Modify>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { orderBy } from 'lodash'
import {
  getProjectMapLoginApi,
  getPropCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getInsuCompanyMapLoginApi
} from '@/api/module/login'
import { insuranceInfoTemlepteApi } from '@/api/module/importExcel'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  savestartApi,
  saveListApi,
  updateByIdApi,
  selectByIdApi
} from '@/api/module/insuranceInfo'
import ListComponet from '@/components/singlelist'
import { Elevator_InsuranceInfo } from '@/module.ts/Elevator_InsuranceInfo'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'
import AddSelfImgVue from './components/AddSelfImg'
import Modify from '@/components/singlelist/components/addEdit'

export default defineComponent({
  components: { ListComponet, AddSelfImgVue, Modify },
  setup() {
    const { showError } = useNormalValidateRespone()
    const tempRoute: any = useRoute()
    const modelData = new Elevator_InsuranceInfo()
    const modelDataEdit = new Elevator_InsuranceInfo()
    modelData.web_state = ''
    modelData.db_state = tempRoute.meta.status || ''

    const InsureListAll = computed(() => tempRoute.name == 'InsureAllList')
    let searchwheretable: any = []
    let searchwhereArr: any = []
    const dialog = reactive({
      visiableDialog: false,
      visiableModify: false
    })
    const currentstate = ref('')
    const currentdb_id = ref('')
    const openuploadFileDialog = (arg, row) => {
      currentstate.value = arg
      currentdb_id.value = row.db_id
      dialog.visiableDialog = true
    }
    const openupEditDialog = row => {
      modelDataEdit.db_id = row.db_id
      dialog.visiableModify = true
    }
    searchwheretable = [
      {
        dbkey: 'ui_payComfirmTime',
        name: '支付确认时间'
      }
    ]
    searchwhereArr = [
      {
        name: '支付确认时间',
        dbkey: 'ui_start_ComfirmTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_ComfirmTime = args[0]
            dialogModel.ui_end_ComfirmTime = args[1]
          } else {
            dialogModel.ui_start_ComfirmTime = ''
            dialogModel.ui_end_ComfirmTime = ''
          }
        }
      }
      // {
      //   name: '方案时间',
      //   dbkey: 'ui_start_maintPlanSubmitTime',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: true,
      //   multipledata: [],
      //   type: 'daterange',
      //   list: [],
      //   changefn: (args: any, addModel, x, dialogModel) => {
      //     if (args) {
      //       dialogModel.ui_start_maintPlanSubmitTime = args[0]
      //       dialogModel.ui_end_maintPlanSubmitTime = args[1]
      //     } else {
      //       dialogModel.ui_start_maintPlanSubmitTime = ''
      //       dialogModel.ui_end_maintPlanSubmitTime = ''
      //     }
      //   }
      // },

      // {
      //   name: '报价时间',
      //   dbkey: 'ui_start_quotationSubmitTime',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: true,
      //   multipledata: [],
      //   type: 'daterange',
      //   list: [],
      //   changefn: (args: any, addModel, x, dialogModel) => {
      //     if (args) {
      //       dialogModel.ui_start_quotationSubmitTime = args[0]
      //       dialogModel.ui_end_quotationSubmitTime = args[1]
      //     } else {
      //       dialogModel.ui_start_quotationSubmitTime = ''
      //       dialogModel.ui_end_quotationSubmitTime = ''
      //     }
      //   }
      // },
      // {
      //   name: '报价审核时间',
      //   dbkey: 'ui_start_quotationTLAuditTime',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: true,
      //   multipledata: [],
      //   type: 'daterange',
      //   list: [],
      //   changefn: (args: any, addModel, x, dialogModel) => {
      //     if (args) {
      //       dialogModel.ui_start_quotationTLAuditTime = args[0]
      //       dialogModel.ui_end_quotationTLAuditTime = args[1]
      //     } else {
      //       dialogModel.ui_start_quotationTLAuditTime = ''
      //       dialogModel.ui_end_quotationTLAuditTime = ''
      //     }
      //   }
      // },
      // {
      //   name: '定责定损时间',
      //   dbkey: 'ui_start_assessLossTime',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: true,
      //   multipledata: [],
      //   type: 'daterange',
      //   list: [],
      //   changefn: (args: any, addModel, x, dialogModel) => {
      //     if (args) {
      //       dialogModel.ui_start_assessLossTime = args[0]
      //       dialogModel.ui_end_assessLossTime = args[1]
      //     } else {
      //       dialogModel.ui_start_assessLossTime = ''
      //       dialogModel.ui_end_assessLossTime = ''
      //     }
      //   }
      // },
      // {
      //   name: '完成维修时间',
      //   dbkey: 'ui_start_finishTLComfirmTime',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: true,
      //   multipledata: [],
      //   type: 'daterange',
      //   list: [],
      //   changefn: (args: any, addModel, x, dialogModel) => {
      //     if (args) {
      //       dialogModel.ui_start_finishTLComfirmTime = args[0]
      //       dialogModel.ui_end_settleAuditTime = args[1]
      //     } else {
      //       dialogModel.ui_start_finishTLComfirmTime = ''
      //       dialogModel.ui_end_settleAuditTime = ''
      //     }
      //   }
      // },
      // {
      //   name: '审核结算时间',
      //   dbkey: 'ui_start_settleAuditTime',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: true,
      //   multipledata: [],
      //   type: 'daterange',
      //   list: [],
      //   changefn: (args: any, addModel, x, dialogModel) => {
      //     if (args) {
      //       dialogModel.ui_start_settleAuditTime = args[0]
      //       dialogModel.ui_end_settleAuditTime = args[1]
      //     } else {
      //       dialogModel.ui_start_settleAuditTime = ''
      //       dialogModel.ui_end_settleAuditTime = ''
      //     }
      //   }
      // }
    ]
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
        dbkey: 'ui_createUserName',
        name: '创建人'
      },
      {
        dbkey: 'ui_createtime',
        name: '创建时间'
      },
      ...searchwheretable,
      {
        dbkey: 'ui_stateDesc',
        name: '状态'
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
        list: [],
        changefn: changeElevartor
      },
      // {
      //   name: '召修分类',
      //   dbkey: 'db_callRepairClassifyCode',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectByAllTypeApi,
      //   fnArgs: { constType: 'callrepair_classify' }
      // },
      // {
      //   name: '故障原因分析',
      //   dbkey: 'db_faultReasonAnalysis',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectByAllTypeApi,
      //   fnArgs: { constType: 'fault_reasonAnalysis' }
      // },
      {
        name: '故障来源',
        dbkey: 'db_faultSrcCode',
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
        multipledata: [],
        type: 'datetime',
        list: []
      },
      {
        name: '故障发生时间',
        dbkey: 'db_faultOccurTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        list: []
      },
      {
        name: '故障描述',
        dbkey: 'db_faultDesc',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },
      {
        name: '回召任务Id',
        dbkey: 'db_taskId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '创建人员',
        dbkey: 'db_createUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },
      {
        name: '勘验人员',
        dbkey: 'db_createUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },
      {
        name: '维修方案制定人员',
        dbkey: 'db_maintPlanUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },
      {
        name: '维修方案物业审核人员',
        dbkey: 'db_maintPlanPropAuditUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },
      {
        name: '维修方案平台审核人员',
        dbkey: 'db_maintPlanTLAuditUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },
      {
        name: '维修方案保险审核人员',
        dbkey: 'db_maintPlanInsuAuditUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },
      {
        name: '维修方案物业审核状态',
        dbkey: 'db_maintPlanPropAuditState',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'auditState' },
        list: []
      },
      {
        name: '维修方案平台审核状态',
        dbkey: 'db_maintPlanTLAuditState',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'auditState' },
        list: []
      },
      {
        name: '维修方案保险审核状态',
        dbkey: 'db_maintPlanInsuAuditState',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'auditState' },
        list: []
      },
      {
        name: '维修方案物业审核意见',
        dbkey: 'db_maintPlanPropAuditNote',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },
      {
        name: '维修方案平台审核意见',
        dbkey: 'db_maintPlanTLAuditNote',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },
      {
        name: '维修方案保险审核意见',
        dbkey: 'db_maintPlanInsuAuditNote',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },
      {
        name: '报价方案制定人员',
        dbkey: 'db_quotationUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },
      {
        name: '报价方案平台审核人员',
        dbkey: 'db_quotationTLAuditUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },
      {
        name: '报价方案平台审核意见',
        dbkey: 'db_quotationTLAuditNote',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },

      {
        name: '定损人员',
        dbkey: 'db_assessLossUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },

      {
        name: '定损意见',
        dbkey: 'db_assessLossNote',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },

      {
        name: '维修结束平台确认人员',
        dbkey: 'db_finishTLComfirmUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },

      {
        name: '维修结束平台确认意见',
        dbkey: 'db_finishTLComfirmNote',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },

      {
        name: '审核结算人员',
        dbkey: 'db_settleAuditUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },

      {
        name: '审核结算意见',
        dbkey: 'db_settleAuditNote',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },

      {
        name: '支付确认人员',
        dbkey: 'db_payComfirmUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },

      {
        name: '支付确认意见',
        dbkey: 'db_payComfirmNote',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },

      {
        name: '归档操作人员',
        dbkey: 'db_filingUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_Account' },
        list: []
      },

      {
        name: '创建时间',
        dbkey: 'db_createtime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '勘验时间',
        dbkey: 'db_onSiteTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '维修方案提交时间',
        dbkey: 'db_maintPlanSubmitTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '维修方案物业审核时间',
        dbkey: 'db_maintPlanPropAuditTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '维修方案平台审核时间',
        dbkey: 'db_maintPlanTLAuditTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '维修方案保险审核时间',
        dbkey: 'db_maintPlanInsuAuditTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '报价方案提交时间',
        dbkey: 'db_quotationSubmitTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '报价方案平台审核时间',
        dbkey: 'db_quotationTLAuditTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '定损时间',
        dbkey: 'db_assessLossTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '维修结束平台确认时间',
        dbkey: 'db_finishTLComfirmTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '审核结算时间',
        dbkey: 'db_settleAuditTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '支付确认时间',
        dbkey: 'db_payComfirmTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '完成时间',
        dbkey: 'db_dealEndtime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '归档时间',
        dbkey: 'db_filingTime',
        isreuqired: false,
        isSelect: true,
        type: 'datetime',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '现场勘验json',
        dbkey: 'db_onSiteImgUrls',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },

      {
        name: '维修方案json',
        dbkey: 'db_maintPlan',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },

      {
        name: '报价方案json',
        dbkey: 'db_quotation',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },

      {
        name: '残值处理方式',
        dbkey: 'db_scrapValueDeal',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'scrapValueDeal' },
        list: []
      },

      {
        name: '残值',
        dbkey: 'db_scrapValue',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '状态',
        dbkey: 'db_state',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'insuranceState' },
        list: []
      },

      {
        name: '预计完成天数',
        dbkey: 'db_preDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '完成耗时(秒)',
        dbkey: 'db_dealEndDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'number'
      },

      {
        name: '换件明细清单json',
        dbkey: 'db_partList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },

      {
        name: '配件费',
        dbkey: 'db_partCost',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '工时费',
        dbkey: 'db_manhourCost',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '合计费用',
        dbkey: 'db_totalCost',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '流转记录json',
        dbkey: 'db_flowRecords',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },
      {
        name: '备注',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      },
      {
        name: '维修后图片',
        dbkey: 'db_maintAfterImgUrls',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'imgs'
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
    }
    const $router = useRouter()
    const editDetailtFn = args => {
      $router.push({
        name: `${tempRoute.name}Detail`,
        params: {
          id: args.db_id
        }
      })
    }
    const changeStatus = (val, searchwhereProp, item, searchWhere) => {
      if (val) {
        searchWhere.db_state = val
      } else {
        searchWhere.db_state = item.list.map(x => x.value).join(',')
      }
    }
    let tempSearch = [
      {
        name: '状态',
        dbkey: 'web_state',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        changefn: changeStatus
      }
    ]
    const beforeAvatarUploadFile = (args: any, model: any, fn) => {
      saveListApi({}, { multipartFile: args.file }).then(x => {
        if (x.data.success) {
          if (showError(x.data.data)) {
            ElMessage.success('上传成功')
            fn()
          }
        } else {
          ElMessage.error('上传失败')
        }
      })
    }
    const searchWhereModelProp = reactive([
      {
        name: '项目名',
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
        name: '电梯名',
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
      ...searchwhereArr,
      ...tempSearch
    ])

    const dialogMount = (dialogModel, addModel) => {
      if (dialogModel.db_projectId) {
        const elevator = new Elevator_Elevator()
        const tempItem = addModel.find((x: any) => x.dbkey == 'db_elevId')
        elevator.db_projectId = dialogModel.db_projectId
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
    const addModePropUpdateEdit = reactive([
      {
        name: '维修后图片',
        dbkey: 'db_maintAfterImgUrls',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'imgs'
      }
    ])
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
      selectByAllTypeApi({ constType: 'insuranceState' }).then(x => {
        const temp: any = searchWhereModelProp.find(x => x.dbkey == 'web_state')
        if (temp) {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            temp?.list.push({
              value: key,
              label: v
            })
          })
          temp.list = orderBy(
            temp?.list.filter(x => x.value != '01'),
            ['value'],
            ['asc']
          )
        }
      })

      selectByAllTypeApi({ constType: 'faultSrc' }).then(x => {
        const temp: any = addModelProp.find(x => x.dbkey == 'db_faultSrcCode')
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          if (key != '01') {
            temp?.list.push({
              value: key,
              label: v
            })
          }
        })
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
    })
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      changeProject,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      savestartApi,
      dialogMount,
      editDetailtFn,
      InsureListAll,
      insuranceInfoTemlepteApi,
      beforeAvatarUploadFile,
      updateByIdApi,
      selectByIdApi,
      currentstate,
      currentdb_id,
      openuploadFileDialog,
      dialog,
      modelDataEdit,
      addModePropUpdateEdit,
      openupEditDialog
    }
  }
})
</script>

<style lang="scss" scoped>
.insure-body {
  .edit-last {
    display: flex;
    flex-wrap: wrap;
    > span {
      width: 100%;
      text-align: center;
    }
  }
  &.page-list {
    :deep().page-body {
      height: calc(100% - 240px);
    }
  }
}
.insure-body-all {
  &.page-list {
    :deep().page-body {
      height: calc(100% - 320px);
    }
  }
}
</style>
