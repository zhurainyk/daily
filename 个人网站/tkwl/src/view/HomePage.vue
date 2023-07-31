<template>
  <div id="HomePage">
    <!-- 轮播图 -->
    <banner style="margin-top:-106px"></banner>

    <!-- 硬件产品 -->
    <div class="hardware production">
      <div class="subtitle   bounceInLeft" :class="{wow:$wow}"  >
        <div class="ch" @click="change">硬件产品</div>
        <div class="en">HARDWARE AND SERVICES</div>
      </div>
      <div class="hardware-list">
        <div class="temp   bounceInUp"  :class="{wow:$wow}"   v-for="(x, i) in hardList" :key="i">
          <div class="hard-icon">
            <img :src="x.icon" :alt="x.name">
          </div>
          <div class="hard-name">{{ x.name }}</div>
        </div>
      </div>
    </div>

    <!-- 软件产品 -->
    <div class="software production">
      <div class="subtitle   bounceInLeft" :class="{wow:$wow}"  >
        <div class="ch">软件产品</div>
        <div class="en">SOFTWARE AND SERVICES</div>
      </div>
      <div class="software-list">
        <div class="card   bounceInUp" :class="{wow:$wow}"   v-for="x in softList" :key="x.index">
          <div class="left">
            <div class="card_num">{{ x.index }}</div>
            <div class="card_title">{{ x.title }}</div>
            <div class="card_desc">{{ x.desc }}</div>
          </div>
          <div class="right">
            <img :src="x.img" :alt="x.title">
          </div>
        </div>
      </div>
    </div>

    <!-- 解决方案 -->
    <div class="solution production">
      <div class="subtitle   bounceInLeft"  >
        <div class="ch">解决方案</div>
        <div class="en">Data empowerment</div>
      </div>
      <div class="solution-list">
        <div class="card  "  :class="{slideInLeft:i<2,slideInRight:i>1,wow:$wow}"   v-for="(x, i) in solutionList" :key="i">
          <img :src="x.img" :alt="x.title">
          <div class="title   bounce" :class="{wow:$wow}"  >{{ x.title }}</div>
        </div>
      </div>
      <div class="desc   bounce" :class="{wow:$wow}"  >
        <p>梯控物联定位是以数字化服务为核心，提供“按需维保+服务”一站式解决方案,打造电梯全生命周期数字化平台产品和服务</p>
        <p>基于电梯应用场景，分析人，梯，事件的全感知，全覆盖，以电梯大数据为基础，赋能电梯后市场运营</p>
      </div>
    </div>

    <!-- 最新资讯 -->
    <div class="latest production">
      <div class="subtitle   bounceInLeft"  >
        <div class="ch">最新资讯</div>
        <div class="en"> Latest News </div>
      </div>
      <div class="card-list">
        <div class="card   bounceInUp" :class="{wow:$wow}"   v-for="(x, i) in latestNews" :key="i">
          <img :src="x.img" alt="">
          <div class="title">{{ x.title }}</div>
          <div class="desc">{{ x.desc }}</div>
        </div>
      </div>
    </div>

    <!-- 合作伙伴 -->
    <div class="cooperativepartner production">
      <div class="subtitle   bounceInLeft" :class="{wow:$wow}"  >
        <div class="ch">合作伙伴</div>
        <div class="en"> Cooperative Partner </div>
      </div>
      <div class="partner-list">

      </div>
    </div>

  </div>
</template>

<script setup name="HomePage">
import {store} from '@/store'
//导入图片
import banner from '@/components/banners.vue'
import icon_aiCam from '@/assets/icons/cam.png'
import icon_wifi from '@/assets/icons/wifi.png'
import icon_alarm from '@/assets/icons/alarm.png'
import icon_cellphone from '@/assets/icons/cellphone.png'
import icon_setting from '@/assets/icons/setting.png'
import icon_share from '@/assets/icons/share.png'

import pic_emergency from '@/assets/images/emergency.png'
import pic_baseinfo from '@/assets/images/baseinfo.png'
import pic_nopaper from '@/assets/images/nopaper.png'

import card_solution1 from '@/assets/icons/solution1.png'
import card_solution2 from '@/assets/icons/solution2.png'
import card_solution3 from '@/assets/icons/solution3.png'
import card_solution4 from '@/assets/icons/solution4.png'

import news1 from '@/assets/icons/latest1.png'
import news2 from '@/assets/icons/latest2.png'
import news3 from '@/assets/icons/latest3.png'

//导入资源 
import { onMounted } from 'vue'
const $store = store()
const hardList = [
  {
    icon: icon_aiCam,
    name: 'AI摄像头'
  },
  {
    icon: icon_wifi,
    name: '智能网关'
  },
  {
    icon: icon_alarm,
    name: '传感器套件'
  },
  {
    icon: icon_cellphone,
    name: '五方通话'
  },
  {
    icon: icon_setting,
    name: '配件'
  },
  {
    icon: icon_share,
    name: '网络配件'
  },
]

