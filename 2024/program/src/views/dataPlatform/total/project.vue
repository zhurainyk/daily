<template>
  <div id="project">
    <moduleName :moduleName="module"></moduleName>
    <div class="main">
      <div class="top">
        <div class="tab emergency">
          <div class="title">{{ tab1 }}</div>
          <div class="graph">
            <div class="resolve">
              <div class="resolved margin">
                <p class="value">{{ emergencyValue }}</p>
                <p class="name">{{ emergencyLabel }}</p>
              </div>
              <div class="time margin">
                <div class="lastmonth"><span>上月应急</span><span>{{ lastMonEmergencyValue }}</span>
                </div>
                <div class="allyear"><span>今年应急</span><span>{{ allYearValue }}</span></div>
              </div>
            </div>
            <div class="resolve">
              <div class="resolved">
                <p class="value">{{ rescueValue }}</p>
                <p class="name">{{ rescueLabel }}</p>
              </div>
              <div class="time">
                <div class="lastmonth"><span>上月解救</span><span>{{ lastrescueValue }}</span></div>
                <div class="allyear"><span>今年解救</span><span>{{ allrescueValue }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab bugs">
          <div class="title">{{ tab2 }}</div>
          <div class="graph" id="piebugs" style="width: 230px; height: 170px"></div>
        </div>
      </div>
      <div class="bottom">
        <div class="tab reason">
          <div class="title">{{ tab3 }}</div>
          <div class="graph" id="piereason" style="width: 250px; height: 244px;margin-left:-5px;"></div>
        </div>
        <div class="tab type">
          <div class="title">{{ tab4 }}</div>
          <div class="graph" id="pietype" style="width: 250px; height: 244px;margin-left:-5px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script   setup >
import { reactive, ref, onMounted, defineProps, computed, watch } from "vue";
import * as echarts from "echarts";


const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})
const module = computed(() => {
  return '工程'    //data?.['01']?.name 
})
const tab1 = computed(() => {
  return '应急处置'
})
const emergencyLabel = computed(() => {
  return props.data?.['0101']?.name
})
const emergencyValue = computed(() => {
  return props.data?.['0101']?.data
})
const lastMonEmergencyLabel = computed(() => {
  return props.data?.['0102']?.name
})
const lastMonEmergencyValue = computed(() => {
  return props.data?.['0102']?.data
})
const allYearLabel = computed(() => {
  return props.data?.['0103']?.name
})
const allYearValue = computed(() => {
  return props.data?.['0103']?.data
})
const rescueValue = computed(() => {
  return props.data?.['0104']?.data
})
const rescueLabel = computed(() => {
  return props.data?.['0104']?.name
})
const lastrescueLabel = computed(() => {
  return props.data?.['0106']?.name
})
const lastrescueValue = computed(() => {
  return props.data?.['0106']?.data
})
const allrescueLabel = computed(() => {
  return props.data?.['0105']?.name
})
const allrescueValue = computed(() => {
  return props.data?.['0105']?.data
})




const tab2 = computed(() => {
  return '电梯故障率走势'
})
const tab3 = computed(() => {
  return '回召类型分布'
})
const tab4 = computed(() => {
  return '故障原因'
})


