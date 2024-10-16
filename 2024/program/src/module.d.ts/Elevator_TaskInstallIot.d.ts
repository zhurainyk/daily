declare interface IElevator_TaskInstallIot {
  db_id: string //
  db_taskId: string // 公共任务id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_iotPlanTypeCode: string // 方案类型code
  db_iotPlanId: string // 方案id
  db_endImgUrl: string // 完成图片地址
  db_endImgName: string // 完成图片名称
  db_onlineState: string // 在线状态
  db_firstOnlineTime: string // 首次在线时间
  db_stopDuration: string // 停梯时长
  db_timeoutRule: string // 超时规则
  db_installIotTypeCode: string // 类型

  ui_iotPlanName: string // 物联网方案

  ui_firstOnlineTime: string // 首次在线时间

  taskInfo: IElevator_TaskInfo
}
