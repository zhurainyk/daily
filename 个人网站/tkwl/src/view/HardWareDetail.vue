<template>
    <div class="hardware">

        <!-- 轮播图 -->

        <banner style="margin-top:-106px" route="hardware"></banner>


        <div class="container">

            <!-- 面包屑 -->

            <bread></bread>

            <!-- 硬件详情 -->
            <div class="hard-detail">
                <div class="img">
                    <img :src="hardware1" alt="">
                </div>
                <div class="info">
                    <div class="title">三方梯通用版TK-EBOX2/4G</div>
                    <div class="attrs">
                        <div class="tab">
                            <span class="circle"></span>
                            <span class="attr">超强边缘计算能力，支持轻量边缘AI应用</span>
                        </div>
                        <div class="tab">
                            <span class="circle"></span>
                            <span class="attr">基于Debian系统，便于用户自主开发</span>
                        </div>
                        <div class="tab">
                            <span class="circle"></span>
                            <span class="attr">丰富的接口，便于接入各种设备</span>
                        </div>
                    </div>
                    <div class="desc">
                        内置多种算法，可根据外接平层传感器、门传感器、红外人体传感器等传回的电梯实 时运行数据，判断电梯无故障、电梯运行时安全回路断路
                    </div>
                </div>
            </div>

            <!-- 硬件功能列表 -->
            <div class="funclist">
                <ul>
                    <li v-for="x in funcList" :key="x.id" :class="{ active: x.id == currentFunc }" @click="funcClick(x.id)">
                        <a :href="'#' + x.id" class="scroll">{{ x.name }}</a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 产品功能  -->
        <div class="production-func">
            <div class="title bounceInLeft" :id="funcList[0].id">产品功能</div>
            <div class="func-tabs">
                <div class="tab" v-for="(x, index) in 4"
                    :class="{ wow: $wow, bounceInLeft: index < 2, bounceInRight: index >= 2 }">
                    <div class="left">
                        <img :src="icon_cloud" alt="">
                    </div>
                    <div class="right">
                        <div class="name">云端管理平台</div>
                        <div class="desc">高速低延迟的连接体验，SA/NSA 模式下支持 5G Release 16 ，支 持全球范围的5G频段 和 LTE-A制式。</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 产品规格  -->
        <div class="production-func p-attrs">
            <div class="title bounceInLeft" :id="funcList[1].id">产品规格</div>
            <div class="func-detail bounceInUp " :class="{ wow: $wow }">
                <div class="sub-title">
                    硬件系统
                </div>
                <div class="sub-tab">
                    <div class="label">CPU</div>
                    <div class="value">A40i , 四核，主频最高1.2GHz</div>
                </div>
                <div class="sub-tab">
                    <div class="label">操作系统</div>
                    <div class="value">Android 7.1</div>
                </div>
                <div class="sub-tab">
                    <div class="label">内存 / 存储</div>
                    <div class="value">标配1G，（2G可选）</div>
                </div>
                <div class="sub-tab">
                    <div class="label">内置ROM</div>
                    <div class="value">2KB EEPROM（默认不带，可选贴）</div>
                </div>
                <div class="sub-tab">
                    <div class="label">HDMI输出接口</div>
                    <div class="value">1 个HDMI type-A插座，支持 1080P@60Hz</div>
                </div>
                <div class="sub-tab">
                    <div class="label">USB接口</div>
                    <div class="value">2路（1个USB OTG、1个USB HOST）</div>
                </div>
            </div>
            <div class="func-detail bounceInUp" :class="{ wow: $wow }">
                <div class="sub-title">
                    功能清单
                </div>
                <div class="sub-tab">
                    <div class="label">视频格式支持</div>
                    <div class="value">支持wmv、avi、flv、rm、rmvb、mpeg、ts、mp4等</div>
                </div>
                <div class="sub-tab">
                    <div class="label">图片格式支持</div>
                    <div class="value">支持BMP、JPEG、PNG、GIF</div>
                </div>
                <div class="sub-tab">
                    <div class="label">音频输入/输出</div>
                    <div class="value">喇叭输出（支持左右声道输出，内置双2.5W / 4R功放）、耳机输入、MIC IN</div>
                </div>
                <div class="sub-tab">
                    <div class="label">4G网络</div>
                    <div class="value">可选配内置PCI-E 4G模块。支持华为/龙尚等多种PCI-E 3G/4G模块上网</div>
                </div>
                <div class="sub-tab">
                    <div class="label">RTC实时时钟</div>
                    <div class="value">支持，支持定时开关机</div>
                </div>
                <div class="sub-tab">
                    <div class="label">系统升级</div>
                    <div class="value">支持本地USB升级</div>
                </div>
            </div>
        </div>

        <!-- 文档下载  -->

        <div class="production-func word">
            <div class="title bounceInLeft" :id="funcList[2].id">
                文档下载
            </div>
            <div class="func-download">
                <div class="download-card bounceInUp" :class="{ wow: $wow }" v-for="x in 3">
                    <div class="d-title">硬件说明书</div>
                    <div class="pdf-icon">
                        <img src="@/assets/icons/PDF.png" alt="">
                    </div>
                    <div class="detail">TK-EBOX2/4G 硬件说明书</div>
                    <div class="downbtn">点击下载</div>
                </div>
            </div>
        </div>

        <!-- 应用方案  -->
        <div class="production-func plan">
            <div class="title bounceInLeft" :id="funcList[3].id">应用方案</div>
            <div class="func-plan">
                <div class="plan-card bounceInUp" :class="{ wow: $wow }">
                    <img src="@/assets/images/plan1.png" alt="">
                    <div class="plan-desc bounceInLeft" :class="{ wow: $wow }">电梯科技+保险解决方案</div>
                </div>
                <div class="plan-card bounceInUp" :class="{ wow: $wow }">
                    <img src="@/assets/images/plan2.png" alt="">
                    <div class="plan-desc bounceInLeft" :class="{ wow: $wow }">物业智慧电梯管理解决方案</div>
                </div>
            </div>
        </div>


    </div>
