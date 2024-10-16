import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import config from '../../config/index'
import * as user from './modules/userData'
import * as menu from './modules/menuData'

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user,
    menu
  },
  getters,
  plugins: [
    createPersistedState({
      key: 'tkwl',
      paths: ['user', 'menu']
    })
  ],
  actions,
  mutations
})
