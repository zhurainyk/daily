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
    '/usercenter/iopMaintUser/save',
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
    '/usercenter/iopMaintUser/updateById',
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
    '/usercenter/iopMaintUser/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iopMaintUser/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(apiConfig.url, '/usercenter/iopMaintUser/deleteList', 'post', arg)
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iopMaintUser/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iopMaintUser/selectCountByCondition',
    'post',
    arg
  )
}

export const selectByposiTypeApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iopMaintUser/selectByposiType',
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
  selectByposiTypeApi
}
