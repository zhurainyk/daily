declare interface IElevator_Every_Day_Passengers_Times {
  db_dayTime: string // 生成日期
  db_supplierCode: string // 供应商
  db_total_passengers: string // 总的乘梯人数
  db_avg_passengers: string // 平均乘梯人数
  db_projectId: string // 项目id
  db_registCode: string // 电梯注册码
  db_useCompanyId: string // 使用单位
  db_maintCompanyId: string // 维保公司
  db_insuCompanyId: string // 承保公司
  db_is_holiday: string // 是否是节假日
  db_type: string // 类型

  ui_projectName: string // 项目名称
  ui_projectNum: string // 项目内编号，电梯id获取
  ui_supplier: string // 供应商名称
  ui_dayTime: string // 生成日期
  ui_start_dayTime: string // 生成日期开始时间
  ui_end_dayTime: string // 生成日期结束时间
}
