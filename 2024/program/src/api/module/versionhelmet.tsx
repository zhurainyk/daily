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
    '/elevator/iversionHelmet/save',
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
    '/elevator/iversionHelmet/updateById',
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
    '/elevator/iversionHelmet/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iversionHelmet/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(apiConfig.url, '/elevator/iversionHelmet/deleteList', 'post', arg)
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iversionHelmet/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iversionHelmet/selectCountByCondition',
    'post',
    arg
  )
}

export const getLastVersionsAppApi = async () => {
  return api(
    apiConfig.url,
    '/elevator/iversionHelmet/getLatestVersion',
    'post',
    {}
  )
}

export default {
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  deleteListApi,
  selectByConditionApi,
  getLastVersionsAppApi
}
