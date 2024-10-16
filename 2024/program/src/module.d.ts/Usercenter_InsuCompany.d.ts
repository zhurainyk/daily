declare interface IUsercenter_InsuCompany {
  db_id: string
  db_id_companyName: string
  db_companyCode: string // 公司统一社会信用代码
  db_legalPerson: string // 公司法人
  db_companyAddr: string // 公司地址
  db_contactName: string // 联系人姓名
  db_contactPhone: string // 联系人电话
  db_companyPhone: string // 公司电话
  db_bankAccount: string // 银行账号
  db_bankName: string // 开户行名称
  db_licenseUrl: string // 营业执照地址
  db_licenseName: string // 营业执照名称
  db_extraOnOff: string // （开关）
  db_extra: string // db_extra
  db_userIds: string // 有物业公司权限的人id组,逗号拼接

  company_name: string // 前端使用
  system_name: string // 前端使用
  logo_url: string // 前端使用
  appLogo_url: string // 前端使用
  wxLogo_url: string // 前端使用
}
