<template>
  <div class="common-layout" id="platform-layout">
    <el-header class="common-header">
      <div class="common-title">
        {{ getCompanyName }}
      </div>
      <el-tabs v-model="activeName" class="header-tabs" @tab-click="handleClick">
        <!-- <el-tab-pane v-for="nav in navList" :label="nav.label" :name="nav.component" :key="nav.id">
          <component :is="activeName" class="trans-common"></component>
        </el-tab-pane> -->
        <el-tab-pane label="总览" name="componentTotal">
          <componentTotal :priorityCode="priorityCode" v-if="clickable.componentTotal" class="trans-common" />
        </el-tab-pane>
        <el-tab-pane label="营销" name="componentMarketing">
          <componentMarketing v-if="clickable.componentMarketing" class="trans-common" />
        </el-tab-pane>
        <el-tab-pane label="工程" name="componentProject">
          <componentProject v-if="clickable.componentProject" class="trans-common" />
        </el-tab-pane>
        <el-tab-pane label="员工" name="componentEmploy">
          <componentEmploy v-if="clickable.componentEmploy" class="trans-common" />
        </el-tab-pane>
        <el-tab-pane label="物联网" name="componentInternet">
          <componentInternet v-if="clickable.componentInternet" class="trans-common" />
        </el-tab-pane>
        <el-tab-pane label="供应链" name="componentSupplyChain">
          <componentSupplyChain v-if="clickable.componentSupplyChain" class="trans-common" />
        </el-tab-pane>
        <el-tab-pane label="客服" name="componentCustomerService">
          <componentCustomerService v-if="clickable.componentCustomerService" class="trans-common" />
        </el-tab-pane>
        <el-tab-pane label="走势图" name="componentRunLine">
          <componentRunLine v-if="clickable.componentRunLine" class="trans-common" />
        </el-tab-pane>
      </el-tabs>
      <div class="select-border" v-if="activeName === 'componentTotal'">
        <el-select v-model="priorityCode" class="m-2 selectcontent" id="closetag" @change="chooseCustom"
          placeholder="请选择优先级" size="small" style="
                background: transparent;
                line-height: 40px;
                color: #fff;
                font-size: 16px;
              ">
          <el-option v-for="(item, index) in priorityList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </el-header>
  </div>
</template>
<script  setup >

import { ref, reactive, onMounted, computed, watch } from "vue";
import { useStore } from 'vuex'
import { selectByAllTypeApi } from '@/api/module/commont'
import componentTotal from "./total";
import componentSupplyChain from "./supplyChain";
import componentProject from "./project";
import componentMarketing from "./marketing";
import componentInternet from "./internet";
import componentEmploy from "./employ";
import componentCustomerService from "./customerService";
import componentRunLine from "./runLine";




const store = useStore()
const getCompanyName = computed(() => {
  const s = store.state.user.userInfo.ui_extra
  return s ? JSON.parse(s)?.system_name : '梯控物联全国电梯大数据中心'
})
let activeName = ref("componentTotal"); //componentTotal   componentProject
const navlist = [
  {
    name: "total",
    id: 0,
    component: "componentTotal",
    label: "总览",
    default: true,
  },
  {
    name: "marketing",
    id: 1,
    component: "componentMarketing",
    label: "营销",
    default: false,
  },
  {
    name: "project",
    id: 2,
    component: "componentProject",
    label: "工程",
    default: false,
  },
  {
    name: "employ",
    id: 3,
    component: "componentEmploy",
    label: "员工",
    default: false,
  },
  {
    name: "internet",
    id: 4,
    component: "componentInternet",
    label: "物联网",
    default: false,
  },

  {
    name: "supplyChain",
    id: 5,
    component: "componentSupplyChain",
    label: "供应链",
    default: false,
  },
  {
    name: "customerService",
    id: 6,
    component: "componentCustomerService",
    label: "客服",
    default: false,
  },
  {
    name: "runLine",
    id: 7,
    component: "componentRunLine",
    label: "走势图",
    default: false,
  },
];
const navList = reactive(navlist);
const clickable = reactive({
  [activeName.value]: true
})
const handleClick = (tab, event) => {
  activeName.value = tab.props.name;
  console.log(activeName)
  if (!clickable[activeName.value]) {
    clickable[activeName.value] = true
    if (isFullscreen.value) {

      setTimeout(() => {
        setScale('1')
      })
    } else {

      setTimeout(() => {
        setScale()
      })
    }
  }
};
function setScale(scale = '0.85,0.8') {
  // let designWidth = 1920 //设计稿的宽度，根据实际项目调整
  // let designHeight = 1080 //设计稿的高度，根据实际项目调整

  // // 缩放比
  // let scale =
  //   document.documentElement.clientWidth / document.documentElement.clientHeight < designWidth / designHeight
  //     ? document.documentElement.clientWidth / designWidth
  //     : document.documentElement.clientHeight / designHeight

  // 获取所有类名为  trans-common 的元素，设置 transform 属性
  let selectorAll = document.querySelectorAll('.trans-common')
  for (let i = 0; i < selectorAll.length; i++) {
    selectorAll[i].style = `transform: scale(${scale})`
  }
}

