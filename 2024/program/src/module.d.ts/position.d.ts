declare class PositionDao {
  [x: string]: any

  db_id: string

  db_id_posiName: string

  db_posiType: string // 职位类型

  db_posiState: string // 职位状态

  db_roleIds: string // 职位对应的角色id拼接字符串

  db_createtime: string

  db_note: string // 备注

  ui_posiTypeName: string // 职位类型名称

  ui_createtime: string
}
