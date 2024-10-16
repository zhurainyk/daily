declare interface IElevator_TaskCallRepair {
  db_id: string
  db_taskId: string // 公共任务id
  db_projectId: string // 所属项目id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_lastMaintRunTimes: string // 距上次维保运行次数
  db_lastMaintRunDuration: string // 距上次维保运行时长
  db_lastMaintDuration: string // 距上次维保自然时长
  db_lastMaintDoorTimes: string // 距上次维保开关门次数
  db_lastMaintRunMileage: string // 距上次维保运行里程
  db_lastMaintTaskId: string // 上次维保(常规保养)任务id
  db_lastRepairRunTimes: string // 距上次召修运行次数
  db_lastRepairRunDuration: string // 距上次召修运行时长
  db_lastRepairDuration: string // 距上次召修自然时长
  db_lastRepairDoorTimes: string // 距上次召修开关门次数
  db_lastRepairRunMileage: string // 距上次召修运行里程
  db_lastRepairTaskId: string // 上次召修任务id
  db_cllaRepairsUserId: string // 报修人id
  db_faultAppearanceId: string // 故障现象id组，逗号拼接
  db_faultAppearanceUrl: string // 故障现象图片视频地址
  db_faultAppearanceName: string // 故障现象图片视频名称
  db_isTiring: string // 是否困人 00否，01困人
  db_faultOccurTime: string // 故障发生时间
  db_callRepairTypeCode: string // 召修类型code
  db_callRepairType: string // 召修类型名称(原因)
  db_callRepairClassifyCode: string // 召修分类code
  db_faultCodeId: string // 故障码id
  db_faultCode: string // 故障码
  db_isModBCoeff: string // 是否修改平衡系数
  db_balanceCoeff: string // 平衡系数
  db_faultReasonAnalysis: string // 故障原因分析
  db_faultReason: string // 导致故障原因
  db_faultReasonDesc: string // 故障原因描述
  db_maintPlan: string // 维修技术方案
  db_preDuration: string // 预计完成天数
  db_solution: string // 解决方案
  db_partList: string // 换件清单json
  db_partImgUrls: string // 换件前后对比图地址
  db_partCost: string // 配件费
  db_manhourCost: string // 工时费
  db_scrapValueDeal: string // 残值处理方式
  db_scrapValue: string // 残值
  db_totalCost: string // 合计费用
  db_costDesc: string // 费用描述
  db_baseInfo: string // 电梯基本信息json
  db_environmentState: string // 环境信息json
  db_sysCompPartState: string // 零部件信息json
  db_elevState: string // 使用状态等json
  db_issueList: string // 问题清单json
  db_insuranceId: string // 保险流程id

  ui_projectName: string // 所属项目名称
  ui_cllaRepairsUserName: string // 报修人名称
  ui_callRepairClassify: string // 召修分类
  ui_isTiringDesc: string // 是否困人描述
  ui_isModBCoeff: string // 是否修改平衡系数
  ui_faultOccurTime: string // 故障发生时间
  ui_insuranceName: string // 保险流程名称
  ui_scrapValueDealDesc: string // 残值处理方式

  taskInfo: IElevator_TaskInfo
}
