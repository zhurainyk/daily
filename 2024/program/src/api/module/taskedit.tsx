import api from '../create-api'
import apiConfig from '../apiConfig'

/**
 *
 * @param {partNumber} arg
 * @returns
 */
export const saveApi = tabelName => {
  return async (arg, file?: any) =>
    api(
      apiConfig.url,
      `/elevator_order/itask${tabelName}/createTask`,
      'post',
      arg,
      null,
      true,
      file
    )
}

export const updateByIdApi = tabelName => {
  return async (arg, file?: any) =>
    api(
      apiConfig.url,
      `/elevator_order/itask${tabelName}/updateById`,
      'post',
      arg,
      null,
      true,
      file
    )
}

export const selectByIdApi = tabelName => {
  return async arg =>
    api(
      apiConfig.url,
      `/elevator_order/itask${tabelName}/selectById`,
      'post',
      arg,
      null,
      false
    )
}

export const selectOrderByIdApi = tabelName => {
  return async arg =>
    api(
      apiConfig.url,
      `/elevator_order/iorder${tabelName}/selectById`,
      'post',
      arg,
      null,
      false
    )
}

export const getOrderListByTaskIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderInfo/getOrderListByTaskId',
    'post',
    arg,
    null,
    false
  )
}
export const TurnToSendOrderByIdApi = tabelName => {
  return async arg =>
    api(
      apiConfig.url,
      `/elevator_order/iorder${tabelName}/TurnToSendOrder`,
      'post',
      arg
    )
}

export const passBySuperiorByIdApi = tabelName => {
  return async arg =>
    api(
      apiConfig.url,
      `/elevator_order/iorder${tabelName}/passBySuperior`,
      'post',
      arg
    )
}

export const backToDealOrderByIdApi = tabelName => {
  return async arg =>
    api(
      apiConfig.url,
      `/elevator_order/iorder${tabelName}/backToDealOrder`,
      'post',
      arg
    )
}

export const comfirmRepairTaskByIdApi = arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderCallRepair/comfirmRepair',
    'post',
    arg
  )
}
export const rejectRepairTaskByIdApi = arg => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderCallRepair/rejectRepair',
    'post',
    arg
  )
}

export const saveRepairTaskByIdApi = arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskCallRepair/createTask',
    'post',
    arg
  )
}

export const passByPropUserByIdApi = tabelName => {
  return async arg =>
    api(
      apiConfig.url,
      `/elevator_order/iorder${tabelName}/passByPropUser`,
      'post',
      arg
    )
}

export const saveEmergencyTaskByIdApi = arg => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskEmergency/createTaskEmergency',
    'post',
    arg
  )
}
export default {
  saveApi,
  updateByIdApi,
  selectByIdApi,
  selectOrderByIdApi,
  getOrderListByTaskIdApi,
  TurnToSendOrderByIdApi,
  passBySuperiorByIdApi,
  backToDealOrderByIdApi,
  comfirmRepairTaskByIdApi,
  rejectRepairTaskByIdApi,
  saveRepairTaskByIdApi,
  passByPropUserByIdApi,
  saveEmergencyTaskByIdApi
}
