import {
  getNAvigationByTokenApi,
  getUserAuthByTokenApi
} from '@/api/module/login'
import { menulist, menuPrarent } from '../router/menu.tsx'
let menuall: Array<MenuDao> = []
let responseMen: Array<MenuDao> = []
let getMenu = () => {
  responseMen = []
  menuall = []
  Object.entries<MenuDao>(menulist).forEach(([key, v]) => {
    responseMen.push(JSON.parse(JSON.stringify(v)))
  })
  Object.entries<MenuDao>(menuPrarent).forEach(([key, v]) => {
    responseMen.push(JSON.parse(JSON.stringify(v)))
  })
}

let getSubMenuTree = (responseMenu: any, menus: MenuDao) => {
  const tempsubMen = responseMen.find(
    m =>
      m.id == responseMenu.code ||
      (Array.isArray(m.id) && m.id.findIndex(x => x == responseMenu.code) > -1)
  )
  if (tempsubMen) {
    tempsubMen.childs = []
    tempsubMen.description = responseMenu.name
    menus.childs!.push(tempsubMen)
  }
  if (
    responseMenu.subNavigationList &&
    responseMenu.subNavigationList.length > 0
  ) {
    responseMenu.subNavigationList.forEach(x => {
      getSubMenuTree(x, tempsubMen as any)
    })
  }
}
const menuHelper = async () => {
  getMenu()
  const x = await getNAvigationByTokenApi({})
  const auth = await getUserAuthByTokenApi({})
  if (x.data.success) {
    x.data.data.navigationList.forEach(n => {
      const tempMen = responseMen.find(
        m =>
          m.id == n.code ||
          (Array.isArray(m.id) && m.id.findIndex(x => x == n.code) > -1)
      )
      if (tempMen) {
        tempMen.childs = []
        tempMen.description = n.name
        menuall.push(tempMen)
        n.subNavigationList.forEach(sbum => {
          getSubMenuTree(sbum, tempMen as any)
        })
      }
    })
  }

  return {
    menu: menuall,
    auth: auth.data.data
  }
}

export default menuHelper
