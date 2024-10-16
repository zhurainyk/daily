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
    '/elevator_supplychain/imaintCompany/save',
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
    '/elevator_supplychain/imaintCompany/updateById',
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
    '/elevator_supplychain/imaintCompany/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaintCompany/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaintCompany/deleteList',
    'post',
    arg,
    null,
    false
  )
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaintCompany/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaintCompany/selectCountByCondition',
    'post',
    arg
  )
}

export const saveListApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaintCompany/saveList',
    'post',
    arg,
    null,
    false,
    file
  )
}

export const updateUserIdsByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaintCompany/updateUserIdsByDbid',
    'post',
    arg,
    null,
    false,
    file
  )
}

export const getCompanyUserByDbidApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaintCompany/getCompanyUserByDbid',
    'post',
    arg,
    null,
    false,
    file
  )
}

export const updateUserIdBycompanyIdsApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaintCompany/updateUserIdBycompanyIds',
    'post',
    arg,
    null,
    false,
    file
  )
}

export const getCompanyByUserIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaintCompany/getCompanyByUserId',
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
  updateUserIdsByIdApi,
  getCompanyUserByDbidApi,
  updateUserIdBycompanyIdsApi,
  getCompanyByUserIdApi
}
