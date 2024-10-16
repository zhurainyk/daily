declare interface IElevator_PreAnalysis {
  db_id: string
  db_projectId: string // 项目id
  db_elevId: string // 电梯db_id
  db_projectName: string // 项目名称
  db_projectNum: string // 项目内编号
  db_MaintType: string // 维保类型
  db_lastMaintRunTimes: string // 距上次维保运行次数
  db_lastMaintRunDuration: string // 距上次维保运行时长
  db_lastMaintDuration: string // 距上次维保自然时长
  db_lastMaintDoorTimes: string // 距上次维保开关门次数
  db_lastMaintRunMileage: string // 距上次维保运行里程
  db_nextMaintRunTimes: string // 距下次维保运行次数
  db_nextMaintRunDuration: string // 距下次维保运行时长
  db_nextMaintDuration: string // 距下次维保自然时长
  db_nextMaintDoorTimes: string // 距下次维保开关门次数
  db_nextMaintRunMileage: string // 距下次维保运行里程
  db_note: string // 备注
}
