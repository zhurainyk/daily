import api from '../create-api'
import apiConfig from '../apiConfig'

export const getProjectList = async (arg = {}) => {
  return api(
    apiConfig.url,
    '/elevator/iBI/getProject',
    'post',
    arg,
    null,
    false
  )
}
export const getElevatorByProjectId = async (arg = {}) => {
  return api(
    apiConfig.url,
    '/elevator_iot/iBI/getElevatorByProjectId',
    'post',
    arg,
    null,
    false
  )
}
export const getStatisticsOfInsuBI = async (arg = {}) => {
  return api(
    apiConfig.url,
    '/elevator/iBI/getStatisticsOfInsuBI',
    'post',
    arg,
    null,
    false
  )
}
export const getLatestMessage = async (arg = {}) => {
  return api(
    apiConfig.url,
    '/elevator/iBI/getLatestMessage',
    'post',
    arg,
    null,
    false
  )
}
export const getWorkScheduleOfInsuBI = async (arg = {}) => {
  return api(
    apiConfig.url,
    '/elevator/iBI/getWorkScheduleOfInsuBI',
    'post',
    arg,
    null,
    false
  )
}
export const getVideoUrl = (arg = {}) => {
  return api(
    apiConfig.url,
    '/elevator/elevatorUrl/getUrlBySbId',
    'post',
    arg,
    null,
    false
  )
}
export const getTaskIdByOrder = (arg = {}) => {
  return api(
    apiConfig.url,
    '/elevator_order/iorderInfo/getTaskIdByOrder',
    'post',
    arg,
    null,
    false
  )
}

export const getServiceReports = (arg = {}) => {
  return api(
    apiConfig.url,
    '/elevator/ireport/getServiceReports',
    'post',
    arg,
    null,
    true
  )
}
export const getCustomerBoardTab = (arg = {}) => {
  return api(
    apiConfig.url,
    '/elevator/iBI/getCustomerBoardTab',
    'post',
    arg,
    null,
    false
  )
}

export const getProjectSummary = (arg = {}) => {
  return api(
    apiConfig.url,
    '/elevator_iot/iBI/getProjectSummary',
    'post',
    arg,
    null,
    false
  )
}
export const getEleList = (arg = {}) => {
  return api(
    apiConfig.url,
    '/elevator/ielevator/selectKBByCondition',
    'post',
    arg,
    null,
    true
  )
}

export const getCommentDetail = (arg = {}) => { //根据主题id获取详情的
  return api(
    apiConfig.url,
    '/elevator/ibiCommentArea/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const saveReback = (arg = {}) => { //新增评论
  return api(
    apiConfig.url,
    '/elevator/ibiCommentArea/updateById',
    'post',
    arg,
    null,
    true
  )
}

export const getElevatorRunningData = (arg = {}) => { //新增评论
  return api(
    apiConfig.url,
    '/elevator_iot/iBI/getElevatorRunningData',
    'post',
    arg,
    null,
    true
  )
}
export const ialarmListselectByCondition = (arg = {}) => { //接警列表
  return api(
    apiConfig.url,
    '/elevator_order/ialarm/selectByCondition',
    'post',
    arg,
    null,
    true
  )
}
export const ialarmListselectCountByCondition = (arg = {}) => { //接警列表数量
  return api(
    apiConfig.url,
    '/elevator_order/ialarm/selectCountByCondition',
    'post',
    arg,
    null,
    true
  )
}
export const acceptAlarm = (arg = {}) => { //接警处置
  return api(
    apiConfig.url,
    '/elevator_order/ialarm/acceptAlarm',
    'post',
    arg,
    null,
    false
  )
}
export const refuseAlarm = (arg = {}) => { //误报处置
  return api(
    apiConfig.url,
    '/elevator_order/ialarm/refuseAlarm',
    'post',
    arg,
    null,
    false
  )
}
export const manualOperation = (arg = {}) => { //作业
  return api(
    apiConfig.url,
    '/elevator_iot/commonevent/manualOperation',
    'post',
    arg,
    null,
    true
  )
}
export const manualAlarm = (arg = {}) => { //报警
  return api(
    apiConfig.url,
    '/elevator_iot/commonevent/manualAlarm',
    'post',
    arg,
    null,
    true
  )
}
export const baoxiuApi = (arg = {}) => { //报修
  return api(
    apiConfig.url,
    '/elevator_order/itaskCallRepair/createTask',
    'post',
    arg,
    null,
    true
  )
}

