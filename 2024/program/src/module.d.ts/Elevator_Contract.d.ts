declare interface IElevator_Contract {
  db_id: string
  db_id_contNum: string // 合同编号
  db_createtime: string // 合同创建日期
  db_starttime: string // 合同开始日期
  db_endtime: string // 合同结束日期
  db_contState: string // 合同状态
  db_projectId: string // 合同关联项目id
  db_contEleIds: string // 电梯id组,逗号拼接
  db_usedCompanyId: string // 使用单位id
  db_maintCompanyId: string // 维保单位id
  db_insuCompanyId: string // 承保单位id
  db_propMUserId: string // 物业经理id
  db_propMUserPhone: string // 物业经理手机号
  db_propPassUserId: string // 物业验收人id
  db_propPassUserPhone: string // 物业验收人手机号
  db_projectMUserId: string // 项目经理id
  db_projectMUserPhone: string // 项目经理手机号
  db_enginMUserId: string // 工程经理id
  db_enginMUserPhone: string // 工程经理手机号
  db_insuMUserId: string // 保险客户经理id
  db_insuMUserPhone: string // 保险客户经理Phone
  db_sceneUserId1: string // 现场联系人1(工程人员)
  db_sceneUser1Phone: string // 现场联系人1手机号
  db_sceneUserId2: string // 现场联系人2(工程人员)
  db_sceneUser2Phone: string // 现场联系人2手机号
  db_sceneUserId3: string // 现场联系人3(工程人员)
  db_sceneUser3Phone: string // 现场联系人3手机号
  db_sceneUserId4: string // 现场联系人4(工程人员)
  db_sceneUser4Phone: string // 现场联系人4手机号
  db_contFileUrl: string // 合同扫描件文件地址
  db_contFileName: string // 合同扫描件文件名

  ui_projectName: string // 合同项目名称
  ui_createtime: string // 合同创建日期
  ui_starttime: string // 合同开始日期
  ui_endtime: string // 合同结束日期
  ui_usedCompanyName: string // 使用单位名称
  ui_maintCompanyName: string // 维保单位名称
  ui_insuCompanyName: string // 承保单位名称
  ui_propMUserName: string // 物业经理名称
  ui_propPassUserName: string // 物业验收人名称
  ui_projectMUserName: string // 项目经理名称
  ui_enginMUserName: string // 工程经理名称
  ui_insuMUserName: string // 保险客户经理名称
  ui_sceneUserName1: string // 现场联系人1（工程人员)
  ui_sceneUserName2: string // 现场联系人2（工程人员)
  ui_sceneUserName3: string // 现场联系人3（工程人员)
  ui_sceneUserName4: string // 现场联系人4（工程人员)
  ui_contState: string
  ui_dueState: string
}
