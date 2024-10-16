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
    '/usercenter/iaccount/save',
    'post',
    arg,
    null,
    true,
    file
  )
}
export const saveApi2 = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/save',
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
    '/usercenter/iaccount/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}
export const updateByIdApi2 = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/updateById',
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
    '/usercenter/iaccount/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(apiConfig.url, '/usercenter/iaccount/deleteList', 'post', arg)
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/selectCountByCondition',
    'post',
    arg
  )
}

export const selectByposiTypeApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/selectByposiType',
    'post',
    arg,
    null,
    false
  )
}

export const moveDepartmentApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/moveDepartment',
    'post',
    arg,
    null,
    false
  )
}
export const updatePasswordApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/updatePassword',
    'post',
    arg,
    null,
    false
  )
}
export const resetPasswordApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/resetPassword',
    'post',
    arg,
    null,
    false
  )
}

export const selectAccountByposiTypeApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/selectAccountByposiType',
    'post',
    arg,
    null,
    false
  )
}

export const getUserPsdByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/getPassword',
    'post',
    arg,
    null,
    false
  )
}

export const updatePosiTypeByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/updatePosiTypeById',
    'post',
    arg
  )
}

export const enableByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/enable',
    'post',
    arg,
    null,
    false
  )
}

export const disableByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/disable',
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
  selectByposiTypeApi,
  moveDepartmentApi,
  updatePasswordApi,
  resetPasswordApi,
  selectAccountByposiTypeApi,
  getUserPsdByIdApi,
  updatePosiTypeByIdApi,
  enableByIdApi,
  disableByIdApi
}
