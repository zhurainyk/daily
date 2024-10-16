declare interface IUsercenter_Account {
  db_id: string
  db_mobilePhone: string
  db_id_username: string
  db_password: string
  db_accState: string // 账号状态0停用1启用
  db_posiType: string // 职位类型
  db_posiId: string // 职位id
  db_depId: string // 部门id
  db_superiorId: string // 上级id
  db_isAdmin: string // 是否是管理员
  db_createtime: string
  ui_depName: string // 部门名称
  ui_superiorName: string // 上级名称
  ui_posiTypeName: string // 职位类型名称
  ui_posiName: string // 职位名称
  ui_createtime: string
  ui_sysType: string // 平台类型
  ui_sysName: string // 平台名称
}
