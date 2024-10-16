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
    '/elevator_supplychain/ipartInstReplace/save',
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
    '/elevator_supplychain/ipartInstReplace/updateById',
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
    '/elevator_supplychain/ipartInstReplace/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/ipartInstReplace/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/ipartInstReplace/deleteList',
    'post',
    arg
  )
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/ipartInstReplace/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/ipartInstReplace/selectCountByCondition',
    'post',
    arg
  )
}

export const saveListApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/ipartInstReplace/saveList',
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
  saveListApi
}
