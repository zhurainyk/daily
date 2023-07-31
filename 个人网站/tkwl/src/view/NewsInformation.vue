<template>
    <div class="newsInformation">

        <!-- 轮播图 -->

        <banner style="margin-top:-106px" route="newsInformation"></banner>

        <div class="news">
            <!-- 今日新闻 -->
            <div class="today-card">
                <div class="img bounceInLeft" :class="{wow:$wow}">
                    <img :src="news1" alt="">
                </div>
                <div class="newsinfo bounceInUp" :class="{wow:$wow}">
                    <div class="date">2023-05-18</div>
                    <div class="title">重庆市市场监督管理局和江津区政府一行赴梯联智能...</div>
                    <div class="desc">5月16日，重庆市市场监督管理局（以下简称“市监局”）二级巡视员 桂建平、市监局机电处副处长杨云、市监局机电处一级调研员...</div>
                    <div class="more">查看更多</div>
                </div>
            </div>

            <!-- 新闻列表 -->

            <div class="news-list">
                <div class="news-item bounceInUp" v-for="x in 8" :class="{wow:$wow}">
                    <img :src="news2" alt="">
                    <div class="title">新闻 - {{ x + 1 }} </div>
                    <div class="desc">提供接入平台后，电梯的全流程服务数据的 数字化平台</div>
                </div>
            </div>
        </div>



    </div>
</template>
<script setup name="NewsInformation">
import banner from '@/components/banners.vue'
import news1 from '@/assets/images/news1.png'
import news2 from '@/assets/images/news2.png'

</script>

<style scoped lang="scss">
.newsInformation {

    .news {
        width: 100%;
        padding: 0 210px;

        // 今日新闻
        .today-card {
            margin: 120px auto;

            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #FFFFFF;
            box-shadow: 8px 13px 26px 6px rgba(62, 57, 71, 0.15);

            .img {
                width: 750px;

                img {
                    max-width: 100%;
                    height: auto;
                }
            }

            .newsinfo {

                padding: 76px 66px;

                .date {
                    font-size: 36px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #C3C3C3;

                }

                .title {
                    font-size: 26px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #000000;
                    padding: 35px 0 31px;
                }

                .desc {
                    font-size: 20px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #999999;
                }

                .more {
                    font-size: 18px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #6C2AE6;
                    cursor: pointer;
                    margin-top: 40px;
                }
            }


        }

        // 新闻列表
        .news-list {
            display: flex;
            flex-wrap: wrap;

            .news-item {
                width: 460px;  
                box-shadow: 8px 13px 26px 6px rgba(62, 57, 71, 0.15);
                width: 460px;
                margin-bottom: 90px;
                padding-bottom: 20px;
                img {
                    max-width: 100%;
                    height: auto;
                }

                .title {
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
           
            .news-item:not(:nth-child(3n)) {
                margin-right: 50px;
            }
        }
    }


}
</style>