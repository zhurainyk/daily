declare interface IElevator_DynamicWorkItem {
  db_id: string
  db_projectId: string // 所属项目id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_projectNum: string // 项目内编号
  db_dealLabelCode: string // 完成标识
  db_createTime: string // 创建时间
  db_createUserId: string // 创建人
  db_content: string // 描述内容

  ui_projectName: string // 所属项目名称
  ui_dealLabel: string // 完成标识
  ui_createTime: string // 创建时间
  ui_createUserName: string // 创建人名称

  ui_start_createTime: string // 创建时间开始
  ui_end_createTime: string // 创建时间结束
}
