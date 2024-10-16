declare class MenuDao {
  [x: string]: any

  path: string

  id: string | Array<string>

  prop?: any

  meta?: any

  name: string

  parentId?: string | Array<string>

  description?: string

  childs?: Array<MenuDao>

  isNotMenu?: boolean

  icon?: string
}

declare class MenuRouteDao extends MenuDao {
  component?: any
}
