<template>
  <div id="data-project">
    <div class="project-select">
      <el-select v-model="currentProjectId" class="m-2 selectcontent" placeholder="Select" filterable
        @change="changeProject" style="background:transparent;line-height: 40px;color:#fff;font-size: 16px;">
        <el-option v-for="item in projectList" :key="item.value" :label="item.name" :value="item.id" />
      </el-select>
    </div>
    <div class="main">
      <div class="main-left">
        <div class="floor floor1">
          <div class="projecttotal">
            <module-name style="margin-left:42%; " moduleName="工程服务汇总信息"></module-name>
            <div class="year">
              <div class="tabgraph">
                <div class="value">{{ $data.projectTotal.n1 }}</div>
                <div class="label">年度总服务时长</div>
                <!-- <div class="label">服务时长</div> -->
                <div class="unit">（小时）</div>
              </div>
              <div class="tabgraph">
                <div class="value">{{ $data.projectTotal.n2 }}</div>
                <div class="label">年度总服务次数</div>
                <!-- <div class="label">服务次数</div> -->
                <div class="unit">（次）</div>
              </div>
              <!-- <div class="tabgraph">
                <div class="value">{{ $data.projectTotal.n3 || '--' }}</div>
                <div class="label">平均服务响 </div>
                <div class="label">应时长</div>
                <div class="unit">（小时）</div>
              </div> -->
            </div>
          </div>
          <div class="elevatortotal">
            <module-name style="margin-left:43%; " moduleName="电梯状态汇总信息"></module-name>
            <div class="year">
              <div class="tabgraph tabgraphred">
                <div class="value">{{ $data.elevatorTotal.n1 }} </div>
                <div class="label">总体故障次数</div>
                <div class="unit">（次）</div>
              </div>
              <div class="tabgraph tabgraphred">
                <div class="value">{{ $data.elevatorTotal.n2 }}</div>
                <div class="label">总停梯时长</div>
                <div class="unit">（小时）</div>
              </div>
              <div class="tabgraph tabgraphperple">
                <div class="value">{{ $data.elevatorTotal.n3 }}</div>
                <div class="label">总换件数量</div>
                <div class="unit">（件）</div>
              </div>
            </div>
          </div>
        </div>
        <div class="floor floor2">
          <div class="projecttab">
            <div class="title">
              总服务次数任务类型分布
            </div>
            <div class="content">
              <!-- <div id="floor2-1" style="width: 280px; height: 280px;margin-left:15px;"> -->
              <pie :pieId="'flool2-1'" :isPercent="false" :data='$data.flool2_1'
                style="width: 280px; height: 280px;margin-left:15px;">
              </pie>
              <!-- </div> -->
            </div>
          </div>
          <div class="projecttab">
            <div class="title">
              月度各项服务次数走势
            </div>
            <div class="content">
              <monthline :lineId="'flool2-2'" :data="$data.floor2_2.data" :areaColor="$data.floor2_2.areaColor"
                :lineColor="$data.floor2_2.lineColor" style="width: 280px; height: 280px;margin-left:15px;"></monthline>
            </div>
          </div>
          <div class="projecttab">
            <div class="title">
              故障原因分析
            </div>
            <div class="content">
              <!-- <div id="flool2-3" style="width: 280px; height: 280px;margin-left:15px;"></div> -->
              <pie :pieId="'flool2-3'" :data='$data.flool2_3' style="width: 280px; height: 280px;margin-left:15px;">
              </pie>
            </div>
          </div>
          <div class="projecttab">
            <div class="title">
              作业类型分布
            </div>
            <div class="content">
              <!-- <div id="flool2-4"  style="width: 280px; height: 280px;margin-left:15px;"></div> -->
              <pie :pieId="'flool2-4'" :data='$data.flool2_4' style="width: 280px; height: 280px;margin-left:15px;">
              </pie>
            </div>
          </div>
          <div class="projecttab">
            <div class="title">
              故障走势（月）
            </div>
            <div class="content">
              <!-- <div id="flool2-5" style="width: 280px; height: 280px;margin-left:15px;"></div> -->
              <monthline :lineId="'flool2-5'" :data="$data.floor2_5.data" :areaColor="$data.floor2_5.areaColor"
                :lineColor="$data.floor2_5.lineColor" style="width: 280px; height: 280px;margin-left:15px;"></monthline>
            </div>
          </div>
        </div>
        <div class="floor floor3">
          <div class="projecttab">
            <div class="title">
              总服务时长任务类型分布
            </div>
            <div class="content">
              <!-- <div id="flool3-1" style="width: 280px; height: 280px;margin-left:15px;"></div> -->
              <pie :pieId="'flool3-1'" :isPercent="false" :data='$data.flool3_1'
                style="width: 280px; height: 280px;margin-left:15px;">
              </pie>
            </div>
          </div>
          <div class="projecttab">
            <div class="title">
              应急处置
            </div>
            <div class="content">
              <div id="flool3-2" style="width: 280px; height: 280px;margin-left:15px;">
                <div class="tab">
                  <div class="tab-left">
                    <div class="value">{{ $data.flool3_2.yingji }}</div>
                    <div class="name">应急处置数</div>
                  </div>
                  <div class="tab-right">
                    <div class="tab_">上月应急 <span>{{ $data.flool3_2.lastyinji }}</span></div>
                    <div class="tab_">全年应急 <span>{{ $data.flool3_2.yearyingji }}</span></div>
                  </div>
                </div>
                <div class="tab">
                  <div class="tab-left">
                    <div class="value">{{ $data.flool3_2.jiejiu }}</div>
                    <div class="name">解救被困人员数</div>
                  </div>
                  <div class="tab-right">
                    <div class="tab_">上月解救 <span>{{ $data.flool3_2.lastjiejiu }}</span></div>
                    <div class="tab_">全年解救 <span>{{ $data.flool3_2.yearjiejiu }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="projecttab">
            <div class="title">
              召修原因分布
            </div>
            <div class="content">
              <!-- <div id="flool3-3" style="width: 280px; height: 280px;margin-left:15px;"></div> -->
              <pie :pieId="'flool3-3'" :data='$data.flool3_3' style="width: 280px; height: 280px;margin-left:15px;">
              </pie>
            </div>
          </div>
          <div class="projecttab">
            <div class="title">
              零件类型分布
            </div>
            <div class="content">
              <!-- <div id="flool3-4" style="width: 280px; height: 280px;margin-left:15px;"></div> -->
              <!-- <pie :pieId="'flool3-4'" :data='$data.flool3_4' style="width: 280px; height: 280px;margin-left:15px;">
              </pie> -->
              <graph :pieId="'flool3-4'" :data='$data.flool3_4' style="width: 280px; height: 280px;margin-left:15px;">
              </graph>

            </div>
          </div>
          <div class="projecttab">
            <div class="title">
              月度停梯时长走势
            </div>
            <div class="content">
              <!-- <div id="flool3-5" style="width: 280px; height: 280px;margin-left:15px;"></div> -->
              <monthline :lineId="'flool3-5'" :data="$data.floor3_5.data" :areaColor="$data.floor3_5.areaColor"
                :lineColor="$data.floor3_5.lineColor" style="width: 280px; height: 280px;margin-left:15px;"></monthline>
            </div>
          </div>
        </div>
      </div>
      <div class="main-right">
        <div class="list">
          <div class="title">
            <span>年度总服务时长项目前20</span>
            <span>（小时）</span>
          </div>
          <div class="scrolltab">
            <el-scrollbar height="100%">
              <div class="item" v-for="(item, index) in $data.list1" :key="index">
                <div class="before">
                  <span class="index">{{ index + 1 }}</span>
                  <span class="name">.{{ item.name }}</span>
                </div>
                <span class="value">{{ item.data }}</span>
              </div>
            </el-scrollbar>
          </div>
        </div>
        <div class="list">
          <div class="title"> <span>应急处置响应（到场）时长项目前20</span>
            <span>（小时）</span>
          </div>
          <div class="scrolltab">
            <el-scrollbar height="100%">
              <div class="item" v-for="(item, index) in $data.list2" :key="index">
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
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import graph from './graph.vue'
import { reactive, ref, onMounted } from 'vue'
import { getProjectList } from '@/api/module/customerBI'
import { getDataApi } from '@/api/module/dataPlatform'
import pie from './pie.vue'
import monthline from './monthline.vue'
import ProjectTabModule from '../common/project-tab-module.vue';
let currentProjectId = ref('')
const projectList = reactive([

])
const tableList = new Array(20).fill(0).map(item => {
  return { name: '江津双福项目', data: '1000' }
})
const initEacharts = () => {
  {
    //总服务次数任务类型分布
    // let colors = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.desc]
    // }, [])
    let colors = ['#FED52F', '#23FFFC', '#009AFC', '#B149FF', '#FF6882']
    // let legens = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.name]
    // }, [])
    let legens = ['类型1', '类型2', '类型3', '类型4', '类型5']
    // let xData = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, { name: pre.name, value: pre.data.slice(0, -1) }]
    // }, [])
    const title = '总服务次数任务类型分布'
    let xData = [
      {
        name: '类型1',
        value: 22,
      },
      {
        name: '类型2',
        value: 22,
      },
      {
        name: '类型3',
        value: 22,
      },
      {
        name: '类型4',
        value: 22,
      },
      {
        name: '类型5',
        value: 22,
      },

    ]
    const option = {
      tooltip: {
        trigger: "item",
        formatter: ' {a0} <br /> {b0}: {c0}% '
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
          name: title,
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
          data: xData,
        },
      ],
    };

    var myChart = echarts.init(
      document.getElementById("floor2-1")
    );
    // 绘制图表
    myChart.setOption(option);
  }
  {
    //月度各项服务次数走势
    // let xLabel = data.data['02'].data.reduce((cur, pre) => {
    //   return [...cur, pre.name]
    // }, [])
    let xLabel = new Array(12).fill(0).map((item, index) => index + 1)
    // let yLabel = data.data['02'].data.reduce((cur, pre) => {
    //   return [...cur, pre.data]
    // }, [])

    let yLabel = new Array(12).fill(0).map((item, index) => Math.random() * 30)
    const option = {
      tooltip: {
        trigger: "item",
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
            interval: 3,
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

    var myChart = echarts.init(
      document.getElementById("flool2-2")
    );
    // 绘制图表
    myChart.setOption(option);
  }
  {
    //故障类型分布
    // let colors = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.desc]
    // }, [])
    let colors = ['#FED52F', '#23FFFC', '#009AFC', '#B149FF', '#FF6882']
    // let legens = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.name]
    // }, [])
    let legens = ['类型1', '类型2', '类型3', '类型4', '类型5']
    // let xData = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, { name: pre.name, value: pre.data.slice(0, -1) }]
    // }, [])
    const title = '故障类型分布'
    let xData = [
      {
        name: '类型1',
        value: 22,
      },
      {
        name: '类型2',
        value: 22,
      },
      {
        name: '类型3',
        value: 22,
      },
      {
        name: '类型4',
        value: 22,
      },
      {
        name: '类型5',
        value: 22,
      },

    ]
    const option = {
      tooltip: {
        trigger: "item",
        formatter: ' {a0} <br /> {b0}: {c0}% '
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
          name: title,
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
          data: xData,
        },
      ],
    };

    var myChart = echarts.init(
      document.getElementById("flool2-3")
    );
    // 绘制图表
    myChart.setOption(option);
  }
  {
    //作业类型分布
    // let colors = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.desc]
    // }, [])
    let colors = ['#FED52F', '#23FFFC', '#009AFC', '#B149FF', '#FF6882']
    // let legens = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.name]
    // }, [])
    let legens = ['类型1', '类型2', '类型3', '类型4', '类型5']
    // let xData = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, { name: pre.name, value: pre.data.slice(0, -1) }]
    // }, [])
    const title = '作业类型分布'
    let xData = [
      {
        name: '类型1',
        value: 22,
      },
      {
        name: '类型2',
        value: 22,
      },
      {
        name: '类型3',
        value: 22,
      },
      {
        name: '类型4',
        value: 22,
      },
      {
        name: '类型5',
        value: 22,
      },

    ]
    const option = {
      tooltip: {
        trigger: "item",
        formatter: ' {a0} <br /> {b0}: {c0}% '
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
          name: title,
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
          data: xData,
        },
      ],
    };

    var myChart = echarts.init(
      document.getElementById("flool2-4")
    );
    // 绘制图表
    myChart.setOption(option);
  }
  {
    //月度故障率走势
    // let xLabel = data.data['02'].data.reduce((cur, pre) => {
    //   return [...cur, pre.name]
    // }, [])
    let xLabel = new Array(12).fill(0).map((item, index) => index + 1)
    // let yLabel = data.data['02'].data.reduce((cur, pre) => {
    //   return [...cur, pre.data]
    // }, [])

    let yLabel = new Array(12).fill(0).map((item, index) => Math.random() * 30)
    const option = {
      tooltip: {
        trigger: "item",
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
            interval: 3,
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
              color: "#FF6882", // 线条颜色
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
                    color: "#FF6882",
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

    var myChart = echarts.init(
      document.getElementById("flool2-5")
    );
    // 绘制图表
    myChart.setOption(option);
  }
  {
    //总服务时长任务类型分布
    // let colors = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.desc]
    // }, [])
    let colors = ['#FED52F', '#23FFFC', '#009AFC', '#B149FF', '#FF6882']
    // let legens = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.name]
    // }, [])
    let legens = ['类型1', '类型2', '类型3', '类型4', '类型5']
    // let xData = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, { name: pre.name, value: pre.data.slice(0, -1) }]
    // }, [])
    const title = '总服务时长任务类型分布'
    let xData = [
      {
        name: '类型1',
        value: 22,
      },
      {
        name: '类型2',
        value: 22,
      },
      {
        name: '类型3',
        value: 22,
      },
      {
        name: '类型4',
        value: 22,
      },
      {
        name: '类型5',
        value: 22,
      },

    ]
    const option = {
      tooltip: {
        trigger: "item",
        formatter: ' {a0} <br /> {b0}: {c0}% '
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
          name: title,
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
          data: xData,
        },
      ],
    };

    var myChart = echarts.init(
      document.getElementById("flool3-1")
    );
    // 绘制图表
    myChart.setOption(option);
  }
  {
    //召修原因分布
    // let colors = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.desc]
    // }, [])
    let colors = ['#FED52F', '#23FFFC', '#009AFC', '#B149FF', '#FF6882']
    // let legens = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.name]
    // }, [])
    let legens = ['类型1', '类型2', '类型3', '类型4', '类型5']
    // let xData = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, { name: pre.name, value: pre.data.slice(0, -1) }]
    // }, [])
    const title = '召修原因分布'
    let xData = [
      {
        name: '类型1',
        value: 22,
      },
      {
        name: '类型2',
        value: 22,
      },
      {
        name: '类型3',
        value: 22,
      },
      {
        name: '类型4',
        value: 22,
      },
      {
        name: '类型5',
        value: 22,
      },

    ]
    const option = {
      tooltip: {
        trigger: "item",
        formatter: ' {a0} <br /> {b0}: {c0}% '
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
          name: title,
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
          data: xData,
        },
      ],
    };

    var myChart = echarts.init(
      document.getElementById("flool3-3")
    );
    // 绘制图表
    myChart.setOption(option);
  }
  {
    //零件类型分布
    // let colors = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.desc]
    // }, [])
    let colors = ['#FED52F', '#23FFFC', '#009AFC', '#B149FF', '#FF6882']
    // let legens = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.name]
    // }, [])
    let legens = ['类型1', '类型2', '类型3', '类型4', '类型5']
    // let xData = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, { name: pre.name, value: pre.data.slice(0, -1) }]
    // }, [])
    const title = '零件类型分布'
    let xData = [
      {
        name: '类型1',
        value: 22,
      },
      {
        name: '类型2',
        value: 22,
      },
      {
        name: '类型3',
        value: 22,
      },
      {
        name: '类型4',
        value: 22,
      },
      {
        name: '类型5',
        value: 22,
      },

    ]
    const option = {
      tooltip: {
        trigger: "item",
        formatter: ' {a0} <br /> {b0}: {c0}% '
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
          name: title,
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
          data: xData,
        },
      ],
    };

    var myChart = echarts.init(
      document.getElementById("flool3-4")
    );
    // 绘制图表
    myChart.setOption(option);
  }
  {
    //月度停梯时长走势
    // let xLabel = data.data['02'].data.reduce((cur, pre) => {
    //   return [...cur, pre.name]
    // }, [])
    let xLabel = new Array(12).fill(0).map((item, index) => index + 1)
    // let yLabel = data.data['02'].data.reduce((cur, pre) => {
    //   return [...cur, pre.data]
    // }, [])

    let yLabel = new Array(12).fill(0).map((item, index) => Math.random() * 30)
    const option = {
      tooltip: {
        trigger: "item",
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
            interval: 3,
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
              color: "#B149FF", // 线条颜色
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
                    color: "#B149FF",
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

    var myChart = echarts.init(
      document.getElementById("flool3-5")
    );
    // 绘制图表
    myChart.setOption(option);
  }
}
const changeProject = (e) => {

  getStaticData(e)
}
onMounted(() => {
  // initEacharts()
  getProjectList().then(res => {

    if (res.data.data?.length) {
      projectList.push(...res.data.data)
      currentProjectId.value = res.data.data[0].id
      if (currentProjectId.value) {
        getStaticData(currentProjectId.value)
      }
    }
  })
})
const $data = reactive({
  projectTotal: {
    n1: '',
    n2: '',
    n3: ''
  },
  flool2_1: [],
  elevatorTotal: {

    n1: '',
    n2: '',
    n3: ''
  },
  flool3_2: {
    yingji: '',
    jiejiu: '',
    lastyinji: '',
    yearyingji: '',
    lastjiejiu: '',
    yearjiejiu: ''
  },

  flool2_3: [],
  flool2_1: [],
  flool2_4: [],
  flool3_1: [],
  flool3_3: [],
  flool3_4: [],
  floor2_2: {
    data: [],
    lineColor: 'rgba(25,163,223,1)', //"#0c3b71", 016bb9 01234c
    areaColor: ["#016bb9", "#01234c"],
  },
  floor2_5: {
    data: [],
    lineColor: '#FF6882',
    areaColor: ["#FF6882", "#01234c"],
  },
  floor3_5: {
    data: [],
    lineColor: '#FF6882',
    areaColor: ["#FF6882", "#01234c"],
  },
  list1: [],
  list2: [],
})
const getStaticData = (projectid) => {
  getDataApi([{ freq: '03', dateTime: '', projectid: projectid, funcType: 'A035', count: '12', regionCode: '', iscurrentDate: '0' },
  { freq: '03', dateTime: '', projectid: projectid, funcType: 'A010', count: '12', regionCode: '', iscurrentDate: '0' }]).then(res => {
    if (res?.data?.data) {
      const data = res.data.data;
      $data.floor2_5.data = data.A035?.data
      $data.floor3_5.data = data.A010?.data
    }
  })//故障走势分布 ]
  getDataApi([
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A007', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A008', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A009', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A076', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A010', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A011', count: '', regionCode: '', iscurrentDate: '1' },

    { freq: '', dateTime: '', projectid: projectid, funcType: 'A114', count: '', regionCode: '', iscurrentDate: '1' }, //总服务次数任务类型分布
    { freq: '03', dateTime: '', projectid: projectid, funcType: 'A079', count: '12', regionCode: '', iscurrentDate: '0' }, //月度各服务次数走势
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A020', count: '', regionCode: '', iscurrentDate: '1' }, //故障类型分布
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A082', count: '', regionCode: '', iscurrentDate: '1' }, //作业类型分布


    { freq: '', dateTime: '', projectid: projectid, funcType: 'A113', count: '', regionCode: '', iscurrentDate: '1' }, //总服务时长任务类型分布
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A013', count: '', regionCode: '', iscurrentDate: '1' }, //应急处置数统计
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A014', count: '', regionCode: '', iscurrentDate: '1' }, //上月应急处置数统计
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A015', count: '', regionCode: '', iscurrentDate: '1' }, //全年应急处置数统计
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A016', count: '', regionCode: '', iscurrentDate: '1' }, //解救被困人员数统计
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A017', count: '', regionCode: '', iscurrentDate: '1' }, //上月被困人员数统计
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A018', count: '', regionCode: '', iscurrentDate: '1' }, //全年被困人员数统计

    { freq: '', dateTime: '', projectid: projectid, funcType: 'A019', count: '', regionCode: '', iscurrentDate: '1' }, //电梯召修原因分布
    { freq: '03', dateTime: '', projectid: projectid, funcType: 'A074', count: '', regionCode: '', iscurrentDate: '1' }, //零件/换件类型分布
    { freq: '', dateTime: '', projectid: projectid, funcType: 'A073', count: '', regionCode: '', iscurrentDate: '1' }, //停梯时长走势 

    { freq: '', dateTime: '', projectid: '', funcType: 'A081', count: '', regionCode: '', iscurrentDate: '1' }, //年度总服务时长项目前20
    { freq: '', dateTime: '', projectid: '', funcType: 'A080', count: '', regionCode: '', iscurrentDate: '1' }, //应急处置响应时长项目前20




  ]).then(res => {
    if (res?.data?.data) {
      const data = res.data.data;
      $data.projectTotal.n1 = data.A007.data?.data
      $data.projectTotal.n2 = data.A008.data?.data
      $data.projectTotal.n3 = data.A076.data?.data

      $data.elevatorTotal.n1 = data.A009.data?.data
      $data.elevatorTotal.n2 = data.A010.data?.data
      $data.elevatorTotal.n3 = data.A011.data?.data
      $data.flool2_3 = data.A020.data?.data
      $data.flool2_1 = data.A114.data?.data || []
      $data.flool2_4 = data.A082.data?.data
      $data.flool3_1 = data.A113.data?.data || []
      $data.floor2_2.data = data.A079.data
      $data.flool3_3 = data.A019.data?.data
      $data.flool3_4 = data.A074.data?.data

      $data.flool3_2.yingji = data.A013.data?.data;
      $data.flool3_2.lastyinji = data.A014.data?.data;
      $data.flool3_2.yearyingji = data.A015.data?.data;
      $data.flool3_2.jiejiu = data.A016.data?.data;
      $data.flool3_2.lastjiejiu = data.A017.data?.data;
      $data.flool3_2.yearjiejiu = data.A018.data?.data;
      $data.list1.push(...data.A081.data?.data);
      $data.list2.push(...data.A080.data?.data);


    }
  })
}
</script>

