declare interface IUsercenter_PropUser {
  db_id: string
  db_accId: string // 账号信息id
  db_companyId: string // 公司id
  db_idCard: string // 身份证号
  db_imgUrl: string // 头像图片地址
  db_imgName: string // 头像图片名称
  db_safetyManaCertName: string // 电梯作业证书名称
  db_safetyManaCertCode: string // 安全管理证书编号
  db_safetyManaCertGetTime: string // 安全管理证书首次获取时间
  db_safetyManaCertBeginTime: string // 安全管理证书有效开始时间
  db_safetyManaCertDeadTime: string // 安全管理证书有效终止时间
  db_safetyManaCertFileUrl: string // 安全管理证书文件地址
  db_safetyManaCertFileName: string // 安全管理证书文件名称

  ui_mobilePhone: string // 手机号
  ui_username: string // 名称
  ui_password: string
  ui_posiType: string // 职位类型
  ui_posiId: string // 职位id
  ui_accState: string // 账号状态
  ui_depId: string // 部门id
  ui_superiorId: string // 上级
  ui_isAdmin: string // 是否管理员0为不是，1为是
  ui_createtime: string
  ui_depName: string // 部门名称
  ui_superiorName: string // 上级名称
  ui_posiTypeName: string // 职位类型名称
  ui_posiName: string // 职位名称

  ui_safetyManaCertGetTime: string // 安全管理证书首次获取时间
  ui_safetyManaCertBeginTime: string // 安全管理证书有效开始时间
  ui_safetyManaCertDeadTime: string // 安全管理证书有效终止时间
}
