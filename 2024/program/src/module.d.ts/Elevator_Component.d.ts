declare interface IElevator_Component {
  db_id: string
  db_id_componentName: string // 部件名称
  db_sysCode: string // 所属系统code --
  db_elevType: string // 所属电梯分类0直梯1扶梯
  db_spaceCode: string // 所属空间code
  db_deviceCode: string // 所属装置code
  db_isTransform: string // 是否属于改造范畴
  db_isCore: string // 是否核心部件
  db_isSafety: string // 是否安全部件
  db_note: string // 说明

  ui_sysName: string // 所属系统名称
  ui_spaceCode: string // 所属空间
  ui_deviceCode: string // 所属装置
}
