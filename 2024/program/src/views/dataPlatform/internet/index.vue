<template>
  <div id="data-internet">
    <div class="main-left">
      <div class="floor1">
        <div class="elevator-list">
          <div class="project-select">
            <el-select v-model="data.currentProjectId" class="m-2 selectcontent" placeholder="Select"
              style="background:transparent;line-height: 40px;color:#fff;font-size: 16px;"
              @change="methods.changeProject">
              <el-option v-for="item in data.projectList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </div>
          <module-name class="modulename" :moduleName="data.elevatorTotal"></module-name>
          <div class="list">
            <el-scrollbar height="100%">
              <div class="item" @click="methods.handleChange(item)" v-for="(item, index) in data.elevatorList"
                :class="{ actived: item.elevatorId == data.currentElevatorId }" :key="item.id" v-text="item.elevatorName">
              </div>
            </el-scrollbar>
          </div>
        </div>
        <div class="elevator-detail">
          <div class="state">
            <div class="animate">
              <div class="icon-state">
                <div class="online">在线</div>
                <div class="offline">离线</div>
                <div class="warning">预警</div>
                <div class="stop">停运</div>
                <div class="bug">故障</div>
                <div class="bugperson">困人</div>
              </div>
              <div class="elevtor-state">
                <div class="item" :class="getElevatorState(item).bg">
                  <div class="elevator">
                    <div class="name">
                      <div class="marquee">
                        <div class="marquee-wrap">
                          <div class="marquee-content " :style="{ color: getColor(item) }">
                            {{
                              item.elevatorName
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="elevatorstate">
                      <div class="elevatortype " style="width:70px;height:70px;" :class="getElevatorState(item).user">
                        <!-- 是否有人 优先级最高01 且是直梯01-->
                        <div v-if="item.priority == '01' || item.somebody_in == '01'" class="withperson"
                          :style="{ width: item.elevatorType == '02' ? '60px' : '40px' }"
                          :class="{ rect: item.elevatorType == '01' && item.priority == '01' ? true : false }">
                        </div>
                        <div class="detail" :style="{ color: getColor(item) }">
                          <div class="detailTitle">
                            <span class="name">楼层：</span>
                            <span class="value">{{ item.floor }}</span>
                          </div>
                          <div class="detailTitle">
                            <span class="name">方向：</span>
                            <span class="value">{{ item.running_direction == '01' ? '上行' :
                              item.running_direction == '02' ? '下行' : '无'
                            }}</span>
                          </div>
                          <div class="detailTitle">
                            <span class="name">是否有人：</span>
                            <span class="value">{{ item.somebody_in == '01' ? '是' : '否'
                            }}</span>
                          </div>
                          <div class="detailTitle">
                            <span class="name">开关门：</span>
                            <span class="value">{{ item.openDoor == '01' ? '开门' : '关门' }}</span>
                          </div>
                          <div class="detailTitle">
                            <span class="name">状态：</span>
                            <span class="value" :title="item.state_desc">{{ item.state_desc
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btnstate">
                    <!-- 电梯上下行箭头  elevatorType=1 才显示电梯箭头-->
                    <div class="updown" :style="{ visibility: item.elevatorType == 1 ? 'visible' : 'hidden' }">
                      <div class="up">
                        <!-- run 开启电梯上下行动画 -->
                        <i class="up-icon" :class="{ run: item.running_direction == '01' }"></i>
                      </div>
                      <div class="down">
                        <i class="down-icon  " :class="{ run: item.running_direction == '02' }"></i>
                      </div>
                    </div>
                    <!-- 电梯上下行箭头end -->

                    <!-- 电梯楼层显示&扶梯上下行箭头 -->
                    <div class="floor">
                      <!-- 楼层显示 -->
                      <div v-show="item.elevatorType == 1" class="num">{{ item.floor }}</div>
                      <!-- 扶梯上下行箭头 -->
                      <div v-show="item.elevatorType == 2" class="futi-updown">
                        <!-- run 开启扶梯动画 -->
                        <div class="futi-up " :class="{ run: item.running_direction == '01' }">
                        </div>
                        <div class="futi-down " :class="{ run: item.running_direction == '02' }">
                        </div>
                      </div>
                    </div>
                    <!-- 电梯楼层显示&扶梯上下行箭头 end-->
                    <!-- 电梯开关门  -->
                    <div v-show="item.elevatorType == 1" class="door">
                      <div class="door-l">
                        <!-- run 开启动画  openDoor-->
                        <i class="icon-door-l close" :class="{ run: item.openDoor == '01' }"></i>
                      </div>
                      <div class="door-r">
                        <i class="icon-door-r close" :class="{ run: item.openDoor == '01' }"></i>
                      </div>
                    </div>
                    <!-- 电梯开关门 end  -->
                    <!-- 物联网状态 00：未安装 01：已安装 02：在线 -->
                    <div class="iotState" :class="methods.getIotState(item)">
                    </div>
                    <!-- 摄像头状态 00：未安装 01：已安装 02：在线 -->
                    <div class="videoState" :class="methods.getVideoState(item)">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="video">
              <div class="player">
                <!-- <hlsplayer :show="data.videoShow" :url="data.videoUrl"></hlsplayer> -->
                <hlsplayer v-if="isHls" ref="newplayer" :url="videoUrl" :isLoading="isLoading"
                  style="width:391px;height:210px; ">
                </hlsplayer>
                <flvplayer v-if="isFlv" ref="newplayer" :url="videoUrl" style="width:391px;height:210px; "
                  :isLoading="isLoading">
                </flvplayer>
                <wssplayer v-if="!isHls && !isFlv && isWss" ref="newplayer" :url="videoUrl"
                  style="width:391px;height:210px; " :isLoading="isLoading"></wssplayer>
              </div>
            </div>
          </div>
          <div class="main-table">
            <div class="unitlist">
              <div class="title">品牌型号：{{ ui_brandName }} {{ ui_modelName }}</div>
              <div class="title">救援识别码：{{ db_rescueCode }} </div>
              <div class="title">电梯注册码：{{ db_registCode }} </div>
              <div class="connectlist">
                <div class="label">联系人：</div>
                <div class="connect">
                  <div class="item" v-if="user1 && phone1">
                    <span class="name">{{ user1 }}</span>
                    <span class="phone">{{ phone1 }}</span>
                  </div>
                  <div class="item" v-if="user2 && phone2">
                    <span class="name">{{ user2 }}</span>
                    <span class="phone">{{ phone2 }}</span>
                  </div>
                  <div class="item" v-if="user3 && phone3">
                    <span class="name">{{ user3 }}</span>
                    <span class="phone">{{ phone3 }}</span>
                  </div>
                  <div class="item" v-if="user4 && phone4">
                    <span class="name">{{ user4 }}</span>
                    <span class="phone">{{ phone4 }}</span>
                  </div>
                </div>
              </div>
              <div class="tabletitle">
                零部件列表
              </div>
              <div class="list" :style="{ height: user3 ? '275px' : '310px' }">
                <div class="tab header">
                  <div class="item">名称</div>
                  <div class="item">品牌型号</div>
                  <div class="item">数量 </div>
                  <div class="item">磨损度</div>
                </div>
                <el-scrollbar height="calc(100% - 30px)">
                  <div class="tab" v-for="(item, index) in  data.allList" :key="index">
                    <div class="item">{{ item.db_id_partInstanceName }}</div>
                    <div class="item" :title="item.ui_partBrandName + item.db_model"
                      style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{
                        item.ui_partBrandName
                      }}{{ item.db_model }} </div>
                    <div class="item">{{ item.db_defaultCount }}{{ item.ui_unitName }}</div>
                    <div class="item">{{ item.ui_lossDegreeDesc }} </div>
                  </div>
                </el-scrollbar>
              </div>
            </div>
            <div class="servicerecord">

              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="故障统计" name="first">
                  <div class="servicerecordpie">
                    <div id="servicerecordpie1">
                      <pie :pieId="'servicerecordpie1_'" :isPercent="false" :data='data.pie1'
                        style="width:100%; height: 90%; ">
                      </pie>
                      <div class="pie-title" style="text-align:center">故障原因分析</div>
                    </div>
                    <div id="servicerecordpie2">
                      <pie :pieId="'servicerecordpie2_'" :isPercent="false" :data='data.pie2'
                        style="width: 100%; height: 90%; ">
                      </pie>
                      <div class="pie-title" style="text-align:center">导致故障原因</div>
                    </div>
                  </div>

                </el-tab-pane>
                <el-tab-pane label="故障走势" name="second">
                  <div class="servicerecordgraph">
                    <div id="servicerecordgraph1">
                      <monthline :lineId="'servicerecordgraph1_'" :data="data.graph1" :interval="5" :xKey="'day'"
                        :tooltip="'日'" style="width: 244px; height: 180px; ">
                      </monthline>
                      <div class="graph-title">运行次数走势</div>
                    </div>

                    <div id="servicerecordgraph2">
                      <monthline :lineId="'servicerecordgraph2_'" :data="data.graph2" :interval="5" :xKey="'day'"
                        :tooltip="'日'" style="width: 244px; height: 180px; ">
                      </monthline>
                      <div class="graph-title">运行时长走势</div>
                    </div>
                    <div id="servicerecordgraph3">
                      <monthline :lineId="'servicerecordgraph3_'" :data="data.graph3" :interval="5" :xKey="'day'"
                        :tooltip="'日'" style="width: 244px; height: 180px; ">
                      </monthline>
                      <div class="graph-title">运行里程走势</div>
                    </div>
                    <div id="servicerecordgraph4">
                      <monthline :lineId="'servicerecordgraph4_'" :data="data.graph4" :interval="5" :xKey="'day'"
                        :tooltip="'日'" style="width: 244px; height: 180px; ">
                      </monthline>
                      <div class="graph-title">开门次数走势</div>
                    </div>
                  </div>

                </el-tab-pane>
                <el-tab-pane label="服务记录" name="third">
                  <div class="list">
                    <el-scrollbar height="100%">
                      <div class="tab" v-for="(item, index) in data.serviceList" :key="index">
                        <div class=" item  ">{{ item.ui_taskType }}</div>
                        <div class="item  " :title="item.db_id_taskName">{{ item.db_id_taskName }}</div>
                        <div class="item  ">{{ item.ui_taskStateDesc }}</div>

                        <div class="item  ">{{ item.ui_dealStarttime }}</div>
                      </div>
                    </el-scrollbar>

                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
      <div class="floor2">
        <div class="tab-bugtest">
          <module-name :moduleName="'故障检测汇总信息'"></module-name>
          <div class="content">
            <div class="value">
              {{ data.totalBugs }}
            </div>
            <div class="label">
              总报障次数
            </div>
            <div class="unit">
              {{ data.totalBugsdesc }}
            </div>
          </div>
        </div>
        <div class="tab-bugtype">
          <div class="pie" id="pie4"></div>
          <div class="title">
            故障分类
          </div>
        </div>
        <div class="tab-runtime20">
          <div class="title">
            <div class="tab">
              <span>总报障次数排行前20</span>
              <span class="unit">（次）</span>
            </div>
            <div class="tab">
              <span> </span>
              <span class="unit">（次）</span>
            </div>

            <div class="tab month">
              本月
            </div>
          </div>
          <div class="tablelist">
            <el-scrollbar height="calc(100% - 30px)">
              <div class="content">
                <div class="item" v-for="(item, index) in data.totalBugsList" :key="index">
                  <div class="name">
                    <span class="index">{{ index + 1 }}.</span>
                    {{ item.name }}
                  </div>
                  <div class="value">{{ item.data }}</div>
                </div>
              </div>
            </el-scrollbar>

          </div>
        </div>


      </div>
    </div>
    <div class="main-right">
      <div class="floor1">
        <module-name :moduleName="'安装汇总信息'"></module-name>
        <div class="content">
          <div class="left">
            <div class="title">
              <span class="label">已安装各类型设备数</span>
              <span></span>
            </div>
            <div class="typepie">
              <el-scrollbar height="100%">
                <div class="item" v-for="(item, index) in data.internetData" :key="index">
                  <div class="type">
                    <div class="value">{{ item.data.countTotal }}</div>
                    <div class="name">{{ item.name }}</div>
                  </div>
                  <div class="pie" style="width: 88px; height: 88px" :id="'vm-pie' + index"></div>
                </div>
              </el-scrollbar>
            </div>
          </div>
          <div class="right">
            <div class="title">
              <span class="label">昨日在线率项目排行前20</span>
              <span>（在线率）</span>

            </div>
            <div class="tablelist">
              <el-scrollbar height="calc(100%)">
                <div class="item" v-for="(item, index) in data.yestodayOnlineList" :key="index">
                  <div class="name">
                    <span class="index">{{ index + 1 }}.</span>
                    {{ item.name }}
                  </div>
                  <div class="value">{{ item.data }}</div>
                </div>

              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
      <div class="floor2">
        <div class="head">
          <module-name :moduleName="'运行汇总信息'"></module-name>
          <div class="month">
            本月
          </div>
        </div>
        <div class="tablist">
          <div class="item">
            <div class="value">{{ data.huizong.runTimes || 0 }}</div>
            <div class="name">总运行次数</div>
            <div class="unit">（万次）</div>
          </div>
          <div class="item">
            <div class="value">{{ data.huizong.runTime || 0 }}</div>
            <div class="name">总运行时长</div>
            <div class="unit">（小时）</div>
          </div>
          <div class="item">
            <div class="value">{{ data.huizong.runDistance || 0 }}</div>
            <div class="name">总运行里程</div>
            <div class="unit">（km）</div>
          </div>
          <div class="item">
            <div class="value">{{ data.huizong.openTimes || 0 }}</div>
            <div class="name">总开关门次数</div>
            <div class="unit">（次）</div>
          </div>
        </div>
        <div class="content">
          <div class="left">
            <div class="title">
              <span class="label">总运行次数排行前20</span>
              <span>（次）</span>
            </div>
            <div class="tablelist">
              <el-scrollbar height="calc(100%)">
                <div class="item" v-for="(item, index) in data.totalRunTimes" :key="index">
                  <div class="name">
                    <span class="index">{{ index + 1 }}.</span>
                    {{ item.name }}
                  </div>
                  <div class="value">{{ item.data }}</div>
                </div>
              </el-scrollbar>
            </div>
          </div>
          <div class="right">
            <div class="title">
              <span class="label">总运行时长排行前20</span>
              <span>（小时）</span>
            </div>
            <div class="tablelist">
              <el-scrollbar height="calc(100%)">
                <div class="item" v-for="(item, index) in data.totalRunTime" :key="index">
                  <div class="name">
                    <span class="index">{{ index + 1 }}.</span>
                    {{ item.name }}
                  </div>
                  <div class="value">{{ item.data }}</div>
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
import { selectByIdApi } from '@/api/module/elevator'
import { getTaskInfoOfOneElevDesc, getLatestSysCompPartState } from '@/api/module/dataPlatform'
import { reactive, ref, computed, watch, onMounted } from 'vue';
import { socketUrl as baseUrl } from '@/api/create-api'
import { getProjectList, getElevatorByProjectId } from '@/api/module/customerBI'
import { getVideoUrl } from '@/api/module/customerBI'
import { getDataApi } from '@/api/module/dataPlatform'
import hlsplayer from '../customerBi/hlsplayer.vue'
import flvplayer from '../customerBi/flvplayer.vue'
import wssplayer from '../customerBi/wssplayer.vue'
import pie from '../project/pie.vue'
import monthline from '../project/monthline.vue'
const activeName = ref('first')
const handleClick = () => { }

const isLoading = ref(true)
const isHls = ref(false)
const isFlv = ref(false)
let isWss = ref(false)
const videoUrl = ref('')
const newplayer = ref()
const talkUrl = ref('')
const data = reactive({
  currentProjectId: '',
  projectList: [

  ],
  elevatorList: [],
  token: '',
  elevatorTotal: '',
  currentElevatorId: '',
  videoUrl: '',
  videoShow: false,
  internetData: [],
  videoState: '',
  iotState: '',
  totalBugs: '',
  totalBugsdesc: '',
  bugsType: [],
  allList: [],
  totalBugsList: [],
  totalRunTimes: [],
  totalRunTime: [],
  huizong: {
    runTimes: '',
    runTime: '',
    runDistance: '',
    openTimes: ''
  }
  ,
  yestodayOnlineList: [],
  pie1: [],
  pie2: [],
  graph1: [],
  graph2: [],
  graph3: [],
  graph4: [],

})
let ui_brandName = ref('')
let ui_modelName = ref('')
let db_rescueCode = ref('')
let db_registCode = ref('')
let user1 = ref('')
let phone1 = ref('')
let user2 = ref('')
let phone2 = ref('')
let user3 = ref('')
let phone3 = ref('')
let user4 = ref('')
let phone4 = ref('')
onMounted(() => {
  // methods.initEacharts(typeList)
  methods.getProjectAPI()
  methods.getData()
  isWss.value = getVersion()
})
const getVersion = () => {
  const s1 = navigator.userAgent
  const key1 = 'Chrome'
  const index1 = s1.indexOf(key1)
  if (index1 > -1) {
    let value = false
    try {
      const s2 = s1.slice(index1)
      const key2 = '.'
      const index2 = s2.indexOf(key2)
      if (index2 > -1) {
        const s3 = s2.slice(0, index2)
        const s4 = s3.split('/')
        const version = s4[1]
        console.log(version)
        if (version > 100) {
          value = false
        } else if (version <= 100) {
          value = true
        } else {
          value = false
        }
      }
    } catch (e) {
      value = false
      console.log('版本获取报错：', e)
    } finally {
      return value
    }
  } else {
    return false
  }
}
const methods = {
  getServiceList(id) {
    getTaskInfoOfOneElevDesc({ db_elevId: id, token: data.token }).then(res => {
      console.log(res.data.data)
      if (res.data.data) {
        data.serviceList = res.data.data.objectList || [];
      }
    })
  },
  getLostDegree(item) {
    let str = ''
    switch (item.ui_lossDegree) {
      case '00': {
        str = '正常'
        break;
      }
      case '20': {
        str = '轻微损耗'
        break;
      }
      case '50': {
        str = '中度损耗'
        break;
      }
      case '80': {
        str = '重度损耗'
        break;
      }
      case '100': {
        str = '需更换'
        break;
      }
    }
    return str
  },
  getSysInfo(id) {
    getLatestSysCompPartState({
      db_elevId: id, token: data.token
    }).then(res => {
      if (res.data.data) {
        const result = JSON.parse(res.data.data)
        const sys = JSON.parse(result.db_sysCompPartState)
        console.log({ sys })
        if (sys.data) {
          data.allList = []
          sys.data.forEach(item => {
            data.allList.push(...item.list)
          })

        }
      }


    })
  },
  getIotState(item) {
    let key
    switch (item.iotState) {
      case '00': {
        key = 'nonet';
        break;
      }
      case '01': {
        key = 'offnet';
        break;
      }
      case '02': {
        key = 'onnet';
        break;
      }
    }
    return key
  },
  getVideoState(item) {
    let key
    switch (item.videoState) {
      case '00': {
        key = 'nocam';
        break;
      }
      case '01': {
        key = 'offcam';
        break;
      }
      case '02': {
        key = 'oncam';
        break;
      }
    }
    return key
  },
  handleChange(elevatorItem) {
    console.log(elevatorItem)
    if (typeof elevatorItem === 'string') {
      data.currentElevatorId = elevatorItem
      heartData.elevator.keyline = elevatorItem
      methods.getUrl(elevatorItem)
      methods.getElevtorInfo(elevatorItem)
      methods.getServiceList(elevatorItem)
      methods.getSysInfo(elevatorItem)
      methods.getEchartsData(elevatorItem)
      data.videoShow = false;
      websorcketCn()
      setTimeout(() => {
        data.videoShow = true
      })
    } else {
      Object.keys(elevatorItem).forEach(key => {
        item[key] = elevatorItem[key]
      })
      data.currentElevatorId = elevatorItem.elevatorId
      heartData.elevator.keyline = elevatorItem.elevatorId
      methods.getUrl(elevatorItem.elevatorId)
      methods.getElevtorInfo(elevatorItem.elevatorId)
      methods.getServiceList(elevatorItem.elevatorId)
      methods.getSysInfo(elevatorItem.elevatorId)
      methods.getEchartsData(elevatorItem.elevatorId)
      data.videoShow = false;
      websorcketCn()
      setTimeout(() => {
        data.videoShow = true
      })
    }



  },
  getData() {
    getDataApi([
      { freq: '', dateTime: '', projectid: '', funcType: 'A025', count: '', regionCode: '', iscurrentDate: '1' },
      { freq: '', dateTime: '', projectid: '', funcType: 'A029', count: '', regionCode: '', iscurrentDate: '1' },
      { freq: '', dateTime: '', projectid: '', funcType: 'A031', count: '', regionCode: '', iscurrentDate: '1' },
      { freq: '', dateTime: '', projectid: '', funcType: 'A105', count: '', regionCode: '', iscurrentDate: '1' },
      { freq: '', dateTime: '', projectid: '', funcType: 'A106', count: '', regionCode: '', iscurrentDate: '1' },
      { freq: '03', dateTime: '', projectid: '', funcType: 'A107', count: '', regionCode: '', iscurrentDate: '1' },
      { freq: '03', dateTime: '', projectid: '', funcType: 'A108', count: '', regionCode: '', iscurrentDate: '1' },
      { freq: '03', dateTime: '', projectid: '', funcType: 'A109', count: '', regionCode: '', iscurrentDate: '1' },

      { freq: '03', dateTime: '', projectid: '', funcType: 'A037', count: '', regionCode: '', iscurrentDate: '1' },
      { freq: '03', dateTime: '', projectid: '', funcType: 'A038', count: '', regionCode: '', iscurrentDate: '1' },
      { freq: '03', dateTime: '', projectid: '', funcType: 'A039', count: '', regionCode: '', iscurrentDate: '1' },
      { freq: '03', dateTime: '', projectid: '', funcType: 'A040', count: '', regionCode: '', iscurrentDate: '1' },

    ]).then(res => {
      if (res?.data?.data) {
        const Data = res.data.data;
        data.internetData = [...Data.A025.data.data, ...Data.A029.data.data]
        data.totalBugs = Data.A105.data.data
        data.totalBugsdesc = Data.A105.data.desc
        data.bugsType = Data.A106.data.data
        data.totalBugsList = Data.A107.data.data
        data.totalRunTimes = Data.A108.data.data
        data.totalRunTime = Data.A109.data.data
        data.huizong.runTime = Data.A038.data.data
        data.huizong.runTimes = Data.A037.data.data
        data.huizong.runDistance = Data.A039.data.data
        data.huizong.openTimes = Data.A040.data.data
        data.yestodayOnlineList = Data.A031.data.data
        setTimeout(() => {
          methods.initEacharts(data.internetData, data.bugsType)
        })
      }
    })
  },
  getEchartsData(projectid) {
    getDataApi([
      { freq: '', dateTime: '', projectid: projectid, funcType: 'A020', count: '', regionCode: '', iscurrentDate: '1' },
      { freq: '', dateTime: '', projectid: projectid, funcType: 'A045', count: '', regionCode: '', iscurrentDate: '1' },]).then(res => {
        if (res?.data?.data) {
          const Data = res.data.data;

        }
      })
  },
  changeProject(item) {
    methods.getElevatorListAPI(item)
  },
  initEacharts(data, bugsType) {
    // console.log({ data })
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        const progress = data[i].data.online;
        // console.log({ progress })
        const option = {
          backgroundColor: "transparent",
          title: [
            {
              text: progress,
              // text: '20%',
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
        const pie = echarts.init(document.getElementById("vm-pie" + i));

        pie.setOption(option);
      }
    }

    if (!bugsType.length) return
    const option = {
      tooltip: {
        trigger: 'item',
        // formatter: "{a} <br/>{b} : {c}%  "
        formatter: function (param) {
          console.log(param);
          return ` <span>${param.data.name} ：</span> <span style='color:#000'>${param.data.count}  </span>`;
        },
      },
      backgroundColor: "transparent",
      title: {
        text: '',
        textStyle: {
          align: 'center',
          color: '#fff',
          fontSize: 14,
        },
        show: false,
        itemGap: 2,
        top: '0%',
        left: '38%',
      },
      color: bugsType.reduce((pre, cur) => {
        return [...pre, cur.desc]
      }, []), //'#ffcc00'
      legend: {
        orient: 'vertical',
        x: 'left',
        y: 'center',
        color: 'red',
        icon: "circle",
        data: bugsType.reduce((pre, cur) => {
          return [...pre, cur.name]
        }, []),
        textStyle: {
          color: "#C0DFFF",
          fontStyle: "normal",
          fontSize: "12px",
        },
        top: "15%", //距离顶部的位置
        left: '5%',
        formatter: function (name) {
          if (name.length > 8) {
            return name.slice(0, 8) + '...'

          } else {
            return name;
          }
        }

      },

      series: [{
        name: '',
        type: 'pie',
        radius: ["30%", "53%"],
        center: ['75%', '55%'],
        data: bugsType.reduce((pre, cur) => {
          return [...pre, {
            name: cur.name,
            value: cur.data.slice(0, -1),
            count: cur.count || 0
          }]
        }, []),
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        itemStyle: {
          normal: {
            label: {
              show: true,
              //	                            position:'inside',
              formatter: '{b} : {c} '
            }
          },
          labelLine: {
            show: true
          }
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
            padding: [0, 0], //文字和图的边距
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
      }]
    };
    setTimeout(() => {
      const echartsDom = echarts.init(document.getElementById('pie4'))
      echartsDom.setOption(option)
    })

  },
  getElevatorListAPI(e) {
    getElevatorByProjectId({ projectid: e, token: data.token }).then(res => {
      console.log(res)
      if (res?.data?.data?.data?.length) {
        data.elevatorList = res.data.data.data
        data.elevatorTotal = `电梯列表（${res.data.data.total.elevatorTotal}）`
        setTimeout(() => {
          methods.handleChange(res.data.data.data[0])

        })
      }
    })
  },
  getUrl(elevatorId) {
    // getVideoUrl({ elevatorId, outProtocol: 'HLS', token: data.token }).then(res => {
    //   if (res?.data?.data) {
    //     console.log('拿到地址：', res.data.data)
    //     data.videoUrl = res.data.data
    //   } else {
    //     data.videoUrl = ''
    //   }
    // })
    let v = '未安装摄像头'
    getVideoUrl({ elevatorId }).then(x => {
      const data = x.data.data
      if (!data) {
        isHls.value = true
        isFlv.value = false
        talkUrl.value = ''
      } else if (data && typeof data === 'string') {
        isHls.value = true
        isFlv.value = false
        v = data
        talkUrl.value = ''
      } else if (data && typeof data === 'object') {
        if (data.intercom) {
          talkUrl.value = data.intercom
        }
        if (data.videpType === 'ali') {
          isHls.value = true
          isFlv.value = false
          v = data.hls
        } else if (data.videpType === 'hx') {
          if (isWss.value) {
            isHls.value = false
            isFlv.value = false
            v = data.ws //支持ws协议播放
          } else {
            isHls.value = false
            isFlv.value = true
            v = data.http_flv
          }
        }
        if (v.startsWith('https')) {

        } else if (v.startsWith('http')) {
          v = v.replace('http', 'https')
        }

      }
      videoUrl.value = v
      isLoading.value = false;
    })
  },
  getProjectAPI() {
    getProjectList().then(res => {
      console.log(res.data.data.length === 0, 'xxxx')
      if (res.data?.token) {
        data.token = res.data.token
      }
      if (res.data.data?.length) {
        data.projectList.push(...res.data.data)
        data.currentProjectId = res.data.data[0].id
        // methods.handleChange(data.currentProjectId)
        methods.getElevatorListAPI(data.currentProjectId)
      }
      else {
        // if (res.data.data?.length === 0) {
        //   loading.close()
        // } else {
        //   ElMessage.error('项目列表获取失败')
        //   if (loading?.close) {
        //     loading.close()
        //   }
        // }

      }
    }).catch(e => {
      console.log({ e })
      // ElMessage.error('服务器错误')
    })
  },
  getElevtorInfo(id) {
    // console.log({ id })
    selectByIdApi({ id }).then(res => {
      if (res.data.data) {
        // console.log(res.data)
        // console.log(res.data.data.db_statisticInfo)
        const _data = JSON.parse(res.data.data.db_statisticInfo)
        const { faultReason, faultReasonAnalysis, runningTimes, runningDuration, runningMileage, openDoors } = _data
        // console.log(faultReasonAnalysis, '故障原因分析')
        // console.log(faultReason, '导致故障原因')

        // console.log(runningTimes, '运行次数走势')
        // console.log(runningDuration, '运行时长走势')
        // console.log(runningMileage, '运行里程走势')
        // console.log(openDoors, '开门次数走势')
        data.pie1 = faultReasonAnalysis.data
        data.pie2 = faultReason.data
        data.graph1 = runningTimes
        data.graph2 = runningDuration
        data.graph3 = runningMileage
        data.graph4 = openDoors
        ui_modelName.value = res.data.data.db_modelElseName
        ui_brandName.value = res.data.data.db_brandElseName
        db_rescueCode.value = res.data.data.db_rescueCode
        db_registCode.value = res.data.data.db_registCode
        user1.value = res.data.data.ui_sceneUserName1
        user2.value = res.data.data.ui_sceneUserName2
        user3.value = res.data.data.ui_sceneUserName3
        user4.value = res.data.data.ui_sceneUserName4
        phone1.value = res.data.data.ui_sceneUser1Phone
        phone2.value = res.data.data.ui_sceneUser2Phone
        phone3.value = res.data.data.ui_sceneUser3Phone
        phone4.value = res.data.data.ui_sceneUser4Phone


      }
    })
  }
}

const typeList = computed(() => {
  return [
    {
      name: 'xxx1',
      value: '20'
    },
    {
      name: 'xxx2',
      value: '20'
    },
    {
      name: 'xxx3',
      value: '20'
    },
  ]
})

function getElevatorState(item) {
  // 优先级 + 电梯类型 + 是否困人
  const key = `${item.elevatorType}_${item.priority}_${item.somebody_in}`

  const classes = {
    /**
        * @直梯模块
        */
    '01_01_00': {
      bg: 'withbugpersonbg',
      user: 'withbugperson'// 故障困人
    },
    '01_01_01': {
      bg: 'withbugpersonbg',
      user: 'withbugperson'// 故障困人
    },
    '01_02_00': {
      bg: 'withbugbg',  // 故障无人
      user: 'withbug'
    },
    '01_02_01': {
      bg: 'withbugbg', // 故障有人
      user: 'withbug'
    },
    '01_03_00': {
      bg: 'warningbg', // 警告无人
      user: 'warning'
    },
    '01_03_01': {
      bg: 'warningbg', // 警告无人有人
      user: 'warning'
    },

    '01_04_00': {
      bg: 'stoprunbg', // 停止服务无人
      user: 'stoprun'
    },
    '01_04_01': {
      bg: 'stoprunbg', // 停止服务有人
      user: 'stoprun'
    },
    '01_05_00': {
      bg: 'offlinebg', // 离线无人
      user: 'offline'
    },
    '01_05_01': {
      bg: 'offlinebg', // 离线有人
      user: 'offline'
    },
    '01_06_00': {
      bg: 'normalbg', // 正常无人
      user: 'normal'
    },
    '01_06_01': {
      bg: 'normalbg', // 正常有人
      user: 'normal'
    },

    /**
     * @扶梯模块 withbugpersonbg offlinebg warningbg withbugbg normalbg stoprunbg
     *  // futiwithbugperson futioffline futiwarning futiwithbug futinormal futistoprun
     */
    '02_01_00': {
      bg: 'withbugpersonbg',
      user: 'futiwithbugperson'// 故障困人
    },
    '02_01_01': {
      bg: 'withbugpersonbg',
      user: 'futiwithbugperson'// 故障困人
    },
    '02_02_00': {
      bg: 'withbugbg',  // 故障无人
      user: 'futiwithbug'
    },
    '02_02_01': {
      bg: 'withbugbg', // 故障有人
      user: 'futiwithbug'
    },
    '02_03_00': {
      bg: 'warningbg', // 警告无人
      user: 'futiwarning'
    },
    '02_03_01': {
      bg: 'warningbg', // 警告无人有人
      user: 'futiwarning'
    },

    '02_04_00': {
      bg: 'stoprunbg', // 停止服务无人
      user: 'futistoprun'
    },
    '02_04_01': {
      bg: 'stoprunbg', // 停止服务有人
      user: 'futistoprun'
    },
    '02_05_00': {
      bg: 'offlinebg', // 离线无人
      user: 'futioffline'
    },
    '02_05_01': {
      bg: 'offlinebg', // 离线有人
      user: 'futioffline'
    },
    '02_06_00': {
      bg: 'normalbg', // 正常无人
      user: 'futinormal'
    },
    '02_06_01': {
      bg: 'normalbg', // 正常有人
      user: 'futinormal'
    },
  }
  return classes[key] || {
    bg: 'offlinebg', // 离线无人
    user: 'offlinenouser'
  }
}
const item = reactive({

})
function getColor(item) {
  const key = item.priority
  const colors = {
    '01': '#FF6882',
    '02': '#FE7917',
    '03': '#FED52F',
    '04': '#B149FF',
    '05': '#999999',
    '06': '#1AC9FF', //#29B6FF
  }
  return colors[key]
}
watch(() => data.elevatorList, (newVal) => {
  if (newVal.length > 0) {
    data.currentElevatorId = newVal[0].id

  }
}, {
  deep: true,
  immediate: true
})


/* WebSocket封装
         * @param url: WebSocket接口地址与携带参数必填
         * @param onOpenFunc: WebSocket的onopen回调函数，如果不需要可传null
         * @param onMessageFunc: WebSocket的onmessage回调函数，如果不需要可传null
         * @param onCloseFunc: WebSocket的onclose回调函数，如果不需要可传null
         * @param onErrorFunc: WebSocket的onerror回调函数，如果不需要可传null
         * @param heartMessage: 发送后台的心跳包参数,必填 (给服务端的心跳包就是定期给服务端发送消息)
         * @param timer: 给后台传送心跳包的间隔时间，不传时使用默认值3000毫秒
         * @param isReconnect: 是否断掉立即重连，不传true时不重连
        */
let isConnected = false // 设定已链接webSocket标记
let cancleTimer = null  //取消心跳

let throttleTime = 100;//解决第一次疯狂发送ws
setTimeout(() => {
  throttleTime = 1000
}, 1000)
// 定时任务
let clearInter//清除
let setTimer = () => {

  //开启重连
  let n = 0
  clearInter = setTimeout(() => {
    console.log('定时器开启' + n++)
    ws = null;
    isConnected = false
    websorcketCn()
    // getElevatorListAPI(currentProjectId.value)
  }, 15 * 1000)
}


const heartData = {
  elevator: {
    socketType: '03',
    keyline: ''
  }
}

let tm = null
let ws
const websorcketCn = () => {
  if (ws?.close) {
    ws.close()
  }
  useWebSocket(
    `${baseUrl}/elevator/websocket/bi?token=${data.token}`, // url
    null, // onopen回调
    (e) => { // onmessage回调

      if (clearInter) {
        // console.log('关闭定时器')
        clearTimeout(clearInter)
        clearInter = null;
      }
      const res = JSON.parse(e.data) // 后端返回的数据
      // console.log('收到ws推送：', new Date())
      // console.log('收到ws推送：' + new Date(), res.data)
      // if (loading) {
      //   loading.close()
      //   loading = null
      // }
      switch (res.data?.socketType) {
        case '03': {
          if (res.data?.data?.elevatorId == data.currentElevatorId) {
            console.log(res.data.data)
            Object.keys(res.data.data).forEach(key => {
              item[key] = res.data.data[key]
            })
          }


          break
        }

      }


    },
    async (e) => {
      console.log('关闭ws回调 --------启动定时器---')
      if (clearInter) {
        console.log('先关闭定时器')
        clearTimeout(clearInter)
        clearInter = null;
      }
      setTimer()
    }, // onclose回调
    null, // onerror回调
    heartData,
    null, // 传送心跳包的间隔时间
    true // 断掉立即重连
  )
}
function useWebSocket(url, onOpenFunc, onMessageFunc, onCloseFunc, onErrorFunc, heartMessage, timer, isReconnect) {
  // 创建并链接webSocket
  // eslint-disable-next-line no-unreachable
  const connect = () => {
    // 如果未链接webSocket，则创建一个新的webSocket
    if (!isConnected) {
      // console.log('创建新的ws连接')

      ws = new WebSocket(url)
      isConnected = true
    }
  }
  // 向后台发送心跳消息
  // eslint-disable-next-line no-unreachable
  let throttle = null //节流
  const heartCheck = () => {
    if (throttle) return
    throttle = setTimeout(() => {
      if (ws?.send) {
        ws.send(JSON.stringify(heartData.elevator))

        // console.log('发送ws心跳成功')
      }
      throttle = null
    }, throttleTime)
  }
  // 初始化事件回调函数
  // eslint-disable-next-line no-unreachable
  const initEventHandle = () => {
    ws.addEventListener('open', (e) => {
      // console.log('连接ws-open')
      // 给后台发心跳请求，在onmessage中取得消息则说明链接正常
      heartCheck()
      // 如果传入了函数，执行onOpenFunc
      if (!onOpenFunc) {
        return false
      }
      onOpenFunc(e)
    })
    ws.addEventListener('message', (e) => {
      // console.log('onmessage')
      // 接收到任何后台消息都说明当前连接是正常的
      if (!e) {
        // console.log('get nothing from service')
        return false
      }
      // 如果获取到后台消息，则timer毫秒后再次发起心跳请求给后台，检测是否断连
      cancleTimer = setTimeout(() => {
        heartCheck()
      }, !timer ? 1000 * 10 : timer)

      // 如果传入了函数，执行onMessageFunc
      if (!onMessageFunc) {
        return false
      }
      onMessageFunc(e)
    })
    ws.addEventListener('close', (e) => {

      // console.log('关闭了连接')
      // 如果传入了函数，执行onCloseFunc
      if (!onCloseFunc) {
        return false
      }
      isConnected = false
      onCloseFunc(e)
      // if (isReconnect) { // 如果断开立即重连标志为true
      //     // 重新链接webSocket
      //     console.log('关闭后 重新开启ws连接', e)
      //     connect()
      // }
    })
    ws.addEventListener('error', (e) => {

      // console.log('ws报错')
      // 如果传入了函数，执行onErrorFunc

      if (!onErrorFunc) {
        return false
      }
      isConnected = false //如果报错 继续重连
      onErrorFunc(e)

      if (isReconnect) { // 如果断开立即重连标志为true
        // 重新链接webSocket

        // console.log('报错后 重新开启ws连接')
        connect()
      }
    })
  }
  // 初始化webSocket
  // eslint-disable-next-line no-unreachable
  (() => {
    // 1.创建并链接webSocket
    connect()
    // 2.初始化事件回调函数
    initEventHandle()
    // 3.返回是否已连接
    return ws
  })()
}

</script>

<style lang="scss" scoped>
.project-select {
  margin-left: 20px;
  width: 300px;
  height: 36px;
  overflow: hidden;
  border: 1px solid rgba(0, 154, 252, 0.5);
  box-shadow: 0 0 3px 1px rgb(37, 169, 245);
  transform: skew(-25deg, 0deg);

  .selectcontent {
    width: 280px;
    height: 36px;
    transform: translateY(-2px) skew(25deg, 0deg);
    border: none;
    outline: none;
    background-color: transparent;

    :deep() .el-input__wrapper {
      background: transparent;
      border: none;
      font-weight: bold;
      box-shadow: none !important;
      margin-top: 4px;

    }

    :deep().el-select__icon {
      color: #29B6FF;
    }

    :deep() .el-input__inner {
      color: #29B6FF;
      font-size: 16px;
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

.connectlist {
  display: flex;

  .label {
    width: 60px;
    min-width: 60px;
  }

  .connect {
    width: calc(100%);
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .item {
      margin-right: 2px;
      width: 49%;
    }
  }

}

#data-internet {
  width: 100%;
  height: calc(100% - 70px);
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;

  .marquee-content {
    font-size: 22px;
  }

  .main-left {
    width: 1255px;

    .floor1 {

      display: flex;

      padding: 10px 0;


      .elevator-list {
        .modulename {
          margin-top: 27px;
        }

        .list {
          padding-top: 20px;
          height: 590px;
          width: 330px;
          margin-left: 20px;
          margin-top: 10px;

          .item {
            width: 302px;
            background-color: rgba(35, 154, 255, 0.2);
            text-indent: 20px;
            line-height: 65px;

            color: #fff;
            font-size: 14px;
            margin-bottom: 10px;
            transition-duration: .3s;
            overflow: hidden;
            cursor: pointer;
          }

          .item.actived {
            background-color: rgba(26, 201, 255, 1);
          }

          .item:hover {
            background-color: rgba(26, 201, 255, .5);

          }
        }
      }

      .elevator-detail {
        width: 920px;

        .state {
          width: 100%;
          display: flex;

          .animate {
            width: 50%;

            .icon-state {
              width: 100%;
              display: flex;
              justify-content: space-around;

              div {
                width: 18%;
                position: relative;
                text-indent: 20px;
              }

              div::before {
                content: '';
                position: absolute;
                top: 5px;
                left: 0;
                width: 12px;
                height: 12px;
                // background: pink;
                border-radius: 50%;
              }

              div:nth-child(1)::before {
                background-color: #1AC9FF;
              }

              div:nth-child(2)::before {
                background-color: #999999;
              }

              div:nth-child(3)::before {
                background-color: #FED52F;
              }

              div:nth-child(4)::before {
                background-color: #B149FF;
              }

              div:nth-child(5)::before {
                background-color: #FE7917;
              }

              div:nth-child(6)::before {
                background-color: #FF6882;
              }


            }

            .elevtor-state {
              width: 292px;
              // height:   .elevatorItem {
              height: 215px;
              margin: 0 auto;
              position: relative;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              background: url('../../../public/images/dataplatform/customer/internet-bg-dizuo.png') no-repeat;
              background-position: left bottom;
              background-size: 292px 82px;

              .item {
                width: 180px;
                height: 180px;
                margin: 0 auto;
                background: url('../../../public/images/dataplatform/customer/withbg.png') no-repeat 6px 16px;
                display: flex;
                justify-content: center;

                .elevator {
                  width: 130px;
                  height: 150px;
                  // margin-left: 11px;

                  .name {
                    color: #29B6FF;
                    font-size: 24px;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }

                  .elevatorstate {
                    width: calc(100% - 6px);
                    margin-top: 15px;
                    display: flex;
                    justify-content: center;

                    .elevatortype {
                      width: 70px;
                      min-width: 70px;
                      position: relative;
                      height: 70px;
                      display: flex;
                      justify-content: center;
                      align-items: center;


                      .withperson {
                        width: 40px;
                        height: 56px;
                        background: #fff;
                        border-radius: 50%;
                        overflow: hidden;
                        z-index: -1;
                      }

                      .detail {
                        opacity: .0;
                        position: absolute;
                        top: -40px;
                        left: -88px;
                        width: 130px;
                        height: 170px;
                        z-index: -999;
                        font-size: 10px;
                        background-color: rgba(0, 23, 47, .89);
                        border-radius: 4px;
                        transition-duration: .3s;

                        .detailTitle {
                          display: flex;
                          justify-content: space-between;
                          box-sizing: border-box;
                          width: 100%;
                          padding: 7px 14px;

                          .name {
                            font-size: 14px;
                            text-align: left;
                            color: #fff;
                            min-width: 45px;
                          }

                          .value {
                            font-size: 14px;
                            text-align: left;
                            color: #23FFFC;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                          }
                        }
                      }

                      .withperson.rect {
                        width: 40px;
                        height: 55px;
                        animation: personBg 1s infinite ease-in-out;
                      }

                      @keyframes personBg {
                        0% {
                          opacity: 0.4;
                        }

                        50% {
                          opacity: 1;
                        }

                        0% {
                          opacity: 0.4;
                        }
                      }
                    }

                    .stoprun {
                      //停运
                      background: url('../../../public/images/dataplatform/customer/stoprun.png') no-repeat;
                    }

                    .normal {
                      //电梯在线
                      background: url('../../../public/images/dataplatform/customer/useronline.png') no-repeat;
                    }

                    .withbugperson {
                      //电梯故障困人
                      position: relative;
                      background: url('../../../public/images/dataplatform/customer/withbug.png') no-repeat;
                    }

                    .offline {
                      //离线无人
                      background: url('../../../public/images/dataplatform/customer/userloseline.png') no-repeat;
                    }

                    .warning {
                      //预警
                      background: url('../../../public/images/dataplatform/customer/warninguser.png') no-repeat;
                    }

                    .withbug {
                      //故障

                      background: url('../../../public/images/dataplatform/customer/stopserviceuser.png') no-repeat;
                    }

                    .futinormal {
                      //扶梯在线
                      background: url('../../../public/images/dataplatform/customer/futionline.png') no-repeat;
                    }

                    .futiwarning {
                      //扶梯预警
                      background: url('../../../public/images/dataplatform/customer/futiwarninguser.png') no-repeat;
                    }

                    .futiwithbug {
                      //扶梯故障
                      background: url('../../../public/images/dataplatform/customer/futistopserviceuser.png') no-repeat;
                    }

                    .futistoprun {
                      //扶梯停止服务
                      background: url('../../../public/images/dataplatform/customer/futistoprun.png') no-repeat;
                    }

                    .futioffline {
                      //扶梯离线
                      background: url('../../../public/images/dataplatform/customer/futiloseline.png') no-repeat;
                    }

                    .futiwithbugperson {
                      //扶梯故障困人
                      background: url('../../../public/images/dataplatform/customer/futiwithbug.png') no-repeat;
                    }

                  }

                }

                .btnstate {
                  width: 30px;
                  height: 120px;
                  margin-top: 33px;

                  //上下箭头
                  .updown {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                    .up {
                      position: relative;
                      height: 16px;
                      overflow: hidden;

                      .up-icon {
                        display: inline-block;
                        width: 14px;
                        height: 16px;
                        background: url('../../../public/images/dataplatform/customer/up1.png') no-repeat;

                      }

                      .up-icon.run {
                        animation: runup 1s infinite;
                      }

                    }

                    @keyframes runup {
                      0% {
                        background: url('../../../public/images/dataplatform/customer/up2.png') no-repeat;
                        // transform: translateY(25px);
                        opacity: 0.1;
                      }

                      50% {
                        background: url('../../../public/images/dataplatform/customer/up2.png') no-repeat;
                        // transform: translateY(25px);
                        opacity: 1;
                      }

                      100% {
                        background: url('../../../public/images/dataplatform/customer/up2.png') no-repeat;
                        // transform: translateY(-25px);
                        opacity: 0.1;
                      }
                    }

                    @keyframes rundown {
                      0% {
                        background: url('../../../public/images/dataplatform/customer/down2.png') no-repeat;
                        // transform: translateY(-25px);
                        opacity: 0.1;
                      }

                      50% {
                        background: url('../../../public/images/dataplatform/customer/down2.png') no-repeat;
                        // transform: translateY(-25px);
                        opacity: 1;
                      }

                      100% {
                        background: url('../../../public/images/dataplatform/customer/down2.png') no-repeat;
                        // transform: translateY(25px);
                        opacity: 0.1;
                      }
                    }

                    .down {
                      position: relative;
                      height: 16px;
                      overflow: hidden;

                      .down-icon {
                        display: inline-block;
                        width: 14px;
                        height: 16px;
                        background: url('../../../public/images/dataplatform/customer/down1.png') no-repeat;

                      }

                      .down-icon.run {
                        animation: rundown 1s infinite;
                      }
                    }
                  }

                  //楼层
                  .floor {
                    display: flex;
                    margin-top: 4px;
                    justify-content: center;
                    align-items: center;

                    .num {
                      width: 26px;
                      height: 26px;
                      border-radius: 50%;
                      background-color: #34455D;
                      color: #23FFFC;
                      font-size: 14px;
                      text-align: center;
                      line-height: 26px;
                    }

                    //扶梯
                    .futi-updown {
                      width: 28px;
                      height: 33px;
                      position: relative;
                      overflow: hidden;

                      .futi-up {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 22px;
                        height: 23px;
                        background: url('../../../public/images/dataplatform/customer/topRight.png') no-repeat;
                      }

                      @keyframes futiRunUp {
                        0% {
                          background: url('../../../public/images/dataplatform/customer/topRight1.png') no-repeat;
                          opacity: 0.3;
                        }

                        50% {
                          background: url('../../../public/images/dataplatform/customer/topRight1.png') no-repeat;
                          opacity: 1;
                        }

                        100% {
                          background: url('../../../public/images/dataplatform/customer/topRight1.png') no-repeat;
                          opacity: 0.3;
                        }
                      }

                      @keyframes futiRunDown {
                        0% {
                          background: url('../../../public/images/dataplatform/customer/bottomLeft1.png') no-repeat;
                          opacity: 0.3;
                        }

                        0% {
                          background: url('../../../public/images/dataplatform/customer/bottomLeft1.png') no-repeat;
                          opacity: 1;
                        }

                        100% {
                          background: url('../../../public/images/dataplatform/customer/bottomLeft1.png') no-repeat;
                          opacity: 0.3;
                        }
                      }

                      .futi-up.run {
                        animation: futiRunUp 1s infinite
                      }

                      .futi-down.run {
                        animation: futiRunDown 1s infinite
                      }

                      .futi-down {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 22px;
                        height: 23px;
                        background: url('../../../public/images/dataplatform/customer/bottomLeft.png') no-repeat;
                      }
                    }
                  }

                  //门
                  .door {

                    width: 22px;
                    display: flex;
                    margin: 4px auto 0;
                    position: relative;
                    justify-content: space-between;
                    z-index: -1;

                    .door-l,
                    .door-r {
                      width: 10px;
                      height: 19px;
                      position: relative;
                      overflow: hidden;
                      border-radius: 2px;
                      background: #34455dbd;

                      .icon-door-l,
                      .icon-door-r {
                        display: block;
                        width: 100%;
                        height: 100%;
                        border-radius: 2px;

                      }

                      .icon-door-l.close {
                        animation: closeToRight 2s 1 forwards ease-in-out;
                      }

                      .icon-door-r.close {
                        animation: closeToLeft 2s 1 forwards ease-in-out;
                      }

                      .icon-door-l.close.run {
                        animation: runToLeft 2s 1 forwards ease-in-out;
                      }

                      .icon-door-r.close.run {
                        animation: runToRight 2s 1 forwards ease-in-out;
                      }

                      @keyframes runToLeft {
                        0% {
                          transform: translate(0);
                          background: #23FFFC;
                        }

                        100% {
                          transform: translate(-10px);
                          background: #23FFFC;
                        }
                      }

                      @keyframes runToRight {
                        0% {
                          transform: translate(0);
                          background: #23FFFC;
                        }

                        100% {
                          transform: translate(10px);
                          background: #23FFFC;
                        }
                      }

                      @keyframes closeToRight {
                        0% {
                          transform: translate(-10px);
                          background: #23FFFC;
                        }

                        100% {
                          transform: translate(0px);
                          background: #23FFFC;
                        }
                      }

                      @keyframes closeToLeft {
                        0% {
                          transform: translate(10px);
                          background: #23FFFC;
                        }

                        100% {
                          transform: translate(0px);
                          background: #23FFFC;
                        }
                      }

                    }

                  }

                  //物联网
                  .iotState {
                    width: 28px;
                    height: 22px;
                    // background-color: #fff;
                    margin: 6px auto 0;


                  }

                  .iotState.nonet {
                    background: url('../../../public/images/dataplatform/customer/nonet.png') no-repeat;
                  }

                  .iotState.offnet {
                    background: url('../../../public/images/dataplatform/customer/offnet.png') no-repeat;
                  }

                  .iotState.onnet {
                    background: url('../../../public/images/dataplatform/customer/onnet.png') no-repeat;
                  }

                  // 摄像头
                  .videoState {
                    width: 21px;
                    height: 24px;
                    // background-color: pink;
                    margin: 5px auto 0;


                  }

                  .videoState.nocam {
                    background: url('../../../public/images/dataplatform/customer/nocam.png') no-repeat;
                  }

                  .videoState.offcam {
                    background: url('../../../public/images/dataplatform/customer/offcam.png') no-repeat;
                  }

                  .videoState.oncam {
                    background: url('../../../public/images/dataplatform/customer/oncam.png') no-repeat;
                  }
                }
              }

              .item.withbugpersonbg {
                //故障背景
                background: url('../../../public/images/dataplatform/customer/bugbg.png') no-repeat 6px 16px;
              }

              .item.offlinebg {
                background: url('../../../public/images/dataplatform/customer/offlinebg.png') no-repeat 6px 16px;
              }

              .item.warningbg {
                background: url('../../../public/images/dataplatform/customer/warningbg.png') no-repeat 6px 16px;
              }

              .item.withbugbg {

                background: url('../../../public/images/dataplatform/customer/stopservicebg.png') no-repeat 6px 16px;
              }

              .item.normalbg {
                background: url('../../../public/images/dataplatform/customer/withbg.png') no-repeat 6px 16px;
              }

              .item.stoprunbg {
                background: url('../../../public/images/dataplatform/customer/stoprunbg.png') no-repeat 6px 16px;
              }

            }
          }

          .video {
            width: 50%;


            .player {
              margin: 0 auto;
              width: 392px;
              height: 235px;
              // background-color: rgba(35, 154, 255, 0.2);
              border-radius: 5px;
            }

          }
        }

        .main-table {
          display: flex;
          width: 100%;
          margin-top: 15px;

          .unitlist {
            width: 360px;
            box-sizing: border-box;
            padding-left: 20px;
            line-height: 26px;

            .title,
            .tabletitle {
              font-size: 14px;
              color: #fff;

            }

            .list {
              width: 100%;
              height: 310px;

              .tab {
                display: flex;
                justify-content: space-around;
                text-align: center;

                .item {
                  width: 30%;
                  line-height: 40px;
                  color: #fff;
                  font-size: 12px;
                }

              }

              .tab.header .item {
                color: #fff;
              }
            }
          }

          .servicerecord {
            box-sizing: border-box;
            overflow: hidden;
            padding-left: 10px;
            width: calc(100% - 370px);
            height: 480px;
            margin-top: -20px;

            :deep() .el-tabs__active-bar {
              // background-color: transparent !important;
              box-shadow: none !important;
            }

            :deep() .el-tabs__active-bar {}


            .title,
            .bugtimes {
              font-size: 14px;
              color: #fff;
              line-height: 30px;
            }

            .list {
              height: 380px;
              box-sizing: border-box;
              padding-left: 20px;

              .tab {
                display: flex;
                width: 100%;
                padding: 6px 0;

                .item {

                  text-align: center;
                  line-height: 24px;
                }

                .item:first-child {
                  width: 90px;
                  min-width: 90px;
                  box-sizing: border-box;
                  border: 1px solid #23FFFC;
                  color: #23FFFC;
                  background-color: rgba(35, 255, 252, 0.2);
                }

                .item:nth-child(2) {
                  flex-grow: 1;
                  text-align: left;
                  padding-left: 20px;
                  box-sizing: border-box;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  min-width: 170px;
                }

                .item:nth-child(3) {
                  width: 80px;

                }

                .item:nth-child(4) {
                  width: 200px;
                }


              }
            }

            .bugtimes {
              padding: 10px 0;
            }

            .servicerecordpie {
              display: flex;
              box-sizing: border-box;
              justify-content: space-between;

              &>div {
                width: 48%;
                height: 320px;


              }
            }

            .servicerecordgraph {
              display: flex;
              box-sizing: border-box;
              flex-wrap: wrap;
              width: 100%;

              #servicerecordgraph1,
              #servicerecordgraph2,
              #servicerecordgraph3,
              #servicerecordgraph4 {
                width: 48%;
                margin: 0 5px;
                // background: pink;
                height: 180px;
                margin-bottom: 20px;
              }

              .graph-title {
                text-align: center;
                font-size: 10px;
              }
            }




            .pielist {
              display: flex;
              justify-content: space-around;
              width: 100%;
              padding-left: 20px;
              box-sizing: border-box;
              height: 200px;


              .pie {
                width: 30%;


                // border: 1px solid red;

                .graphpie {
                  height: 200px;
                  background-color: rgba(35, 154, 255, 0.2);
                }

                .pietitle {
                  line-height: 30px;
                  text-align: center;
                  color: #C0DFFF;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }

    .floor2 {
      // height: 263px;
      background: url('../../../public/images/dataplatform/customer/internet-bg-bottom.png') no-repeat center/cover;
      display: flex;
      width: 100%;
      height: 265px;

      .tab-bugtest {
        width: 200px;
        height: 265px;


        .content {
          width: 100%;
          margin-top: 50%;
          transform: translateY(-50%);
          text-align: center;

          .value {
            line-height: 60px;
            font-size: 28px;
            color: #009AFC
          }

          .label,
          .unit {
            color: #fff;
            font-size: 14px;
            line-height: 20px;
          }
        }
      }

      .tab-bugtype {
        width: 410px;
        height: 265px;
        margin-top: 30px;

        .pie {
          width: 100%;
          height: 210px;
          // background-color: #34455D;
        }

        .title {
          text-indent: 160px;
          margin-top: -10px;
        }
      }

      .tab-runtime20 {
        width: 700px;
        height: 265px;
        margin-left: 20px;

        .title {
          display: flex;

          font-size: 14px;
          padding: 8px 0;
          justify-content: space-around;

          .tab {
            width: 265px;
            line-height: 38px;

            border-bottom: 1px solid rgba(0, 154, 252, .2);
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding-right: 10px;

            span {
              color: #23FFFC;
            }

            span.unit {
              color: #F0F0F0;
              font-size: 12px;
            }

          }

          .tab.month {
            width: 60px;
            height: 26px;
            line-height: 26px;
            text-indent: 14px;
            color: #009AFC;
            font-size: 14px;
            background: rgba(35, 154, 255, 0.2);
            border: 1px solid #239AFF;
            margin-top: 8px;

          }
        }

        .tablelist {

          width: 100%;
          height: calc(100% - 30px);

          padding-right: 100px;
          box-sizing: border-box;

          .content {

            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            box-sizing: border-box;

            .item {
              width: 265px;
              margin-bottom: 15px;
              box-sizing: border-box;
              display: flex;
              color: #F0F0F0;
              font-size: 14px;
              justify-content: space-between;
              padding: 0 10px;

              .index {}
            }

            .item:nth-child(-n + 3) .index {
              color: #23FFFC;
              font-size: 18px;
            }
          }

        }
      }
    }

  }

  .main-right {
    width: 622px;

    .floor1 {
      padding-top: 3px;
      box-sizing: border-box;
      height: 411px;
      background: url('../../../public/images/dataplatform/customer/internet-bg-righttop.png') no-repeat center/cover;

      .content {
        display: flex;

        justify-content: space-around;

        .left,
        .right {
          width: 270px;

          .title {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(0, 154, 252, .2);
            padding: 8px 0;

            .label {
              color: #23FFFC;
              font-size: 14px;
            }

            span {
              color: #F0F0F0;
              font-size: 12px;
            }
          }


        }

        .left .typepie {
          height: 320px;


          .item {
            display: flex;
            height: 87px;
            align-content: center;
            margin-bottom: 15px;

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

        .right {
          width: 270px;
          height: 320px;

          .tablelist {

            width: 100%;
            height: calc(100%);


            .item {
              width: 270px;
              margin-bottom: 15px;
              box-sizing: border-box;
              display: flex;
              color: #F0F0F0;
              font-size: 14px;
              justify-content: space-between;
              padding: 0 10px;

              .index {}
            }

            .item:nth-child(-n + 3) .index {
              color: #23FFFC;
              font-size: 18px;
            }
          }
        }
      }
    }

    .floor2 {
      margin-top: 12px;
      height: 570px;
      background: url('../../../public/images/dataplatform/customer/internet-bg-rightbottom.png') no-repeat center/cover;

      .head {
        display: flex;
        justify-content: space-between;
        padding-right: 20px;
        box-sizing: border-box;

        .month {
          width: 60px;
          height: 26px;
          line-height: 26px;
          text-indent: 14px;

          color: #009AFC;
          font-size: 14px;
          background: rgba(35, 154, 255, 0.2);
          border: 1px solid #239AFF;
          margin-top: 15px;


        }
      }

      .tablist {
        display: flex;
        margin-top: 20px;
        justify-content: space-around;

        .item {
          text-align: center;
          position: relative;

          .value {
            line-height: 70px;
            font-size: 28px;
            color: #009AFC;

          }

          .name {
            line-height: 22px;
            color: #FFFFFF;
            font-size: 14px;
          }
        }

        .item::after {
          position: absolute;
          content: '';
          width: 1px;
          height: 71px;
          background-color: #1AC9FF;
          opacity: .2;
          top: 50px;
          right: -50%;
        }

        .item:last-child::after {
          opacity: 0;
        }
      }

      .content {
        margin-top: 30px;
        height: 330px;
        display: flex;
        justify-content: space-around;

        .left,
        .right {
          width: 270px;

          .title {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(0, 154, 252, .2);
            padding: 8px 0;

            .label {
              color: #23FFFC;
              font-size: 14px;
            }

            span {
              color: #F0F0F0;
              font-size: 12px;
            }
          }


        }


        .left,
        .right {
          width: 270px;
          height: 320px;

          .tablelist {

            width: 100%;
            height: calc(100%);


            .item {
              width: 270px;
              margin-bottom: 15px;
              box-sizing: border-box;
              display: flex;
              color: #F0F0F0;
              font-size: 14px;
              justify-content: space-between;
              padding: 0 10px;

              .index {}
            }

            .item:nth-child(-n + 3) .index {
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