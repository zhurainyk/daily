<template>
  <div id="data-marketing">
    <div class="card-nums">
      <div class="project cartitem">
        <span class="bold">{{ projectNum }}</span>
        <span>{{ projectLabel }}</span>
      </div>
      <div class="elevator cartitem">
        <span class="bold">{{ dtNum }}</span>
        <span>{{ dtLabel }}</span>
      </div>
      <div class="organization cartitem">
        <span class="bold">{{ usedNum }}</span> <span>{{ usedLabel }}</span>
      </div>
    </div>

    <div class="main">
      <div class="graph">
        <div class="age">
          <module-name :moduleName="'电梯年龄分布'"></module-name>
          <div id="agegraph" style="width:415px;height:300px;margin:0 auto;"></div>
        </div>
        <div class="brand" style="margin-top:19px;">
          <module-name :moduleName="'品牌数量分布'"></module-name>
          <div id="brandgraph" style="width:415px;height:405px;margin:0 auto;"></div>
        </div>
      </div>
      <div class="echartsmap">
        <emap></emap>
      </div>
      <div class="graph">
        <div class="addproject">
          <module-name :moduleName="'每月新增项目数'"></module-name>
          <div id="projectgraph" style="width:415px;height:210px;margin:0 auto;"></div>
        </div>
        <div class="addelevator">
          <module-name :moduleName="'每月新增电梯数'"></module-name>
          <div id="elevatorgraph" style="width:415px;height:210px;margin:0 auto;"></div>
        </div>
        <div class="address">
          <module-name :moduleName="'电梯场所类型分布'"></module-name>
          <div id="typegraph" style="width:415px;height:280px;margin:0 auto;"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import emap from './emap.vue'
import * as echarts from 'echarts'
import { getMarketData, getDataApi } from '@/api/module/dataPlatform'
import { ref, computed, watch, onMounted, onActivated } from 'vue'
const projectNum = ref(123)
const dtNum = ref(123)
const usedNum = ref(123)
const projectLabel = ref('项目数')
const dtLabel = ref('电梯数')
const usedLabel = ref('使用单位数')
onMounted(() => {

  getMarketDataApi()
})

