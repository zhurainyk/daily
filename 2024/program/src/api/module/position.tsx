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
    '/usercenter/iposition/save',
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
    '/usercenter/iposition/updateById',
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
    '/usercenter/iposition/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iposition/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(apiConfig.url, '/usercenter/iposition/deleteList', 'post', arg)
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iposition/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iposition/selectCountByCondition',
    'post',
    arg
  )
}

export const getPositionListByPosiTypeApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iposition/getPositionListByPosiType',
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
  getPositionListByPosiTypeApi
}
