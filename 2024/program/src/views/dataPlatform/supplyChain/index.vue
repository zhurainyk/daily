<template>
  <div id="data-supplyChain">
    <div class="ableTotal">
      <module-name :moduleName="'能力汇总'"></module-name>
      <div class="tablist">
        <div class="tab">
          <span>供应商总数 </span>
          <span class="value">{{ $data.supplyChain }}</span>
        </div>
        <div class="tab">
          <span>零配件总数 </span>
          <span class="value">{{ $data.otherUnits }}</span>
        </div>
      </div>
      <div class="graphlist">
        <div class="item" v-for="(item, index) in graphList" :key="index">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="graph" style="width:500px;margin:0 auto;" :id="'supplygraph' + index"></div>
        </div>
      </div>
    </div>
    <div class="requireTotal">
      <module-name :moduleName="'需求响应汇总'"></module-name>
      <div class="content">
        <div class="tab">
          <span>响应需求总数</span>
          <span class="value">
            0
          </span>
        </div>
        <div id="requiregraph">

        </div>
        <div class="title">
          配件类型分类
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { getDataApi } from '@/api/module/dataPlatform'
import * as echarts from 'echarts'
const graphList = [
  {
    title: '零配件交付响应时长分类',
    data: {}
  },
  {
    title: '每月新增零配件数',
    data: {}
  },
  {
    title: '每月新增零配件供应商数',
    data: {}
  },

]
const titleList = ['零配件交付响应时长分类', '每月新增零配件数', '每月新增零配件供应商数']
onMounted(() => {
  // initEcharts(graphList)
  getDataAPI()
})
const $data = reactive({
  supplyChain: '',
  otherUnits: '',
  graphList: []

})
const getDataAPI = () => {
  const promiseAll = Promise.all([getDataApi([{ freq: '03', dateTime: '', projectid: '', funcType: 'A032', count: '12', regionCode: '', iscurrentDate: '0' },
  { freq: '03', dateTime: '', projectid: '', funcType: 'A033', count: '12', regionCode: '', iscurrentDate: '0' },]), getDataApi([
    { freq: '', dateTime: '', projectid: '', funcType: 'A032', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A033', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A034', count: '', regionCode: '', iscurrentDate: '1' },

    { freq: '', dateTime: '', projectid: '', funcType: 'A074', count: '', regionCode: '', iscurrentDate: '1' },


  ])])
  promiseAll.then(allRes => {
    // console.log({ res })

    allRes.forEach((res, index) => {
      switch (index) {
        case 0: {
          if (res?.data?.data) {
            const data = res.data.data; // '32 供应商总数'
            // '33 零配件总数'

            $data.graphList[1] = data.A033.data
            $data.graphList[2] = data.A032.data
          }
          break;
        }
        case 1: {
          if (res?.data?.data) {
            const data = res.data.data;
            $data.supplyChain = data.A032.data.data
            $data.otherUnits = data.A033.data.data
            $data.graphList[0] = data.A034.data.data
          }
          break;
        }
      }

    })
    // console.log($data.graphList)
    initEcharts($data.graphList)
  })

}
const initEcharts = (graphList) => {
  console.log({ graphList })
  for (let i = 0; i < graphList.length; i++) {
    {
      const myChart = echarts.init((document.getElementById("supplygraph" + i)));
      let ageValue = graphList[i].reduce((pre, cur) => {
        return [...pre, cur.data]
      }, []) || [40, 20, 30, 10, 60, 90]
      let ageData = graphList[i].reduce((pre, cur) => {
        return [...pre, i == 0 ? cur.name : cur.month]
      }, []) || ['1-3年', '4-6年', '7-9年', '10-12年', '12-15年', '超15年']
      let colors = graphList[i].reduce((pre, cur) => {
        return [...pre, cur.desc || 'red']
      }, []) || ['#FED52F', '#23FFFC', '#009AFC', '#B149FF', '#FF6882', '#FF6882']
      var min = 0;
      var max = (Math.max(...ageValue) - Math.min(...ageValue)) < 50 ? Math.max(...ageValue) + 10 : Math.max(...ageValue) + 10;
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
            data: ageData,
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
            name: titleList[i],
            type: "bar",
            barWidth: "22%",
            xAxisIndex: 0,
            yAxisIndex: 0,

            itemStyle: {
              normal: {
                barBorderRadius: [6, 6, 0, 0],
                // color: function (params) {

                //   return colors[params.dataIndex];
                // },
                //渐变色
                color: i ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#009AFC"
                  },

                  {
                    offset: 1,
                    color: "#012254"
                  }

                ])
                  :
                  function (params) {

                    return colors[params.dataIndex];
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
  }
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
            // { value: 0, name: "维保技工" },
            // { value: 0, name: "维修技师" },
            // { value: 0, name: "电梯工程师" },
            // { value: 0, name: "电梯专家" },
          ],
        },
      ],
    };

    var myChart = echarts.init(document.getElementById("requiregraph"));
    // 绘制图表
    myChart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
#data-supplyChain {
  width: 100%;
  height: calc(100% - 70px);
  box-sizing: border-box;

  .ableTotal {
    box-sizing: border-box;
    padding-top: 2px;
    width: 1851px;
    height: 472px;
    background: url('../../../public/images/dataplatform/bg/supplyChainbg1.png') no-repeat;
    background-size: 1851px 472px;
    margin-left: 30px;

    .tablist {
      display: flex;
      margin-left: 100px;
      margin-top: 20px;
      margin-bottom: 17px;

      .tab {
        margin-right: 180px;

        span {
          color: #fff;
          font-size: 14px;
        }

        .value {
          color: #009AFC;
          font-size: 28px;
        }
      }
    }

    .graphlist {
      width: 100%;
      display: flex;
      justify-content: space-around;

      .item {
        width: 572px;


        .title {
          width: 100%;
          padding: 7px 0;
          color: #23FFFC;
          font-size: 14px;
          border-bottom: 1px solid rgba(0, 154, 252, .2);
        }

        .graph {
          margin-top: 5px;
          width: 100%;
          height: 300px;

          // background-color: #fff;
        }
      }
    }
  }

  .requireTotal {
    box-sizing: border-box;
    padding-top: 2px;
    width: 419px;
    height: 472px;
    background: url('../../../public/images/dataplatform/bg/supplyChainbg2.png') no-repeat center/cover;
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

      #requiregraph {
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