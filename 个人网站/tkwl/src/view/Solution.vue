<template>
    <div class="hardware">

        <!-- 轮播图 -->

        <banner style="margin-top:-106px" route="solution"></banner>


        <div class="container">

            <!-- 面包屑 -->
            <div class="padding bounceInLeft" :class="{ wow: $wow }">
                <bread></bread>
            </div>


            <!-- swiper -->
            <div class="swiper padding bounceInLeft" :class="{ wow: $wow }">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" @click="swiperFn(x.name)" :class="{ active: currentSwiper == x.name }"
                        v-for="(x, index) in swiperList" :key="index">{{ x.name }}</div>
                </div>
            </div>
            <!-- 需求和痛点  -->
            <div class="production need padding">
                <div class="title bounceInLeft" :class="{ wow: $wow }">
                    需求和痛点
                </div>
                <div class="content">
                    <div class="need-tab">
                        <div class="need-card bounceInUp " :class="{ wow: $wow }">
                            <div class="sub-title">设备运行状态不透明</div>
                            <div class="desc">提供接入平台后，电梯的全流程服务数据的 数字化平台</div>
                            <div class="img">
                                <img src="@/assets/icons/icon_solution_1.png" alt="">
                            </div>
                        </div>
                        <div class="need-card bounceInUp" :class="{ wow: $wow }">
                            <div class="sub-title">运维团队管理难</div>
                            <div class="desc">提供接入平台后，电梯的全流程服务数据的 数字化平台</div>
                            <div class="img">
                                <img src="@/assets/icons/icon_solution_2.png" alt="">
                            </div>
                        </div>
                        <div class="need-card bounceInUp" :class="{ wow: $wow }">
                            <div class="sub-title">运维过程不透明</div>
                            <div class="desc">提供接入平台后，电梯的全流程服务数据的 数字化平台</div>
                            <div class="img">
                                <img class="movey" src="@/assets/icons/icon_solution_3.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 方案详情 -->
            <div class="production plan padding">
                <div class="title bounceInLeft" :class="{ wow: $wow }">
                    方案详情
                </div>
                <div class="plan-desc bounceInLeft " :class="{ wow: $wow }" >
                    装备制造后市场服务管理平台，帮助装备制造业实现装备实时运行状态监控、构建完备的售后现场服务管理体系，帮助装备制造业实现从数字化后服务管理，向装备智能运维管理和预测性维护方向升级转型。
                </div>
                <div class="plan-list">
                    <div class="plan-card bounceInUp"  :class="{ wow: $wow }">
                        <img src="@/assets/icons/icon_solution_4.png" alt="">
                        <div class="sub-title">设备实时监控</div>
                        <div class="desc">
                            提供接入平台后，电梯的全流程服务数据的 数字化平台
                        </div>
                    </div>
                    <div class="plan-card bounceInUp"  :class="{ wow: $wow }">
                        <img src="@/assets/icons/icon_solution_5.png" alt="">
                        <div class="sub-title">智能运维管理</div>
                        <div class="desc">
                            提供接入平台后，电梯的全流程服务数据的 数字化平台
                        </div>
                    </div>
                    <div class="plan-card bounceInUp"  :class="{ wow: $wow }">
                        <img src="@/assets/icons/icon_solution_6.png" alt="">
                        <div class="sub-title">系统组态功能</div>
                        <div class="desc">
                            提供接入平台后，电梯的全流程服务数据的 数字化平台
                        </div>
                    </div>
                </div>
            </div>

            <!-- 方案价值 -->
            <div class="production price padding">
                <div class="title bounceInLeft"  :class="{ wow: $wow }">
                    方案价值
                </div>
                <div class="content">
                    <div class="price-list" >
                        <div class="price-card bounceInUp"  :class="{ wow: $wow }">
                            <img src="@/assets/images/solution_card_1.png" alt="" >
                            <div class="desc wow bounceInLeft" :class="{ wow: $wow }">提高设备整体运维效率</div>
                        </div>
                        <div class="price-card bounceInUp"  :class="{ wow: $wow }">
                            <img src="@/assets/images/solution_card_2.png" alt="">
                            <div class="desc wow bounceInRight" :class="{ wow: $wow }">助力商业模式转型</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
