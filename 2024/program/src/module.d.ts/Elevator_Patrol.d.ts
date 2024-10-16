declare interface IElevator_Patrol {
  db_id: string
  db_projectId: string // 所属项目id
  db_projectNum: string // 项目内编号
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_workItemList: string // 巡查工作项
  db_createtime: string // 创建时间
  db_dealtime: string // 处理时间
  db_patrolState: string // 巡查状态

  ui_projectName: string // 所属项目名称
  ui_createtime: string // 创建时间
  ui_dealtime: string // 处理时间
  ui_patrolStateDesc: string // 巡查状态描述

  ui_start_dealtime: string // 开始时间
  ui_end_dealtime: string // 结束时间
}
