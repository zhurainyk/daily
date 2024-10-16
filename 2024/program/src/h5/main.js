
import VideoPlayer from 'vue-video-player'
import hls from 'videojs-contrib-hls'
import vue3videoPlay from 'vue3-video-play' // 引入组件
import {
 createApp
} from "vue"
import router from './router'
import App from './h5App'


require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

const app = createApp(App)
app.use(hls)
.use(VideoPlayer).use(vue3videoPlay)
app.use(router).mount('#h5App')
console.log('xx')
