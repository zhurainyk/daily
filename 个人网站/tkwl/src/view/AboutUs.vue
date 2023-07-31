<template>
    <div class="aboutus">

        <!-- 轮播图 -->

        <banner style="margin-top:-106px" route="aboutus"></banner>

        <!-- 公司简介 -->

        <div class="companyinfo company">
            <div class="img bounceInLeft"  :class="{wow:$wow}"  >
                <img src="@/assets/images/company1.png" alt="">
            </div>
            <div class="company-info bounceInRight"  :class="{wow:$wow}" >
                <div class="sub-title">公司简介</div>
                <div class="desc">梯联智能是一家智慧电梯数字化服务供应商，
                    公司以深厚的行业资源积累为基础，凭借强大的电梯物联网大数据核心研发能力，有效整合了电梯保险、维保、配件和人才培训等电梯后市场服务产业链,为电梯全生命周期的安全运行和使用管理提供数字化解决方案</div>
            </div>
        </div>

        <!-- 使命 -->

        <div class="companyother company">
            <div class="company-info bounceInLeft" :class="{wow:$wow}"  >
                <div class="sub-title">使命、愿景、价值观</div>
                <div class="desc"> 我们的使命——打造数字空间，服务人梯安全

                </div>
                <div class="desc">
                    我们的愿景——成为全国第一家云上运营的电梯综合服务 供应商
                </div>
                <div class="desc">
                    我们的价值观——守正创新，行稳致远
                </div>
            </div>
            <div class="img bounceInRight " :class="{wow:$wow}"  >
                <img src="@/assets/images/company2.png" alt="">
            </div>

        </div>

        <!-- 荣誉和资质 -->

        <div class="honors">
            <div class="sub-title bounceInLeft" :class="{wow:$wow}" >
                荣誉和资质
            </div>
            <div class="card bounceInUp" :class="{wow:$wow}"  >
                <img src="@/assets/images/cardxxx.png" alt="">
            </div>
        </div>

        <!-- 联系我们 -->

        <div class="contact">
            <div class="sub-title bounceInLeft"   :class="{wow:$wow}"  >
                联系我们
            </div>
            <div class="content bounceInUp" :class="{wow:$wow}"  >
                <div class="pic " >
                    <img src="@/assets/images/company3.png" alt="">
                </div>
                <div class="desc">
                    <div class="sub-title">
                        <span class="mark"></span>
                        <span class="name">公司总部</span>
                    </div>
                    <div class="tab">地址：{{ address }}</div>
                    <div class="tab">电话：{{ phone }}</div>
                    <div class="tab">邮箱：{{ email }}</div>
                </div>
                <div id="map"></div>
            </div>
        </div>
    </div>
</template>
<script  setup >
import banner from '@/components/banners.vue' 
import { onMounted } from 'vue'
 
const address = import.meta.env.VITE_APP_ADDRESS
const phone = import.meta.env.VITE_APP_PHONE
const email = import.meta.env.VITE_APP_EMAIL
const companyName = import.meta.env.VITE_APP_COMPANYNAME
// 百度地图BMap构造函数
let BMap = null
onMounted(() => {
    BMap = window.BMap
    var map = new BMap.Map('map') // 创建地图实例
    var point = new BMap.Point(106.29993, 29.39515) // 创建点坐标
    map.centerAndZoom(point, 18) // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
    var marker = new BMap.Marker(point) // 创建标注
    map.addOverlay(marker) // 将标注添加到地图中
    var opts = {
        width: 120, // 信息窗口宽度
        height: 60, // 信息窗口高度
        title: companyName // 信息窗口标题
    }
    var infoWindow = new BMap.InfoWindow(
        `<span>地址：${address}<span>
     <br>
     <span>联系方式：${phone}</span>`,
        opts
    ) // 创建信息窗口对象
    // map.openInfoWindow(infoWindow, map.getCenter()) // 打开信息窗口
    marker.addEventListener('click', () => {
        console.log(marker)
        map.openInfoWindow(infoWindow, map.getCenter())

    }) 
})
</script>
<style lang="scss" scoped>
.aboutus {
    width: 100%;
    box-sizing: border-box;

    // 公司简介
    .company {
        padding: 0 260px;
        margin: 136px auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .img {
            width: 680px;

            img {
                max-width: 100%;
                height: auto;
            }
        }


        .company-info {
            max-width: 580px;

            .sub-title {
                font-size: 32px;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #000000;
                margin-bottom: 57px;
            }

            .desc {

                font-size: 24px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #333333;
                line-height: 60px;
            }
        }
    }

    // 荣誉和资质
    .honors {
        margin-top: 60px;

        .sub-title {
            text-align: center;
            font-size: 32px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #000000;
        }

        .card {
            margin: 50px auto;
            width: 1300px;

            img {
                max-width: 100%;
                height: auto;
            }
        }
    }

    // 联系我们
    .contact {
        width: 100%;
        padding: 67px 210px 110px;
        background-color: #F7F8F9;

        .sub-title {
            font-size: 32px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #000000;
            margin-bottom: 15px;
            text-align: center;
        }

        .content {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .pic {
                width: 350px;

                img {
                    max-width: 100%;
                    height: auto;
                }
            }

            .desc {
                .sub-title {
                    display: flex;

                    .mark {
                        width: 30px;
                        height: 42px;
                        background-image: url('../assets/icons/marker.png');
                        background-repeat: no-repeat;
                        background-size: 100%;
                        margin-right: 16px;
                    }

                    .name {
                        font-size: 28px;
                        font-family: Source Han Sans CN;
                        font-weight: 500;
                        color: #333333;
                    }
                }

                .tab {
                    font-size: 22px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #666666;
                    margin-bottom: 18px;
                }
            }

            #map {
                width: 560px;
                height: 350px;
            }
        }

    }
}
</style>