</template>
<script setup name="HardWare">
import { onMounted, ref, computed } from 'vue';
import banner from '@/components/banners.vue'
import bread from '@/components/bread.vue'
import hardware1 from '@/assets/images/hardware1.png'
import icon_cloud from '@/assets/icons/cloud.png'
const funcList = [
    {
        name: '产品功能',
        id: 'p-function',
    },
    {
        name: '产品规格',
        id: 'p-attrs'
    },
    {
        name: '文档下载',
        id: 'p-download'
    },
    {
        name: '应用方案',
        id: 'p-plan'
    },
]
const funcClick = (x) => {
    currentFunc.value = x
}
onMounted(() => {
    jQuery(document).ready(function ($) {
        $(".scroll").click(function (event) {
            event.preventDefault();
            console.log($(this.hash).offset())
            $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 1200); //this.hash 表示#home
        });
    });
})
const currentFunc = ref('p-function')
</script>
<style lang="scss" scoped>
.hardware {
    width: 100%;

    .container {
        width: 100%;
        padding: 0 210px;

        .hard-detail {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .img {
                width: 600px;

                img {
                    max-width: 100%;
                    height: auto;
                }
            }

            .info {
                padding-left: 100px;

                .title {
                    font-size: 36px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #000000;
                    padding: 20px 0 60px;
                }

                .attrs {
                    .tab {
                        display: flex;
                        align-items: center;
                        margin-bottom: 24px;

                        .circle {
                            width: 11px;
                            height: 11px;
                            border-radius: 50%;
                            background-color: #6C2AE6;
                            margin-right: 14px;
                        }

                        .attr {
                            font-size: 18px;
                            font-family: Source Han Sans CN;
                            font-weight: 500;
                            color: #6C2AE6;
                        }
                    }
                }

                .desc {
                    font-size: 20px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #999999;
                    max-width: 740px;
                    line-height: 30px;
                }
            }
        }

        .funclist {
            margin: 66px auto 87px;
        }

        .funclist ul {
            display: flex;

            li {
                width: 200px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                font-size: 16px;
                background-color: #F5F5F5;
                margin-right: 36px;
                transition: 0.5s;
                border-radius: 20px;
                cursor: pointer;
                user-select: none;

                a {
                    display: block;
                    width: 200px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    font-size: 16px;
                    background-color: #F5F5F5;
                    margin-right: 36px;
                    transition: 0.5s;
                    border-radius: 20px;
                    cursor: pointer;
                    user-select: none;
                    font-weight: 400;
                    color: #000000;

                }
            }

            li.active a {
                color: #fff;
                background: #6C2AE6;
            }

            li a:hover {
                color: #fff;
                background: #6C2AE6;
                text-decoration: none;
            }

        }
    }

    // 产品规格 产品功能
    .production-func {
        background: #F5F5F5;
        padding: 70px 210px;
        width: 100%;
        box-sizing: border-box;

        .title {
            font-size: 36px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #000000;
            margin-bottom: 20px;
        }

        .func-tabs {
            display: flex;
            flex-wrap: wrap;
            width: 100%;

            .tab {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 50%;
                padding: 40px 60px 40px 0;

                .left {
                    width: 88px;
                    margin-right: 20px;

                    img {
                        max-width: 100%;
                        height: auto;
                    }
                }

                .right {
                    .name {
                        font-size: 28px;
                        font-family: Source Han Sans CN;
                        font-weight: 500;
                        color: #333333;
                        margin-bottom: 20px;
                    }

                    .desc {
                        font-size: 20px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #999999;
                        line-height: 30px;
                    }
                }
            }
        }

        //产品规格
        .func-detail {
            padding-left: 120px;
            margin-bottom: 100px;

            .sub-title {
                font-size: 28px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #333333;
                margin-bottom: 30px;
            }

            .sub-tab {
                font-size: 20px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #666666;
                display: flex;
                margin-bottom: 38px;

                & .label {
                    width: 180px;
                    color: #666666;
                    font-size: 20px;
                    text-align: left;
                    padding: 0;
                    font-weight: 400;

                }

                .value {
                    padding: 0;
                    font-size: 20px;
                    color: #666666;
                }
            }
        }

        // 文档下载
        .func-download {
            display: flex;
            margin-top: 73px;

            .download-card {
                text-align: center;
                padding: 20px 65px;
                background: #FFFFFF;
                border-radius: 10px;

                margin-right: 107px;

                .d-title {
                    font-size: 16px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #999999;

                }

                .pdf-icon {
                    width: 48px;
                    margin: 40px auto 20px;

                    img {
                        max-width: 100%;
                        height: auto;

                    }
                }

                .detail {
                    width: 128px;
                    font-size: 20px;
                    font-family: Source Han Sans CN;
                    font-weight: 500;
                    color: #333333;
                }

                .downbtn {
                    font-size: 20px;
                    font-family: Source Han Sans CN;
                    font-weight: 500;
                    color: #6C2AE6;
                    margin-top: 56px;
                    margin-bottom: 28px;
                }

            }
        }

        //应用方案
        .func-plan {
            display: flex;
            margin-top: 69px;

            .plan-card {
                position: relative;
                margin-right: 67px;

                img {
                    max-width: 100%;
                    height: auto;

                }

                .plan-desc {
                    position: absolute;
                    bottom: 18px;
                    left:0;
                    width:100%; 
                    text-align: center;
                    font-size: 28px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #FFFFFF;
                }
            }
        }
    }

    .production-func.word {

        background-color: #F5F5F5;
    }

    .production-func.p-attrs,
    .production-func.plan {
        background-color: #fff;
    }


}
</style>