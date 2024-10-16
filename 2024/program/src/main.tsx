import App from './App'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { menuRoute, perfiex } from './router/menu'
import './plugins/loading'
import './style/base'
// 播放器、流媒体
import VideoPlayer from 'vue-video-player'
// import hls from 'videojs-contrib-hls'
// import vue3videoPlay from 'vue3-video-play' // 引入组件
import CommonComponents from './views/dataPlatform/common'
import vueStore from './store/store'
import router from './router'
// import 'vue3-video-play/dist/style.css' // 引入css
import $bus from '@/utils/eventbus'
import AuthorityButton from './components/common/AuthorityButton'
// import i18n from './languages/i18n'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

const app = createApp(App)
// app.use(i18n)
app
  .use(ElementPlus, {
    // locale: zhCn
  })
  .use(VideoPlayer)
// .use(hls)
// app.use(vue3videoPlay)
app.provide('$bus', new $bus())
app.component('AuthorityButton', AuthorityButton)
const findAuth = (menu, to) => {
  const tempMen = menuRoute.routes.find(x => x.name == to.name)
  const allMenu = menuRoute.routes.filter(
    x =>
      x.id == tempMen?.id ||
      x.id == tempMen?.parentId ||
      (Array.isArray(x.id) &&
        Array.isArray(tempMen?.id) &&
        x.id.findIndex(x => tempMen?.id.findIndex(y => y == x) > -1) > -1) ||
      (Array.isArray(x.id) && x.id.findIndex(y => y == tempMen?.id) > -1) ||
      (Array.isArray(tempMen?.id) &&
        tempMen?.id.findIndex(y => y == x.id) > -1) ||
      (Array.isArray(x.id) &&
        Array.isArray(tempMen?.parentId) &&
        x.id.findIndex(x => tempMen?.parentId.findIndex(y => y == x) > -1) >
          -1) ||
      (Array.isArray(x.id) &&
        x.id.findIndex(y => y == tempMen?.parentId) > -1) ||
      (Array.isArray(tempMen?.parentId) &&
        tempMen?.parentId.findIndex(y => y == x.id) > -1)
  )
  if (menu.findIndex(x => allMenu.findIndex(y => x.name == y.name) > -1) > -1) {
    return true
  }
  let temp = false
  menu.forEach((r: any) => {
    if (r.childs && r.childs.length > 0) {
      if (temp) return
      temp = findAuth(r.childs, to)
    }
  })
  return temp
}
router.beforeEach((to, from, next) => {
  if (menuRoute.whiteList.findIndex(x => x.name == to.name) > -1) {
    next()
  } else if (vueStore.state.user.isLogin) {
    if (menuRoute.singlePage.findIndex((x: any) => x.name == to.name) > -1) {
      next()
    } else {
      // 验证权限
      if (findAuth(vueStore.state.menu.menu, to)) {
        next()
      } else {
        next('/404')
      }
    }
  } else {
    next('/')
  }
})

app.use(router)
app.use(vueStore).use(CommonComponents)

app.mount('#app')
export default app
