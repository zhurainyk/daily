<template>
  <div id="data-customerService">
    <div class="requireTotal">
      <module-name :moduleName="'客服'"></module-name>
      <div class="content">
        <div class="tab">
          <span>投诉次数</span>
          <span class="value">
            0
          </span>
        </div>
        <div id="customerservicepie">

        </div>
        <div class="title">
          投诉原因分类
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import * as echarts from 'echarts'
const graphList = [


]
onMounted(() => {
  initEcharts(graphList)
})
const initEcharts = (graphList) => {

  {
    //需求响应汇总
    const option = {
      tooltip: {
        trigger: "item",
      },
      grid: {
        top: "10%", //距上边距

        left: "40%", //距离左边距

        right: "40%", //距离右边距

        bottom: "10%", //距离下边距
      },
      color: ["#009AFC", "#23FFFC", "#FED52F", "#B149FF"],
      legend: {
        //图列的设置
        itemWidth: 12, //宽
        itemHeight: 12, //高
        itemGap: 15, //图例之间的间距
        // data: ["维保技工", "维修技师", "电梯工程师", "电梯专家"],
        data: [],
        icon: "circle",
        top: "5%", //距离顶部的位置
        //  left:'',
        x: "center", //图例在x方向的位置
        y: "top", //图例在y方向的位置
        textStyle: {
          color: "#C0DFFF",
          fontStyle: "normal",
        },
      },
      series: [
        {
          name: "投诉原因分类",
          type: "pie",
          radius: ["30%", "53%"],
          avoidLabelOverlap: false,
          // label: {
          //   show: false,
          //   position: "center",
          // },
          center: ["50%", "60%"],
          emphasis: {
            label: {
              //鼠标移上去的样式
              show: true,
              fontSize: "16",
              fontWeight: "normal",
            },
          },

          // labelLine: {
          //   show: true,
          //   normal: {
          //     lineStyle: {
          //       color: "rgba(255, 255, 255, 0.3)",
          //     },
          //     smooth: 0.2,
          //     length: 50,
          //     length2: 100,
          //   },
          // },
          labelLine: {
            //图形外文字线
            show: false,

            normal: {
              length: 10,
              length2: 10,
              lineStyle: {
                color: "transparent",
              },
            },
          },
          label: {
            normal: {
              formatter: " {c|{c}%}", //图形外文字上下显示
              borderWidth: 30,
              borderRadius: 4,
              padding: [0, 2], //文字和图的边距
              rich: {
                a: {
                  color: "#FEFEFE",
                  fontSize: 14,
                  lineHeight: 30,
                },
                b: {
                  //name 文字样式
                  fontSize: 14,
                  lineHeight: 40,
                  color: "#FEFEFE",
                },
                c: {
                  //value 文字样式
                  fontSize: 12,
                  lineHeight: 20,
                  fontFamily: "MicrosoftYaHeiLight",
                  color: "#FEFEFE",
                  align: "center",
                },
              },
            },
          },
          data: [
            // { value: 22, name: "维保技工" },
            // { value: 33, name: "维修技师" },
            // { value: 44, name: "电梯工程师" },
            // { value: 12, name: "电梯专家" },
          ],
        },
      ],
    };

    var myChart = echarts.init(document.getElementById("customerservicepie"));
    // 绘制图表
    myChart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
#data-customerService {
  width: 100%;
  height: calc(100% - 70px);

  box-sizing: border-box;

  .requireTotal {
    box-sizing: border-box;
    padding-top: 2px;
    width: 419px;
    height: 472px;
    background: url('../../../public/images/dataplatform/bg/customerServerbg.png') no-repeat center/cover;
    margin-left: 30px;

    .content {
      .tab {
        margin: 0 auto;
        width: 100%;
        margin-top: 37px;
        display: inline-block;
        text-align: center;

        span {
          color: #fff;
          font-size: 14px;
        }

        .value {
          color: rgba(0, 154, 252, 1);
          font-size: 28px;

        }
      }

      #customerservicepie {
        width: 250px;
        height: 300px;
        margin: 5px auto;
        // background-color: #fff;
      }

      .title {
        text-align: center;
        line-height: 20px;
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
</style>