const initEcharts = (optionData = {}) => {
  //电梯年龄分布
  {
    var myChart = echarts.init((document.getElementById("agegraph")));

    // let ageValue = newVal?.data?.['02']?.data.reduce((cur, pre) => {
    //   return [...cur, pre.data]
    // }, [])
    let ageValue = optionData.ageValue || [40, 20, 30, 10, 60, 90]
    let ageData = optionData.ageData || ['1-3年', '4-6年', '7-9年', '10-12年', '12-15年', '超15年']
    let colors = optionData.ageColor || ['#FED52F', '#23FFFC', '#009AFC', '#B149FF', '#FF6882', '#FF6882']
    // let colors = newVal?.data?.['02']?.data.reduce((cur, pre) => {
    //   return [...cur, pre.desc]
    // }, [])

    var min = 0;
    var max = (Math.max(...ageValue) - Math.min(...ageValue)) < 50 ? Math.max(...ageValue) + 50 : Math.max(...ageValue) + 50;
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
              color: "rgba(255, 255, 255, .3)",
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
  {
    //品牌数量分布

    var myChartinterval = echarts.init(
      document.getElementById("brandgraph")
    );
    let brandXData = optionData.brandXData || ['西莱特', '威斯特', '迅达', '曼斯顿', '奥的斯', '西奥', '富士', '快意']

    // let yData = newVal?.data?.['01']?.data.reduce((cur, pre) => {
    //   return [...cur, pre.data]
    // }, [])
    let brandYData = optionData.brandYData || [102, 33, 45, 66, 25, 74, 19, 88]

    brandYData = brandYData.sort((a, b) => b - a);
    var min = 0;
    var max = Math.max(...brandYData);

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
          data: brandXData,
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
          data: brandYData,
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          yAxisIndex: 0,
          startValue: 0,
          endValue: 7
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
          barWidth: 16,
          data: brandYData,
        },
        {
          name: "背景",
          type: "bar",
          backgroundColor: "rgba(255,255,255,0)",
          barWidth: 20,
          barGap: "-150%",
          data: brandXData,
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
    if (brandYData.length > 8) {
      setInterval(() => {
        if (option.dataZoom[0].endValue == brandYData.length - 1) {
          option.dataZoom[0].endValue = 7;
          option.dataZoom[0].startValue = 0;
        } else {
          option.dataZoom[0].endValue += 1;
          option.dataZoom[0].startValue += 1;
        }
        myChartinterval.setOption(option);
      }, 3000)
    }

  }

  {
    //每月新增项目数
    var myChart = echarts.init((document.getElementById("projectgraph")))
    var projectXData = optionData.projectXData || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      projectYData = optionData.projectYData || [20, 90, 40, 50, 60, 20, 90, 40, 50, 60, 33, 44]
    var min = 0
    var max = Math.floor(Math.max(...projectYData) * 1.1)
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
        formatter(param) {
          // console.log(param);
          return `<h3 >${param[0].seriesName}</h3> <span>${param[0].name}月：</span> <span style='color:#000'>${param[0].data}  </span>`
        },
      },

      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "5%", // 边距
        // height: "85%", //图表高度
        containLabel: true,
        z: 22,
      },
      xAxis: [
        {
          type: "category",
          gridIndex: 0,
          data: projectXData,
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
          name: "每月新增项目数",
          type: "bar",
          barWidth: "26px",
          xAxisIndex: 0,
          yAxisIndex: 0,
          label: {
            // 在柱状图挨着显示文字
            show: true,
            position: "top",
            color: "#F0F0F0",
          },
          itemStyle: {
            normal: {
              barBorderRadius: [6, 6, 0, 0],

              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#009AFC"
                },

                {
                  offset: 1,
                  color: "#012254"
                }
              ])
            },
          },
          data: projectYData,
          zlevel: 11,
        },

      ],
    }
    myChart.setOption(option)
  }
  {
    //每月新增电梯数
    var myChart = echarts.init((document.getElementById("elevatorgraph")))
    var elevatorXData = optionData.elevatorXData || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      elevatorYData = optionData.elevatorYData || [20, 90, 40, 50, 60, 20, 90, 40, 50, 60, 33, 44]
    var min = 0
    var max = Math.floor(Math.max(...elevatorYData) * 1.1)
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
        formatter(param) {
          // console.log(param);
          return `<h3 >${param[0].seriesName}</h3> <span>${param[0].name}月：</span> <span style='color:#000'>${param[0].data}  </span>`
        },
      },

      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "5%", // 边距
        // height: "85%", //图表高度
        containLabel: true,
        z: 22,
      },
      xAxis: [
        {
          type: "category",
          gridIndex: 0,
          data: elevatorXData,
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
          name: "每月新增项目数",
          type: "bar",
          barWidth: "26px",
          xAxisIndex: 0,
          yAxisIndex: 0,
          label: {
            // 在柱状图挨着显示文字
            show: true,
            position: "top",
            color: "#F0F0F0",
          },
          itemStyle: {
            normal: {
              barBorderRadius: [6, 6, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#009AFC"
                },
                {
                  offset: 1,
                  color: "#012254"
                }
              ])
            },
          },
          data: elevatorYData,
          zlevel: 11,
        },
      ],
    }
    myChart.setOption(option)
  }

  {
    //电梯场所分类
    var myChart = echarts.init((document.getElementById("typegraph")));
    var typeXData = optionData.typeXData || [
      "住宅",
      "其他",
      "特定",
      "商场超时",
      "办公区域",
      "宾馆饭店",
      "医院",
      "政府机构",
      "学习",
      "文体娱乐馆",
      "交通场所",
    ],
      typeYData = optionData.typeYData || [
        4310, 2000, 4000, 6000, 8000, 10000, 333, 4444, 5555, 6667, 2234,
      ];
    var min = 0;
    var max = Math.floor(Math.max(...typeYData) * (1.1))
    const option = {
      // backgroundColor: "#111c4e",
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
        left: "0%",
        right: "5%",
        bottom: "12%",
        top: "5%",
        height: "87%",
        containLabel: true,
        z: 22,
      },
      xAxis: [
        {
          type: "category",
          gridIndex: 0,
          data: typeXData,
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
          barWidth: "40%",
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: [6, 6, 0, 0],
            },
          },
          data: typeYData,
          zlevel: 11,
        },
      ],
    };
    myChart.setOption(option);
  }
}
const getMarketDataApi = () => {
  getDataApi([
    { freq: '', dateTime: '', projectid: '', funcType: 'A001', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A002', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A003', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A004', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A005', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A006', count: '', regionCode: '', iscurrentDate: '1' },
  ]).then(res => {
    if (res?.data?.data) {
      const data = res.data.data;
      const dataAll = {
        ageData: data.A002.data.data.reduce((pre, cur) => {
          return [...pre, cur.name]
        }, []),                                                            //对象 {data:[],id:'',name:'电梯品牌分布'}
        ageValue: data.A002.data.data.reduce((pre, cur) => {
          return [...pre, cur.data]
        }, []),                                                            //对象 {data:[],id:'',name:'电梯品牌分布'}
        ageColor: data.A002.data.data.reduce((pre, cur) => {
          return [...pre, cur.desc]
        }, []),                                                            //对象 {data:[],id:'',name:'电梯品牌分布'}
        brandXData: data.A001.data.data.reduce((pre, cur) => {
          return [...pre, cur.name]
        }, []),                                                            //对象 {data:[],id:'',name:'电梯品牌分布'}
        brandYData: data.A001.data.data.reduce((pre, cur) => {
          return [...pre, cur.data]
        }, []),                                                            //对象 {data:[],id:'',name:'电梯品牌分布'}
        typeXData: data.A003.data.data.reduce((pre, cur) => {
          return [...pre, cur.name]
        }, []),                                                            //对象 {data:[],id:'',name:'电梯品牌分布'}
        typeYData: data.A003.data.data.reduce((pre, cur) => {
          return [...pre, cur.data]
        }, []),                                                            //对象 {data:[],id:'',name:'电梯品牌分布'}
        //对象 {data:[],id:'',name:'电梯品牌分布'}


      }
      projectNum.value = data.A004.data.data
      projectLabel.value = data.A004.data.name

      dtNum.value = data.A005.data.data
      usedNum.value = data.A006.data.data

      dtLabel.value = data.A005.data.name
      usedLabel.value = data.A006.data.name
      // initEcharts(dataAll)
    }
  })
  getDataApi([
    { freq: '', dateTime: '', projectid: '', funcType: 'A001', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '03', dateTime: '', projectid: '', funcType: 'A004', count: '12', regionCode: '', iscurrentDate: '0' },
    { freq: '03', dateTime: '', projectid: '', funcType: 'A005', count: '12', regionCode: '', iscurrentDate: '0' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A003', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A002', count: '', regionCode: '', iscurrentDate: '1' },

  ]).then(res => {
    if (res?.data?.data) {
      const data = res.data.data;
      const dataAll = {
        brandXData: data.A001.data.data.reduce((pre, cur) => {
          return [...pre, cur.name]
        }, []),                                                            //对象 {data:[],id:'',name:'电梯品牌分布'}
        brandYData: data.A001.data.data.reduce((pre, cur) => {
          return [...pre, cur.data]
        }, []),
        projectXData: data.A004?.data.reduce((pre, cur) => {
          return [...pre, cur.month]
        }, []),
        projectYData: data.A004?.data.reduce((pre, cur) => {
          return [...pre, cur.data]
        }, []),
        elevatorXData: data.A005?.data.reduce((pre, cur) => {
          return [...pre, cur.month]
        }, []),
        elevatorYData: data.A005?.data.reduce((pre, cur) => {
          return [...pre, cur.data]
        }, []),
        typeXData: data.A003?.data.data.reduce((pre, cur) => {
          return [...pre, cur.name]
        }, []),
        typeYData: data.A003?.data.data.reduce((pre, cur) => {
          return [...pre, cur.data]
        }, []),
        ageData: data.A002.data.data.reduce((pre, cur) => {
          return [...pre, cur.name]
        }, []),                                                            //对象 {data:[],id:'',name:'电梯品牌分布'}
        ageValue: data.A002.data.data.reduce((pre, cur) => {
          return [...pre, cur.data]
        }, []),                                                            //对象 {data:[],id:'',name:'电梯品牌分布'}
        ageColor: data.A002.data.data.reduce((pre, cur) => {
          return [...pre, cur.desc]
        }, []),

      }
      console.log({ dataAll })
      initEcharts(dataAll)
    }
  })
  return

}

</script>

<style lang="scss" scoped>
#data-marketing {
  width: 100%;
  height: calc(100% - 70px);
  box-sizing: border-box;
  // padding: 0 15px 17px 13px;

  .card-nums {
    display: flex;
    justify-content: space-between;
    width: 40%;
    margin: 0 auto;
    margin-top: 23px;

    .cartitem {
      width: 241px;
      height: 56px;
      line-height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 20px;

      span:first-child {
        font-family: PingFang-SC-Heavy;
        font-size: 24px;
        display: inline-block;
        max-width: 140px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      span:last-child {
        font-family: SourceHanSansCN-Regular;
        font-size: 16px;
      }
    }

    .project {
      background: url("../../../public/images/dataplatform/bg/bg-green.png") no-repeat 100%/100%;

      span {
        color: #23fffc;
      }
    }

    .elevator {
      background: url("../../../public/images/dataplatform/bg/bg-blue.png") no-repeat 100%/100%;

      span {
        color: #29b6ff;
      }
    }

    .organization {
      background: url("../../../public/images/dataplatform/bg/bg-yellow.png") no-repeat 100%/100%;

      span {
        color: #fed52f;
      }
    }
  }

  .main {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    justify-content: center;

    // align-items: ;

    .echartsmap {

      width: 880px;
      height: 980px;

      margin: auto;

      box-sizing: border-box;
      // background-color: #fff;
    }

    .graph {
      width: 505px;
      height: 811px;
      background: url("../../../public/images/dataplatform/bg/marketingbg.png") no-repeat 100%/100%;
    }
  }
}
</style>