declare interface IElevator_AnnualInspect {
  db_id: string
  db_projectId: string // 项目id
  db_projectNum: string // 项目内编号
  db_elevId: string // 电梯id
  db_registCode: string // 电梯注册码
  db_inspectTypeCode: string // 检验类型code
  db_inspectState: string // 检验状态
  db_inspectTime: string // 检验时间
  db_licenseTime: string // 取证时间
  db_dealState: string // 处理状态
  db_dealUserId: string // 处理人id
  db_genTime: string // 产生时间
  db_dealtime: string // 处理时间
  db_fileUrl: string // 附件图地址,多个逗号拼接
  db_fileName: string // 附件图名称,多个逗号拼接
  db_note: string // 备注

  ui_projectName: string // 风险项目
  ui_inspectTime: string // 检验时间
  ui_licenseTime: string // 取证时间
  ui_dealUserName: string // 处理人名称
  ui_genTime: string // 产生时间
  ui_dealtime: string // 处理时间
  ui_start_dealtime: string // 处理时间的开始
  ui_end_dealtime: string // 处理时间的结束
}
