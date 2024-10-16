declare interface IElevator_TaskInfo {
  db_id: string
  db_id_taskName: string // 任务名称
  db_taskTypeCode: string // 任务类型code
  db_scheduleId: string // 关联计划id
  db_taskDetail: string // 任务详情
  db_projectId: string // 所属项目id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_projectNum: string // 项目内编号
  db_createUserId: string // 创建人
  db_followUserId: string // 跟进人
  db_executeUserId: string // 执行人
  db_isVideo: string // 是否录制视频
  db_createtime: string // 创建时间
  db_preEndtime: string // 预计完成时间
  db_timeout: string // 超时时间
  db_dealStarttime: string // 开始作业时间
  db_dealEndtime: string // 完成作业时间
  db_dealEndDuration: string // 完成任务耗时
  db_taskPriorityCode: string // 优先级code
  db_taskState: string // 任务状态
  db_stopDuration: string // 停梯时长
  db_evaluation: string // 评价json
  db_note: string // 备注
  db_dynamicWorkItem: string // 动态工作项
  db_proElecSignatureUrl: string // 电子签名
  db_useCompanyId: string //使用单位（物业公司）id
  db_maintCompanyId: string //维保单位id
  db_insuCompanyId: string //承保单位id

  ui_useCompanyName: string //使用单位（物业公司）
  ui_maintCompanyName: string //维保单位
  ui_insuCompanyName: string //承保单位

  ui_taskType: string // 任务类型
  ui_projectName: string // 所属项目名称
  ui_scheduleName: string // 关联计划名称
  ui_createUserName: string // 创建人
  ui_followUserName: string // 跟进人
  ui_executeUserName: string // 执行人
  ui_createtime: string // 创建时间
  ui_preEndtime: string // 预计完成时间
  ui_timeout: string // 超时时间
  ui_dealStarttime: string // 开始作业时间
  ui_dealEndtime: string // 完成作业时间
  ui_taskPriority: string // 优先级
  ui_taskStateDesc: string // 任务状态描述
  ui_typeTask: any // 各类型任务实体

  ui_start_createtime: string // 创建时间开始
  ui_end_createtime: string // 创建时间结束

  ui_start_preEndtime: string // 预计完成时间开始
  ui_end_preEndtime: string // 预计完成时间结束

  ui_start_dealEndtime: string // 完成时间开始
  ui_end_dealEndtime: string // 完成时间结束

  ui_hasDynamicWorkItem: string // 是否有动态工作项
}
