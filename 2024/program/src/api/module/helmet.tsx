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
    '/elevator/ihelmet/save',
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
    '/elevator/ihelmet/updateById',
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
    '/elevator/ihelmet/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ihelmet/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(apiConfig.url, '/elevator/ihelmet/deleteList', 'post', arg)
}
export const selectByConditionApi = async arg => {
  return api(apiConfig.url, '/elevator/ihelmet/selectByCondition', 'post', arg)
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ihelmet/selectCountByCondition',
    'post',
    arg
  )
}

export const getIsBindHelmetApi = async arg => {
  // String token, String db_userId
  return api(
    apiConfig.url,
    '/elevator/ihelmet/isBindHelmet',
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
  getIsBindHelmetApi
}
