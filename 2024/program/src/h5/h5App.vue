<template>
    <div class="content">
        <div class="web-media-player" id="WebMediaPlayer"></div>
        <talk class="talk" :url="talkUrl" v-if="isVoice == 1"></talk>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'
import talk from './components/talk.vue'
let player
const initPlayer = (url) => {
    player = new WebMediaPlayer('', `WebMediaPlayer`, callbackFunc, {
        cbUserPtr: this,
        decodeType: 'soft'
    });
    player.play(url, true);
}
const callbackFunc = (cbType, cbParams) => {
    console.log('点击事件：', cbType)

    if (cbType === 'playbackTime') {
        //console.log("当前回放时间: " + cbParams);
    } else if (cbType === 'ended') {
        console.log("播放结束");
    }
    console.log("Callback " + cbType + ":  " + cbParams);

}
const talkUrl = ref('')
const isVoice = ref(0)
onMounted(() => {
    setTimeout(() => {
        console.log(window.location.href)
        const href = window.location.href
        console.log(href.indexOf('?x='))
        let urlStartIndex = href.indexOf('?x=')

        let talkStartIndex = href.indexOf('&talk=')
        let isVoiceIndex = href.indexOf('&isVoice=')
        const url = href.slice(urlStartIndex + 3, talkStartIndex)
        talkUrl.value = href.slice(talkStartIndex + 6, isVoiceIndex)
        isVoice.value = href.slice(isVoiceIndex + 9)
        console.log(url)
        if (url) {
            console.log('可以视频：', url)
            initPlayer(url)
        }
        if (talkUrl.value) {
            console.log('可以通话:', talkUrl.value)
        }
        console.log('音频权限：', isVoice.value)

    })
})
// export default {
//     name: 'SkeyeWebPlayer',
//     props: {
//         msg: String
//     },
//     mounted() {
//         this.$nextTick(() => {
//             this.initPlayer()
//         })
//     },
//     methods: {
//         initPlayer() {
//             // new WebMediaPlayer（url,domId,callback,options）
//             this.player = new WebMediaPlayer('', `WebMediaPlayer`, this.callbackFunc, {
//                 cbUserPtr: this,
//                 decodeType: 'soft'
//             });
//             this.player.play('https://alicam.tlzn-cq.com/tkwl/34020000002000000037.m3u8?auth_key=1678694519-0-0-fa020256717660d71329ecdba8d489b5', true);
//         },
//         // 播放器回调方法
//         callbackFunc(cbType, cbParams) {
//             if (cbType === 'playbackTime') {
//                 //console.log("当前回放时间: " + cbParams);
//             } else if (cbType === 'ended') {
//                 console.log("播放结束");
//             }
//             console.log("Callback " + cbType + ":  " + cbParams);
//         },
//     }
// }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
    width: 100%;
    margin: 0 auto;
}
</style> 