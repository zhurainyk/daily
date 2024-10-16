<template>

    <div v-if="videoShow">
        <vue3VideoPlay style="width:390px;height:235px" @error="error" @stalled="stalled" width="100%" height="235px"
            :src="options.src" :type="options.type" :autoPlay="true" />
    </div>
    <div v-else class="novideo">{{ props.url || '未安装摄像头' }}</div>


</template>
<script setup>
import 'vue3-video-play/dist/style.css'
import { onMounted, reactive, watch, computed } from 'vue'
const props = defineProps({
    url: {
        type: String,
        default: ''
    }
})
let videoShow = computed(() => {
    return props.url && props.url.startsWith('http') || false
})
const options = reactive({
    src: "", //视频源
    type: 'm3u8', //视频类型
})
watch(() => props.url, (newVal) => {
    if (newVal) {
        console.log('监听地址：', newVal)
        options.src = newVal
    }
}, {
    immediate: true
})
const error = (e) => {
    console.log('报错', e)
}
const stalled = (e) => {
    console.log('报错2', e)
}
window.onerror = function (e) {
    console.log('报错3', e)
}
</script>

<style lang="scss" scoped>
.novideo {
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
    line-height: 230px;
}

// @import url('vue3-video-play/dist/style.css');
</style>