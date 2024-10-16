declare interface IElevator_VersionAndroid {
  db_id: string
  db_id_versioCode: string // 版本号(展示)
  db_versionValue: string // 版本值
  db_upgradeDesc: string // 更新描述
  db_versionType: string // 版本类型(是否强制更新00否/01是)
  db_genTime: string // 版本时间
  db_appUrl: string // app下载地址
  db_appName: string // app文件名
  db_note: string // 备注
  ui_genTime: string // 版本时间
}
