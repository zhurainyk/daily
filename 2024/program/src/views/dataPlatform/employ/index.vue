<template>
  <div id="data-employ">

    <div class="total">
      <div class="tab">
        <module-name :moduleName="'工程经理'"></module-name>
        <div class="desc">
          <span class="label">工程经理总数</span>
          <span class="value">{{ $data.managers }}</span>
        </div>
      </div>
      <div class="tab tab2">
        <module-name :moduleName="'维保技师'"></module-name>
        <div class="desc">
          <span class="label">维保技师总数</span>
          <span class="value">{{ $data.telers }}</span>
        </div>
      </div>

    </div>
    <div class="flex">
      <div class="manager">
        <div class="card">
          <div class="common-title">
            <span>工程经理排行前20</span>
            <span>（电梯数）</span>
          </div>
          <div class="scrolltab">
            <el-scrollbar height="100%">
              <div class="item" v-for="(item, index) in $data.projectManagers" :key="index">
                <div class="before">
                  <span class="index">{{ index + 1 }}</span>
                  <span class="name">.{{ item.name }}</span>
                </div>
                <span class="value">{{ item.data }}</span>
              </div>
            </el-scrollbar>
          </div>
        </div>
        <div class="card">
          <div class="common-title">
            <span>工程人员排行前20</span>
            <span>（电梯数）</span>
          </div>
          <div class="scrolltab">
            <el-scrollbar height="100%">
              <div class="item" v-for="(item, index) in $data.projectPerson" :key="index">
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
      <div class="engineer">
        <div class="floor">
          <div class="card">
            <div class="common-title">
              <span>技能等级分布</span>
              <span> </span>
            </div>
            <div id="floor1" style="width:370px;height:300px;margin:0 auto">
            </div>
          </div>
          <div class="card">
            <div class="common-title">
              <span>服务时长员工前20</span>
              <span>（小时）</span>
              <span class="label">服务类型</span>
            </div>
            <div class="scrolltab">
              <el-scrollbar height="100%">
                <div class="item" v-for="(item, index) in $data.serviceTime" :key="index">
                  <div class="before">
                    <span class="index">{{ index + 1 }}</span>
                    <span class="name">.{{ item.name }}</span>
                  </div>
                  <span class="value">{{ item.data }}</span>
                </div>
              </el-scrollbar>
            </div>
          </div>
          <div class="card">
            <div class="common-title">
              <span>一次验证通过率员工前20</span>
              <span>（通过率）</span>

            </div>
            <div class="scrolltab">
              <el-scrollbar height="100%">
                <div class="item" v-for="(item, index) in $data.onceCheckList" :key="index">
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
        <div class="floor">
          <div class="card">
            <div class="common-title">
              <span>技工等级证分布</span>
              <span> </span>
            </div>
            <div id="floor2" style="width:370px;height:300px;margin:0 auto">
            </div>
          </div>
          <div class="card">
            <div class="common-title">
              <span>服务次数员工前20</span>
              <span>（次）</span>
              <span class="label">服务类型</span>
            </div>
            <div class="scrolltab">
              <el-scrollbar height="100%">
                <div class="item" v-for="(item, index) in $data.serviceTimes" :key="index">
                  <div class="before">
                    <span class="index">{{ index + 1 }}</span>
                    <span class="name">.{{ item.name }}</span>
                  </div>
                  <span class="value">{{ item.data }}</span>
                </div>
              </el-scrollbar>
            </div>
          </div>
          <div class="card">
            <div class="common-title">
              <span>两次验证通过率员工前20</span>
              <span>（通过率）</span>
            </div>
            <div class="scrolltab">
              <el-scrollbar height="100%">
                <div class="item" v-for="(item, index) in $data.twiceCheckList" :key="index">
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
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { reactive, onMounted } from 'vue'
import { getDataApi } from '@/api/module/dataPlatform'
const $data = reactive({
  managers: '',
  telers: '',
  projectManagers: [],
  projectPerson: [],
  floor1: [],
  serviceTime: [],
  serviceTimes: [],
  onceCheckList: [],
  twiceCheckList: []
})
// const tableList = new Array(20).fill(0).map(item => {
//   return {
//     name: '江津双福张山',
//     data: '999'
//   }
// })

