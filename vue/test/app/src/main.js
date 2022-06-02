import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import singleSpa from 'single-spa-vue'

// 播放器、流媒体
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import hls from "videojs-contrib-hls"


Vue.config.productionTip = false
Vue.use(ElementUI).use(VideoPlayer).use(hls)
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
