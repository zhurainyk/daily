declare interface IElevator_InsuranceInfo {
  db_id: string //
  db_id_name: string // 名称
  db_detail: string // 详情
  db_projectId: string // 所属项目id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_projectNum: string // 项目内编号
  db_useCompanyId: string // 使用单位（物业公司）id
  db_maintCompanyId: string // 维保单位id
  db_insuCompanyId: string // 承保单位id
  db_createUserId: string // 创建人员
  db_onSiteUserId: string // 勘验人员
  db_maintPlanUserId: string // 维修方案制定人员
  db_maintPlanPropAuditUserId: string // 维修方案物业审核人员
  db_maintPlanTLAuditUserId: string // 维修方案平台审核人员
  db_maintPlanInsuAuditUserId: string // 维修方案保险审核人员
  db_maintPlanPropAuditState: string // 维修方案物业审核状态
  db_maintPlanTLAuditState: string // 维修方案平台审核状态
  db_maintPlanInsuAuditState: string // 维修方案保险审核状态
  db_maintPlanPropAuditNote: string // 维修方案物业审核意见
  db_maintPlanTLAuditNote: string // 维修方案平台审核意见
  db_maintPlanInsuAuditNote: string // 维修方案保险审核意见
  db_quotationUserId: string // 报价方案制定人员
  db_quotationTLAuditUserId: string // 报价方案平台审核人员
  db_quotationTLAuditNote: string // 报价方案平台审核意见
  db_assessLossUserId: string // 定损人员
  db_assessLossNote: string // 定损意见
  db_finishTLComfirmUserId: string // 维修结束平台确认人员
  db_finishTLComfirmNote: string // 维修结束平台确认意见
  db_settleAuditUserId: string // 审核结算人员
  db_settleAuditNote: string // 审核结算意见
  db_payComfirmUserId: string // 支付确认人员
  db_payComfirmNote: string // 支付确认意见
  db_filingUserId: string // 归档操作人员
  db_faultOccurTime: string // 故障发生时间
  db_createtime: string // 创建时间
  db_onSiteTime: string // 勘验时间
  db_maintPlanSubmitTime: string // 维修方案提交时间
  db_maintPlanPropAuditTime: string // 维修方案物业审核时间
  db_maintPlanTLAuditTime: string // 维修方案平台审核时间
  db_maintPlanInsuAuditTime: string // 维修方案保险审核时间
  db_quotationSubmitTime: string // 报价方案提交时间
  db_quotationTLAuditTime: string // 报价方案平台审核时间
  db_assessLossTime: string // 定损时间
  db_finishTLComfirmTime: string // 维修结束平台确认时间
  db_settleAuditTime: string // 审核结算时间
  db_payComfirmTime: string // 支付确认时间
  db_dealEndtime: string // 完成时间
  db_filingTime: string // 归档时间

  db_dealEndDuration: string // 完成耗时
  db_faultDesc: string // 故障描述
  db_faultSrcCode: string // 故障来源
  db_callRepairClassifyCode: string // 召修分类(原因)code
  db_faultReasonAnalysis: string // 故障原因分析
  db_onSiteImgUrls: string // 现场勘验json
  db_maintPlan: string // 维修方案json
  db_quotation: string // 报价方案json
  db_scrapValueDeal: string // 残值处理方式
  db_scrapValue: string // 残值
  db_maintAfterImgUrls: string // 维修后图片地址
  db_state: string // 状态
  db_taskId: string // 关联任务id
  db_preDuration: string // 预计完成天数
  db_partList: string // 换件明细清单json
  db_partCost: string // 配件费
  db_manhourCost: string // 工时费
  db_totalCost: string // 合计费用
  db_flowRecords: string // 流转记录json[]
  db_note: string // 备注

  ui_useCompanyName: string // 使用单位（物业公司）
  ui_maintCompanyName: string // 维保单位
  ui_insuCompanyName: string // 承保单位
  ui_projectName: string // 所属项目名称
  ui_taskName: string // 关联任务名称
  ui_createUserName: string // 创建人
  ui_onSiteUserName: string // 勘验人
  ui_maintPlanUserName: string // 维修方案制定人
  ui_maintPlanPropAuditUserName: string // 维修方案物业审核人员
  ui_maintPlanTLAuditUserName: string // 维修方案平台审核人员
  ui_maintPlanInsuAuditUserName: string // 维修方案保险审核人员
  ui_maintPlanPropAuditStateDesc: string // 维修方案物业审核状态
  ui_maintPlanTLAuditStateDesc: string // 维修方案平台审核状态
  ui_maintPlanInsuAuditStateDesc: string // 维修方案保险审核状态
  ui_quotationUserName: string // 报价方案制定人员
  ui_quotationTLAuditUserName: string // 报价方案平台审核人员
  ui_assessLossUserName: string // 定损人员
  ui_finishTLComfirmUserName: string // 维修结束平台确认人员
  ui_settleAuditUserName: string // 审核结算人员
  ui_payComfirmUserName: string // 支付确认人员
  ui_filingUserName: string // 归档操作人员
  ui_faultOccurTime: string // 故障发生时间
  ui_createtime: string // 创建时间
  ui_onSiteTime: string // 勘验时间
  ui_maintPlanSubmitTime: string // 维修方案提交时间
  ui_maintPlanPropAuditTime: string // 维修方案物业审核时间
  ui_maintPlanTLAuditTime: string // 维修方案平台审核时间
  ui_maintPlanInsuAuditTime: string // 维修方案保险审核时间
  ui_quotationSubmitTime: string // 报价方案提交时间
  ui_quotationTLAuditTime: string // 报价方案平台审核时间
  ui_assessLossTime: string // 定损时间
  ui_finishTLComfirmTime: string // 维修结束平台确认时间
  ui_settleAuditTime: string // 审核结算时间
  ui_payComfirmTime: string // 支付确认时间
  ui_dealEndtime: string // 完成时间
  ui_filingTime: string // 归档时间
  ui_stateDesc: string // 状态
  ui_scrapValueDealDesc: string // 残值处理方式
  ui_faultSrcCodeDesc: string // 故障来源
  ui_callRepairClassifyDesc: string // 召修分类(原因)code
  ui_faultReasonAnalysisDesc: string // 故障原因分析

  ui_start_createtime: string // 创建时间开始
  ui_end_createtime: string // 创建时间结束

  ui_start_onSiteTime: string // 勘验时间开始
  ui_end_onSiteTime: string // 勘验时间结束

  ui_start_maintPlanSubmitTime: string // 完成时间开始
  ui_end_maintPlanSubmitTime: string // 完成时间结束

  ui_start_maintPlanPropAuditTime: string // 维修方案物业审核时间开始
  ui_end_maintPlanPropAuditTime: string // 维修方案物业审核时间结束

  ui_start_maintPlanTLAuditTime: string // 维修方案平台审核时间开始
  ui_end_maintPlanTLAuditTime: string // 维修方案平台审核时间结束

  ui_start_maintPlanInsuAuditTime: string // 维修方案保险审核时间开始
  ui_end_maintPlanInsuAuditTime: string // 维修方案保险审核时间结束

  ui_start_quotationSubmitTime: string // 报价方案提交时间开始
  ui_end_quotationSubmitTime: string // 报价方案提交时间结束

  ui_start_quotationTLAuditTime: string // 报价方案平台审核时间开始
  ui_end_quotationTLAuditTime: string // 报价方案平台审核时间结束

  ui_start_assessLossTime: string // 定损时间开始
  ui_end_assessLossTime: string // 定损时间结束

  ui_start_finishTLComfirmTime: string // 维修结束平台确认时间开始
  ui_end_finishTLComfirmTime: string // 维修结束平台确认时间结束

  ui_start_settleAuditTime: string // 审核结算时间开始
  ui_end_settleAuditTime: string // 审核结算时间结束

  ui_start_ComfirmTime: string // 支付确认时间开始
  ui_end_ComfirmTime: string // 支付确认时间结束

  ui_start_dealEndtime: string // 完成时间开始
  ui_end_dealEndtime: string // 完成时间结束

  ui_start_filingTime: string // 归档时间开始
  ui_end_filingTime: string // 归档时间结束
}