const initEacharts = (data = {}) => {
  if (!data) return;

  {
    //故障走势
    let xLabel = data?.['02']?.reduce((cur, pre) => {
      return [...cur, pre.month]
    }, [])
    let yLabel = data?.['02']?.reduce((cur, pre) => {
      return [...cur, pre.data]
    }, [])


    const option = {
      tooltip: {
        // trigger: "item",
        trigger: 'axis',
        formatter: function (param) {

          return `${param[0].axisValue}月：${param[0].value}`
        }
      },
      grid: {
        top: "5%",
        left: "2%",
        right: "3%",
        bottom: "10%",

      },

      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLine: {
            //坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
              color: "rgba(22, 99, 180, .2)",
            },
          },
          axisLabel: {
            //坐标轴刻度标签的相关设置
            textStyle: {
              color: "#fff",
              // padding: 16,
              fontSize: 10,
            },
            interval: 0,
            show: true,
            formatter: function (data) {
              return data;
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "red",
            },
          },
          axisTick: {
            show: false,
          },
          data: xLabel,
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
          name: "电梯故障率走势",
          type: "line",
          symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 0,
          smooth: true,
          lineStyle: {
            normal: {
              width: 3,
              color: "rgba(25,163,223,1)", // 线条颜色
            },
            borderColor: "rgba(0,0,0,.4)",
          },
          itemStyle: {
            color: "rgba(25,163,223,1)",
            borderColor: "#646ace",
            borderWidth: 2,
          },
          tooltip: {
            show: true,
          },
          areaStyle: {
            //区域填充样式
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#016bb9",
                  },
                  {
                    offset: 1,
                    color: "#01234c",
                  },
                ],
                false
              ),
              shadowColor: "transparent", //阴影颜色
              shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            },
          },
          data: yLabel,
        },
      ],
    };

    const myChart = echarts.init(
      document.getElementById("piebugs")
    );
    document.getElementById("piebugs").setAttribute('_echarts_instance_', '')
    // 绘制图表
    myChart.setOption(option);

  }
  {
    let colors = data['03']?.data.reduce((cur, pre) => {
      return [...cur, pre.desc]
    }, []) || []

    let legens = data['03']?.data.reduce((cur, pre) => {
      return [...cur, pre.name]
    }, []) || []
    let xData = data['03']?.data.reduce((cur, pre) => {
      return [...cur, { name: pre.name, value: pre.data.slice(0, -1) == 0 ? '' : pre.data.slice(0, -1), count: pre.count }]
    }, []) || []
    if (xData.every(x => x.value == '')) {
      console.log('进来')
      xData.map(x => (x.value = 0))
    } else {


      console.log({ xData })
    }
    //召修原因
    const option = {

      tooltip: {
        trigger: "item",
        // axisPointer: {
        //   type: "line",
        //   lineStyle: {
        //     opacity: 0,
        //   },
        // },
        // backgroundColor: "rgba(255,255,255,.5)",
        // formatter: ' {a0} <br /> {b0}: {d0} '
        formatter: function (param) {
          console.log(param);
          return `<h3 >${param.seriesName}</h3> <span>${param.data.name} ：</span> <span style='color:#000'>${param.data.count}  </span>`;
        },
      },
      grid: {
        top: "10%", //距上边距

        left: "40%", //距离左边距

        right: "40%", //距离右边距

        bottom: "10%", //距离下边距
      },
      color: colors,
      legend: {
        //图列的设置
        itemWidth: 12, //宽
        itemHeight: 12, //高
        itemGap: 10, //图例之间的间距
        data: legens,
        icon: "circle",
        top: "3%", //距离顶部的位置;
        left: '0%',
        //  left:'',
        x: "left", //图例在x方向的位置
        y: "top", //图例在y方向的位置
        textStyle: {
          color: "#C0DFFF",
          fontStyle: "normal",
          fontSize: "12px",
          textIndent: '-5px'
        },
      },
      series: [
        {
          name: data['03']?.name || '',
          type: "pie",
          radius: ["30%", "53%"],
          avoidLabelOverlap: false,
          // label: {
          //   show: false,
          //   position: "center",
          // },
          center: ["45%", "63%"],
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
              length: 5,
              length2: 5,
              lineStyle: {
                color: "transparent",
              },
            },
          },
          label: {
            normal: {
              formatter: "{c|{c} %}",//图形外文字上下显示
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
          data: xData,
        },
      ],
    };

    const myChart = echarts.init(
      document.getElementById("piereason")
    );
    document.getElementById("piereason").setAttribute('_echarts_instance_', '')
    // 绘制图表
    myChart.setOption(option);
    console.log({ option })
  }

  {
    //故障类型
    let colors = data['04']?.data.reduce((cur, pre) => {
      return [...cur, pre.desc]
    }, []) || [];
    let legens = data['04']?.data.reduce((cur, pre) => {
      return [...cur, pre.name]
    }, []) || []
    let xData = data['04']?.data.reduce((cur, pre) => {
      return [...cur, { name: pre.name, value: pre.data.slice(0, -1) == 0 ? '' : pre.data.slice(0, -1), count: pre.count }]
    }, []) || []
    if (xData.every(x => x.value == '')) {
      xData.map(x => (x.value = 0))
    }
    const option = {
      tooltip: {
        trigger: "item",
        // formatter: ' {a0} <br /> {b0}: {c0}% '
        formatter: function (param) {
          console.log(param);
          return `<h3 >${param.seriesName}</h3> <span>${param.data.name} ：</span> <span style='color:#000'>${param.data.count}  </span>`;
        },
      },
      grid: {
        top: "10%", //距上边距

        left: "40%", //距离左边距

        right: "40%", //距离右边距

        bottom: "10%", //距离下边距
      },
      color: colors,
      legend: {
        //图列的设置
        itemWidth: 12, //宽
        itemHeight: 12, //高
        itemGap: 10, //图例之间的间距
        data: legens,
        icon: "circle",
        top: "3%", //距离顶部的位置
        //  left:'',
        x: "left", //图例在x方向的位置
        y: "top", //图例在y方向的位置
        textStyle: {
          color: "#C0DFFF",
          fontStyle: "normal",
          fontSize: "12px",
        },
      },
      series: [
        {
          name: data['04']?.name || '',
          type: "pie",
          radius: ["30%", "53%"],
          avoidLabelOverlap: false,

          center: ["45%", "63%"],
          emphasis: {
            label: {
              //鼠标移上去的样式
              show: true,
              fontSize: "16",
              fontWeight: "normal",
            },
          },
          labelLine: {
            //图形外文字线
            show: false,

            normal: {
              length: 5,
              length2: 5,
              lineStyle: {
                color: "transparent",
              },
            },
          },
          label: {
            normal: {
              formatter: "{c|{c} %}",//图形外文字上下显示
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
          data: xData,
        },
      ],
    };

    const myChart = echarts.init(
      document.getElementById("pietype")
    );
    // 绘制图表
    document.getElementById("pietype").setAttribute('_echarts_instance_', '')
    myChart.setOption(option);
    console.log({ option })
  }
}
watch(() => props.data, (newVal) => {
  // console.log({ newVal })
  initEacharts(newVal)
})
// onMounted(() => {
//   initEacharts()
// });

</script>

<style lang='scss' scoped>
#project {
  width: 533px;
  height: 573px;
  box-sizing: border-box;
  padding: 5px;
  background: url("../../../public/images/dataplatform/bg/card-topright.png") no-repeat center/cover;
  background-origin: content-box;

  //  background-color: red;
  .main {

    margin-top: 10px;

    .top,
    .bottom {
      display: flex;
      margin-top: 20px;

      .tab {
        width: calc(50% - 32px);
        margin: 0 16px;
        // background-color: pink;
        height: 210px;

        .title {
          font-family: MicrosoftYaHei;
          font-size: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(0, 154, 252, 0.2);
          color: #23fffc;
        }
      }
    }


    .tab.reason {
      height: 273px;
    }

    .tab.emergency {
      .graph .resolve {
        display: flex;

        .resolved {
          width: 50%;
          height: 50px;

          border-right: 1px solid rgba(255, 255, 255, 0.3);

          .value {
            text-align: center;
            color: rgba(0, 154, 252, 1);
            font-size: 28px;
            line-height: 28px;
          }

          .name {
            text-align: center;
            color: #fff;
            font-size: 14px;
            line-height: 28px;
          }
        }

        .resolved.margin {
          margin: 30px auto 30px;
        }

        .time {
          width: 50%;
          height: 50px;
          display: flex;
          align-items: center;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: space-between;

          // margin-top:50px;
          .lastmonth,
          .allyear {
            display: flex;
            width: 100%;
            justify-content: space-around;
            align-items: center;

            span:first-child {
              font-size: 12px;
              color: #fff;
              text-align: center;
              width: 70%;
              text-align: right;
            }

            span:last-child {
              font-size: 18px;
              margin-left: 13px;
              width: 30%;
              text-align: left;
              color: rgba(35, 255, 252, 1);
            }
          }
        }

        .time.margin {
          margin: 30px auto 30px;
        }
      }
    }

    .bugs {
      margin-bottom: 25px;
    }

    .tab.type {
      // margin-left:-0px;
    }
  }
}
</style>