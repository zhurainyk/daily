declare interface IElevator_StopRecords {
  db_id: string
  db_projectId: string // 项目id
  db_elevId: string // 电梯id
  db_registCode: string // 电梯注册码
  db_stopStarttime: string // 停梯开始时间
  db_stopEndtime: string // 停梯结束时间
  db_stopDuration: string // 停梯时长
  db_stopTypeCode: string // 停梯类型
  db_entryTypeCode: string // 录入类型
  db_stopDesc: string // 停梯描述
  db_relateId: string // 停梯关联id(任务id)
  db_intime: string // 写入时间
  db_dataDate: string // 数据日期

  ui_projectName: string // 项目名称
  ui_elevName: string // 电梯编号db_elevId->db_id_projectNum
  ui_stopStarttime: string // 停梯开始时间
  ui_stopEndtime: string // 停梯结束时间
  ui_start_dataDate: string // 数据日期开始
  ui_end_dataDate: string // 数据日期结束
  ui_dataDate: string // 数据日期

  ui_stopType: string // 停梯类型
  ui_entryType: string // 录入类型
  ui_intime: string // 写入时间
}
