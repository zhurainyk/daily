declare interface IElevator_Material {
  db_id: string
  db_materNum: string // 物料编号
  db_id_materName: string // 物料名称
  db_partInstanceId: string // 关联配件实例id
  db_suppCompanyId: string // 供应商id
  db_suppDuration: string // 供货周期
  db_costing: string // 成本(单价)
  db_unit: string // 单位
  db_materFileUrl: string // 物料附件地址
  db_materFileName: string // 物料附件名称
  db_note: string // 备注说明

  ui_partInstanceName: string // 关联配件实例名称
  ui_suppCompanyName: string // 供应商名称
}
