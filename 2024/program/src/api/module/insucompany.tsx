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
    '/elevator_supplychain/iinsuCompany/save',
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
    '/elevator_supplychain/iinsuCompany/updateById',
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
    '/elevator_supplychain/iinsuCompany/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/iinsuCompany/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/iinsuCompany/deleteList',
    'post',
    arg,
    null,
    false
  )
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/iinsuCompany/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/iinsuCompany/selectCountByCondition',
    'post',
    arg
  )
}

export const updateUserIdsByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_supplychain/iinsuCompany/updateUserIdsByDbid',
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
    '/elevator_supplychain/iinsuCompany/getCompanyUserByDbid',
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
    '/elevator_supplychain/iinsuCompany/updateUserIdBycompanyIds',
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
    '/elevator_supplychain/iinsuCompany/getCompanyByUserId',
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
  updateUserIdsByIdApi,
  getCompanyUserByDbidApi,
  updateUserIdBycompanyIdsApi,
  getCompanyByUserIdApi
}
