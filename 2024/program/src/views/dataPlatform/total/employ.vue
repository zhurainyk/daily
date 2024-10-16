<template>
  <div id="employ">
    <moduleName :moduleName="module"></moduleName>
    <div class="employnums">
      <div class="managers">
        <span>{{ projectTLLabel }}</span>
        <span>{{ projectTLNum }}</span>
      </div>
      <div class="managers">
        <span>{{ pairTLLabel }}</span>
        <span>{{ pairTLNum }}</span>
      </div>
    </div>
    <div class="table">
      <div class="title">
        <div class="manager-range">
          <span>{{ rangeTo20 }}</span>
          <span>{{ rangeToUnit }}</span>
        </div>
        <div class="te-level">
          <span>{{ teLevel }}</span>
          <span></span>
        </div>
      </div>
      <div class="main">
        <div class="table-list">
          <el-scrollbar height="100%">
            <div class="item" v-for="(item, index) in tableList" :key="index">
              <div class="before">
                <span class="index">{{ item.id + 1 }}</span>
                <span class="name">.{{ item.name }}</span>
              </div>
              <span class="value">{{ item.data }}</span>
            </div>
          </el-scrollbar>
        </div>
        <div class="pie">
          <div class="piepie" id="piepie" ref="piepie" style="width: 280px; height: 250px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { reactive, ref, onMounted, computed, watch } from "vue";
import * as echarts from "echarts";
export default {
  name: "employ",
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const module = computed(() => {
      return '员工'
    })
    let projectTLLabel = computed(() => {
      return props.data?.['01']?.name
    })

    let projectTLNum = computed(() => {
      return props.data?.['01']?.data
    })
    let pairTLLabel = computed(() => {
      return props.data?.['02']?.name
    })
    let pairTLNum = computed(() => {
      return props.data?.['02']?.data
    })
    let rangeTo20 = computed(() => {
      return props.data?.['03']?.name
    })
    let rangeToUnit = computed(() => {
      return props.data?.['03']?.desc
    })
    let teLevel = computed(() => {
      return props.data?.['04']?.name
    })


    const tableList = computed(() => {

      return props.data?.['03']?.data.map((item, index) => {
        item.id = index;
        return item
      })
    })
    let piepie = ref(null);
    watch(() => props.data, (newVal) => {
      const allData = newVal?.['04']?.data || []
      if (allData) {
        const colors = allData.reduce((cur, pre) => {
          return [...cur, pre.desc]
        }, [])
        const xData = allData.reduce((cur, pre) => {
          return [...cur, pre.name]
        }, [])
        const yData = allData.reduce((cur, pre) => {
          return [...cur, {
            name: pre.name,
            value: pre.data == 0 ? '' : pre.data,
            count: pre.count
          }]
        }, [])
        if (yData.every(x => x.value == 0)) {
          yData.map(x => (x.value = 0))
        }
        const option = {
          tooltip: {
            trigger: "item",
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
            itemGap: 15, //图例之间的间距
            data: xData,
            icon: "circle",
            top: "5%", //距离顶部的位置
            left: '5%',
            //  left:'',
            x: "left", //图例在x方向的位置
            y: "top", //图例在y方向的位置
            textStyle: {
              color: "#C0DFFF",
              fontStyle: "normal",
            },
          },
          series: [
            {
              name: "技能等级分布",
              type: "pie",
              radius: ["30%", "53%"],
              avoidLabelOverlap: false,
              // label: {
              //   show: false,
              //   position: "center",
              // },
              center: ["50%", "65%"],
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
              data: yData,
            },
          ],
        };

        var myChart = echarts.init(
          document.getElementById("piepie") as HTMLElement
        );
        (document.getElementById('piepie') as HTMLElement).setAttribute('_echarts_instance_', '')
        console.log('绘制图表——饼图')
        // 绘制图表
        myChart.setOption(option);
      }
    }, {
      deep: true
    })
    onMounted(() => {
      return
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
          data: ["维保技工", "维修技师", "电梯工程师", "电梯专家"],
          icon: "circle",
          top: "5%", //距离顶部的位置
          //  left:'',
          x: "left", //图例在x方向的位置
          y: "top", //图例在y方向的位置
          textStyle: {
            color: "#C0DFFF",
            fontStyle: "normal",
          },
        },
        series: [
          {
            name: "技能等级分布",
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
              { value: 22, name: "维保技工" },
              { value: 33, name: "维修技师" },
              { value: 44, name: "电梯工程师" },
              { value: 12, name: "电梯专家" },
            ],
          },
        ],
      };

      var myChart = echarts.init(
        document.getElementById("piepie") as HTMLElement
      );
      (document.getElementById('piepie') as HTMLElement).setAttribute('_echarts_instance_', '')
      // 绘制图表
      myChart.setOption(option);
    });
    return {
      projectTLLabel,
      projectTLNum,
      tableList,

      module,
      piepie,
      pairTLNum,
      pairTLLabel,
      rangeTo20,
      rangeToUnit,
      teLevel
    };
  },
};
</script>

<style lang='scss' scoped>
#employ {
  width: 614px;
  margin-left: 4px;
  height: 401px;
  box-sizing: border-box;
  background: url("../../../public/images/dataplatform/bg/card-bottom.png") no-repeat center/cover;

  .modulename {
    font-family: SourceHanSansCN-Regular;
    position: relative;
    margin-top: 15px;
    margin-left: 40px;
    font-size: 16px;
    color: #f3fcff;
  }

  .modulename::before {
    content: "";
    position: absolute;
    top: 4px;
    left: -22px;
    width: 16px;
    height: 16px;
    background: url("../../../public/images/dataplatform/bg/pointcircle.png") no-repeat 100%/100%;
  }

  .employnums {
    display: flex;
    justify-content: space-between;

    .managers {
      width: 50%;
      text-align: center;
      margin-top: 12px;

      span:last-child {
        color: #009afc;
        font-size: 28px;
        font-family: MicrosoftYaHei;
        margin-left: 12px;
      }

      span:first-child {
        color: #fff;
        font-size: 14px;
      }
    }
  }

  .table {
    width: 100%;
    height: calc(100% - 120px);
    box-sizing: border-box;
    padding: 0 24px;
    margin-top: 22px;

    .title {
      display: flex;

      div {
        width: 50%;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(22, 99, 180, 0.2);
        display: flex;
        justify-content: space-between;

        span:first-child {
          color: #23fffc;
          font-size: 14px;
          font-family: MicrosoftYaHei;
        }

        span:last-child {
          font-family: MicrosoftYaHeiLight;
          color: #f0f0f0;
          font-size: 12px;
        }
      }

      div:last-child {
        margin-left: 36px;
      }
    }

    .main {
      display: flex;
      height: calc(100% - 32px);
      //   background: red;
      overflow: hidden;

      .table-list,
      .pie {
        width: 50%;
      }

      .table-list {
        .item {
          display: flex;
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

      .pie {
        .types {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;

          .item {
            width: 30%;
            margin: 5px 0;

            .circle {
              display: inline-block;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              margin-right: 6px;
            }

            .name {
              color: #c0dfff;
              font-size: 12px;
              vertical-align: top;
              line-height: 16px;
              font-family: MicrosoftYaHeiLight;
            }
          }
        }
      }
    }
  }
}
</style>