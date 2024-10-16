import api from '../create-api'
import apiConfig from '../apiConfig'

export const getBIData = async arg => {
  return api(apiConfig.url, '/elevator/iBI/getBIData', 'post', arg, null, false)
}
export const getMarketData = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iBI/getMarketingData',
    'post',
    arg,
    null,
    false
  )
}
export const getBasicReport = async (arg, token = '') => {
  return api(
    apiConfig.url,
    '/elevator/ireport/getBasicReport',
    'post',
    arg,
    {
      token
    },
    true
  )
}
export const getLatestEnvironmentState = async (arg, token = '') => {
  return api(
    apiConfig.url,
    '/elevator/ienvironmentState/getLatestEnvironmentState',
    'post',
    arg,
    null,
    false
  )
}
export const getLatestSysCompPartState = async (arg, token = '') => {
  return api(
    apiConfig.url,
    '/elevator/isysCompPartState/getLatestSysCompPartState',
    'post',
    arg,
    null,
    false
  )
}
export const getTaskInfoOfOneElevDesc = async (arg, token = '') => {
  return api(
    apiConfig.url,
    '/elevator_order/itaskInfo/getTaskInfoOfOneElevDesc',
    'post',
    arg,
    null,
    false
  )
}
export const getDataApi = (arg, token = '', noloading = null) => {
  return api(
    apiConfig.url,
    '/elevator/iBI/getStatisticsData',
    'post',
    arg,
    {
      token,
      noloading
    },
    true
  )
}
export const getCityInfo = async arg => {
  return api(
    apiConfig.url,
    '/elevator/iBI/getElevatorDataByPlaceCode',
    'post',
    arg,
    null,
    false
  )
}
export const getCompanyList = arg => {
  return api(apiConfig.url, '/elevator/iBI/getCompanyList', 'post', arg, null,
    true)
}
export const getStaticApi = arg => {
  return api(apiConfig.url, '/elevator/iBI/getCompanyStatisticsData', 'post', arg, null,
    true)
}
export const getLatestMessage = arg => {
  return api(apiConfig.url, '/elevator/iBI/getCompanyLatestMessage', 'post', arg, null,
    true)
}
export const getDataByPlaceCode = arg => {
  return api(apiConfig.url, '/elevator/iBI/getCompanyElevatorDataByPlaceCode', 'post', arg, null,
    true)
}
export const getWorkScheduleToday = arg => {
  return api(apiConfig.url, '/elevator/iBI/getWorkScheduleToday', 'post', arg, null,
    true)
}

export const getRealTimePushEvent = arg => {
  return api(apiConfig.url, '/elevator/iBI/getRealTimePushEvent', 'post', arg, null,
    true)
}

export const getPropDynamicToday = arg => {
  return api(apiConfig.url, '/elevator/iBI/getPropDynamicToday', 'post', arg, null,
    true)
}
export const getInsureDynamicToday = arg => {
  return api(apiConfig.url, '/elevator/iBI/getDynamicToday', 'post', arg, null,
    true)
}

export const getPropEventEarlyWarning = (arg = {}) => { //物业看板事件预计统计查询
  return api(
    apiConfig.url,
    '/elevator/iBI/getPropEventEarlyWarning',
    'post',
    arg,
    null,
    true
  )
}
export const getInsuEventEarlyWarning = (arg = {}) => { //保险看板事件预计统计查询
  return api(
    apiConfig.url,
    '/elevator/iBI/getInsuEventEarlyWarning',
    'post',
    arg,
    null,
    true
  )
}
export const getInfoOverviewPartA = (arg = {}) => {  
  return api(
    apiConfig.url,
    '/elevator/iBI/getInfoOverviewPartA',
    'post',
    arg,
    null,
    true
  )
}

export default {
  getBIData,
  getMarketData,
  getCityInfo
}
