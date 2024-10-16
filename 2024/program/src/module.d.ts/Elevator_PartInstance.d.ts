declare interface IElevator_PartInstance {
  db_id: string
  db_partInstanceNum: string // 配件编号
  db_id_partInstanceName: string // 配件实例名称
  db_componentId: string // 部件id
  db_partId: string // 配件id
  db_spaceCode: string // 所属空间Code
  db_isCore: string // 是否核心配件
  db_partBrandId: string // 配件品牌id
  db_model: string // 规格型号
  db_modelDesc: string // 规格型号说明
  db_paramList: string // 参数清单json
  db_unit: string // 单位
  db_imgUrl: string // 图示地址
  db_imgName: string // 图示名称
  db_note: string // 备注说明

  db_createtime: string // 写入时间
  db_lifecycleRunDuration: string // 生命周期-运行时长秒
  db_lifecycleRunTimes: string // 生命周期-运行次数
  db_lifecycleDoorTimes: string // 生命周期-开关门次数
  db_lifecycleRunMileage: string // 生命周期-运行里程米

  ui_componentName: string // 所属部件名称
  ui_partName: string // 所属配件名称
  ui_partBrandName: string // 配件品牌名称
}
