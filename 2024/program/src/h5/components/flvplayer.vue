<template>
    <div v-if="!videoShow" class="nocam">{{ props.url }}</div>
    <video v-if="videoShow" id="videoElement" controls autoplay muted style="width:100%;height:100%">
    </video>
    <div class="isloading" v-loading="true" v-if="isLoading"></div>
</template>
<script setup>
import flvjs from 'flv.js'
import { onMounted, watch, computed } from 'vue'
const props = defineProps({
    url: {
        type: String
    },
    isLoading: {
        type: Boolean,
        default: true
    }
})

let flvPlayer
let videoShow = computed(() => {
    return props.url && props.url.startsWith('http') || false
})
const isLoading = computed(() => props.isLoading)
const initPlayer = () => {
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            hasAudio: false,
            url: props.url		// 自己的flv视频流
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();

        flvPlayer.play();
        setTimeout(() => {

            flvPlayer.play();
        })
    }
}
watch(() => props.url, (v) => {
    if (v.startsWith('http')) {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', v)
        setTimeout(() => initPlayer())
    }
}, {
    immediate: true,
    deep: true
})
const destroy = () => {
    if (!flvPlayer) return
    flvPlayer.unload()
    flvPlayer.pause()
}
defineExpose({
    destroy
})
</script>
<style scoped lang="scss">
.nocam {
    width: 100%;
    height: 100%;
    line-height: 260px;
    color: #C0DFFF;
    text-align: center;
    background: url('../../public/images/dataplatform/customer2/nocam.png') no-repeat 50% 40%;
}

.isloading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    :deep().el-loading-mask {
        background-color: rgb(28, 40, 59);
    }
}
</style>