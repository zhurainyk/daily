declare interface IElevator_Helmet {
  db_id: string
  db_IMEI: string // 移动设备识别码
  db_code: string // ID
  db_id_name: string // 名称
  db_mobilePhone: string // 手机号
  db_model: string // 型号
  db_manufacturer: string // 厂商
  db_manuDate: string // 出厂日期
  db_bindAccId: string // 绑定人员id
  db_createtime: string // 录入时间

  ui_bindAccName: string // 绑定人员名称
  ui_manuDate: string // 出厂日期
  ui_createtime: string // 录入时间

  ui_start_manuDate: string // 出厂日期开始
  ui_end_manuDate: string // 出厂日期结束
  ui_start_createtime: string // 录入时间开始
  ui_end_createtime: string // 录入时间结束
}
