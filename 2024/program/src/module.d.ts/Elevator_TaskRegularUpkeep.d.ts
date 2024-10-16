declare interface IElevator_TaskRegularUpkeep {
  db_id: string
  db_taskId: string // 公共任务id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_upkeepType: string // 保养类型
  db_workItemList: string // 工作项清单json
  db_lastMaintRunTimes: string // 距上次维保运行次数
  db_lastMaintRunDuration: string // 距上次维保运行时长
  db_lastMaintDuration: string // 距上次维保自然时长
  db_lastMaintDoorTimes: string // 距上次维保开关门次数
  db_lastMaintRunMileage: string // 距上次维保运行里程
  db_baseInfo: string // 电梯基本信息json
  db_environmentState: string // 环境信息json
  db_sysCompPartState: string // 零部件信息json
  db_elevState: string // 使用状态等json
  db_stopDuration: string // 停梯时长
  db_timeoutRule: string // 超时规则
  db_workTemplateId: string // 工作模板id

  ui_workTemplateName: string // 工作模板名称

  taskInfo: IElevator_TaskInfo
}