onMounted(() => {

  getDataApi([
    { freq: '', dateTime: '', projectid: '', funcType: 'A021', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A023', count: '', regionCode: '', iscurrentDate: '1' },
    { freq: '', dateTime: '', projectid: '', funcType: 'A022', count: '', regionCode: '', iscurrentDate: '1' },//工程经理排行前20
    { freq: '', dateTime: '', projectid: '', funcType: 'A085', count: '', regionCode: '', iscurrentDate: '1' },//工程人员
    { freq: '', dateTime: '', projectid: '', funcType: 'A024', count: '', regionCode: '', iscurrentDate: '1' },//技能等级分布
    { freq: '', dateTime: '', projectid: '', funcType: 'A086', count: '', regionCode: '', iscurrentDate: '1' },//技能等级分布
    { freq: '', dateTime: '', projectid: '', funcType: 'A087', count: '', regionCode: '', iscurrentDate: '1' },//服务时长员工
    { freq: '', dateTime: '', projectid: '', funcType: 'A094', count: '', regionCode: '', iscurrentDate: '1' },//服务次数
    { freq: '', dateTime: '', projectid: '', funcType: 'A101', count: '', regionCode: '', iscurrentDate: '1' },//一次验收
    { freq: '', dateTime: '', projectid: '', funcType: 'A102', count: '', regionCode: '', iscurrentDate: '1' },//两次验收
  ]).then(res => {
    if (res?.data?.data) {
      const data = res.data.data
      $data.managers = data.A021.data.data
      $data.telers = data.A023.data.data
      $data.projectManagers = data.A022.data.data
      $data.projectPerson = data.A085.data.data
      $data.floor1 = data.A024.data.data;
      $data.serviceTime = data.A087.data.data
      $data.serviceTimes = data.A094.data.data
      $data.onceCheckList = data.A101.data.data
      $data.twiceCheckList = data.A102.data.data
      initEcharts()

    }
  })
})

const initEcharts = () => {
  {
    //总服务次数任务类型分布
    // let colors = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.desc]
    // }, [])
    let colors = $data.floor1.reduce((cur, pre) => {
      return [...cur, pre.desc]
    }, [])
    // let legens = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.name]
    // }, [])
    let legens = $data.floor1.reduce((cur, pre) => {
      return [...cur, pre.name]
    }, [])
    // let xData = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, { name: pre.name, value: pre.data.slice(0, -1) }]
    // }, [])
    const title = '技能等级分布'
    let xData = $data.floor1.reduce((cur, pre) => {
      return [...cur, { name: pre.name, value: pre.data == 0 ? '' : pre.data, count: pre.count || 0 }]
    }, [])

    const option = {
      tooltip: {
        trigger: "item",
        // formatter: ' {a0} <br /> {b0}: {c0}% '
        formatter: function (param) {
          console.log(param);
          return ` <span>${param.data.name} ：</span> <span style='color:#000'>${param.data.count}  </span>`;
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
      document.getElementById("floor1")
    );
    // 绘制图表
    myChart.setOption(option);
  }
  {
    //总服务次数任务类型分布
    // let colors = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.desc]
    // }, [])
    let colors = ['#FED52F', '#23FFFC', '#009AFC', '#B149FF', '#FF6882']
    // let legens = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, pre.name]
    // }, [])
    let legens = []
    // let legens = ['类型1', '类型2', '类型3', '类型4', '类型5']
    // let xData = data.data['04'].data.reduce((cur, pre) => {
    //   return [...cur, { name: pre.name, value: pre.data.slice(0, -1) }]
    // }, [])
    const title = '技工等级证分布'
    let xData = [
      // {
      //   name: '类型1',
      //   value: 22,
      // },
      // {
      //   name: '类型2',
      //   value: 22,
      // },
      // {
      //   name: '类型3',
      //   value: 22,
      // },
      // {
      //   name: '类型4',
      //   value: 22,
      // },
      // {
      //   name: '类型5',
      //   value: 22,
      // },

    ]
    const option = {
      tooltip: {
        trigger: "item",
        // formatter: ' {a0} <br /> {b0}: {c0}% '
        formatter: function (param) {
          console.log(param);
          return ` <span>${param.data.name} ：</span> <span style='color:#000'>${param.data.count}  </span>`;
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
      document.getElementById("floor2")
    );
    // 绘制图表
    myChart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
#data-employ {
  width: 100%;
  height: calc(100% - 70px);

  box-sizing: border-box;

  .total {
    display: flex;

    .tab {
      width: 475px;
      height: 125px;

      .desc {
        display: flex;
        justify-content: center;
        align-items: center;

        span.label {
          font-size: 16px;
          color: #fff;
        }

        span.value {
          font-size: 30px;
          margin-left: 26px;
          color: #009AFC;
        }

      }
    }

  }

  .common-title {
    display: flex;
    justify-content: space-between;
    color: #23FFFC;
    font-size: 14px;

    span:last-child {
      color: #F0F0F0;
      font-size: 12px;

    }

    padding:34px 0 25px 0;
    border-bottom:1px solid rgba(0, 154, 252, .2);
  }

  .scrolltab {
    height: calc(100% - 90px);

    .item {
      line-height: 45px;
      display: flex;
      justify-content: space-between;

      .value {
        margin-right: 20px;
      }

      .before {
        color: #F0F0F0;
        font-size: 14px;
      }
    }

    .item:nth-child(1),
    .item:nth-child(2),
    .item:nth-child(3) {
      .before .index {
        color: #23FFFC;
        font-size: 18px;
      }
    }
  }

  .flex {
    display: flex;
    justify-content: space-between;

    .manager {
      width: 462px;
      margin-left: 20px;

      .card {
        background: url('../../../public/images/dataplatform/bg/employbg-small.png') no-repeat;
        height: 415px;
        box-sizing: border-box;
        padding: 0 15px;

      }
    }

    .engineer {
      width: 1410px;
      height: 825px;
      background: url('../../../public/images/dataplatform/bg/employbg-big.png') no-repeat;
      margin-right: 20px;
      box-sizing: border-box;
      padding: 5px 7px;

      .floor {
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 409px;

        .card {
          width: 32%;
        }

        .common-title,
        .scrolltab {
          padding-right: 120px;
          box-sizing: border-box;
          position: relative;
        }

        .common-title .label {
          position: absolute;
          top: 28px;
          right: 20px;
          width: 80px;
          height: 26px;
          background: rgba(35, 154, 255, 0.2);
          border: 1px solid rgba(35, 154, 255, .3);
          color: #009AFC;
          text-align: center;
          line-height: 26px;
          font-size: 14px;
        }



      }
    }

  }

}
</style>