<template>
    <div class="banner">
        <template v-if="!routeType">
            <img :src="homeSrc" alt="">
            <div class="desc">
                <h3>应急处置解决方案</h3>
                <div class="line"></div>
                <p>梯控物联致力于打造一站式电梯数字化管理平台，用数字科技 守护电梯安全，提升管理效率</p>
            </div>
        </template> 
        <template v-else-if="routeType == 'hardware'">
            <img :src="hardwareSrc" alt="">
            <div class="company">
                <h3>重庆梯联智能技术有限公司</h3>
            </div>
        </template>
        <template v-else-if="routeType == 'aboutus'">
            <img :src="aboutSrc" alt="">
            <div class="company">
                <h3>重庆梯联智能技术有限公司</h3>
            </div>
        </template>
        <template v-else-if="routeType == 'newsInformation'">
            <img :src="newsInformationSrc" alt="">
            <div class="company">
                <h3>重庆梯联智能技术有限公司</h3>
            </div>
        </template>
        <template v-else-if="routeType == 'solution'">
            <img :src="solutionSrc" alt="">
            <div class="company">
                <h3>重庆梯联智能技术有限公司</h3>
            </div>
        </template>
        <template v-if="false">
            <video class="banner-video" :src="videoSrc" autoplay muted="" x5-video-player-type="h5" preload="auto"
                playsinline="" loop></video>
        </template>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import homeSrc from '@/assets/banner/banner@2x.png'
import aboutSrc from '@/assets/banner/banner_about_us.png'
import hardwareSrc from '@/assets/banner/banner_hardware.png'
import newsInformationSrc from '@/assets/banner/banner_producion_detail.png'
import solutionSrc from '@/assets/banner/banner_solution.png'
import videoSrc from '@/assets/banner/video.mp4'

const props = defineProps({
    route: {
        type: String,
        default: ''
    }
})
const routeType = computed(() => {
    return props.route
})
</script>
<style lang="scss" scoped>
.banner {
    width: 100%;
    height: 800px;
    box-sizing: border-box;
    position: relative;

    z-index: -1;


    .banner-video {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
    }
}

.banner img {
    position: absolute;
    top: 0;
    max-width: 100vw;
    height: auto;
    z-index: -1;
}

.desc,.company  {

    padding-top: 15%;
    margin-left: 10%;

    .line {
        width: 240px;
        height: 1px;
        background-color: rgba(0, 0, 0, .2);
        margin: 45px 0;
    }

    h3 {
        font-size: 60px;
    }

    p {
        font-size: 26px;
        line-height: 40px;
        width: 702px;
    }
}
 
.company h3{
    text-align: center;
    color:#fff;
}
</style>