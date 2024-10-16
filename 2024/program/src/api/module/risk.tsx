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
    '/elevator/irisk/save',
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
    '/elevator/irisk/updateById',
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
    '/elevator/irisk/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/irisk/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(apiConfig.url, '/elevator/irisk/deleteList', 'post', arg)
}
export const selectByConditionApi = async arg => {
  return api(apiConfig.url, '/elevator/irisk/selectByCondition', 'post', arg)
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/irisk/selectCountByCondition',
    'post',
    arg
  )
}

export default {
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  deleteListApi,
  selectByConditionApi
}
