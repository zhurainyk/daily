<template>
    <div v-if="!videoShow" class="nocam">{{ props.url }}</div>
    <div id="mytest" v-if="videoShow" v-loading="isLoading" style="width:100%;height:100%; "
        element-loading-background="transparent">
    </div>
    <div class="isloading" v-loading="true" v-if="isLoading2"></div>
</template>
<script setup>
// import './hls.js'
import { onMounted, watch, computed, ref } from 'vue';
const props = defineProps({
    URL: {
        type: String,
        require: true,
        default: 'https://www.whfsan.com:10010/api/v1/stream/h…0020042d543c9f7_1_2.m3u8'
    },
    show: {
        type: Boolean
    },
    isLoading: {
        type: Boolean,
        default: true
    }
})
let videoShow = computed(() => {
    return props.URL && props.URL.startsWith('http') || false
})

let show = computed(() => props.show)
let video, hls

const isLoading2 = computed(() => props.isLoading)
const isLoading = ref(false)
watch(show, val => {
    if (!val) {
        if (videoShow.value) {
            hls?.destroy()
            if (document.getElementById('vmd-video')) {
                document.getElementById('mytest').removeChild(document.getElementById('vmd-video'))
            }

            console.log('destoryed')
            return
        }

    }
})
watch(props.URL, (newVal) => {
    // hls.destroy() 

    // if (!newVal) return
    setTimeout(() => {
        console.log('播放器链接：', props.URL)
        if (Hls.isSupported()) {
            video = null;
            hls = null

            const init = () => {
                if (!videoShow.value) {
                    return
                }
                console.log('播放器支持', videoShow.value)
                isLoading.value = true
                const vmd = document.createElement('video')
                vmd.setAttribute('id', 'vmd-video')
                vmd.setAttribute('muted', true)
                vmd.setAttribute('autoplay', true)
                vmd.setAttribute('style', "width:100%;height:100%")
                // vmd.setAttribute('controls', true)
                document.getElementById('mytest').appendChild(vmd)
                setTimeout(() => {
                    const video = document.getElementById('vmd-video');
                    hls = new Hls();
                    hls.loadSource(newVal);
                    hls.attachMedia(video);
                    const timer = setTimeout(() => {
                        console.log('retry')
                        retry()
                    }, 8000)
                    hls.on(Hls.Events.MANIFEST_PARSED, function () {
                        video.play();
                        clearTimeout(timer)
                        isLoading.value = false
                        console.log('play ok')
                    });
                })
            }
            init()
            const retry = () => {
                hls.destroy()
                document.getElementById('mytest').removeChild(document.getElementById('vmd-video'))
                init()
            }


        }
    })
    return
}, {
    deep: true,
    immediate: true
})

const destroy = () => {
    console.log('close')
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

    // :deep().el-loading-mask {
    //     background-color: rgb(28, 40, 59);
    // }
}
</style>