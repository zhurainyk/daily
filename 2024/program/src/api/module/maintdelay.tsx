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
    '/elevator_order/imaintDelay/applyDelay',
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
    '/elevator_order/imaintDelay/updateById',
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
    '/elevator_order/imaintDelay/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/imaintDelay/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/imaintDelay/deleteList',
    'post',
    arg,
    null,
    false
  )
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/imaintDelay/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_order/imaintDelay/selectCountByCondition',
    'post',
    arg
  )
}

export const rejectApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/imaintDelay/refuseDelay',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const approveApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/imaintDelay/acceptDelay',
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
  rejectApi,
  approveApi
}
