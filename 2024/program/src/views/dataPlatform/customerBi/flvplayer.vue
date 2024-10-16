<template>
    <div v-if="!videoShow" class="nocam">{{ props.url }}</div>
    <video v-if="videoShow" id="videoElement" controls autoplay muted="false" style="width:100%;height:100%">
    </video>
    <div class="isloading" v-loading="true" v-if="isLoading"></div>
    <div class="play-model" @click='playFn' v-if="isPlay"></div>
</template>
<script setup>
import flvjs from 'flv.js'
import { onMounted, watch, computed, ref, onUnmounted } from 'vue'
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
            hasAudio: true,
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
let debounce = ref(true);
let isPlay = computed(() => {
    return videoShow.value && debounce.value
})
const playFn = () => {
    if (!debounce.value) return
    debounce.value = false
    if (props.url.startsWith('http')) {
        initPlayer()
    }
}

const destroy = () => {
    if (!flvPlayer) return
    flvPlayer.unload()
    flvPlayer.pause()
}
onUnmounted(() => {
    destroy()
})
defineExpose({
    destroy,
    playFn
})
</script>
<style scoped lang="scss">
.nocam {
    width: 100%;
    height: 100%;
    line-height: 260px;
    color: #C0DFFF;
    text-align: center;
    background: url('../../../public/images/dataplatform/customer2/nocam.png') no-repeat 50% 40%;
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

.play-model {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    background: rgb(28, 40, 59) url('@/public/images/dataplatform/customer2/play.png') no-repeat 50% 50% / 32px 32px;
}
</style>