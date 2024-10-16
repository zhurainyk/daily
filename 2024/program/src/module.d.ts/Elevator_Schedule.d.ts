declare interface IElevator_Schedule {
  db_id: string
  db_id_scheName: string // 计划名称
  db_projectId: string // 关联项目id
  db_scheDetail: string // 计划详情
  db_createUserId: string // 创建人
  db_createtime: string // 创建时间
  db_starttime: string // 开始时间
  db_endtime: string // 结束时间
  db_completeTime: string // 实际完成时间
  db_endDuration: string // 完成耗时
  db_scheState: string // 计划状态

  ui_scheType: string // 计划类型
  ui_projectName: string // 关联项目名称
  ui_createUserName: string // 创建名称
  ui_createtime: string // 创建时间
  ui_starttime: string // 开始时间
  ui_endtime: string // 结束时间
  ui_completeTime: string // 实际完成时间
}
