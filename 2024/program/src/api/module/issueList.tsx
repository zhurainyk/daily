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
    '/elevator/iissueList/save',
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
    '/elevator/iissueList/updateById',
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
    '/elevator/iissueList/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iissueList/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(apiConfig.url, '/elevator/iissueList/deleteList', 'post', arg)
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iissueList/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iissueList/selectCountByCondition',
    'post',
    arg
  )
}

export const updateLabelByIdListApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator/iissueList/updateLabelByIdList',
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
  updateLabelByIdListApi
}
