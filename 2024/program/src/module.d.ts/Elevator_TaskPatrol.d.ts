declare interface IElevator_TaskPatrol {
  db_id: string
  db_taskId: string // 公共任务id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_problemList: string // 问题清单json
  db_stopDuration: string // 停梯时长
  db_timeoutRule: string // 超时规则

  taskInfo: IElevator_TaskInfo
}