const softList = [
  {
    index: '01',
    title: '电梯应急处置系统',
    desc: '从测试需求到测试目标转换，从场景设计、分布式压测调度执行、性能瓶颈分析定位，到测试报告产出，实现全流程平台一体化高效协同',
    img: pic_emergency
  },
  {
    index: '02',
    title: '电梯保险风控系统',
    desc: '从测试需求到测试目标转换，从场景设计、分布式压测调度执行、性能瓶颈分析定位，到测试报告产出，实现全流程平台一体化高效协同',
    img: pic_baseinfo
  },
  {
    index: '03',
    title: '电梯无纸化维保系统',
    desc: '从测试需求到测试目标转换，从场景设计、分布式压测调度执行、性能瓶颈分析定位，到测试报告产出，实现全流程平台一体化高效协同',
    img: pic_nopaper
  },
]

const solutionList = [
  {
    img: card_solution1,
    title: '物联网集成商'
  },
  {
    img: card_solution2,
    title: '电梯科技+保险'
  },
  {
    img: card_solution3,
    title: '电梯数字化维保'
  },
  {
    img: card_solution4,
    title: '物业智慧电梯管理'
  },
]

const latestNews = [
  {
    title: '新闻1',
    desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
    img: news1
  },
  {
    title: '新闻2',
    desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
    img: news2
  },
  {
    title: '新闻3',
    desc: '提供接入平台后，电梯的全流程服务数据的 数字化平台',
    img: news3
  },
]

onMounted(()=>{ 
   
})
const change = ( )=>{
  $store.setWow(true)
  setTimeout(()=>{
    console.log( $store.wow)
  })
}

</script>

<style scoped lang="scss">
/* 整体盒子 */
#HomePage {
  width: 100%;
}

.production {
  .subtitle {
    text-align: center;
    margin-bottom: 100px;

    .ch {
      font-size: 36px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #000000;
      padding-bottom: 15px;
    }

    .en {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #C1C1C1;
    }
  }

  padding-bottom:100px;
}

/* 硬件 */
.hardware {
  width: 100%;
  box-sizing: border-box;
  padding: 150px 330px 190px;

  .hardware-list {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .temp {
      max-width: 120px;

      .hard-icon {
        width: 100%;

        img {
          max-width: 100%;
          height: auto;
        }
      }

      .hard-name {
        text-align: center;
        margin-top: 50px;
        font-size: 26px;
        white-space: nowrap;
      }
    }
  }
}

/**软件 */
.software-list {
  width: 100%;
  box-sizing: border-box;
  padding: 0 178px;

  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;


    .left {
      .card_num {
        font-size: 100px;
        font-family: PingFang SC;
        font-weight: 800;
        color: #A85CDA;
        opacity: 0.2;
      }

      .card_title {
        font-size: 36px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #000000;
        margin-top: 54px;
        margin-bottom: 40px;
      }

      .card_desc {
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        width: 647px;
      }
    }

    .right {
      width: 802px;

      img {
        max-width: 100%;
        height: auto;
      }
    }
  }

  .card:not(:last-child) {
    margin-bottom: 157px;
  }
}

/* 解决方案 */
.solution {
  width: 100%;
  box-sizing: border-box;

  .solution-list {
    display: flex;

    .card {
      width: 25%;
      position: relative;

      img {
        display: block;
         width: 100%;
        height: 600px;
      }

      .title {
        position: absolute;
        bottom: 78px;
        width: 100%;
        left: 0;
        text-align: center;
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #FFFFFF;
      }

    }
  }

  .desc {
    margin-top: 60px;

    p {
      text-align: center;
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }

    p:first-child {
      margin-bottom: 20px;
    }
  }
}

/*最新资讯 */
.latest {
  width:100%;
  padding:0 100px;
  margin-bottom:140px;
  .card-list {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .card {
      width: 460px;
      box-shadow: 8px 13px 26px 6px rgba(62, 57, 71, 0.15);

      img {
        display: block;
        max-width: 100%;
        height: auto;
      }

      .title {
        text-align: center;
        font-size: 26px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #000000;
        margin-top: 40px;
      }

      .desc {
        text-align: center;
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        margin-top: 20px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 40px;
        margin-bottom: 40px;
      }
    }
  }
}

/* 合作伙伴 */
.cooperativepartner {
  .partner-list {
    width: 1200px;
    margin: 0 auto;
    height: 301px;
    background-image: url('../assets/icons/partner1.jpg');
    animation: bg 40s linear infinite;
  }

  @keyframes bg {
    to {
      background-position: -3123px 0;
      /* 图片位置 x y */
    }
  }
}

 
</style>

