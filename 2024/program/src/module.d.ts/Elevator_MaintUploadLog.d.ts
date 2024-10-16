declare interface IElevator_MaintUploadLog {
  db_id: string
  db_projectId: string // 项目id
  db_uploadTypeCode: string // 报送类型
  db_platformTypeCode: string // 报送平台类型
  db_dataDate: string // 报送数据的日期
  db_uploadStateCode: string // 报送状态
  db_content: string // 报送描述
  db_uploadTime: string // 报送的时间
  db_useCompanyId: string // 使用单位
  db_maintCompanyId: string // 维保单位
  db_maintCount: string // 报送的维保条数
  db_repairCount: string // 报送的回召条数

  ui_projectName: string // 报送的项目名称
  ui_uploadType: string // 报送类型
  ui_platformType: string // 报送平台类型
  ui_dataDate: string // 报送数据的日期
  ui_uploadState: string // 报送状态
  ui_uploadTime: string // 报送的时间

  ui_start_dataDate: string // 报送数据的日期开始
  ui_end_dataDate: string // 报送数据的日期结束

  ui_start_uploadTime: string // 报送的时间开始
  ui_end_uploadTime: string // 报送的时间结束
  ui_maintCompanyName: string // 维保单位名称
  ui_useCompanyName: string // 使用单位名称
}
