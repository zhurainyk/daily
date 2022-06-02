<template>
    <div class="video">
        <videoPlayer class="vjs-custom-skin videoPlayer" ref="videoplayer" :playsinline="true" width="90%"
            :options="playerOptions" customEventName="changed">
        </videoPlayer>
    </div>
</template>

<script>

import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-contrib-hls'
import 'videojs-flash'
/**
 * 湖南卫视 rtmp://58.200.131.2:1935/livetv/hunantv  rtmp://58.200.131.2:1935/livetv/hunantv
美国1,rtmp://ns8.indexforce.com/home/mystream
韩国GoodTV,rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp
香港卫视: rtmp://live.hkstv.hk.lxdns.com/live/hks1
香港财经,rtmp://202.69.69.180:443/webcast/bshdlive-pc
韩国朝鲜日报,rtmp://live.chosun.gscdn.com/live/tvchosun1.stream
美国2,rtmp://media3.scctv.net/live/scctv_800
美国中文电视,rtmp://media3.sinovision.net:1935/live/livestream
————————————————
版权声明：本文为CSDN博主「随遇而安sd^_^」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/songduo112/article/details/118408166
 */

export default {
    components: {
        videoPlayer
    },
    data() {
        return {
            playerOptions: {
                width: "800",
                height: "400",
                language: 'zh-CN',
                techOrder: ['flash'],
                muted: true,
                autoplay: true,
                controls: false,//不显示暂停、声音、进度条组件
                loop: true,
                fluid:true,
                poster:'',
                notSupportedMessage:'无法播放',
                sources: [{
                    type: 'rtmp/mp4',
                    src: 'rtmp://live.hkstv.hk.lxdns.com/live/hks2' //网络rtmp流地址
                    //src: 'rtmp://127.0.0.1:8822/live/badao' //本地rtmp流地址
                }],
            }
        };
    },

}
</script>

<style>
</style>