<template>
  <!-- 头部整体盒子 -->
  <div class="header">
    <!-- 电脑导航 -->
    <div class="header_nav">
      <div class="logo  " data-wow-duration="3s" data-wow-delay="1s" data-wow-offset="1000" data-wow-iteration="1">
        <img :src="currentLogo" alt="" @click="toHome">
      </div>
      <div class="header_nav_right">
        <div class="demo-nav">
          <ul class="menu fllil">
            <li v-for="(nav, index) in navList" :key="index">
              <div class="sub-tab" :class="{ active: navIndex == nav.id }">
                <div class="tab-name" @click="navClick(nav)">{{ nav.name }}</div>
                <span class="tab-underline"></span>
              </div>
              <ul class="sub-menu" v-if="nav.children.length">
                <li v-for="(subnav, index_) in nav.children" :key="index_">
                  <div class="sub-tab" :class="{ active: navIndex == subnav.id }">
                    <div class="tab-name" @click="navClick(subnav)">{{ subnav.name }}</div>
                    <span class="tab-underline"></span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="guest">申请演示</div>
      </div>

    </div>
    <!-- 手机导航 -->

  </div>
</template>

<script setup>
import { ref,onMounted,computed } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import logo1 from '@/assets/logo/tkwl.png'
import logo2 from '@/assets/logo/tkwl_white.png'

const $router = useRouter()
const $route = useRoute()
onMounted(()=>{ 
})
const currentLogo = computed(()=>{
  return  ['AboutUs','HardWare','NewsInformation','HardWareDetail','SoftWare','Solution'].includes($route.name)  ?logo2:logo1
})

const navList = ref(
  [
    {
      name: '首页',
      path: '/',
      id: '1',
      children: []
    },
    {
      name: '产品',
      path: '/production',
      id: '2',
      children: [
        {
          name: '软件产品',
          path: '/production/software',
          id: '2-1',
        },
        {
          name: '硬件产品',
          path: '/production/hardware',
          id: '2-2',
        }
      ]
    },
    {
      name: '解决方案',
      path: '/solution',
      children: [],
      id: '3',
    },
    {
      name: '最新资讯',
      path: '/newsinformation',
      children: [],
      id: '4',
    },
    {
      name: '关于我们',
      path: '/aboutus',
      children: [],
      id: '5',
    }
  ]
)
const navIndex = ref('1')
navIndex.value = sessionStorage.getItem('navIndex')
  ? sessionStorage.getItem('navIndex')
  : 1;

function navClick(nav) {
  navIndex.value = nav.id
  sessionStorage.setItem('navIndex', nav.id)
  // menuName.value = name
  $router.push(nav.path)
}
const toHome = ()=>{
  $router.replace('/home')
  navIndex.value =  1
}

</script>

<style scoped lang="scss">
.header {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
  margin-top:-7px;
  .header_nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 28px 58px;

    .logo {
      min-width: 216px;
      height: 44px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .header_nav_right {
      display: flex;

      ul {
        list-style: none
      }

      .fllil {
        display: flex;
      }

      .demo-nav {
        width: auto;
        margin: 0 auto;
        box-sizing: border-box;
      }

      .demo-nav li {
        line-height: 50px;
        padding: 0 35px;
        color: #fff;
        position: relative;
        font-size: 20px;
        text-align: center;
      }

      .demo-nav li .sub-tab.active {
        color: #6C2AE6;
      }

      .demo-nav li .sub-tab.active .tab-underline {
        width: 100%;
      }

      .demo-nav li .sub-tab .tab-name:hover {
        color: #6C2AE6;
        cursor: pointer;
      }


      .demo-nav li .sub-tab:hover .tab-underline {
        width: 100%;

      }

      .demo-nav li ul li:hover {
        color: #6C2AE6;
        cursor: pointer;
      }

      .sub-tab .tab-underline {
        display: block;
        width: 0;
        height: 3px;
        margin: 4px auto 0;
        transition: 0.3s;
        background-color: #6C2AE6;
      }

      .demo-nav li ul {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 57px;
        height: 0;
        overflow: hidden;
      }

      .demo-nav li ul li {
        float: none;
        transition: all .3s;
        background-color: rgba(229, 229, 229);
        opacity: 0;
        white-space: nowrap;
        z-index: 999;
      }

      .demo-nav li ul li:nth-of-type(1n) {
        transform: translate3d(100%, 0, 0);
      }

      .demo-nav li ul li:nth-of-type(2n) {
        transform: translate3d(-100%, 0, 0);
      }

      .demo-nav li:hover ul {
        overflow: visible;
      }

      .demo-nav li:hover ul li {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      /*最多10级，超过10级的，得写js*/
      .demo-nav li ul li:nth-of-type(2) {
        transition-delay: .1s;
      }

      .demo-nav li ul li:nth-of-type(3) {
        transition-delay: .2s;
      }

      .demo-nav li ul li:nth-of-type(4) {
        transition-delay: .3s;
      }

      .demo-nav li ul li:nth-of-type(5) {
        transition-delay: .4s;
      }

      .demo-nav li ul li:nth-of-type(6) {
        transition-delay: .5s;
      }

      .demo-nav li ul li:nth-of-type(7) {
        transition-delay: .6s;
      }

      .demo-nav li ul li:nth-of-type(8) {
        transition-delay: .7s;
      }

      .demo-nav li ul li:nth-of-type(9) {
        transition-delay: .8s;
      }

      .demo-nav li ul li:nth-of-type(10) {
        transition-delay: .9s;
      }


      .guest {
        margin-left: 35px;
        width: 120px;
        height: 36px;
        line-height: 36px;
        background: #6C2AE6;
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
        border-radius: 18px;
        cursor: pointer;
      }
    }

  }
}
</style>

