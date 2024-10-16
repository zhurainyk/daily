import * as type from './mutation-types'

export default {
  [type.USER]({ commit }, res) {
    commit(type.USER, res)
  },
  [type.FULLSREEN]({ commit }, res) {
    commit(type.FULLSREEN, res)
  },
  [type.MENU]({ commit }, res) {
    commit(type.MENU, res)
  },
  [type.CLEARMENU]({ commit }, res) {
    commit(type.CLEARMENU, res)
  },
  [type.UPDATEIMG]({ commit }, res) {
    commit(type.UPDATEIMG, res)
  }
}
