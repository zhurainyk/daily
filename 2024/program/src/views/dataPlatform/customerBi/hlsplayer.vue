<template>
    <div v-if="!videoShow" class="nocam">{{ props.url }}</div>
    <div @click='playFn' id="mytest" v-if="videoShow" v-loading="isLoading" style="width:100%;height:100%; "
        element-loading-background="transparent">
    </div>
    <div class="isloading" v-loading="true" v-if="isLoading2"></div>
</template>
<script setup>
// import './hls.js'
import { onMounted, watch, computed, ref } from 'vue';
const props = defineProps({
    url: {
        type: String,
        require: true
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
    return props.url && props.url.startsWith('http') || false
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
let debounce = true;
const playFn = () => {
    if (!debounce) return
    debounce = false
    if (props.url.startsWith('http')) {
        if (Hls.isSupported()) {
            video = null;
            hls = null
            const init = () => {
                if (!videoShow.value) {
                    return
                }
                isLoading.value = true
                const vmd = document.createElement('video')
                vmd.setAttribute('id', 'vmd-video')
                vmd.setAttribute('muted', false)
                vmd.setAttribute('autoplay', true)
                vmd.setAttribute('style', "width:100%;height:100%")
                document.getElementById('mytest').appendChild(vmd)
                setTimeout(() => {
                    var video = document.getElementById('vmd-video');
                    hls = new Hls();
                    hls.loadSource(props.url);
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
    }
}


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

#mytest {
    background: url('@/public/images/dataplatform/customer2/play.png') no-repeat 50% 50% / 32px 32px;
}
</style>