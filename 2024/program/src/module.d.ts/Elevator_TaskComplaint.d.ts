declare interface IElevator_TaskComplaint {
  db_id: string
  db_taskId: string // 公共任务id
  db_complaintUser: string // 投诉人
  db_complaintObject: string // 投诉对象
  db_complaintType: string // 投诉类型
  db_complaintDesc: string // 投诉描述
  db_complaintLevel: string // 投诉等级
  db_dealUserId: string // 处理人id
  db_dealState: string // 处理状态
  db_dealContent: string // 处理内容

  ui_dealUserName: string // 处理人名称

  taskInfo: IElevator_TaskInfo
}
