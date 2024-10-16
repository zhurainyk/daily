declare interface IUsercenter_MaintCompany {
  db_id: string
  db_id_companyName: string
  db_companyCode: string // 公司统一社会信用代码
  db_companyAddr: string // 公司地址
  db_contactName: string // 联系人姓名
  db_contactPhone: string // 联系人电话
  db_companyPhone: string // 公司电话
  db_bankAccount: string // 银行账号
  db_bankName: string // 开户行名称
  db_licenseUrl: string // 营业执照地址
  db_licenseName: string // 营业执照名称

  db_specEquipLcLevel: string // 特种设备许可证等级
  db_specEquipLcFileUrl: string // 特种设备许可证文件地址
  db_specEquipLcFileName: string // 特种设备许可证文件名称
  db_officeSpace: string // 独立办公面积
  db_localmaintCount: string // 本地区维保台数
  db_maintNature: string // 维保企业隶属性质
  db_hisAccident: string // 历史安全事故
  db_hisAccidentFileUrl: string // 历史安全事故凭证文件地址
  db_hisAccidentFileName: string // 历史安全事故凭证文件名称
  db_negativeNew: string // 负面新闻报道
  db_negativeNewFileUrl: string // 负面新闻报道凭证文件地址
  db_negativeNewFileName: string // 负面新闻报道凭证文件名称
  db_legalDispute: string // 法律纠纷
  db_legalDisputeFileUrl: string // 法律纠纷凭证文件地址
  db_legalDisputeFileName: string // 法律纠纷凭证文件名称
  db_punishment: string // 处罚记录
  db_punishmentFileUrl: string // 处罚记录凭证文件地址
  db_punishmentFileName: string // 处罚记录凭证文件名称
  db_honor: string // 企业荣誉
  db_honorFileUrl: string // 企业荣誉凭证文件地址
  db_honorFileName: string // 企业荣誉凭证文件名称
  db_evaluation: string // 综合评分

  db_platformName: string // 平台名称
  db_platformKey: string // 平台key
  db_platformCode: string // 平台编码
  db_platformSecret: string // 平台secret
  db_extraOnOff: string // （开关）
  db_extra: string // db_extra
  db_userIds: string // 有物业公司权限的人id组,逗号拼接

  company_name: string // 前端使用
  system_name: string // 前端使用
  logo_url: string // 前端使用
  appLogo_url: string // 前端使用
  wxLogo_url: string // 前端使用
}
