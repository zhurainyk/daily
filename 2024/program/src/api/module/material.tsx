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
    '/elevator_supplychain/imaterial/save',
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
    '/elevator_supplychain/imaterial/updateById',
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
    '/elevator_supplychain/imaterial/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaterial/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaterial/deleteList',
    'post',
    arg,
    null,
    false
  )
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaterial/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaterial/selectCountByCondition',
    'post',
    arg
  )
}

export default {
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  deleteListApi,
  selectByConditionApi
}
