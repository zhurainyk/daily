import api from '../create-api'
import apiConfig from '../apiConfig'

export const selectByConditionActionlogApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/ilogOnAction/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionActionlogApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/ilogOnAction/selectCountByCondition',
    'post',
    arg
  )
}
export const getDetailByConditionActionlogApi = async arg => {
  return api(apiConfig.url, '/usercenter/ilogOnAction/selectById', 'post', arg)
}

export const selectByConditionLoginlogApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/ilogOnLogin/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionLoginlogApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/ilogOnLogin/selectCountByCondition',
    'post',
    arg
  )
}
export const getDetailByConditionloginlogApi = async arg => {
  return api(apiConfig.url, '/usercenter/ilogOnLogin/selectById', 'post', arg)
}

export const selectByConditionAbnormalApi = async arg => {
  return api(apiConfig.url, '/elevator/ilog/getLogList', 'post', arg)
}

export const selectCountByConditionAbnormalApi = async arg => {
  return api(apiConfig.url, '/elevator/ilog/getLogListCount', 'post', arg)
}
export const exportLog = async arg => {
  return api(apiConfig.url, '/elevator/ilog/exportLog', 'post', arg, {
    responseType: 'arraybuffer'
  })
}
