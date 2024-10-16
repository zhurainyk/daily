declare interface IControlEventCode {
  db_id: string
  db_id_eventCode: string // 故障码
  db_controlSysCode: string // 所属控制系统code
  db_faultPriorityCode: string // 故障码优先级code
  db_eventPriorityCode: string // 故障优先级code
  db_eventDesc: string // 故障描述-说明
  db_solution: string // 解决方案
  db_workItemIds: string // 工作项id集合，逗号拼接
  ui_controlSys: string // 所属控制系统
  ui_eventPriority: string // 故障优先级
}
