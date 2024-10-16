declare interface IElevator_BICommentArea {
  db_id: string
  db_projectId: string // 所属项目id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_projectNum: string // 项目内编号
  db_sureLabelCode: string // 确认标识
  db_createTime: string // 创建时间
  db_createUserId: string // 创建人
  db_sureTime: string // 确认时间
  db_sureUserId: string // 确认人
  db_content: string // 描述内容
  db_comments: string // 评论json

  ui_projectName: string // 所属项目名称
  ui_sureLabel: string // 确认标识
  ui_createTime: string // 创建时间
  ui_createUserName: string // 创建人名称
  ui_sureTime: string // 确认时间
  ui_sureUserName: string // 确认人名称

  ui_start_createTime: string // 创建时间开始
  ui_end_createTime: string // 创建时间结束

  ui_start_sureTime: string // 确认时间开始
  ui_end_sureTime: string // 确认时间结束
}
