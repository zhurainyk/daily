declare interface IElevator_IssueList {
  db_id: string
  db_projectId: string // 所属项目id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_projectNum: string // 项目内编号
  db_classifyCode: string // 问题分类
  db_detailTypeCode: string // 问题细分类型
  db_dealLabelCode: string // 处理标识
  db_dayLabel: string // 标识天数
  db_weightCode: string // 问题权重
  db_dataDate: string // 数据日期
  db_createTime: string // 创建时间
  db_createUserId: string // 创建人
  db_updateTime: string // 更新时间
  db_updateUserId: string // 更新人
  db_content: string // 描述内容
  db_note: string // 标识备注描述

  ui_projectName: string // 所属项目名称
  ui_classify: string // 问题分类
  ui_detailType: string // 问题细分类型
  ui_dealLabel: string // 处理标识
  ui_weight: string // 问题权重
  ui_dataDate: string // 数据日期
  ui_createTime: string // 创建时间
  ui_createUserName: string // 创建人名称
  ui_updateTime: string // 更新时间
  ui_updateUserName: string // 更新人名称

  ui_start_createTime: string // 创建时间开始
  ui_end_createTime: string // 创建时间结束

  ui_start_updateTime: string // 更新时间开始
  ui_end_updateTime: string // 更新时间结束

  ui_start_dataDate: string // 数据日期开始
  ui_end_dataDate: string // 数据日期结束
}
