<template>
  <div id="internet">
    <moduleName :moduleName="module"></moduleName>
    <div class="flexmodule">
      <div class="left">
        <span>{{ typedLabel }}</span>
      </div>
      <div class="right">
        <span>{{ yesterdayLabel }}</span>
        <span>{{ lineRate }}</span>
      </div>
    </div>
    <div class="main">
      <div class="typepie">
        <el-scrollbar height="100%">
          <template v-if="typeList.list.length <= 2">
            <div
              style="display:flex;justify-content:center;align-items:center;flex-wrap:wrap;flex-direction:column;height:314px;width:282px;">
              <div class="item" style="padding:10px 0;width:200px;" v-for="(item, index) in typeList.list" :key="index">
                <!-- style="margin-bottom:35px;"  :style="{ marginTop: index == 0 ? '50px' : 'auto' }" -->
                <div class="type">
                  <div class="value">{{ item.value }}</div>
                  <div class="name" style="white-space:nowrap">{{ item.name }}</div>
                </div>
                <div class="pie" style="width: 88px !important; height: 88px !important" :id="'pie' + index"></div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="item" v-for="(item, index) in typeList.list" :key="index">
              <!-- style="margin-bottom:35px;"  :style="{ marginTop: index == 0 ? '50px' : 'auto' }" -->
              <div class="type">
                <div class="value">{{ item.value }}</div>
                <div class="name" style="white-space:nowrap">{{ item.name }}</div>
              </div>
              <div class="pie" style="width: 88px !important; height: 88px !important" :id="'pie' + index"></div>
            </div>
          </template>
          <!-- <div class="item" v-for="(item, index) in typeList" :key="index">
            <div class="type">
              <div class="value">{{ item.value }}</div>
              <div class="name">{{ item.name }}</div>
            </div>
            <div class="pie" style="width: 88px; height: 88px" :id="'pie' + index"></div>
          </div> -->
        </el-scrollbar>
      </div>
      <div class="table-list">
        <el-scrollbar height="100%">
          <div class="item" v-for="(item, index) in yesterdayOnline" :key="index">
            <div class="before">
              <span class="index">{{ index + 1 }}</span>
              <span class="name">.{{ item.name }}</span>
            </div>
            <span class="value">{{ item.data }}</span>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script   setup>
import { reactive, ref, computed, onMounted, defineProps, watch } from "vue";
import * as echarts from "echarts";
import { getBIData } from '@/api/module/dataPlatform'
import { propsToAttrMap } from "@vue/shared";





const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})
let typeList = reactive({
  list: []
})
const yesterdayOnline = computed(() => {
  return props.data?.['03']?.data.map((item, index) => {
    item.id = index
    return item
  })
})
const module = computed(() => {
  return '物联网'
});
const typedLabel = computed(() => {
  return props.data?.['01']?.name
});
const yesterdayLabel = computed(() => {
  return '昨日项目在线率排行'
});
const lineRate = computed(() => {
  return '（在线率）'
});
const leftData = computed(() => {
  return props.data?.['01']?.data
});


const initEacharts = (data) => {
  // console.log({ data })
  for (let i = 0; i < data.length; i++) {
    const progress = data[i].online;
    // console.log({ progress })
    const option = {
      backgroundColor: "transparent",
      title: [
        {
          text: progress,
          subtext: '在线',
          x: "center",
          y: "center",
          itemGap: -5,
          textStyle: {
            fontSize: "22",
            color: "#23FFFC",
            fontFamily: "MicrosoftYaHei",
            // foontWeight: "normal",
          },

          subtextStyle: {
            fontSize: 12,
            color: "#fff",
          },
        },
      ],
      polar: {
        radius: ["85%", "100%"],
        center: ["50%", "50%"],
      },
      angleAxis: {
        max: 100,
        show: false,
      },
      radiusAxis: {
        type: "category",
        show: true,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: "",
          type: "bar",
          roundCap: true,
          barWidth: 20,
          showBackground: true,
          backgroundStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#163c67",
              },
              {
                offset: 1,
                color: "#7f8ea6",
              },
            ]),
          },
          avoidLabelOverlap: false,
          data: [progress.slice(0, -1)],
          coordinateSystem: "polar",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#6cddff",
              },
              {
                offset: 1,
                color: "#16a2ad",
              },
            ]),
          },
        },
      ],
    };

    const pie = echarts.init(document.getElementById("pie" + i));
    document.getElementById("pie" + i).setAttribute('_echarts_instance_', '')
    pie.setOption(option);


  }
}

watch(() => props.data, (newVal) => {

  let item = newVal?.['01']?.data || []
  // typeList = reactive([])
  // console.log('监听props:', item)
  // typeList = []
  typeList.list = []
  item.map(v => {

    v.online = v.data.online
    v.countTotal = v.data.countTotal
    if (v.countTotal > 0) { // 0的不展示
      typeList.list.push({
        name: v.name,
        value: v.countTotal,
        online: v.online
      })
    }

    return v
  })

  // console.log('监听props:', item)
  setTimeout(() => {
    initEacharts(typeList.list)
  })
})




</script>

<style lang='scss' scoped>
#internet {
  position: relative;
  width: 614px;
  height: 401px;
  margin: 0 16px;
  padding: 0 5px;
  box-sizing: border-box;
  background: url("../../../public/images/dataplatform/bg/card-bottom.png") no-repeat center/cover;

  .flexmodule {
    display: flex;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 19px;

    div {
      width: 50%;
      //  text-align:center;
      color: #23fffc;
      font-size: 14px;
      padding-bottom: 8px;

      border-bottom: 1px solid rgba(22, 99, 180, 0.2);
    }

    .left {
      margin-right: 18px;
    }

    .right {
      display: flex;
      margin-left: 18px;
      justify-content: space-between;

      span:last-child {
        color: #f0f0f0;
        font-size: 12px;
      }
    }
  }

  .main {
    display: flex;

    .typepie,
    .table-list {
      width: 50%;
    }

    height: calc(100% - 71px);

    .typepie {
      height: calc(100% - 20PX);

      margin-right: 20px;

      .item {
        display: flex;
        height: 87px;
        align-content: center;
        margin-bottom: 12px;

        .type {
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .value {
            font-size: 28px;
            color: #009afc;
            text-align: center;
          }

          .name {
            text-align: center;
            font-size: 14px;
            color: #fff;
          }
        }

        .pie {
          width: 50%;
          //   background: pink;
        }
      }

      .item:first-child {
        margin-top: 12px;
      }
    }

    .table-list {
      margin-left: 20px;
      box-sizing: border-box;
      padding: 10px 0;
      height: calc(100% - 40px);
    }

    .table-list {
      .item {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 5px 0;

        .before {
          font-family: MicrosoftYaHei;

          .index {
            color: #f0f0f0;
            font-size: 14px;
          }

          .name {
            color: #f0f0f0;
            font-size: 14px;

          }
        }

        .value {
          width: 100px;
          min-width: 100px;
          text-align: center;
          font-size: 14px;
          font-family: MicrosoftYaHeiLight;
          color: #f0f0f0;
        }
      }

      .item:nth-child(-n + 3) .before .index {
        color: #23fffc;
        font-size: 18px;
      }
    }
  }
}
</style>