<script setup name="Solution">
import { onMounted, ref, computed } from 'vue';

import banner from '@/components/banners.vue'
import bread from '@/components/bread.vue'
//引入资源

const swiperList = [

    {
        name: '电梯科技+保险解决方案',
        value: '电梯科技+保险解决方案',
        id: ''
    },
    {
        name: '物业智慧电梯管理解决方案',
        value: '物业智慧电梯管理解决方案',
        id: ''
    },
    {
        name: '电梯数字化维保解决方案',
        value: '电梯数字化维保解决方案',
        id: ''
    },
    {
        name: '物联网集成商解决方案',
        value: '物联网集成商解决方案',
        id: ''
    }
]
const currentSwiper = ref('电梯科技+保险解决方案')

const swiperFn = (x) => {
    currentSwiper.value = x
}


</script>
<style lang="scss" scoped>
.padding {
    padding: 0 210px;
}

.hardware {
    width: 100%;

    .container {
        width: 100%;
        padding: 0;


        /**swiper */
        .swiper {
            width: 100%;

            .swiper-wrapper {
                display: flex;
                justify-content: space-around;
            }
        }

        .swiper-slide {
            text-align: center;
            width: 320px !important;
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

        //需求和痛点
        .production {
            width: 100%;
            box-sizing: border-box;
            background-color: #fff;

            .title {
                font-size: 36px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: #000000;
                text-align: center;
                padding: 63px 0 20px;
            }

            .content {
                .need-tab {
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 98px;

                    .need-card {
                        width: 461px;
                        background: #FFFFFF;
                        box-shadow: 8px 13px 26px 6px rgba(62, 57, 71, 0.15);
                        box-sizing: border-box;
                        padding: 0 50px;
                        padding-bottom: 0px;
                        overflow: hidden;

                        .sub-title {
                            font-size: 26px;
                            font-family: Source Han Sans CN;
                            font-weight: 400;
                            color: #000000;
                            padding: 56px 0 20px 0;
                        }

                        .desc {
                            font-size: 20px;
                            font-family: Source Han Sans CN;
                            font-weight: 400;
                            color: #999999;
                        }

                        .img {
                            display: flex;
                            justify-content: flex-end;
                            height: 155px;

                            img {
                                max-width: 100%;
                                height: auto;
                                transform: translateX(30px);
                            }

                            // img.movey {
                            //     transform: translateX(50px) translateY(8px);
                            // }
                        }
                    }
                }

            }

            .plan-desc {
                font-size: 20px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #999999;
                text-align: center;
                margin-bottom: 116px;
            }

            .plan-list {
                display: flex;
                justify-content: center;

                .plan-card {
                    width: 461px;
                    background: #FFFFFF;
                    margin: 0 60px;
                    padding: 54px 42px;

                    img {
                        display: block;
                        width: 80px;
                        height: auto;
                    }

                    .sub-title {
                        font-size: 26px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #000000;
                        margin-top: 37px;
                        margin-bottom: 20px;
                    }

                    .desc {
                        font-size: 20px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #999999;
                    }
                }

            }

            .price-list {
                margin-top: 35px;
                margin-bottom: 70px;
                display: flex;
                justify-content: center;
                
                .price-card {
                    width: 587px;
                    height: 350px;
                    position: relative;
                    margin:0 67px;

                    img {
                        display: block;
                        max-width: 100%;
                        height: auto;
                    }

                    .desc {
                        position: absolute;
                        bottom: 18px;
                        width: 100%;
                        text-align: center;
                        font-size: 28px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #FFFFFF;
                    }
                }
            }
        }
        .need .title{
            padding-bottom: 63px;
        }

        .plan {
            background-color: #F1F1F1;
            padding-bottom: 140px;

            .title {
                padding-bottom: 37px;
            }

        }


    }

}</style>