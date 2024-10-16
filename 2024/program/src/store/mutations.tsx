import * as type from './mutation-types'

export default {
  [type.USER](state, res) {
    state.user.userInfo = res
    state.user.isLogin = true
    state.user.type = res.type
  },
  [type.FULLSREEN](state, res) {
    state.menu.fullsreen = res
  },
  [type.ACTIVEDTAB](state, res) {
    state.menu.activedTab = res
  },
  [type.CHANGEPRO](state, res) {
    state.menu.currentProjectId = res
  },
  [type.CHANGEBIPRO](state, res) {
    state.menu.currentCompanyId[res.key] = res.value
    console.log('参数：',res)
    
  },
  [type.MENU](state, res) {
    state.menu.menu = []
    state.menu.menuAuth = []
    state.menu.menu = res.menu
    state.menu.menuAuth = res.auth
  },
  [type.CLEARMENU](state, res) {
    state.menu.menu = []
    state.menu.menuAuth = []
    state.user.userInfo = {}
    state.user.isLogin = false
    state.user.type = ''
  },
  [type.UPDATEIMG](state, res) {
    state.user.userInfo.ui_imgUrl = res.db_imgUrl
    state.user.userInfo.db_id_username = res.ui_username
  }
}