const chooseCustom = (v) => {

}

const isFullscreen = computed(() => {
  return store.state.menu.fullsreen
})
watch(() => isFullscreen, (newVal) => {
  console.log(newVal.value)
  if (newVal.value) {

    setTimeout(() => {
      setScale('1')
    })
  } else {

    setTimeout(() => {
      setScale()
    })
  }
},
  {
    deep: true,
    immediate: true
  })
onMounted(() => {
  // window.onresize = function () {
  //   setScale()
  // }
  setScale()

  // if (route.path.indexOf('bi') > -1 && route.query.fullscreen) {
  //   setTimeout(() => {
  //     setScale(String(route.query.fullscreen))
  //   }, 5000)
  // }
  console.log({ store: isFullscreen.value })

  selectByAllTypeApi({ constType: 'project_priority' }).then(x => {
    console.log(x.data.data)
    const data = x.data?.data
    if (Object.keys(data).length) {
      const list = []
      Object.keys(data).forEach(key => {
        const obj = {
          label: data[key],
          value: key
        }
        priorityList.push(obj)

      })
    }
  })


})
//computed 使用 
const num = computed(() => {
  return 3 * 4
})


// 监听到name发⽣变化，进⾏打印

const name = ref('2')

const priorityList = reactive([
  {
    label: '全部', value: ''
  }
])
let priorityCode = ref('')
const marginright = computed(() => {
  return !isFullscreen.value ? '325px' : '50px'
})

</script>
<style scoped lang='scss'>
$marginright: v-bind('marginright');

.trans-common {
  transform-origin: top left;
}

// rgb(148 221 237) 0px 0px 18px 3px
.common-layout {
  width: 100vw;
  height: 100vh;
  user-select: none;
  overflow: hidden;
  box-sizing: border-box;
  background: url('../../public/images/dataplatform/bg/bg.png') no-repeat center/cover;



  // filter:grayscale(100%);
  :deep().el-tabs__item {
    color: #fff;
    
  }

  :deep().el-tabs__header {
    margin: 0 !important;
  }

  :deep().el-tabs__nav-scroll {
    height: 75px;
    line-height: 50px !important;
  }

  :deep().el-tabs__nav .el-tabs__item.is-top {
    font-size: 16px;
    line-height: 70px;
    padding: 0 35px;
    box-sizing: border-box;
    font-family: 'SourceHanSansCN-Regular';
    margin-top:20px;
    padding-bottom:14px;
  }

  :deep().el-tabs__nav-scroll {
    line-height: 40px;
  }

  :deep().el-tabs__nav-scroll .el-tabs__nav.is-top {
    margin-left: 50%;
    transform: translateX(-50%) !important;
  }

  :deep().el-tabs__item.is-active {
    color: #2eacfc;
    font-weight: bold;
  }

  :deep().el-tabs__active-bar {
    background-color: #2eacfc;
    box-shadow: rgb(148 221 237) 0px 0px 18px 3px;
  }
}

.header-tabs :deep() .el-tabs__content {
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  box-sizing: border-box;
  // overflow-y: auto;
}

.header-tabs {
  width: 100%;
}

@font-face {
  font-family: 'SourceHanSansCN-Regular';
  src: url('../../public/fontFamily/SourceHanSansCN-Regular.ttf');
}

.common-header {
  padding: 0 !important;
  height: 71px;
  width: 100%;
  position: relative;
  background: url('../../public/images/dataplatform/bg/top_bg.png') no-repeat center/cover;
  display: flex;
  justify-content: space-between;

  :deep() .el-tabs__nav-wrap:after {
    background-color: none !important;
    height: 0 !important;
  }

  .common-title {
    position: absolute;
    top: 13px;
    letter-spacing: 1px;
    font-family: 'SourceHanSansCN-Regular';
    font-size: 24px;
    color: #f3fcff;
    font-weight: bold;
    line-height: 36px;
    width: 22%;
    white-space: nowrap;
    text-align: center;
    text-shadow: 0 0 1px #f3fcff, 0 0 3px #f0f4f5;
  }

  .select-border {
    width: 140px;
    height: 30px;
    position: absolute;
    top: 18px;
    user-select: none;
    right: $marginright;
    overflow: hidden;
    border: 1px solid rgba(0, 154, 252, 0.5);
    box-shadow: 0 0 3px 1px rgb(37, 169, 245);
    transform: skew(-25deg, 0deg);

    .selectcontent {
      // margin-left: 20px;
      width: 140px;
      height: 30px;
      transform: skew(25deg, 0deg);
      border: none;
      outline: none;
      line-height: 33px !important;
      background-color: transparent;

      :deep() .el-input__wrapper {
        background: transparent;
        border: none;
        font-weight: bold;
        box-shadow: none !important;
      }

      :deep().el-select__icon {
        color: #29b6ff;
      }

      :deep() .el-input__inner {
        color: #29b6ff;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        user-select: none;
      }

      :deep() .el-select.el-input.is-focus.el-input__wrapper {
        box-shadow: none !important;
      }

      :deep() .el-input--small {
        --el-input-height: '';
      }
    }
  }
}
</style>