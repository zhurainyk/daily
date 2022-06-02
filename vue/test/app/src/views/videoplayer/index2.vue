

<template>
    <div>
        <p style="text-align: center" v-if="false">未安装摄像头</p>
        <video-player v-else style="height: 100%; width: 100%" ref="monitoringVideo"
            class="video-player vjs-custom-skin" :playsinline="true" :options="playerOptions" @play="onPlayerPlay"
            @pause="onPlayerPause" @loadeddata="onPlayerLoadedData" @canplay="onPlayerCanPlay"
            @canplaythrough="onPlayerCanPlayThrough" @ready="playerReadied" />
    </div>
</template>

<script>


export default {
    name: "MonitoringVideo",
 

    data() {
        return {
            showVideo: false,
            playerOptions: {
                autoplay: true, // 如果为true,浏览器准备好时开始回放。
                muted: true,  // 默认情况下将会消除任何音频。
                loop: false, // 是否视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [],
                notSupportedMessage: '此视频暂无法播放，请稍后再试',  // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true, // 当前时间和持续时间的分隔符
                    durationDisplay: true, // 显示持续时间
                    remainingTimeDisplay: false, // 是否显示剩余时间功能
                    fullscreenToggle: true // 是否显示全屏按钮
                }
            }
        }
    },

    mounted() {
        this.getAiCameraUrl()
    },

    methods: {
        async getAiCameraUrl() {
            this.playerOptions.sources = [{ src: 'https://aicam.tlzn-cq.com/live/34020000001110000017.m3u8?auth_key=1654152067-0-0-7e485645d081708087080d1c9fffc77c', type: 'application/x-mpegURL' }]
        },
        // 播放回调
        onPlayerPlay() {
            // console.log('onPlayerPlay')
        },

        // 暂停回调
        onPlayerPause() {
            // console.log('onPlayerPause')
        },

        // 当播放器在当前播放位置下载数据时触发
        onPlayerLoadedData() {
            // console.log('onPlayerLoadedData')
        },

        //媒体的readyState为HAVE_FUTURE_DATA或更高
        onPlayerCanPlay() {
            // console.log('onPlayerCanPlay')
        },

        //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
        onPlayerCanPlayThrough() {
            // console.log('onPlayerCanPlayThrough')
        },

        //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
        playerReadied() {
            // console.log('playerReadied')
        }
    }
}
</script>
 
