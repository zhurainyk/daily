import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import singleSpa from 'single-spa-vue'
Vue.config.productionTip = false
Vue.use(ElementUI);
import './components/index'
import './assets/public.css'
import csptoast from './components/initToast'
Vue.use(csptoast)
// 导出bootstrap mount unmount 
import plugin from './plugins'
Vue.use(plugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
