import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '41455fda63e93715f88808d416827f44',
  plugin: [ 'AMap.Autocomplete',
  'AMap.PlaceSearch',
  'AMap.Scale',
  'AMap.OverView',
  'AMap.ToolBar',
  'AMap.MapType',
  'AMap.PolyEditor',
  'AMap.CircleEditor',
  'AMap.Geocoder',
  'AMap.Geolocation'],
  v: '1.4.10'
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
