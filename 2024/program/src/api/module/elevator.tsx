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
    '/elevator/ielevator/save',
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
    '/elevator/ielevator/updateById',
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
    '/elevator/ielevator/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ielevator/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ielevator/deleteList',
    'post',
    arg,
    null,
    false
  )
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ielevator/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ielevator/selectCountByCondition',
    'post',
    arg
  )
}

export const saveListApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator/ielevator/saveList',
    'post',
    arg,
    null,
    false,
    file
  )
}

export const getElevatorByDbIdsApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator/ielevator/getElevatorByDbIds',
    'post',
    arg,
    null,
    false
  )
}

export const restPartInElevatorApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ielevator/initSysCompPartState',
    'post',
    arg,
    null,
    false
  )
}

export const elevatorDownTemlepteApi = async arg => {
  window.open(
    'https://tkwl-resource-pro.oss-cn-chengdu.aliyuncs.com/ElevatorFormwork/%E7%94%B5%E6%A2%AF%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx',
    '_blank'
  )
}
export const updateElevatorFiledApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ielevator/updateListByConditon',
    'post',
    arg
  )
}

export const selectSynDeviceInfoApi = async arg => {
  // 设备信息
  return api(apiConfig.url, '/elevator/ielevator/synDeviceInfo', 'post', arg)
}
export const selectSynFloorIndexApi = async arg => {
  // 楼层索引
  return api(apiConfig.url, '/elevator/ielevator/synFloorIndex', 'post', arg)
}
export const selectsynVideoDeviceIdApi = async arg => {
  // 视频设备id
  return api(apiConfig.url, '/elevator/ielevator/synVideoDeviceId', 'post', arg)
}
export const selectsynFloorCountApi = async arg => {
  // 总楼层
  return api(apiConfig.url, '/elevator/ielevator/synFloorCount', 'post', arg)
}
export const selectsynAverageHeightApi = async arg => {
  // 平均层高
  return api(apiConfig.url, '/elevator/ielevator/synAverageHeight', 'post', arg)
}
export const selectsynRunDeviceIdApi = async arg => {
  // 运行设备
  return api(apiConfig.url, '/elevator/ielevator/synRunDeviceId', 'post', arg)
}

export const saveBriefListApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator/ielevator/saveBriefList',
    'post',
    arg,
    null,
    false,
    file
  )
}
export default {
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  deleteListApi,
  selectByConditionApi,
  saveListApi,
  getElevatorByDbIdsApi,
  restPartInElevatorApi,
  elevatorDownTemlepteApi,
  updateElevatorFiledApi,
  selectSynDeviceInfoApi,
  selectSynFloorIndexApi,
  selectsynVideoDeviceIdApi,
  selectsynFloorCountApi,
  selectsynAverageHeightApi,
  selectsynRunDeviceIdApi,
  saveBriefListApi
}
