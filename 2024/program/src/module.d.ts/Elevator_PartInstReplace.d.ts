declare interface IElevator_PartInstReplace {
  db_id: string
  db_partInstId: string // 配件实例id
  db_taskId: string // 换件任务id
  db_orderId: string // 换件工单id
  db_projectId: string // 所属项目id
  db_elevId: string // 电梯档案db_id
  db_registCode: string // 电梯注册代码
  db_replaceCount: string // 换件数量
  db_unit: string // 单位
  db_replaceUserId: string // 换件人id
  db_replaceTime: string // 换件时间
  db_beforeImgUrl: string // 换件前图地址
  db_afterImgUrl: string // 换件后图地址
  db_note: string // 备注说明

  ui_replaceTime: string // 换件时间
  ui_partInstName: string // 配件实例名称
  ui_taskName: string // 换件任务名称
  ui_orderName: string // 换件工单名称
  ui_start_replaceTime: string // 换件时间的开始
  ui_end_replaceTime: string // 换件时间的结束
  ui_unitName: string // 单位
  ui_projectName: string // 所属项目Name
  ui_projectNum: string // 电梯名（项目内编号）
}
