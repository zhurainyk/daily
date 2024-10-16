declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.less'
declare module '*.css'
declare module '*.js'
declare module '*'
declare module '*.vue'
declare class AMap {
  static Map: any

  static AutoComplete: any

  static PlaceSearch: any

  static Geocoder: any

  static Event: any

  static Marker: any

  static LngLat: any
}

/**
 * 定义基础类，所以的类继承这个类
 */
declare interface baceClass {
  context: any
}

/**
 * 分页对象
 */
declare interface pagination {
  current: number
  defaultCurrent: number
  defaultPageSize: number
  disabled: boolean
  hideOnSinglePage: true
  pageSize: number
  pageSizeOptions: Array<string>
  total: number
}
