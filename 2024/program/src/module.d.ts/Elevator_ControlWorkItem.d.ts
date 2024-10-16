declare interface IElevator_ControlWorkItem {
  db_id: string
  db_id_itemName: string // 工作项名称
  db_skillLevelCode: string // 技能等级code
  db_itemContent: string // 工作项内容
  db_elevType: string // 所属电梯类型0直梯1扶梯
  db_expectDuration: string // 预计耗时时长，分钟
  db_note: string // 备注
  ui_skillLevel: string // 技能等级
}
