<template>
    <div class="hardware">

        <!-- 轮播图 -->

        <banner style="margin-top:-106px" route="hardware"></banner>


        <div class="container">

            <!-- 面包屑 -->

            <bread></bread>

            <!-- swiper -->
            <div class="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" :class="{ active: currentSwiper == x.name }" v-for="(x, index) in swiperList"
                        :key="index">{{ x.name }}</div>
                </div>
            </div>
            <!-- 硬件  -->
            <div class="main">

                <div class="hard bounceInLeft" :class="{ wow: $wow }" v-for="(x, index) in hardwareList" @click="detail(x)"
                    :key="index">
                    <div class="imgbg">
                        <img :src="x.img" alt="">
                    </div>
                    <div class="name">{{ x.name }}</div>
                    <p class="desc">{{ x.desc }}</p>
                </div>


            </div>
            <!-- 导航 -->
            <div class="b-pagination bounceInLeft" :class="{ wow: $wow }">
                <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="_hardwareList.length"
                    @current-change="pageChange">
                </el-pagination>
            </div>
        </div>


    </div>
</template>
<script setup name="HardWare">
import { onMounted, ref, computed } from 'vue';

import { useRouter } from 'vue-router';
import banner from '@/components/banners.vue'
import bread from '@/components/bread.vue'
//引入资源
import img_hardware1 from '@/assets/images/hardware1.png'
import img_hardware2 from '@/assets/images/hardware2.png'
import img_hardware3 from '@/assets/images/hardware3.png'
import img_hardware4 from '@/assets/images/hardware4.png'
import img_hardware5 from '@/assets/images/hardware5.png'
import img_hardware6 from '@/assets/images/hardware6.png'
import img_hardware7 from '@/assets/images/hardware7.png'

const $router = useRouter()
const swiperList = [
    {
        name: '全部',
        value: '全部',
        id: ''
    },
    {
        name: '电梯应急处置系统',
        value: '电梯应急处置系统',
        id: ''
    },
    {
        name: '电梯物联网检测系统',
        value: '电梯物联网检测系统',
        id: ''
    },
    {
        name: '电梯云视频监控系统',
        value: '电梯云视频监控系统',
        id: ''
    },
    {
        name: '电梯无纸化维保系统',
        value: '电梯无纸化维保系统',
        id: ''
    },
    {
        name: '电梯保险风控系统',
        value: '电梯保险风控系统',
        id: ''
    },
    {
        name: '电梯数字化管理系统',
        value: '电梯数字化管理系统',
        id: ''
    },
    {
        name: '电梯SIP五方通话系统',
        value: '电梯SIP五方通话系统',
        id: ''
    },
]
const currentSwiper = ref('全部')
const _hardwareList = ref([
    {
        name: '监控摄像头',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '1',
        img: img_hardware6
    },
    {
        name: 'AI监控摄像头',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '2',
        img: img_hardware7
    },
    {
        name: '三方梯通用版',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '3',
        img: img_hardware1
    },
    {
        name: '新时达专用版',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '4',
        img: img_hardware2
    },
    {
        name: '默纳克专用版',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '5',
        img: img_hardware3
    },
    {
        name: '迅达专用版',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '6',
        img: ''
    },
    {
        name: '门传感器',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '7',
        img: img_hardware4
    },
    {
        name: '平层传感器',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '8',
        img: img_hardware5
    },
    {
        name: '五方通话',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '9',
        img: ''
    },
    {
        name: '网络配件',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '10',
        img: ''
    },
    {
        name: '网络配件',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '11',
        img: ''
    },
    {
        name: '网络配件',
        desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
        id: '12',
        img: ''
    },
])

const detail = (item) => {
    $router.push({
        path: '/production/hardware/hardwaredetail'

    })
}

onMounted(() => {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 5,
        // centeredSlides: true,
        spaceBetween: 30,

        on: {
            click: function (e) {
                console.log(e.clickedIndex)
                currentSwiper.value = swiperList[e.clickedIndex].name
            },
        },
    });

})
const pageSize = 9
let start = ref(0)
let end = ref(9)
const hardwareList = computed(() => _hardwareList.value.slice(start.value, end.value))

const pageChange = (pagenum) => {

    start.value = (pagenum - 1) * pageSize
    end.value = pagenum * pageSize
    if (end.value > _hardwareList.value.length) {
        end.value = _hardwareList.value.length
    }

}
</script>
<style lang="scss" scoped>
.hardware {
    width: 100%;

    .container {
        width: 100%;
        padding: 0 210px;

        /**swiper */
        .swiper {
            width: 100%;
        }

        .swiper-slide {
            text-align: center;
            width: 200px !important;
            height: 60px !important;
            background: #F5F5F5;
            border-radius: 20px;
            line-height: 60px !important;
            color: #000;
            cursor: pointer;
            user-select: none;
            transition: 0.5s;
            font-size: 16px;
        }

        .swiper-slide.active {
            background: #6C2AE6;
            color: #fff;
        }

        .swiper-slide:hover {
            background: #6C2AE6;
            color: #fff;
        }

        /*硬件区 */
        .main {
            display: flex;
            flex-wrap: wrap;
            margin-top: 80px;

            .hard {
                background: #FFFFFF;
                box-shadow: 8px 13px 26px 6px rgba(62, 57, 71, 0.15);
                width: 460px;
                margin-bottom: 90px;
                padding-bottom: 20px;

                .imgbg {
                    width: 100%;
                    height: 288px;
                    background-color: rgb(241, 241, 241);

                    img {
                        max-width: 100%;
                        height: auto;
                        margin: 0 auto;
                        display: block;
                    }
                }

                .name {
                    text-align: center;
                    font-size: 26px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #000000;
                    margin: 40px 0 20px;
                }

                .desc {
                    font-size: 20px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #999999;
                    text-align: center;
                    line-height: 30px;
                    padding: 0 40px;
                }
            }

            .hard:not(:nth-child(3n)) {
                margin-right: 50px;
            }



            @media screen and (min-width: 1920px) {
                .hard:not(:nth-child(3n)) {
                    margin-right: 50px;
                }
            }


        }

        .b-pagination {
            display: flex;
            justify-content: center;
            padding: 100px 0;

            :deep() .is-active.number {
                background: #6C2AE6;
                border-radius: 50%;
                color: #fff;
            }
        }
    }

}
</style>