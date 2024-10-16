import api from '../create-api'
import apiConfig from '../apiConfig'

export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/irunningState/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/irunningState/selectCountByCondition',
    'post',
    arg
  )
}
export const getEventCodeNameMap = arg => {
  return api(
    apiConfig.url,
    '/elevator/iiotEventCode/getEventCodeNameMap',
    'post',
    arg
  )
}

export const ionlineselectByConditionApi = async arg => {
  return api(apiConfig.url, '/elevator/ionline/selectByCondition', 'post', arg)
}

export const ionlineselectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ionline/selectCountByCondition',
    'post',
    arg
  )
}

export const iofflineselectByConditionApi = async arg => {
  return api(apiConfig.url, '/elevator/ioffline/selectByCondition', 'post', arg)
}

export const iofflineCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ioffline/selectCountByCondition',
    'post',
    arg
  )
}

export const stasticselectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/istatisticsRunData/selectByCondition',
    'post',
    arg
  )
}

export const stasticselectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/istatisticsRunData/selectCountByCondition',
    'post',
    arg
  )
}
