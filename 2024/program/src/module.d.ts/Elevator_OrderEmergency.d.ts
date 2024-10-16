declare interface IElevator_OrderEmergency {
  db_id: string
  db_orderId: string // 公共工单id
  db_projectId: string // 所属项目id
  db_registCode: string // 电梯注册代码
  db_elevId: string // 电梯档案db_id
  db_trappedTime: string // 被困时间
  db_alarmTime: string // 接警时间
  db_trappedUser: string // 被困人员信息
  db_rescueLevel: string // 救援等级
  db_policeTime: string // 出警时间
  db_arriveTime: string // 到达时间
  db_rescueTime: string // 解救时间
  db_alarmNumber: string // 解救人数
  db_trappedReason: string // 困人原因
  db_imgUrl: string // 困人图片地址（多图)
  db_videoUrl: string // 困人视频地址
  db_videoRecords: string // 视频拉取记录

  ui_projectName: string // 所属项目名称
  ui_trappedTime: string // 被困时间
  ui_alarmTime: string // 接警时间
  ui_policeTime: string // 出警时间
  ui_arriveTime: string // 到达时间
  ui_rescueTime: string // 解救时间
}