<style scoped lang="scss">
#data-project {
  width: 100%;
  height: calc(100% - 70px);
  position: relative;

  .project-select {
    position: absolute;
    top: 2%;
    left: 33%;
    width: 201px;
    height: 34px;
    overflow: hidden;
    border: 1px solid rgba(0, 154, 252, 0.5);
    box-shadow: 0 0 3px 1px rgb(37, 169, 245);
    transform: skew(-25deg, 0deg);

    .selectcontent {
      width: 180px;
      height: 40px;
      transform: translateY(-2px) skew(25deg, 0deg);
      border: none;
      outline: none;
      background-color: transparent;

      :deep() .el-input__wrapper {
        background: transparent;
        border: none;
        font-weight: bold;
        margin-top: 2px;
        box-shadow: none !important;

      }

      :deep().el-select__icon {
        color: #29B6FF;
      }

      :deep() .el-input__inner {
        color: #29B6FF;
        font-size: 14px;
        font-weight: bold;
      }

      :deep() .el-select.el-input.is-focus.el-input__wrapper {
        box-shadow: none !important;
      }

      :deep() .el-input--small {
        --el-input-height: '';
      }
    }
  }



  .main {
    box-sizing: border-box;
    display: flex;

    & .main-left {
      width: 1595px;
      height: 993px;
      background: url('../../../public/images/dataplatform/bg/bg-project-l.png') no-repeat center/cover;

      .m-2 {
        padding-top: 23px;
        margin-left: 50%;
        transform: translateX(-50%);
      }

      .floor1 {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding-top: 30px;

        .projecttotal {
          width: 605px;
          margin-left: 26px;
          height: 234px;
          // background: pink;
          background: url('../../../public/images/dataplatform/bg/projecttotal.png') no-repeat;
          background-position: bottom left;
        }

        .elevatortotal {
          width: 775px;
          margin-right: 90px;
          height: 234px;
          // background: pink;
          background: url('../../../public/images/dataplatform/bg/projecttotal2.png') no-repeat;
          background-position: bottom left;
        }

        .projecttotal,
        .elevatortotal {
          .year {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;

            .tabgraph {
              width: 130px;
              text-align: center;
              height: 160px;

              background: url('../../../public/images/dataplatform/customer/withbg.png') no-repeat;
              background-position: bottom left;
              background-size: 130px 141px;

              .value {
                font-size: 24px;
                color: #29B6FF;
                font-weight: bold;
                margin-bottom: 10px;
              }

              .label {
                font-size: 16px;
                line-height: 22px;
                color: #fff;
              }

              .unit {
                font-size: 14px;
                color: #CCD3D6;

              }

            }

            .tabgraph.tabgraphred {
              background: url('../../../public/images/dataplatform/customer/bugbg.png') no-repeat;

              .value {
                color: #FF6882;
              }
            }

            .tabgraph.tabgraphperple {
              .value {
                color: #B149FF;
              }

              background: url('../../../public/images/dataplatform/customer/perplebg.png') no-repeat;
            }
          }
        }

      }

      .floor2,
      .floor3 {
        display: flex;
        justify-content: space-around;
        margin-top: 47px;

        .projecttab {
          width: 280px;
          height: 320px;
          // background-color: #fff;

          .title {
            color: #23FFFC;
            font-size: 14px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(0, 154, 252, .2);

          }
        }

        #flool3-2 {

          // background: pink;
          .tab {
            margin-top: 60px;
            display: flex;

            box-sizing: border-box;

            .tab-left,
            .tab-right {
              width: 50%;
              box-sizing: border-box;
              text-align: center;
            }

            .tab-right {
              border-left: 1px solid rgba(255, 255, 255, .3);

              .tab_ {
                color: #fff;
                font-size: 12px;
                margin-bottom: 12px;

                span {
                  color: #23FFFC;
                  font-size: 18px;

                }
              }
            }

            .tab-left {
              .value {
                color: #009AFC;
                font-size: 28px;
              }

              .name {
                font-size: 14px;
              }
            }
          }

          .tab:last-child {
            margin-top: 72px;
          }

        }
      }

      .floor3 {
        margin-top: 20px;
      }
    }

    & .main-right {
      width: 309px;
      height: 993px;
      background: url('../../../public/images/dataplatform/bg/bg-project-r.png') no-repeat;

      // background-position: 0 5px;
      .list {
        box-sizing: border-box;
        padding: 15px;

        .title {
          display: flex;
          justify-content: space-between;

          span {
            color: #23FFFC;
            font-size: 14px;
            padding-bottom: 20px;
            padding-top: 15px;
            border-bottom: 1px solid rgba(0, 154, 252, .2);
            white-space: nowrap;
          }

          span:last-child {
            color: #F0F0F0;
          }
        }

        .scrolltab {
          height: 400px;

          // background-color: #fff;
          .item {
            display: flex;
            justify-content: space-between;
            margin: 19px 0;
            color: #F0F0F0;
            font-size: 14px;

            .before {
              .name {}

              .index {}
            }

            .value {}
          }

          .item:nth-child(1),
          .item:nth-child(2),
          .item:nth-child(3) {
            .index {
              color: #23FFFC;
              font-size: 18px;
            }

          }
        }
      }
    }

  }


}
</style>