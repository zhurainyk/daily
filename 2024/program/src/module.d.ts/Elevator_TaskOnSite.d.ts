declare interface IElevator_TaskOnSite {
  db_id: string
  db_taskId: string // 公共任务id
  db_projectId: string // 项目id
  db_projectName: string // 项目名称
  db_trappedReason: string // 驻场原因
  db_startDate: string // 开始日期
  db_endDate: string // 结束日期
  db_duration: string // 持续天数
  db_onSiteImgUrls: string // 驻场图地址组，逗号拼接
  db_onSiteImgNames: string // 驻场图名称组，逗号拼接

  ui_startDate: string // 驻场开始日期
  ui_endDate: string // 驻场结束日期

  taskInfo: IElevator_TaskInfo
}
