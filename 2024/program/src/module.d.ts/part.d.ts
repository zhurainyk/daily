declare interface IPart {
  db_id: string
  db_id_partName: string // 零件名称
  db_sysCode: string // 所属系统code
  db_componentId: string // 所属部件id
  db_elevType: string // 所属电梯类型0直梯1扶梯
  db_lifeCycelTypeCode: string // 生命周期类型code
  db_lifeCycle: string // 生命周期
  db_isVulnerable: string // 是否易损件
  db_isOverhaul: string // 是否大修范畴
  db_electromechanicalCode: string // 机电属性code
  db_isCore: string // 是否核心配件
  db_note: string // 说明
  ui_sysName: string // 所属系统名称
  ui_componentName: string // 所属部件名称
  ui_lifeCycelType: string // 生命周期类型
  ui_electromechanical: string // 机电属性
}
