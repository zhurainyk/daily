declare interface IUsercenter_EnginUser {
  db_id: string
  db_accId: string // 账号信息id
  db_companyId: string // 公司id
  db_idCard: string // 身份证号
  db_number: string // 员工编号
  db_sex: string // 性别
  db_mail: string // 邮箱
  db_imgUrl: string // 头像图地址
  db_imgName: string // 头像图名称
  db_engiCertName: string // 工程师证书名称
  db_engiCertCode: string // 工程师证书编号
  db_engiCertGetTime: string // '工程师证书获取时间
  db_engiCertLevel: string // 工程师证书等级
  db_engiCertFileUrl: string // 工程师证书文件地址
  db_engiCertFileName: string // 工程师证书文件名称
  db_eleOpCertName: string // 电梯作业证书名称
  db_eleOpCertCode: string // 电梯作业证书编号
  db_eleOpCertGetTime: string // 电梯作业证书首次获取时间
  db_eleOpCertBeginTime: string // 电梯作业证书有效开始时间
  db_eleOpCertDeadTime: string // 电梯作业证书有效终止时间
  db_eleOpCertFileUrl: string // 电梯作业证书文件地址
  db_eleOpCertFileName: string // 电梯作业证书文件名称
  db_skillCertName: string // 职业技能证书名称
  db_skillCertCode: string // 职业技能证书编号
  db_skillCertGetTime: string // 职业技能证书获取时间
  db_skillCertLevel: string // 职业技能证书等级
  db_skillCertFileUrl: string // 职业技能证书文件地址
  db_skillCertFileName: string // 职业技能证书文件名称
  db_eleInsCertName: string // 电梯检验员证书名称
  db_eleInsCertCode: string // 电梯检验员证书编号
  db_eleInsCertGetTime: string // 电梯检验员证书首次获取时间
  db_eleInsCertBeginTime: string // 电梯检验员证书有效开始时间
  db_eleInsCertDeadTime: string // 电梯检验员证书有效终止时间
  db_eleInsCertFileUrl: string // 电梯检验员证书文件地址
  db_eleInsCertFileName: string // 电梯检验员证书文件名称
  db_skillLevel: string // 技能等级

  ui_mobilePhone: string // 手机号
  ui_username: string // 名称
  ui_password: string
  ui_accState: string // 账号状态
  ui_posiType: string // 职位类型
  ui_posiId: string // 职位id
  ui_depId: string // 部门id
  ui_superiorId: string // 上级
  ui_isAdmin: string // 是否管理员0为不是，1为是
  ui_createtime: string
  ui_depName: string // 部门名称
  ui_superiorName: string // 上级名称
  ui_posiTypeName: string // 职位类型名称
  ui_posiName: string // 职位名称
  ui_skillLevelName: string // 技能等级名称

  ui_engiCertGetTime: string // '工程师证书获取时间
  ui_eleOpCertGetTime: string // 电梯作业证书获取时间
  ui_eleOpCertBeginTime: string // 电梯作业证书有效开始时间
  ui_eleOpCertDeadTime: string // 电梯作业证书有效终止时间
  ui_skillCertGetTime: string // 职业技能证书获取时间
  ui_eleInsCertGetTime: string // 电梯检验员证书获取时间
  ui_eleInsCertBeginTime: string // 电梯检验员证书有效开始时间
  ui_eleInsCertDeadTime: string // 电梯检验员证书有效终止时间

  ui_engiCertLevelName: string // 工程师证书等级
  ui_skillCertLevelName: string // 职业技能证书等级
}
