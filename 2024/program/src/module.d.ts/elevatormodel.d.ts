declare interface IElevatorModel {
  db_id: string
  db_id_modelName: string // 型号名称 --
  db_brandId: string // 品牌id --
  db_manuId: string // 制造商id --
  db_elevCategCode: string // 电梯品种code --
  db_modelVersion: string // 型号版本
  db_fileUrl: string // 相关文件地址 --
  db_partInstIds: string // 配件实例清单,配件实例id以逗号拼接
  db_createtime: string

  ui_brandName: string // 品牌名称
  ui_manuName: string // 制造商名称
  ui_elevCategory: string // 电梯品种名称
  ui_createtime: string
}
