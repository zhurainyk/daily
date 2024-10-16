<template>
  <div
    class="page-list"
    :class="InsureListAll ? 'insure-body-all' : 'insure-body'"
  >
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :save-api="savestartApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :dialogMount="dialogMount"
      :showNewPorp="haveNewBtn"
      :showActionEditPorp="false"
      :showActionDeletePorp="false"
      :show-h-check-box-porp="
        InsuresettleAudit || InsurePayComfirm || Insurefiling
      "
      :isClearCheckBox="true"
    >
      <template #searchHead="{ addBtn, newFn }">
        <authority-button
          type="primary"
          @click="newFn"
          class="auto-new-list"
          api-url="/elevator_order/iinsuranceInfo/start"
          v-if="haveNewBtn && InsureList"
          >新建</authority-button
        >
        <authority-button
          type="primary"
          @click="newFn"
          class="auto-new-list"
          api-url="/elevator_order/iinsuranceInfo/launch"
          v-if="haveNewBtn && InsureInsuList"
          >新建</authority-button
        >
      </template>
      <template #actionOhther="{ scope }">
        <span class="edit auto-edit" @click="editDetailtFn(scope.row)"
          >详情</span
        >
      </template>
      <template
        #searchHead="{ selectedList, searchBtnList }"
        v-if="InsuresettleAudit || InsurePayComfirm || Insurefiling"
      >
        <div>
          <el-button
            type="primary"
            @click="modifyMessage(selectedList, searchBtnList)"
          >
            <span v-if="InsuresettleAudit">批量结算</span>
            <span v-if="InsurePayComfirm">批量确认</span>
            <span v-if="Insurefiling">批量归档</span>
          </el-button>
        </div>
      </template>
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'
import { orderBy } from 'lodash'
import {
  getProjectMapLoginApi,
  getPropCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getInsuCompanyMapLoginApi
} from '@/api/module/login'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  savestartApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  plSettleAuditApi,
  plPayComfirmApi,
  plFilingApi,
  launchApi
} from '@/api/module/insuranceInfo'
import ListComponet from '@/components/singlelist'
import { Elevator_InsuranceInfo } from '@/module.ts/Elevator_InsuranceInfo'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const tempRoute = useRoute()

    const modelData = new Elevator_InsuranceInfo()
    if (tempRoute.query) {
      Object.entries<string>(tempRoute.query).forEach(([key, v]) => {
        modelData[key] = v
      })
    }
    modelData.web_state = ''
    modelData.db_state = tempRoute.meta.status || ''

    const InsureList = tempRoute.name == 'InsureList'
    const InsureInsuList = tempRoute.name == 'InsureInsuList' //非物业发起
    const InsureOnSite = tempRoute.name == 'InsureOnSite'
    const InsureSubmitPlan = tempRoute.name == 'InsureSubmitPlan'
    const InsureAudit = tempRoute.name == 'InsureAudit'
    const InsureTLAudit = tempRoute.name == 'InsureTLAudit'
    const InsureInuserAudit = tempRoute.name == 'InsureInuserAudit'
    const Insurequotation = tempRoute.name == 'Insurequotation'
    const InsurequotationTLAudit = tempRoute.name == 'InsurequotationTLAudit'
    const InsureassessLoss = tempRoute.name == 'InsureassessLoss'
    const InsurefinishTLComfirm = tempRoute.name == 'InsurefinishTLComfirm'
    const InsuresettleAudit = tempRoute.name == 'InsuresettleAudit'
    const InsurePayComfirm = tempRoute.name == 'InsurePayComfirm'
    const Insurefiling = tempRoute.name == 'Insurefiling'
    const InsureListAll = computed(() => tempRoute.name == 'InsureAllList')
    let searchwheretable: any = []
    let searchwhereArr: any = []
    if (InsureSubmitPlan) {
      searchwheretable = [
        {
          dbkey: 'ui_onSiteTime',
          name: '勘验时间'
        }
      ]
      searchwhereArr = [
        {
          name: '勘验时间',
          dbkey: 'ui_start_onSiteTime',
          isreuqired: true,
          isSelect: true,
          multiple: true,
          multipledata: [],
          type: 'daterange',
          list: [],
          changefn: (args: any, addModel, x, dialogModel) => {
            if (args) {
              dialogModel.ui_start_onSiteTime = args[0]
              dialogModel.ui_end_onSiteTime = args[1]
            } else {
              dialogModel.ui_start_onSiteTime = ''
              dialogModel.ui_end_onSiteTime = ''
            }
          }
        }
      ]
    } else if (InsureAudit || InsureTLAudit || InsureInuserAudit) {
      if (InsureAudit) {
        modelData.db_maintPlanPropAuditState = '00'
      } else if (InsureTLAudit) {
        modelData.db_maintPlanTLAuditState = '00'
      } else {
        modelData.db_maintPlanInsuAuditState = '00'
      }

      searchwheretable = [
        {
          dbkey: 'ui_maintPlanSubmitTime',
          name: '方案时间'
        }
      ]
      searchwhereArr = [
        {
          name: '方案时间',
          dbkey: 'ui_start_maintPlanSubmitTime',
          isreuqired: true,
          isSelect: true,
          multiple: true,
          multipledata: [],
          type: 'daterange',
          list: [],
          changefn: (args: any, addModel, x, dialogModel) => {
            if (args) {
              dialogModel.ui_start_maintPlanSubmitTime = args[0]
              dialogModel.ui_end_maintPlanSubmitTime = args[1]
            } else {
              dialogModel.ui_start_maintPlanSubmitTime = ''
              dialogModel.ui_end_maintPlanSubmitTime = ''
            }
          }
        }
      ]
    } else if (Insurequotation) {
      searchwheretable = [
        {
          dbkey: 'ui_maintPlanPropAuditTime',
          name: '物业审核时间'
        },
        {
          dbkey: 'ui_maintPlanTLAuditTime',
          name: '平台审核时间'
        },
        {
          dbkey: 'ui_maintPlanInsuAuditTime',
          name: '保险审核时间'
        }
      ]
      searchwhereArr = [
        {
          name: '物业审核时间',
          dbkey: 'ui_start_maintPlanPropAuditTime',
          isreuqired: true,
          isSelect: true,
          multiple: true,
          multipledata: [],
          type: 'daterange',
          list: [],
          changefn: (args: any, addModel, x, dialogModel) => {
            if (args) {
              dialogModel.ui_start_maintPlanPropAuditTime = args[0]
              dialogModel.ui_end_maintPlanPropAuditTime = args[1]
            } else {
              dialogModel.ui_start_maintPlanPropAuditTime = ''
              dialogModel.ui_end_maintPlanPropAuditTime = ''
            }
          }
        },
        {
          name: '平台审核时间',
          dbkey: 'ui_start_maintPlanTLAuditTime',
          isreuqired: true,
          isSelect: true,
          multiple: true,
          multipledata: [],
          type: 'daterange',
          list: [],
          changefn: (args: any, addModel, x, dialogModel) => {
            if (args) {
              dialogModel.ui_start_maintPlanTLAuditTime = args[0]
              dialogModel.ui_end_maintPlanTLAuditTime = args[1]
            } else {
              dialogModel.ui_start_maintPlanTLAuditTime = ''
              dialogModel.ui_end_maintPlanTLAuditTime = ''
            }
          }
        },
        {
          name: '保险审核时间',
          dbkey: 'ui_start_maintPlanInsuAuditTime',
          isreuqired: true,
          isSelect: true,
          multiple: true,
          multipledata: [],
          type: 'daterange',
          list: [],
          changefn: (args: any, addModel, x, dialogModel) => {
            if (args) {
              dialogModel.ui_start_maintPlanInsuAuditTime = args[0]
              dialogModel.ui_end_maintPlanInsuAuditTime = args[1]
            } else {
              dialogModel.ui_start_maintPlanInsuAuditTime = ''
              dialogModel.ui_end_maintPlanInsuAuditTime = ''
            }
          }
        }
      ]
    } else if (InsurequotationTLAudit) {
      searchwheretable = [
        {
          dbkey: 'ui_quotationSubmitTime',
          name: '报价时间'
        }
      ]
      searchwhereArr = [
        {
          name: '报价时间',
          dbkey: 'ui_start_quotationSubmitTime',
          isreuqired: true,
          isSelect: true,
          multiple: true,
          multipledata: [],
          type: 'daterange',
          list: [],
          changefn: (args: any, addModel, x, dialogModel) => {
            if (args) {
              dialogModel.ui_start_quotationSubmitTime = args[0]
              dialogModel.ui_end_quotationSubmitTime = args[1]
            } else {
              dialogModel.ui_start_quotationSubmitTime = ''
              dialogModel.ui_end_quotationSubmitTime = ''
            }
          }
        }
      ]
    } else if (InsureassessLoss) {
      searchwheretable = [
        {
          dbkey: 'ui_quotationTLAuditTime',
          name: '初审报价时间'
        }
      ]
      searchwhereArr = [
        {
          name: '初审报价时间',
          dbkey: 'ui_start_quotationTLAuditTime',
          isreuqired: true,
          isSelect: true,
          multiple: true,
          multipledata: [],
          type: 'daterange',
          list: [],
          changefn: (args: any, addModel, x, dialogModel) => {
            if (args) {
              dialogModel.ui_start_quotationTLAuditTime = args[0]
              dialogModel.ui_end_quotationTLAuditTime = args[1]
            } else {
              dialogModel.ui_start_quotationTLAuditTime = ''
              dialogModel.ui_end_quotationTLAuditTime = ''
            }
          }
        }
      ]
    } else if (InsurefinishTLComfirm) {
      searchwheretable = [
        {
          dbkey: 'ui_assessLossTime',
          name: '定责定损时间'
        }
      ]
      searchwhereArr = [
        {
          name: '定责定损时间',
          dbkey: 'ui_start_assessLossTime',
          isreuqired: true,
          isSelect: true,
          multiple: true,
          multipledata: [],
          type: 'daterange',
          list: [],
          changefn: (args: any, addModel, x, dialogModel) => {
            if (args) {
              dialogModel.ui_start_assessLossTime = args[0]
              dialogModel.ui_end_assessLossTime = args[1]
            } else {
              dialogModel.ui_start_assessLossTime = ''
              dialogModel.ui_end_assessLossTime = ''
            }
          }
        }
      ]
    } else if (InsuresettleAudit) {
      searchwheretable = [
        {
          dbkey: 'ui_finishTLComfirmTime',
          name: '完成维修时间'
        }
      ]
      searchwhereArr = [
        {
          name: '完成维修时间',
          dbkey: 'ui_start_finishTLComfirmTime',
          isreuqired: true,
          isSelect: true,
          multiple: true,
          multipledata: [],
          type: 'daterange',
          list: [],
          changefn: (args: any, addModel, x, dialogModel) => {
            if (args) {
              dialogModel.ui_start_finishTLComfirmTime = args[0]
              dialogModel.ui_end_settleAuditTime = args[1]
            } else {
              dialogModel.ui_start_finishTLComfirmTime = ''
              dialogModel.ui_end_settleAuditTime = ''
            }
          }
        }
      ]
    } else if (InsurePayComfirm) {
      searchwheretable = [
        {
          dbkey: 'ui_settleAuditTime',
          name: '审核结算时间'
        }
      ]
      searchwhereArr = [
        {
          name: '审核结算时间',
          dbkey: 'ui_start_settleAuditTime',
          isreuqired: true,
          isSelect: true,
          multiple: true,
          multipledata: [],
          type: 'daterange',
          list: [],
          changefn: (args: any, addModel, x, dialogModel) => {
            if (args) {
              dialogModel.ui_start_settleAuditTime = args[0]
              dialogModel.ui_end_settleAuditTime = args[1]
            } else {
              dialogModel.ui_start_settleAuditTime = ''
              dialogModel.ui_end_settleAuditTime = ''
            }
          }
        }
      ]
    } else if (Insurefiling) {
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
      ]
    } else if (InsureListAll.value) {
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
    const modifyMessage = (args: Array<any>, searchFn) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选记录')
      } else {
        const tempIds = args.map((x: any) => x.db_id).join(',')
        if (InsuresettleAudit) {
          ElMessageBox.prompt('结算审核意见', '', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            inputType: 'textarea'
          }).then(({ value }) => {
            plSettleAuditApi({
              db_id: tempIds,
              db_settleAuditNote: value
            }).then(x => {
              if (x.data.success) {
                ElMessage({
                  type: 'success',
                  message: `成功`
                })
                searchFn()
              } else {
                ElMessage({
                  type: 'error',
                  message: x.data.message || `失败`
                })
              }
            })
          })
        } else if (InsurePayComfirm) {
          ElMessageBox.prompt('支付确认意见', '', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            inputType: 'textarea'
          }).then(({ value }) => {
            plPayComfirmApi({
              db_id: tempIds,
              db_payComfirmNote: value
            }).then(x => {
              if (x.data.success) {
                ElMessage({
                  type: 'success',
                  message: `成功`
                })
                searchFn()
              } else {
                ElMessage({
                  type: 'error',
                  message: x.data.message || `失败`
                })
              }
            })
          })
        } else if (Insurefiling) {
          ElMessageBox.confirm('确认归档', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
            draggable: true
          })
            .then(() => {
              plFilingApi({
                db_id: tempIds
              }).then(x => {
                if (x.data.success) {
                  ElMessage({
                    type: 'success',
                    message: `成功`
                  })
                  searchFn()
                } else {
                  ElMessage({
                    type: 'error',
                    message: x.data.message || `失败`
                  })
                }
              })
            })
            .catch(() => {})
        }
      }
    }
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
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '故障发生时间',
        dbkey: 'db_faultOccurTime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        list: [],
        disableddate: date => {
          if (moment(date) > moment()) return true
          return false
        }
      },
      {
        name: '故障描述',
        dbkey: 'db_faultDesc',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 4, maxRows: 14 }
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
    let tempSearch =
      tempRoute.name == 'InsureAllList' || InsureList
        ? [
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
        : []

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

    const haveNewBtn = computed(() => !!tempRoute.meta.haveNew)
    const dialogMount = dialogModel => {
      dialogModel.db_state = '03'
      if (InsureInsuList) {
        dialogModel.db_state = '02'
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
      selectByAllTypeApi({ constType: 'insuranceState' }).then(x => {
        const temp: any = searchWhereModelProp.find(x => x.dbkey == 'web_state')
        if (temp) {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            temp?.list.push({
              value: key,
              label: v
            })
          })
          if (InsureList) {
            temp.list = orderBy(
              temp?.list.filter(
                x =>
                  x.value != '01' &&
                  x.value != '16' &&
                  x.value != '17' &&
                  x.value != '15'
              ),
              ['value'],
              ['asc']
            )
          } else {
            temp.list = orderBy(
              temp?.list.filter(x => x.value != '01'),
              ['value'],
              ['asc']
            )
          }
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
      haveNewBtn,
      InsureList,
      InsureOnSite,
      InsureSubmitPlan,
      InsureAudit,
      InsureTLAudit,
      InsureInuserAudit,
      Insurequotation,
      InsurequotationTLAudit,
      InsureassessLoss,
      InsurefinishTLComfirm,
      InsuresettleAudit,
      InsurePayComfirm,
      Insurefiling,
      InsureListAll,
      modifyMessage,
      InsureInsuList
    }
  }
})
</script>

<style lang="scss" scoped>
.insure-body {
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
