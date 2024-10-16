export class Menu implements MenuDao {
  constructor(menu: MenuDao) {
    this.path = menu.path
    this.id = menu.id
    this.name = menu.name
    this.parentId = menu.parentId || '-1'
    this.prop = menu.prop
    this.meta = menu.meta
    this.childs = menu.childs
    this.isNotMenu = menu.isNotMenu
    this.description = menu.description
    this.icon = menu.icon
  }

  [x: string]: any

  path: string

  id: string

  prop?: any

  meta?: any

  name = ''

  parentId?: string | undefined

  icon?: string = ''

  description?: string | undefined

  btnPersimss: string[] = ['1', '2', '3']

  childs: MenuDao[] | undefined

  isNotMenu: boolean | undefined
}

export class MenuRoute extends Menu implements MenuRouteDao {
  [x: string]: any

  component?: any
}

export class ActionAuthority {
  constructor(apikey?: string, action?: ActionAuthority) {
    if (apikey) {
      this.add = `${apikey}/save`
      this.delete = `${apikey}/deleteById`
      this.edit = `${apikey}/updateById`
    } else {
      this.add = action!.add
      this.delete = action!.delete
      this.edit = action!.edit
    }
  }

  add = ''

  delete = ''

  edit = ''
}
