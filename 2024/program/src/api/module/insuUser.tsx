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
    '/usercenter/iinsuUser/save',
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
    '/usercenter/iinsuUser/updateById',
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
    '/usercenter/iinsuUser/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iinsuUser/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(apiConfig.url, '/usercenter/iinsuUser/deleteList', 'post', arg)
}
export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iinsuUser/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iinsuUser/selectCountByCondition',
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
