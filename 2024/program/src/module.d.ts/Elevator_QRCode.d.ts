declare interface IElevator_QRCode {
  db_id: string
  db_id_code: string // 二维码编号
  db_projectId: string // 绑定的电梯项目id
  db_elevId: string // 绑定的电梯id
  db_registCode: string // 绑定的电梯注册码
  db_createtime: string // 生成时间
  db_bindTime: string // 绑定时间
  db_updateTime: string // 更新时间
  db_createUserId: string // 创建人员
  db_bindUserId: string // 绑定操作人
  db_updateUserId: string // 更新人员
  db_bindState: string // 绑定状态
  db_note: string // 备注

  ui_projectName: string // 所属项目名称
  ui_elevName: string // 电梯名称（项目内编号）
  ui_createtime: string // 生成时间
  ui_bindTime: string // 绑定时间
  ui_updateTime: string // 更新时间
  ui_createUserName: string // 创建人员
  ui_bindUserName: string // 绑定操作人
  ui_updateUserName: string // 更新人员
  ui_bindStateDesc: string // 绑定状态描述
}
