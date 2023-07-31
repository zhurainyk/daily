import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)
new Vue({
  el: '#app',
  render: h => h(App)
});