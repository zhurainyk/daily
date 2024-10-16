declare interface IElevator_ProjectLife {
  db_id
  db_id_content // 记录内容
  db_projectId // 项目id
  db_genTime // 发生时间
  db_intime // 写入时间
  db_inUserId // 写入人员id
  db_imgUrl // 附图地址
  db_fileUrl // 附件地址
  db_fileName // 附件名称
  db_useCompanyId // 使用单位（物业公司）id
  db_maintCompanyId // 维保单位id
  db_insuCompanyId // 承保单位id
  db_note // 备注

  ui_projectName // 项目名称
  ui_genTime // 发生时间
  ui_intime // 写入时间
  ui_inUserName // 写入人员
  ui_useCompanyName // 使用单位（物业公司）
  ui_maintCompanyName // 维保单位
  ui_insuCompanyName // 承保单位

  ui_start_genTime // 发生时间开始
  ui_end_genTime // 发生时间结束
  ui_start_intime // 入库时间开始
  ui_end_intime // 入库时间结束
}
