<template>
  <div id="supplyChain">
    <moduleName :moduleName="module"></moduleName>
    <div class="supplytotal">
      <div class="left">
        <span>{{ totalName }}</span>
        <span>{{ totalNum }}</span>
      </div>
      <div class="right">
        <span>{{ totalName2 }}</span>
        <span>{{ totalNum2 }}</span>
      </div>
    </div>
    <div class="main">
      <div class="title">{{ totalName3 }}</div>
      <div class="graph" id="graphsupply" style="width: 572px; height: 254px"></div>
    </div>
  </div>
</template>

<script   setup>
import { reactive, ref, onMounted, computed, watch, defineProps } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})

const module = computed(() => {
  return '供应链'
})
const totalName = computed(() => {
  return props.data?.['01']?.name
})
const totalNum = computed(() => {
  return props.data?.['01']?.data
})
const totalNum2 = computed(() => {
  return props.data?.['02']?.data
})
const totalName2 = computed(() => {
  return props.data?.['02']?.name
})
const totalName3 = computed(() => {
  return props.data?.['03']?.name
})


onMounted(() => {

});
const initEcaharts = (data) => {
  var myChart = echarts.init((document.getElementById("graphsupply")));
  document.getElementById("graphsupply").setAttribute('_echarts_instance_', '')
  var xData = data['03']?.data.reduce((cur, pre) => {
    return [...cur, pre.name]
  }, []) || [],
    yData = data['03']?.data.reduce((cur, pre) => {
      return [...cur, pre.data]
    }, []) || [],
    colors = data['03']?.data.reduce((cur, pre) => {
      return [...cur, pre.desc]
    }, []) || []

  var min = 0;
  var max = Math.max(...yData);
  // var max = 10000
  const option = {
    backgroundColor: "",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          opacity: 0,
        },
      },
      // backgroundColor: "rgba(255,255,255,.5)",
      //   formatter: ' {a0} <br /> {b0}: {c0}% '
      formatter: function (param) {
        // console.log(param);
        return `<h3 >${param[0].seriesName}</h3> <span>${param[0].name} ：</span> <span style='color:#000'>${param[0].data}  </span>`;
      },
    },

    grid: {
      left: "5%",
      right: "0%",
      bottom: "5%",
      top: "10%", //边距
      height: "85%", //图表高度
      containLabel: true,
      z: 22,
    },
    xAxis: [
      {
        type: "category",
        gridIndex: 0,
        data: xData,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "rgba(22, 99, 180, 1)",
          },
        },
        axisLabel: {
          show: true,
          color: "#fff",
          fontSize: 10,
          interval: 0,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        gridIndex: 0,
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,//刻度
        },
        min,
        max,
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(22, 99, 180, 1)",
          },
        },
        // axisLine: {
        //   show:true,
        //   lineStyle: {
        //     color: "#90979c",
        //   },
        // },
        axisLabel: {
          color: "#fff",
          //   formatter: "{value} %",
          show: true,

        },
        // axisLabel: {
        //   interval: 0,
        // },
        // splitArea: {
        //   show: false,
        // },
      },
      // {//背景条形
      //   type: "value",
      //   gridIndex: 0,
      //   min,
      //   max,
      //   splitNumber: 0,
      //   splitLine: {
      //     show: false,
      //   },
      //   axisLine: {
      //     show: false,
      //   },
      //   axisTick: {
      //     show: false,
      //   },
      //   axisLabel: {
      //     show: false,
      //   },
      //   splitArea: {
      //     show: true,
      //     areaStyle: {
      //       color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
      //     },
      //   },
      // },
    ],
    series: [
      {
        name: "零配件交付响应时长分类",
        type: "bar",
        barWidth: "22%",
        xAxisIndex: 0,
        yAxisIndex: 0,

        itemStyle: {
          normal: {
            barBorderRadius: [6, 6, 0, 0],
            color: function (params) {

              return colors[params.dataIndex];
            },
            //渐变色
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: "#00feff"
            //   },
            //   {
            //     offset: 0.5,
            //     color: "#027eff"
            //   },
            //   {
            //     offset: 1,
            //     color: "#0286ff"
            //   }
            // ])
          },
        },
        data: yData,
        zlevel: 11,
      },
      //   {
      //     name: "背景",
      //     type: "bar",
      //     barWidth: "50%",
      //     xAxisIndex: 0,
      //     yAxisIndex: 1,
      //     barGap: "-135%",
      //     data: [100, 100, 100, 100, 100, 100, 100],
      //     itemStyle: {
      //       normal: {
      //         color: "rgba(255,255,255,0.1)"
      //       }
      //     },
      //     zlevel: 9
      //   }
    ],
  };
  myChart.setOption(option);
}
watch(() => props.data, newVal => {

  initEcaharts(newVal)
})

</script>

<style lang='scss' scoped>
#supplyChain {
  width: 614px;
  height: 401px;
  background: url("../../../public/images/dataplatform/bg/card-bottom.png") no-repeat center/cover;

  .supplytotal {
    display: flex;
    justify-content: space-around;
    margin-top: 13px;

    .left,
    .right {
      width: 50%;
      text-align: center;

      span {
        color: #ffffff;
        font-size: 14px;
      }

      span:last-child {
        color: #009afc;
        font-size: 28px;
        margin-left: 10px;
      }
    }
  }

  .main {
    color: #23fffc;
    width: 100%;
    margin-top: 21px;
    box-sizing: border-box;
    padding: 0 20px;

    .title {
      width: 100%;
      border-bottom: 1px solid rgba(22, 99, 180, 0.2);
      padding-bottom: 7px;
    }

    .graph {
      width: 572px;
      height: 254px;
      // background: red;
    }
  }
}
</style>