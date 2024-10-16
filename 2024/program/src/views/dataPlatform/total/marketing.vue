<template>
  <div id="marketing">
    <moduleName :moduleName="module"></moduleName>
    <div class="main">
      <div class="brand">
        <div class="title">{{ brandName }}</div>
        <div class="graph" id="graphbrand" style="width: 229px; height: 200px"></div>
      </div>
      <div class="age">
        <div class="title">电梯年龄分布</div>
        <div class="graph" id="graphage" style="width: 239px; height: 220px"></div>
      </div>
    </div>
    <div class="area">
      <div class="title">电梯场所类型分布</div>
      <div class="graph" id="grapharea" style="width: 100%; height: 240px"></div>
    </div>
  </div>
</template>

<script >
import { reactive, ref, onMounted, computed, watchEffect, watch, onActivated } from "vue";
import * as echarts from "echarts";
export default {
  name: "marketing",
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const module = computed(() => {
      return '营销'
    });
    const brandName = computed(() => {
      return props.data?.['01']?.name
    })
    const ageName = computed(() => {
      return props.data?.['02']?.name
    })
    const areaName = computed(() => {
      return props.data?.['03']?.name
    })
    watch(props, (newProps) => {
      setTimeout(() => {
        console.log('接收的数据：', newProps.data)
        const newVal = newProps.data
        console.log({ newVal })
        let xData = newVal?.['01']?.data.reduce((cur, pre) => {
          return [...cur, pre.name]
        }, []) || []
        if (xData) {
          //电梯品牌
          const myChartinterval = echarts.init(
            document.getElementById("graphbrand")
          );
          document.getElementById('graphbrand').setAttribute('_echarts_instance_', '')

          let yData = newVal?.['01']?.data.reduce((cur, pre) => {
            return [...cur, pre.data]
          }, []) || []

          // yData = yData.sort((a, b) => b - a);
          const min = 0;
          const max = Math.max(...yData);

          const option = {
            backgroundColor: "transparent", //背景色
            grid: {
              left: "2%",
              right: "2%",
              bottom: "2%",
              top: "5%",
              containLabel: true,
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "none",
              },
              formatter: function (params) {
                return params[0].name + " : " + params[0].value;
              },
            },
            xAxis: {
              show: false,
              type: "value",
            },
            yAxis: [
              {
                type: "category",
                inverse: true,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                  },
                },
                splitLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLine: {
                  show: false,
                },
                data: xData,
              },
              {
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: false,
                axisLabel: {
                  textStyle: {
                    color: "#ffffff",
                    fontSize: "12",
                  },
                },
                data: yData,
              },
            ],
            dataZoom: [
              {
                type: 'inside',
                yAxisIndex: 0,
                startValue: 0,
                endValue: 6
              }
            ],
            series: [
              {
                name: "值",
                type: "bar",
                zlevel: 1,
                itemStyle: {
                  normal: {
                    barBorderRadius: 4,

                    label: {
                      //在柱状图挨着显示文字
                      show: true,
                      position: "right",
                      color: "#F0F0F0",
                    },

                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#58E3FD",
                      },
                      {
                        offset: 1,
                        color: "#1796FF",
                      },
                    ]),
                  },
                },
                barWidth: 8,
                data: yData,
              },
              {
                name: "背景",
                type: "bar",
                backgroundColor: "rgba(255,255,255,0)",
                barWidth: 20,
                barGap: "-200%",
                data: xData,
                itemStyle: {
                  normal: {
                    color: "rgba(24,31,68,1)",
                    barBorderRadius: 4,
                  },
                },
              },
            ],
          };
          myChartinterval.setOption(option);
          if (yData.length > 7) {
            setInterval(() => {
              if (option.dataZoom[0].endValue == yData.length - 1) {
                option.dataZoom[0].endValue = 6;
                option.dataZoom[0].startValue = 0;
              } else {
                option.dataZoom[0].endValue += 1;
                option.dataZoom[0].startValue += 1;
              }
              myChartinterval.setOption(option);
            }, 3000)
          }



        }
        let ageData = newVal?.['02']?.data.reduce((cur, pre) => {
          return [...cur, pre.name]
        }, []) || []
        if (ageData) {
          //电梯年龄分布
          var myChart = echarts.init((document.getElementById("graphage")));
          document.getElementById('graphage').setAttribute('_echarts_instance_', '')
          let ageValue = newVal?.['02']?.data.reduce((cur, pre) => {
            return [...cur, pre.data]
          }, []) || []

          let colors = newVal?.['02']?.data.reduce((cur, pre) => {
            return [...cur, pre.desc]
          }, []) || []

          var min = 0;
          var max = (Math.max(...ageValue) - Math.min(...ageValue)) < 50 ? Math.max(...ageValue) + 20 : Math.max(...ageValue) + 50;
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

              formatter: function (param) {
                // console.log(param);
                return `<h3 >${param[0].seriesName}</h3> <span>${param[0].name} ：</span> <span style='color:#000'>${param[0].data}  </span>`;
              },
            },

            grid: {
              left: "0%",
              right: "0%",
              bottom: "15%",
              top: "0%", //边距
              height: "85%", //图表高度
              containLabel: true,
              z: 22,
            },
            xAxis: [
              {
                type: "category",
                gridIndex: 0,
                data: ageData,
                axisTick: {
                  alignWithLabel: true,
                },
                axisLine: {
                  lineStyle: {
                    color: "#0c3b71",
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
                backgroundColor: "",
                axisTick: {
                  show: false,
                },
                show: false,
                min,
                max,
                axisLine: {
                  lineStyle: {
                    color: "#0c3b71",
                  },
                  show: false,
                },
                axisLabel: {
                  color: "rgb(170,170,170)",
                  formatter: "{value} %",
                  show: false,
                },
              },
            ],
            series: [
              {
                name: "电梯年龄分布",
                type: "bar",
                barWidth: "35%",
                xAxisIndex: 0,
                yAxisIndex: 0,
                label: {
                  //在柱状图挨着显示文字
                  show: true,
                  position: "top",
                  color: "#F0F0F0",
                },
                itemStyle: {
                  normal: {
                    barBorderRadius: [6, 6, 0, 0],
                    color: function (params) {
                      const color = [...colors]
                      return color[params.dataIndex];
                    },
                  },
                },
                data: ageValue,
                zlevel: 11,
              },
            ],
          };
          myChart.setOption(option);
        }
        let areaData = newVal?.['03']?.data.reduce((cur, pre) => {
          return [...cur, pre.name]
        }, []) || []

        if (areaData) {
          //电梯场所分类
          let myChart = echarts.init((document.getElementById("grapharea")));
          document.getElementById('grapharea').setAttribute('_echarts_instance_', '')
          let areaValue = newVal?.['03']?.data.reduce((cur, pre) => {
            return [...cur, pre.data]
          }, []) || []

          let min = 0;
          let max = Math.max(...areaValue) * 1;
          const option = {

            color: "#009AFC",
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "line",
                lineStyle: {
                  opacity: 0,
                },
              },

              formatter: function (param) {

                return `<h3 >${param[0].seriesName}</h3> <span>${param[0].name} ：</span> <span style='color:#000'>${param[0].data}  </span>`;
              },
            },

            grid: {
              left: "5%",
              right: "5%",
              bottom: "12%",
              top: "5%",
              height: "95%",
              containLabel: true,
              z: 22,
            },
            xAxis: [
              {
                type: "category",
                gridIndex: 0,
                data: areaData,
                axisTick: {
                  alignWithLabel: true,
                },
                axisLine: {
                  lineStyle: {
                    color: "#0c3b71",
                  },
                },
                axisLabel: {
                  show: true,
                  color: "#FFFFFF",

                  fontSize: 10,
                  rotate: -30,
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
                  show: false,
                },
                min,
                max,
                axisLine: {
                  lineStyle: {
                    color: "#0c3b71",
                  },
                },
                axisLabel: {
                  color: "rgb(170,170,170)",
                  //   formatter: "{value} %",
                  show: true,
                },
              },
              {
                type: "value",
                gridIndex: 0,
                min,
                max,
                splitNumber: 2,
                splitLine: {
                  show: false,
                },
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
                splitArea: {
                  show: true,
                  areaStyle: {
                    color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
                  },
                },
              },
            ],
            series: [
              {
                name: "电梯场所类型分布",
                type: "bar",
                barWidth: "18px",
                xAxisIndex: 0,
                yAxisIndex: 0,
                itemStyle: {
                  normal: {
                    barBorderRadius: [6, 6, 0, 0],

                  },
                },
                data: areaValue,
                zlevel: 11,
              },

            ],
          };
          myChart.setOption(option);
          console.log('绘制图表', areaValue, areaData)
        }
      })



    }, {
      deep: true,
      immediate: true
    })



    return {
      module,

      brandName, ageName, areaName
    };
  },
};
</script>

<style lang='scss' scoped>
#marketing {
  width: 533px;
  height: 573px;

  background: url("../../../public/images/dataplatform/bg/card-topleft.png") no-repeat center/cover;

  .main,
  .area {
    padding: 0 8px;
    width: 100%;
    box-sizing: border-box;
  }

  .main {
    display: flex;
    margin-top: 15px;
    justify-content: space-between;

    .brand,
    .age {
      width: 212px;
      height: 232px;
      // background: red;
      margin: 0 16px;

      .title {
        color: #23fffc;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        padding-bottom: 8px;
        border-bottom: 1px solid #009bfc33;
      }

      .graphage {
        width: 100%;
        height: 100%;
      }
    }

    .age {
      width: 250px;
      margin-left: -30px;
    }
  }

  .area {
    .title {
      color: #23fffc;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      padding-bottom: 8px;
      margin: 0 auto 0;
      width: calc(100% - 32px);
      box-sizing: border-box;
      border-bottom: 1px solid #009bfc33;
    }
  }
}
</style>