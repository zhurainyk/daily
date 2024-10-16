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
    '/elevator/iproject/save',
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
    '/elevator/iproject/updateById',
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
    '/elevator/iproject/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iproject/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iproject/deleteList',
    'post',
    arg,
    null,
    false
  )
}
export const selectByConditionApi = async arg => {
  return api(apiConfig.url, '/elevator/iproject/selectByCondition', 'post', arg)
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iproject/selectCountByCondition',
    'post',
    arg
  )
}

export const updateUserIdsByProjectIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iproject/updateUserIdsByProjectId',
    'post',
    arg,
    null,
    false
  )
}

export const getPropUserByProjectIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iproject/getPropUserByProjectId',
    'post',
    arg,
    null,
    false
  )
}
export const getEnginUserByProjectIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iproject/getEnginUserByProjectId',
    'post',
    arg,
    null,
    false
  )
}

export const getwebEnginUserByProjectIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iproject/getwebEnginUserByProjectId',
    'post',
    arg,
    null,
    false
  )
}

export const getProjectByUserIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iproject/getProjectByUserId',
    'post',
    arg,
    null,
    false
  )
}
export const updateUserIdByProjectIdsApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iproject/updateUserIdByProjectIds',
    'post',
    arg,
    null,
    false
  )
}

export const saveListApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator/iproject/saveList',
    'post',
    arg,
    null,
    false,
    file
  )
}

export const updatePropPassUserIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderInfo/updatePropPassUserId',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const getUserByProjectIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iproject/getUserByProjectId',
    'post',
    arg,
    null,
    false
  )
}

export default {
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  deleteListApi,
  selectByConditionApi,
  updateUserIdsByProjectIdApi,
  getEnginUserByProjectIdApi,
  getwebEnginUserByProjectIdApi,
  getProjectByUserIdApi,
  updateUserIdByProjectIdsApi,
  saveListApi,
  updatePropPassUserIdApi,
  getUserByProjectIdApi
}
