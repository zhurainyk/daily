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
    '/elevator_order/itaskInfo/createTask',
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
    '/elevator_order/itaskInfo/updateById',
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
    '/elevator_order/itaskInfo/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfo/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfo/deleteList',
    'post',
    arg,
    null,
    false
  )
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfo/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfo/selectCountByCondition',
    'post',
    arg
  )
}

export const cancelMedicalApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskMedical/cancelTask',
    'post',
    arg,
    null,
    false
  )
}

export const cancelCallRepairApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskCallRepair/cancelTask',
    'post',
    arg,
    null,
    false
  )
}

export const cancelCleanUpkeepApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskCleanUpkeep/cancelTask',
    'post',
    arg,
    null,
    false
  )
}

export const cancelComplaintApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskComplaint/cancelTask',
    'post',
    arg,
    null,
    false
  )
}

export const cancelRepairUpkeepApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskRepairUpkeep/cancelTask',
    'post',
    arg,
    null,
    false
  )
}

export const cancelRegularUpkeepApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskRegularUpkeep/cancelTask',
    'post',
    arg,
    null,
    false
  )
}

export const cancelInstallIotApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInstallIot/cancelTask',
    'post',
    arg,
    null,
    false
  )
}

export const getMaintenanceTimeApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskRegularUpkeep/getMaintenanceTime',
    'post',
    arg
  )
}

export const createTaskByTimeApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskRegularUpkeep/createTaskByTime',
    'post',
    arg
  )
}

export const updateBathTaskByidApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfo/updateListByConditon',
    'post',
    arg
  )
}

export const updateTaskDynamicByidApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfo/updateDynamicWorkItem',
    'post',
    arg
  )
}

export const playbackApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/elevatorV3Url/playback',
    'post',
    arg,
    null,
    false
  )
}

export const addVideoByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderEmergency/addVideoById',
    'post',
    arg,
    null,
    false
  )
}

export const addVideoAlarmByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/ialarm/addVideoById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteImgVideoIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderEmergency/deleteImgVideo',
    'post',
    arg,
    null,
    false
  )
}
export const deleteImgVideosApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderEmergency/deleteImgVideos',
    'post',
    arg,
    null,
    false
  )
}

export const deleteImgVideosAlarmApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/ialarm/deleteImgVideos',
    'post',
    arg,
    null,
    false
  )
}

export const addImgVideoApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderEmergency/addImgVideo',
    'post',
    arg,
    null,
    false
  )
}

export const addImgVideoAlarmApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/ialarm/updateByConditon',
    'post',
    arg
  )
}

export const getPrintTaskByidsApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderInfo/getOrderInfoByTaskId',
    'post',
    arg,
    null,
    false
  )
}

export const selectAlarmByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/ialarm/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const selectOrderByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderInfo/getOrderListByState',
    'post',
    arg
  )
}
export const selectCountOrderByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderInfo/getOrderContByState',
    'post',
    arg
  )
}

export const selectTaskListByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfo/getTaskListByState',
    'post',
    arg
  )
}
export const selectCountTaskListByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfo/getTaskListCountByState',
    'post',
    arg
  )
}

export const evaluateTaskApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfo/evaluateTask',
    'post',
    arg
  )
}

export default {
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  deleteListApi,
  selectByConditionApi,
  cancelMedicalApi,
  cancelCallRepairApi,
  cancelCleanUpkeepApi,
  cancelComplaintApi,
  cancelRepairUpkeepApi,
  cancelRegularUpkeepApi,
  cancelInstallIotApi,
  getMaintenanceTimeApi,
  createTaskByTimeApi,
  updateBathTaskByidApi,
  updateTaskDynamicByidApi,
  playbackApi,
  addVideoByIdApi,
  deleteImgVideoIdApi,
  addImgVideoApi,
  deleteImgVideosApi,
  getPrintTaskByidsApi,
  selectAlarmByIdApi,
  addVideoAlarmByIdApi,
  addImgVideoAlarmApi,
  deleteImgVideosAlarmApi,
  selectOrderByConditionApi,
  selectCountOrderByConditionApi,
  selectTaskListByConditionApi,
  selectCountTaskListByConditionApi,
  evaluateTaskApi
}
