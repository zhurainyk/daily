declare interface IElevator_TaskMedical {
  db_id: string
  db_taskId: string // 公共任务id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
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
