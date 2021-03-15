import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import singleSpa from 'single-spa-vue'
Vue.config.productionTip = false
// 导出bootstrap mount unmount 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
