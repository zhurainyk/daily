declare interface IElevator_Risk {
  db_id: string
  db_id_riskEvent: string // 风险事件
  db_riskTime: string // 风险产生时间
  db_projectId: string // 风险项目id,不可为空
  db_projectNum: string // 项目内编号,可为空
  db_elevId: string // 风险电梯id,可为空
  db_registCode: string // 风险电梯注册码,可为空
  db_riskUserId: string // 风险处理人id
  db_dealtime: string // 风险处理时间
  db_riskState: string // 风险处理状态
  db_riskSrcCode: string // 风险来源code

  ui_riskTime: string // 风险产生时间
  ui_riskUserName: string // 风险处理人名称
  ui_riskState: string // 风险处理状态
  ui_dealtime: string // 风险处理时间
  ui_start_riskTime: string // 风险产生时间的开始
  ui_end_riskTime: string // 风险产生时间的结束
  ui_projectName: string // 风险项目
}
