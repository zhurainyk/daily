declare interface IElevator_MaintDelay {
  db_id: string //
  db_id_name: string // 名称
  db_projectId: string // 所属项目id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_projectNum: string // 项目内编号
  db_applyUserId: string // 申请人员
  db_propUserId: string // 审核人员
  db_applytTime: string // 申请时间
  db_auditTime: string // 审核时间
  db_applyFor: string // 申请原因
  db_auditOpinion: string // 审核意见
  db_stateCode: string // 状态
  db_delayStart: string // 延期开始时间
  db_delayDuration: string // 申请延期天数
  db_useCompanyId: string // 使用单位（物业公司）id
  db_maintCompanyId: string // 维保单位id
  db_insuCompanyId: string // 承保单位id
  db_note: string // 备注

  ui_applyUserName: string // 申请人员
  ui_propUserName: string // 审核人员
  ui_applytTime: string // 申请时间
  ui_auditTime: string // 审核时间
  ui_delayStart: string // 申请延期开始时间
  ui_stateDesc: string // 状态
  ui_projectName: string // 项目名称
  ui_useCompanyName: string // 使用单位（物业公司）
  ui_maintCompanyName: string // 维保单位
  ui_insuCompanyName: string // 承保单位

  ui_start_applytTime: string // 申请时间开始
  ui_end_applytTime: string // 申请时间结束
  ui_start_auditTime: string // 审核时间开始
  ui_end_auditTime: string // 审核时间结束
  ui_start_delayStart: string // 延期开始时间开始
  ui_end_delayStart: string // 延期开始时间结束
}
