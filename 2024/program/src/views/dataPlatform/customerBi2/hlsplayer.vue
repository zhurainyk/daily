<template>
    <div v-if="!videoShow" class="nocam">{{ text || '未安装摄像头' }}</div>
    <div id="mytest" ref="newplayer" v-else style="width:100%;height:100%; ">
    </div>
</template>
<script setup>
// import './hls.js'


import { onMounted, watch, computed, ref, reactive } from 'vue';
const props = defineProps({
    url: {
        type: String,
        require: true
    }
})
const text = computed(() => props.url)

let videoShow = computed(() => {
    return props.url && props.url.startsWith('http') || false
})

onMounted(() => {
    window.onerror = (msg) => msg;
})
const $newPlayer = reactive({
    jessibuca: null,
    version: '',
    playing: false,
    quieting: true,
    loaded: false, // mute
    err: ''
})
const newplayer = ref()
const isLoading = ref(false)
const create = () => {
    if (!window.Jessibuca) {
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = '/elevator/jessibuca.js'
        document.getElementsByTagName('head')[0].appendChild(script)
        script.onload = () => {
            setTimeout(() => {
                initPlayer()
            })
        }
    } else {
        setTimeout(() => {
            initPlayer()
        })
    }
}
const initPlayer = () => {
    let options = {};
    $newPlayer.jessibuca = new window.Jessibuca(
        Object.assign(
            {
                container: newplayer.value,
                videoBuffer: 0.2, // 缓存时长this.$refs.buffer.value
                isResize: false,
                useWCS: false,
                useMSE: true,
                text: "",
                // background: "bg.jpg",
                loadingText: "加载中...",
                // hasAudio:false,
                debug: true,
                supportDblclickFullscreen: true,
                showBandwidth: false, // 显示网速
                operateBtns: {
                    fullscreen: false,
                    screenshot: false,
                    play: false,
                    audio: false,
                },
                // vod: this.vod,
                forceNoOffscreen: true,
                isNotMute: true,
                timeout: 10
            },
            options
        )
    );
    $newPlayer.jessibuca.play(props.url);

    $newPlayer.jessibuca.on("error", function (error) {
        console.log("error", error);
    });

    $newPlayer.jessibuca.on("timeout", function () {
        console.log("timeout");
    });

    $newPlayer.jessibuca.on('start', function () {
        console.log('frame start');
    })

    $newPlayer.jessibuca.on("play", () => {
        $newPlayer.playing = true;
        $newPlayer.loaded = true;
        $newPlayer.quieting = $newPlayer.jessibuca.isMute();
    });
}
const destroy = () => {
    if ($newPlayer.jessibuca) {
        $newPlayer.jessibuca.destroy();
        console.log('关闭成功')
        $newPlayer.jessibuca = null
        videoShow.value = false
    }
}
defineExpose({
    destroy
})


watch(() => props.url, (newVal) => {

    console.log(videoShow.value)
    if (videoShow.value) {
        setTimeout(() => create())
    }
}, {
    deep: true,
    immediate: true
})
</script>
<style scoped>
.nocam {
    width: 100%;
    height: 100%;
    line-height: 260px;
    color: #C0DFFF;
    text-align: center;

    background: url('../../../public/images/dataplatform/customer2/nocam.png') no-repeat 50% 40%;
}
</style>