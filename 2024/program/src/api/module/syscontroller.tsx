import api from '../create-api'
import apiConfig from '../apiConfig'

/**
 *
 * @param {partNumber} arg
 * @returns
 */
export const resetCacheApi = async args => {
  return api(
    apiConfig.url,
    '/usercenter/icommon/resetCache',
    'post',
    args || {}
  )
}

export const countCurrentDayDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countCurrentDayData',
    'post',
    args || {}
  )
}

export const countPeriodDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countPeriodData',
    'post',
    args || {}
  )
}

export const countAnnualInspectDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countAnnualInspectData',
    'post',
    args || {}
  )
}
export const statisticApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countData',
    'post',
    args || {}
  )
}

export const countPatrolDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countPatrolData',
    'post',
    args || {}
  )
}

export const countForecastAnalysisDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countForecastAnalysisData',
    'post',
    args || {}
  )
}

export const countServiceReportDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countServiceReportData',
    'post',
    args || {}
  )
}

export const countIotRunningDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countIotRunningData',
    'post',
    args || {}
  )
}

export const clearLocalBiDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/clearLocalBiData',
    'post',
    args || {}
  )
}

export const imitateRequestDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/imitateRequestData',
    'post',
    args || {}
  )
}
export const countStatisticRunningDatApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countStatisticRunningData',
    'post',
    args || {}
  )
}
export const countStopDurationDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countStopDurationData',
    'post',
    args || {}
  )
}
export const countElevatorStatisticInfoApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countElevatorStatisticInfo',
    'post',
    args || {}
  )
}
export const countStatisticOnlineDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countStatisticOnlineData',
    'post',
    args || {}
  )
}
export const deleteStatisticsDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/deleteStatisticsData',
    'post',
    args || {}
  )
}

export const lotsDataSendApi = async args => {
  return api(
    apiConfig.url,
    '/elevator/isendData/lotsDataSend',
    'post',
    args || {},
    null,
    false
  )
}

export const closeThreaddApi = async args => {
  return api(
    apiConfig.url,
    '/elevator/isendData/closeThread',
    'post',
    args || {},
    null,
    false
  )
}

export const shenzhengNoPaperApi = async args => {
  return api(
    apiConfig.url,
    '/cqzhdtpt/shenzhen/uploadData',
    'post',
    args || {},
    null,
    false
  )
}

export const cqNoPaperApi = async args => {
  return api(
    apiConfig.url,
    '/cqzhdtpt/chongqing/uploadData',
    'post',
    args || {},
    null,
    false
  )
}

export const cqNoPaperBindApi = async args => {
  return api(
    apiConfig.url,
    '/cqzhdtpt/chongqing/binding',
    'post',
    args || {},
    null,
    false
  )
}
export const cqNoPaperCertificationApi = async args => {
  return api(
    apiConfig.url,
    '/cqzhdtpt/systemCertification/login',
    'post',
    args || {},
    null,
    false
  )
}

export const cqNoPaperUpdateContratApi = async args => {
  return api(
    apiConfig.url,
    '/cqzhdtpt/systemCertification/updateServiceState',
    'post',
    args || {},
    null,
    false
  )
}

export const cqNoPaperupdateWorkStateApi = async args => {
  return api(
    apiConfig.url,
    '/cqzhdtpt/systemCertification/updateWorkState',
    'post',
    args || {},
    null,
    false
  )
}

export const cqNoPaperqueryWorkListApi = async args => {
  return api(
    apiConfig.url,
    '/cqzhdtpt/systemCertification/queryWorkList',
    'post',
    args || {},
    null,
    false
  )
}
export const sysUpdateApi = async args => {
  return api(
    apiConfig.url,
    '/elevator/icommonService/upgradeSystem',
    'post',
    args || {},
    null,
    false
  )
}

export const cqNoPaperMaintenanceRecordApi = async args => {
  return api(
    apiConfig.url,
    '/cqzhdtpt/systemCertification/maintenanceRecord',
    'post',
    args || {},
    null,
    false
  )
}

export const updateUntrueEventApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/updateUntrueEvent',
    'post',
    args || {},
    null,
    false
  )
}

export const countCompanyDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countCompanyData',
    'post',
    args || {},
    null,
    false
  )
}

export const countServiceReportStatisticsDataApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countServiceReportStatisticsData',
    'post',
    args || {}
  )
}

export const countDataByProjectIdApi = async args => {
  return api(
    apiConfig.url,
    '/elevator_schedule/statistic/countDataByProjectId',
    'post',
    args || {}
  )
}

export default {
  resetCacheApi,
  countCurrentDayDataApi,
  countPeriodDataApi,
  countStopDurationDataApi,
  countAnnualInspectDataApi,
  statisticApi,
  countPatrolDataApi,
  countForecastAnalysisDataApi,
  countServiceReportDataApi,
  countIotRunningDataApi,
  clearLocalBiDataApi,
  imitateRequestDataApi,
  lotsDataSendApi,
  closeThreaddApi,
  countStatisticRunningDatApi,
  deleteStatisticsDataApi,
  shenzhengNoPaperApi,
  cqNoPaperCertificationApi,
  cqNoPaperUpdateContratApi,
  cqNoPaperupdateWorkStateApi,
  cqNoPaperqueryWorkListApi,
  cqNoPaperMaintenanceRecordApi,
  cqNoPaperApi,
  cqNoPaperBindApi,
  sysUpdateApi,
  updateUntrueEventApi,
  countCompanyDataApi,
  countServiceReportStatisticsDataApi,
  countDataByProjectIdApi
}
