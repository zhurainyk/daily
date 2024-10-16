declare interface IElevator_TaskEmergency {
  db_id: string
  db_taskId: string // 公共任务id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_lastMaintRunTimes: string // 距上次维保运行次数
  db_lastMaintRunDuration: string // 距上次维保运行时长
  db_lastMaintDuration: string // 距上次维保自然时长
  db_lastMaintDoorTimes: string // 距上次维保开关门次数
  db_lastMaintRunMileage: string // 距上次维保运行里程
  db_hisMaintRecords: string // 维保记录json
  db_lastEmergencyRunTimes: string // 距上次应急运行次数
  db_lastEmergencyRunDuration: string // 距上次应急运行时长
  db_lastEmergencyDuration: string // 距上次应急自然时长
  db_lastEmergencyDoorTimes: string // 距上次应急开关门次数
  db_lastEmergencyRunMileage: string // 距上次应急运行里程
  db_hisEmergencyRecords: string // 应急记录json
  db_lastRepairRunTimes: string // 距上次召修运行次数
  db_lastRepairRunDuration: string // 距上次召修运行时长
  db_lastRepairDuration: string // 距上次召修自然时长
  db_lastRepairDoorTimes: string // 距上次召修开关门次数
  db_lastRepairRunMileage: string // 距上次召修运行里程
  db_hisRepairRecords: string // 召修记录json
  db_trappedTime: string // 被困时间
  db_alarmTime: string // 接警时间
  db_trappedUser: string // 被困人员信息
  db_rescueLevel: string // 救援等级
  db_policeTime: string // 出警时间
  db_arriveTime: string // 到达时间
  db_rescueTime: string // 解救时间
  db_alarmNumber: string // 解救人数
  db_trappedReason: string // 困人原因
  db_timeoutRule: string // 超时规则

  ui_trappedTime: string // 被困时间
  ui_alarmTime: string // 接警时间
  ui_policeTime: string // 出警时间
  ui_arriveTime: string // 到达时间
  ui_rescueTime: string // 解救时间

  taskInfo: IElevator_TaskInfo
}
