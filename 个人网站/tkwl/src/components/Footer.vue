<template>
  <div class="footer">
    <div class="foot_tab" v-for="(x, i) in footList" :key="i">
      <div class="title  bounceInLeft"  :class="{wow:$wow}"  >{{ x.title }}</div>
      <div class="tablist  bounceInLeft" :class="{wow:$wow}"   >
        <div class="tab" v-for="(y, j) in x.children" :key="j" v-html="y.name" :class='[y.class]'></div>
      </div>
    </div>
  </div>
</template>

<script setup name="Footer">
 
const address = import.meta.env.VITE_APP_ADDRESS
const phone = import.meta.env.VITE_APP_PHONE
const email = import.meta.env.VITE_APP_EMAIL
 
const footList = [
  {
    title: '硬件产品',
    children: [
      {
        name: 'AI摄像头',
      },
      {
        name: '智能网关',
      },
      {
        name: '传感器套件',
      },
      {
        name: '五方通话',
      },
      {
        name: '配件',
      },
      {
        name: '网络配件',
      }
    ]
  },
  {
    title: '软件产品',
    children: [
      {
        name: '电梯应急处置系统',
      },
      {
        name: '电梯物联网监测系统',
      },
      {
        name: '电梯云视频监控系统',
      },
      {
        name: '电梯无纸化维保系统',
      },
      {
        name: '电梯保险风控系统',
      },
      {
        name: '电梯数字化管理系统(物业版)',
      },
      {
        name: '电梯SIP五方通话系统',
      } 
    ]
  },
  {
    title: '解决方案',
    children: [
      {
        name: '电梯科技+保险解决方案',
      },
      {
        name: '物业智慧电梯管理解决方案',
      },
      {
        name: '电梯数字化维保解决方案',
      },
      {
        name: '物联网集成商解决方案',
      }
    ]
  },
  {
    title: '地址、联系方式',
    children: [
      {
        name: `重庆地址： ${address}`,
      },
      {
        name: '深圳地址：深圳市龙岗区中海信创新产业城19栋A座10楼',
      },
      {
        name: '四川地址：成都市高新区天府一街351号',
      },
      {
        name: '苏州地址：苏州市姑苏区金门路1299号',
      },
      {
        name: `售前咨询热线：<span style=' font-size: 20px;'>${phone}</span>`,
        class:'num'
      },
      {
        name: `售前客服邮箱：<span style=' font-size: 20px;'>${email}</span>`,
        
      }
    ]
  },
]
</script>

<style scoped lang="scss">
.footer {
  width: 100%; 
  background-color: #242A37;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 50px 50px 50px;

  .foot_tab {
    .title {
      font-size: 26px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #FFFFFF;
      white-space: nowrap;

    }

    .tablist {
      padding-top: 30px;

      .tab {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
        white-space: nowrap;
        
      }
      .tab.num{
        margin-top:40px;
        
      }
    }
  }
}
</style>

