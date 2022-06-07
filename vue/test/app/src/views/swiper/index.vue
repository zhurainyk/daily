<template>
    <swiper :slides-per-view="3" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="item in 10">Slide {{ item }}</swiper-slide>


    </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper';

// Import Swiper styles
//   import 'swiper/css';
//解决问题： 遇到鼠标滚动事件， 按照官网的api文档 添加了这个mousewheel true后 依然不生效；网上也找不到相关的解决案例，没办法，只有看源码；通过查看源码接受参数；发现仅仅通过传递mousewheel true是不会有效果的 ；还得传入 mousewheel这个插件 并且注册使用后才有效

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    methods: {
        onSwiper(swiper) {
            console.log(swiper);
        },
        onSlideChange() {
            console.log('slide change');
        },

    }
};
</script>