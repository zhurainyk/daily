import api from '../create-api'
import apiConfig from '../apiConfig'

/**
 *
 * @param {partNumber} arg
 * @returns
 */

export const selectByConditionApi = async arg => {
  return api(apiConfig.url, '/elevator_iot/iot/getElevatorList', 'post', arg)
}

export const selectCountByConditionApi = async arg => {
  return api(apiConfig.url, '/elevator_iot/iot/getElevatorTotal', 'post', arg)
}
export const selectByConditionApi2 = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iiotEventStatistic/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi2 = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iiotEventStatistic/selectCountByCondition',
    'post',
    arg
  )
}
export const selectById = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iiotEventStatistic/selectById',
    'post',
    arg
  )
}

export const selectByLogConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_iot/iot/getElevatorRunningStateList',
    'post',
    arg
  )
}

export const selectCountLogByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator_iot/iot/getElevatorRunningStateTotal',
    'post',
    arg
  )
}

export const resetByIdsApi = async arg => {
  return api(apiConfig.url, '/elevator_iot/commonevent/sendEvent', 'post', arg)
}

export default {
  selectByLogConditionApi,
  selectCountLogByConditionApi,
  selectByConditionApi,
  selectCountByConditionApi,
  resetByIdsApi
}
