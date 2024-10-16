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
    '/elevator/ipropCompany/save',
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
    '/elevator/ipropCompany/updateById',
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
    '/elevator/ipropCompany/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ipropCompany/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ipropCompany/deleteList',
    'post',
    arg,
    null,
    false
  )
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ipropCompany/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ipropCompany/selectCountByCondition',
    'post',
    arg
  )
}

export const saveListApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator/ipropCompany/saveList',
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
    '/elevator/ipropCompany/updateUserIdsByDbid',
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
    '/elevator/ipropCompany/getCompanyUserByDbid',
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
    '/elevator/ipropCompany/updateUserIdBycompanyIds',
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
    '/elevator/ipropCompany/getCompanyByUserId',
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
