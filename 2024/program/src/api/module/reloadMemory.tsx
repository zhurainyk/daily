import api from '../create-api'
import apiConfig from '../apiConfig'

/**
 *重载项目
 * @param {partNumber} arg
 * @returns
 */
export const reloadProjectApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/reloadProject',
    'post',
    arg
  )
}

/**
 *重载电梯
 * @param {partNumber} arg
 * @returns
 */
export const reloadElevatorApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/reloadElevator',
    'post',
    arg
  )
}

/**
 *重载品牌
 * @param {partNumber} arg
 * @returns
 */
export const reloadBrandApi = async arg => {
  return api(apiConfig.url, '/elevator/icommonService/reloadBrand', 'post', arg)
}

/**
 *重载运行数据相关常量
 * @param {partNumber} arg
 * @returns
 */
export const reloadRunningDataConstApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/reloadRunningDataConst',
    'post',
    arg
  )
}

/**
 *重载网关事件码
 * @param {partNumber} arg
 * @returns
 */
export const reloadIotEventCodeApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/reloadIotEventCode',
    'post',
    arg
  )
}

/**
 *重载控制系统事件码
 * @param {partNumber} arg
 * @returns
 */
export const reloadControlEventCodeApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/reloadControlEventCode',
    'post',
    arg
  )
}

/**
 *重载人工触发事件码
 * @param {partNumber} arg
 * @returns
 */
export const reloadManualEventCodeApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/reloadManualEventCode',
    'post',
    arg
  )
}

/**
 *重载运行监测方案
 * @param {partNumber} arg
 * @returns
 */
export const reloadRunMonitorPlanApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/reloadRunMonitorPlan',
    'post',
    arg
  )
}

/**
 *重载xunda_project
 * @param {partNumber} arg
 * @returns
 */
export const reloadXundaProjectApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/reloadXundaProject',
    'post',
    arg
  )
}

/**
 *重载xunda_device
 * @param {partNumber} arg
 * @returns
 */
export const reloadXundaDeviceApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/reloadXundaDevice',
    'post',
    arg
  )
}

/**
 *重载cqzkzxht_device
 * @param {partNumber} arg
 * @returns
 */
export const reloadCqzkDeviceApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/reloadCqzkDevice',
    'post',
    arg
  )
}

/**
 *重载回调地址
 * @param {partNumber} arg
 * @returns
 */
export const reloadCallbackUrlApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/reloadCallbackUrl',
    'post',
    arg
  )
}

/**
 *重载回调地址
 * @param {partNumber} arg
 * @returns
 */
export const reloadTableApi = async arg => {
  return api(apiConfig.url, '/usercenter/icommon/reloadTable', 'post', arg)
}

export const reloadTable1Api = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/icommonService/reloadTable',
    'post',
    arg
  )
}

export const reloadTable2Api = async arg => {
  return api(apiConfig.url, '/elevator/icommonService/reloadTable', 'post', arg)
}
export const reloadTable3Api = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/icommonService/reloadTable',
    'post',
    arg
  )
}

export default {
  reloadProjectApi,
  reloadElevatorApi,
  reloadBrandApi,
  reloadRunningDataConstApi,
  reloadIotEventCodeApi,
  reloadControlEventCodeApi,
  reloadManualEventCodeApi,
  reloadRunMonitorPlanApi,
  reloadXundaProjectApi,
  reloadXundaDeviceApi,
  reloadCqzkDeviceApi,
  reloadCallbackUrlApi,
  reloadTableApi,
  reloadTable1Api,
  reloadTable2Api,
  reloadTable3Api
}
