declare interface IUsercenter_InsuUser {
  db_id: string
  db_accId: string // 账号信息id
  db_companyId: string // 公司id

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
}
