import api from '../create-api'
import apiConfig from '../apiConfig'

/**
 *
 * @param {partNumber} arg
 * @returns
 */
export const saveApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/save',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const updateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const deleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/deleteList',
    'post',
    arg
  )
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/selectCountByCondition',
    'post',
    arg
  )
}

export const insureOnSiteApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/onSite',
    'post',
    arg
  )
}

export const comfirmProceedApi = async arg => {
  // 物业判断需要维修String db_id
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/comfirmProceed',
    'post',
    arg,
    null,
    false
  )
}

export const backComfirmApi = async arg => {
  // String db_id无需维修
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/backComfirm',
    'post',
    arg
  )
}

export const submitMaintPlanApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/submitMaintPlan',
    'post',
    arg
  )
}

export const backToOnSiteApi = async arg => {
  // String db_id无需维修
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/backToOnSite',
    'post',
    arg,
    null,
    false
  )
}

export const maintPlanPropAuditApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/maintPlanPropAudit',
    'post',
    arg
  )
}
export const maintPlanTLAuditApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/maintPlanTLAudit',
    'post',
    arg
  )
}
export const maintPlanInsuAuditApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/maintPlanInsuAudit',
    'post',
    arg
  )
}

export const submitQuotationApi = async arg => {
  // 提交报价方案
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/submitQuotation',
    'post',
    arg
  )
}

export const backMaintPlanApi = async arg => {
  // 回退维修方案
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/backMaintPlan',
    'post',
    arg
  )
}

export const quotationTLAuditPassApi = async arg => {
  // 平台初审报价方案-通过
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/quotationTLAuditPass',
    'post',
    arg
  )
}

export const quotationTLAuditRejectApi = async arg => {
  // 平台初审报价方案-不通过
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/quotationTLAuditReject',
    'post',
    arg
  )
}

export const assessLossPassApi = async arg => {
  // 通过定责定损 待定责定损
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/assessLossPass',
    'post',
    arg
  )
}
export const assessLossRejectApi = async arg => {
  // 通过定责定损 待定责定损
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/assessLossReject',
    'post',
    arg
  )
}

export const finishTLComfirmPassApi = async arg => {
  // 维修结束平台确认通过
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/finishTLComfirmPass',
    'post',
    arg
  )
}
export const finishTLComfirmRejectApi = async arg => {
  // 维修结束平台不通过
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/finishTLComfirmReject',
    'post',
    arg
  )
}

export const settleAuditApi = async arg => {
  // 审核结算
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/settleAudit',
    'post',
    arg
  )
}

export const payComfirmApi = async arg => {
  // 支付确认
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/payComfirm',
    'post',
    arg
  )
}

export const filingApi = async arg => {
  // 归档
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/filing',
    'post',
    arg
  )
}

export const cancelApi = async arg => {
  // 归档
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/cancel',
    'post',
    arg
  )
}

export const plSettleAuditApi = async arg => {
  // 批量审核结算
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/plSettleAudit',
    'post',
    arg,
    null,
    false
  )
}

export const plPayComfirmApi = async arg => {
  // 批量支付确认
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/plPayComfirm',
    'post',
    arg,
    null,
    false
  )
}

export const plFilingApi = async arg => {
  // 批量归档
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/plFiling',
    'post',
    arg,
    null,
    false
  )
}

export const saveListApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/saveList',
    'post',
    arg,
    null,
    false,
    file
  )
}

export const savestartApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/start',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const launchApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/iinsuranceInfo/launch',
    'post',
    arg,
    null,
    true,
    file
  )
}

export default {
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  deleteListApi,
  selectByConditionApi,
  insureOnSiteApi,
  comfirmProceedApi,
  backComfirmApi,
  submitMaintPlanApi,
  backToOnSiteApi,
  maintPlanPropAuditApi,
  maintPlanTLAuditApi,
  maintPlanInsuAuditApi,
  submitQuotationApi,
  backMaintPlanApi,
  quotationTLAuditPassApi,
  quotationTLAuditRejectApi,
  assessLossPassApi,
  assessLossRejectApi,
  finishTLComfirmPassApi,
  finishTLComfirmRejectApi,
  settleAuditApi,
  payComfirmApi,
  filingApi,
  cancelApi,
  plSettleAuditApi,
  plPayComfirmApi,
  plFilingApi,
  saveListApi,
  savestartApi,
  launchApi
}
