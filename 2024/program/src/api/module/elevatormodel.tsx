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
    '/elevator/imodel/save',
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
    '/elevator/imodel/updateById',
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
    '/elevator/imodel/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/imodel/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/imodel/deleteList',
    'post',
    arg,
    null,
    false
  )
}
export const selectByConditionApi = async arg => {
  return api(apiConfig.url, '/elevator/imodel/selectByCondition', 'post', arg)
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/imodel/selectCountByCondition',
    'post',
    arg
  )
}
export const updatePartInstIdsByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/imodel/updatePartInstIdsById',
    'post',
    arg,
    null,
    false
  )
}

export const saveListApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/elevator/imodel/saveList',
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
  updatePartInstIdsByIdApi,
  saveListApi
}
