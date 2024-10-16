declare interface IElevator_WorkTemplate {
  db_id: string
  db_id_templateName: string // 模板名称
  db_templateTypeCode: string // 模板类型，同工单类型
  db_elevType: string // 所属电梯类型0直梯1扶梯
  db_workItemTypeCode: string // 工作项类型
  db_workItemIds: string // 工作项id组,逗号拼接
}
