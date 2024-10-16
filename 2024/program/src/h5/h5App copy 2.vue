<template>
  <div class="main">
    <div class="index">
      <div class="top">
        <div class="logo"></div>
        <div class="en">
          {{ $data.orderType.title }}
        </div>
      </div>
      <div class="title">
        <div class="title-desc">{{ $data.orderType.titleLabel }}</div>
        <div class="title-icon">
          <div>
            {{ $data.orderType.icon1 }}
          </div>
          <div>
            {{ $data.orderType.icon2 }}
          </div>
        </div>
      </div>
      <div class="time">
        {{ $data.time }}
      </div>
      <div class="project">
        <div class="item">
          <div class="label">项目：</div>
          <div class="name">{{ $data.headerTab.projectName }}</div>
        </div>
        <div class="item">
          <div class="label">维保单位：</div>
          <div class="name">{{ $data.headerTab.projectRepair }}</div>
        </div>
        <div class="item">
          <div class="label">技术支持：</div>
          <div class="name">{{ $data.headerTab.support }}</div>
        </div>
        <div class="item">
          <div class="label">承保单位：</div>
          <div class="name">{{ $data.headerTab.save }}</div>
        </div>
      </div>
      <div class="one">一. &nbsp; 总览</div>
      <div class="content">
        <circletitle :title="'1.困梯'"></circletitle>
        <div class="tabflex">
          <div class="item kunren">
            <div class="num">{{ $data.oneTab.kunti_1.kunren }}</div>
            <div class="label">困人次数</div>
            <div class="unit">（起）</div>
          </div>
          <div class="item jiejiu">
            <div class="num">{{ $data.oneTab.kunti_1.jiejiu }}</div>
            <div class="label">解救被困人员</div>
            <div class="unit">（人）</div>
          </div>
          <div class="item jiuyuan">
            <div class="num">{{ $data.oneTab.kunti_1.jiuyuan }}</div>
            <div class="label">救援人员到达</div>
            <div class="label">现场平均用时</div>
            <div class="unit">（分钟）</div>
          </div>
          <div class="item shijiu">
            <div class="num">{{ $data.oneTab.kunti_1.xianchang }}</div>
            <div class="label">现场实施救援</div>
            <div class="label">平均用时</div>
            <div class="unit">（分钟）</div>
          </div>
        </div>
        <pie :title="'困人原因'" :pieId="'pie1'" v-if="showPie1" :data="$data.oneTab.kunti_1.buglist"></pie>
        <!-- <div class="reasonlist">
                    <div class="desc">困人原因：</div>
                    <div class="list">
                        <div class="item" v-for='(item, index) in $data.oneTab.kunti_1.buglist' :key='index'>{{
                                item.name
                        }} {{ item.data }}
                        </div>
                    </div>
                </div> -->
      </div>
      <div class="content">
        <circletitle :title="'2.故障'"></circletitle>
        <div class="tabflex bug">
          <div class="item times">
            <div class="num">{{ $data.oneTab.guzhang_2.bugTimes }}</div>
            <div class="label">故障次数</div>
            <div class="unit">（起）</div>
          </div>
          <div class="item resolved">
            <div class="num">{{ $data.oneTab.guzhang_2.resolved }}</div>
            <div class="label">处理完成</div>
            <div class="unit">（起）</div>
          </div>
          <div class="item rate">
            <div class="num">{{ $data.oneTab.guzhang_2.bugRate }}</div>
            <div class="label">故障率</div>
            <div class="unit">（%）</div>
          </div>
        </div>
        <!-- 
        <pie
          :title="'召修原因'"
          v-if="showPie2"
          :pieId="'pie2'"
          :data="$data.oneTab.guzhang_2.repairList"
        ></pie> -->
        <!-- <div class="reasonlist">
                    <div class="desc">召修原因：</div>
                    <div class="list">
                        <div class="item" v-for='(item, index) in $data.oneTab.guzhang_2.repairList' :key='index'>{{
                                item.name
                        }} {{ item.data
}}
                        </div>
                    </div>
                </div> -->

        <pie :title="'故障原因分析'" v-if="showPie3" :pieId="'pie3'" :data="$data.oneTab.guzhang_2.bugReason"></pie>
        <!-- <div class="reasonlist">
                    <div class="desc">故障原因：</div>
                    <div class="list">
                        <div class="item" v-for='(item, index) in $data.oneTab.guzhang_2.bugReason' :key='index'>{{
                                item.name
                        }} {{ item.value
}}
                        </div>
                    </div>
                </div> -->

        <pie :title="'导致故障原因'" v-if="showPie4" :pieId="'pie4'" :data="$data.oneTab.guzhang_2.bugType"></pie>
        <!-- <div class="reasonlist">
                    <div class="desc">故障分类：</div>
                    <div class="list">
                        <div class="item" v-for='(item, index) in $data.oneTab.guzhang_2.bugType' :key='index'>
                            {{
                                    item.name
                            }} {{ item.value
}}
                        </div>
                    </div>
                </div> -->
      </div>
      <div class="content">
        <circletitle :title="'3.物联网运行汇总'"></circletitle>
        <div class="content-type zhiti">
          <div class="icon"></div>
          <div class="desc">直梯</div>
        </div>
        <div class="tabflex internet">
          <div class="item times">
            <div class="num">{{ $data.oneTab.wulianwang_3.runTimes }}</div>
            <div class="label">本{{ $data.orderType.word }}运行次数</div>
            <div class="unit">（起）</div>
          </div>
          <div class="item resolved">
            <div class="num">{{ $data.oneTab.wulianwang_3.runTime }}</div>
            <div class="label">本{{ $data.orderType.word }}运行时长</div>
            <div class="unit">（小时）</div>
          </div>
        </div>
        <graph :graphId="'internet-1'" :xData="$data.oneTab.wulianwang_3.internet_1.xData"
          :yData1="$data.oneTab.wulianwang_3.internet_1.yData1" :yData2="$data.oneTab.wulianwang_3.internet_1.yData2"
          :title="$data.oneTab.wulianwang_3.internet_1.title" :legendList="[
            '本' + $data.orderType.word + '运行次数',
            '本' + $data.orderType.word + '运行时长（小时）'
          ]">
        </graph>
        <div class="tabflex zhiti">
          <div class="item times">
            <div class="num">{{ $data.oneTab.wulianwang_3.openTimes }}</div>
            <div class="label">本{{ $data.orderType.word }}开门次数</div>
            <div class="unit">（次）</div>
          </div>
          <div class="item resolved">
            <div class="num">{{ $data.oneTab.wulianwang_3.runMile }}</div>
            <!-- <div class="label">黑林廉租房总 </div> -->
            <div class="label">本{{ $data.orderType.word }}运行里程</div>
            <div class="unit">（公里）</div>
          </div>
        </div>
        <graph :graphId="'internet-2'" :legendList="[
          $data.orderType.word + '开关门次数（次）',
          $data.orderType.word + '运行里程（km）'
        ]" :xData="$data.oneTab.wulianwang_3.internet_2.xData" :yData1="$data.oneTab.wulianwang_3.internet_2.yData1"
          :yData2="$data.oneTab.wulianwang_3.internet_2.yData2" :title="$data.oneTab.wulianwang_3.internet_2.title">
        </graph>
        <div class="content-type futi" v-show="false">
          <div class="icon"></div>
          <div class="desc">扶梯</div>
        </div>
        <div class="tabflex futi" v-show="false">
          <div class="item times">
            <div>
              <span class="label">总运行时长</span>
              <span class="num">{{
              $data.oneTab.wulianwang_3.futiRunTime
              }}</span>
              <span class="unit">(小时)</span>
            </div>
          </div>
        </div>
        <graph :graphId="'internet-3'" v-show="false" :legendList="[
          $data.orderType.word + '开关门次数（次）',
          $data.orderType.word + '运行里程（km）'
        ]" :xData="$data.oneTab.wulianwang_3.internet_3.xData" :yData1="$data.oneTab.wulianwang_3.internet_3.yData1"
          :yData2="$data.oneTab.wulianwang_3.internet_3.yData2" :title="$data.oneTab.wulianwang_3.internet_3.title">
        </graph>
      </div>
      <div class="content">
        <circletitle :title="'4.服务'"></circletitle>
        <div class="tabflex futi">
          <div class="item times">
            <div>
              <span class="label">服务总时长</span>
              <span class="num">{{ $data.oneTab.fuwu_4.serverTime }}</span>
              <span class="unit">(小时)</span>
            </div>
          </div>
          <graph :graphId="'service-1'" :legendList="[]" :xData="$data.oneTab.fuwu_4.service_1.xData"
            :yData1="$data.oneTab.fuwu_4.service_1.yData1" :yData2="$data.oneTab.fuwu_4.service_1.yData2"
            :title="$data.oneTab.fuwu_4.service_1.title">
          </graph>
        </div>
        <div class="tabflex futi">
          <div class="item times">
            <div>
              <span class="label">Ⅰ级大保养总时长</span>
              <span class="num">{{ $data.oneTab.fuwu_4.clearTime }}</span>
              <span class="unit">(小时)</span>
            </div>
          </div>
          <graph :graphId="'service-2'" :xData="$data.oneTab.fuwu_4.service_2.xData"
            :yData1="$data.oneTab.fuwu_4.service_2.yData1" :yData2="$data.oneTab.fuwu_4.service_2.yData2"
            :title="$data.oneTab.fuwu_4.service_2.title" :legendList="[]">
          </graph>
        </div>
        <div class="tabflex futi">
          <div class="item times">
            <div>
              <span class="label">Ⅱ级大保养总时长</span>
              <span class="num">{{ $data.oneTab.fuwu_4.repareTime }}</span>
              <span class="unit">(小时)</span>
            </div>
          </div>
          <graph :graphId="'service-3'" :legendList="[]" :xData="$data.oneTab.fuwu_4.service_3.xData"
            :yData1="$data.oneTab.fuwu_4.service_3.yData1" :yData2="$data.oneTab.fuwu_4.service_3.yData2"
            :title="$data.oneTab.fuwu_4.service_3.title">
          </graph>
        </div>
        <div class="tabflex futi">
          <div class="item times">
            <div>
              <span class="label">按需维保服务总时长</span>
              <span class="num">{{ $data.oneTab.fuwu_4.needRepairTime }}</span>
              <span class="unit">(小时)</span>
            </div>
          </div>
          <graph :graphId="'service-4'" :legendList="[]" :xData="$data.oneTab.fuwu_4.service_4.xData"
            :yData1="$data.oneTab.fuwu_4.service_4.yData1" :yData2="$data.oneTab.fuwu_4.service_4.yData2"
            :title="$data.oneTab.fuwu_4.service_4.title">
          </graph>
        </div>
        <div class="tabflex futi">
          <div class="item times">
            <div>
              <span class="label">维修服务总时长</span>
              <span class="num">{{
              $data.oneTab.fuwu_4.repareServerTime
              }}</span>
              <span class="unit">(小时)</span>
            </div>
          </div>
          <graph :graphId="'service-5'" :legendList="[]" :xData="$data.oneTab.fuwu_4.service_5.xData"
            :yData1="$data.oneTab.fuwu_4.service_5.yData1" :yData2="$data.oneTab.fuwu_4.service_5.yData2"
            :title="$data.oneTab.fuwu_4.service_5.title">
          </graph>
        </div>
        <div class="tabflex futi">
          <div class="item times">
            <div>
              <span class="label">体检服务总时长</span>
              <span class="num">{{ $data.oneTab.fuwu_4.checkServerTime }}
              </span>
              <span class="unit">(小时)</span>
            </div>
          </div>
          <graph :graphId="'service-6'" :xData="$data.oneTab.fuwu_4.service_6.xData"
            :yData1="$data.oneTab.fuwu_4.service_6.yData1" :yData2="$data.oneTab.fuwu_4.service_6.yData2"
            :title="$data.oneTab.fuwu_4.service_6.title" :legendList="[]">
          </graph>
        </div>
        <div class="tabflex futi">
          <div class="item times">
            <div>
              <span class="label">安装物联网服务总时长</span>
              <span class="num">{{ $data.oneTab.fuwu_4.installInterTime }}
              </span>
              <span class="unit">(小时)</span>
            </div>
          </div>
          <graph :graphId="'service-7'" :legendList="[]" :xData="$data.oneTab.fuwu_4.service_7.xData"
            :yData1="$data.oneTab.fuwu_4.service_7.yData1" :yData2="$data.oneTab.fuwu_4.service_7.yData2"
            :title="$data.oneTab.fuwu_4.service_7.title">
          </graph>
        </div>
        <div class="tabflex futi" v-show="false">
          <div class="item times">
            <div>
              <span class="label">换件数</span>
              <span class="num">{{ $data.oneTab.fuwu_4.changeTimes }} </span>
              <span class="unit">(件)</span>
            </div>
          </div>
          <graph :graphId="'service-8'" :legendList="[]" :xData="$data.oneTab.fuwu_4.service_8.xData"
            :yData1="$data.oneTab.fuwu_4.service_8.yData1" :yData2="$data.oneTab.fuwu_4.service_8.yData2"
            :title="$data.oneTab.fuwu_4.service_8.title">
          </graph>
        </div>
      </div>
      <div class="content" v-show="false">
        <circletitle :title="'5.投诉'"></circletitle>
        <div class="tabflex">
          <div class="item kunren">
            <div class="num">0</div>
            <div class="label">投诉次数</div>
            <div class="unit">（起）</div>
          </div>
          <div class="item jiejiu">
            <div class="num">0</div>
            <div class="label">处理完成</div>
            <div class="unit">（起）</div>
          </div>
        </div>
        <pie :title="'投诉原因'" :pieId="'pie5'" :data="complainReason"></pie>
        <!-- <div class="reasonlist">
                    <div class="desc">投诉原因:</div>
                    <div class="list">
                        <div class="item" v-for='(item, index) in complainReason' :key='index'>{{ item.name }}
                            {{
                                    item.value
                            }}
                        </div>
                    </div>
                </div> -->
      </div>
      <!-- 模块2 -->
      <div class="one">二. &nbsp; 明细</div>
      <div class="content">
        <circletitle :title="'1. 应急处置报表 '"></circletitle>
        <div class="table">
          <div class="list">
            <div class="nodata" v-if="!$data.twoTab.yingji_1.length">
              暂无内容
            </div>
            <div class="item" v-for="(item, index) in $data.twoTab.yingji_1" :key="index">
              <div class="tab">
                <div class="name">电梯名称</div>
                <div class="value">
                  {{ $data.headerTab.projectName }} {{ item.elevatorName }}
                </div>
              </div>
              <div class="tab">
                <div class="name">困人原因</div>
                <div class="value">{{ item.trappedReason }}</div>
              </div>
              <div class="tab">
                <div class="name">救援人数</div>
                <div class="value">{{ item.alarmNumber }}</div>
              </div>
              <div class="tab">
                <div class="name">到达用时</div>
                <div class="value">{{ item.arriveTime }}</div>
              </div>
              <div class="tab">
                <div class="name">救援用间</div>
                <div class="value">{{ item.rescueTime }}</div>
              </div>
              <div class="tab">
                <div class="name">时间</div>
                <div class="value">{{ item.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <circletitle :title="'2. 召修报表  '"></circletitle>
        <div class="table">
          <div class="list">
            <div class="nodata" v-if="!$data.twoTab.zhaoxiu_2.length">
              暂无内容
            </div>
            <div class="item" v-for="(item, index) in $data.twoTab.zhaoxiu_2" :key="index">
              <div class="tab">
                <div class="name">电梯名称</div>
                <div class="value">
                  {{ $data.headerTab.projectName }} {{ item.elevatorName }}
                </div>
              </div>
              <div class="tab">
                <div class="name">召修原因</div>
                <div class="value">{{ item.callRepairClassify }}</div>
              </div>
              <div class="tab">
                <div class="name">故障原因</div>
                <div class="value">{{ item.faultReasonAnalysis }}</div>
              </div>
              <div class="tab">
                <div class="name">故障分类</div>
                <div class="value">{{ item.faultReason }}</div>
              </div>
              <div class="tab">
                <div class="name">时间</div>
                <div class="value">{{ item.date }} {{ item.time }}</div>
              </div>
              <div class="tab">
                <div class="name">结果</div>
                <div class="value">{{ item.state }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <circletitle :title="'3. 维修报表  '"></circletitle>
        <div class="table">
          <div class="list">
            <div class="item" v-for="(item, index) in $data.twoTab.weixiu_3" :key="index">
              <div class="tab">
                <div class="name">电梯名称</div>
                <div class="value">
                  {{ $data.headerTab.projectName }} {{ item.elevatorName }}
                </div>
              </div>
              <div class="tab">
                <div class="name">距上次保养</div>
                <div class="value">{{ item.lastMaintDuration }}</div>
              </div>
              <div class="tab">
                <div class="name">维保时长</div>
                <div class="value">{{ item.stopDuration }}</div>
              </div>

              <div class="tab">
                <div class="name">时间</div>
                <div class="value">{{ item.date }} {{ item.time }}</div>
              </div>
              <div class="tab">
                <div class="name">结果</div>
                <div class="value">{{ item.state }}</div>
              </div>
            </div>
            <div class="nodata" v-if="!$data.twoTab.weixiu_3.length">
              暂无内容
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <circletitle :title="'4.换件报表'"></circletitle>
        <div class="table">
          <div class="list">
            <div class="nodata" v-if="!$data.twoTab.huanjian_4.length">
              暂无内容
            </div>
            <div class="item" v-for="(item, index) in $data.twoTab.huanjian_4" :key="index">
              <div class="tab">
                <div class="name">电梯名称</div>
                <div class="value">
                  {{ $data.headerTab.projectName }} {{ item.elevatorName }}
                </div>
              </div>
              <div class="tab">
                <div class="name">零件</div>
                <div class="value">{{ item.partInstanceName }}</div>
              </div>
              <div class="tab">
                <div class="name">数量</div>
                <div class="value">{{ item.replaceCount }}</div>
              </div>
              <div class="tab">
                <div class="name">时间</div>
                <div class="value">{{ item.date }} {{ item.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="h5loading" id="h5loading" v-if="h5loading">
    <div class="load"></div>
  </div>
</template>

<script setup>
import circletitle from './components/circletitle.vue'
import pie from './components/pie.vue'
import { useRoute, useRouter } from 'vue-router'
import graph from './components/graph.vue'
import graph2 from './components/graph2.vue'

import { getDataApi, getBasicReport } from './../api/module/dataPlatform'
import * as echarts from 'echarts'
import {
  ref,
  computed,
  onMounted,
  reactive,
  nextTick
} from 'vue'

const h5loading = ref(false)
const test = ref('test3')
const stacky = ref(null);
const buglist = reactive([{
  name: '机械故障',
  value: 22
},
{
  name: '电梯故障',
  value: 22
},
{
  name: '其他故障',
  value: 22
},
])
const repairList = reactive([{
  name: '门开不关',
  value: 22
},
{
  name: '停电',
  value: 22
},
{
  name: '无信号',
  value: 22
},
])
const bugreason = reactive([{
  name: '地坎卡东西',
  value: 22
},
{
  name: '小区跳闸',
  value: 22
},
{
  name: '电线松动',
  value: 22
}
])
const bugType = reactive([{
  name: '人为使用',
  value: 33
},
{
  name: '其他',
  value: 22
}
])
const complainReason = reactive([{
  name: '服务质量',
  value: 33
},
{
  name: '服务态度',
  value: 22
}
])
const $data = reactive({
  trie: {
    week: {
      title: 'weekly report',
      icon1: 'WEEKLY',
      icon2: 'NEWS',
      titleLabel: '电梯服务周报',
      word: '周'

    },
    month: {
      title: 'monthly report',
      icon1: 'MONTHLY',
      icon2: 'NEWS',
      titleLabel: '电梯服务月报',
      word: '月'

    }
  },
  orderType: {
    title: '',
    icon1: '',
    icon2: '',
    titleLabel: '',
    word: ''
  },
  time: '2022.04.08-2022.04.15',
  headerTab: {
    projectName: '',
    projectRepair: '',
    support: '',
    save: ''
  },
  oneTab: {
    kunti_1: {
      buglist: [{
        name: '机械故障',
        value: 22
      },
      {
        name: '电梯故障',
        value: 22
      },
      {
        name: '其他故障',
        value: 22
      },
      ],
      kunren: '',
      jiejiu: '',
      jiuyuan: '',
      xianchang: ''
    },
    guzhang_2: {
      repairList: [],
      bugReason: [],
      bugType: [],
      bugTimes: '',
      resolved: '',
      bugRate: ''
    },
    wulianwang_3: {
      runTimes: '',
      runTime: '',
      openTimes: '',
      runMile: '',

      internet_1: {
        title: '',
        legendList: [],
        xData: [],
        yData1: [],
        yData2: [],
      },
      internet_2: {
        title: '',
        legendList: [],
        xData: [],
        yData1: [],
        yData2: [],
      },
      internet_3: {
        title: '',
        legendList: [],
        xData: [],
        yData1: [],
        yData2: [],
      },
      futiRunTime: '',

    },
    fuwu_4: {


      service_1: {
        title: '',
        legendList: [],
        xData: [],
        yData1: [],
        yData2: [],
      },
      service_2: {
        title: '',
        legendList: [],
        xData: [],
        yData1: [],
        yData2: [],
      },
      service_3: {
        title: '',
        legendList: [],
        xData: [],
        yData1: [],
        yData2: [],
      },
      service_4: {
        title: '',
        legendList: [],
        xData: [],
        yData1: [],
        yData2: [],
      },
      service_5: {
        title: '',
        legendList: [],
        xData: [],
        yData1: [],
        yData2: [],
      },
      service_6: {
        title: '',
        legendList: [],
        xData: [],
        yData1: [],
        yData2: [],
      },
      service_7: {
        title: '',
        legendList: [],
        xData: [],
        yData1: [],
        yData2: [],
      },
      service_8: {
        title: '',
        legendList: [],
        xData: [],
        yData1: [],
        yData2: [],
      },
      serverTime: '',//总服务
      clearTime: '',//清洁大保养
      repareTime: '',//维修大保养
      needRepairTime: '',//按需维保
      repareServerTime: '', //维修服务
      checkServerTime: '',//体检服务
      installInterTime: '',//安装物联网
      changeTimes: '',//换件
    },
    tousu_5: {

    }

  },
  twoTab: {
    yingji_1: [],
    zhaoxiu_2: [],
    weixiu_3: []
    ,
    huanjian_4: [],

  }

})

const showPie1 = ref(false)
const showPie2 = ref(false)
const showPie3 = ref(false)
const showPie4 = ref(false)
let route = useRoute()
let router = useRouter()
onMounted(() => {
  console.log(' h5加载完毕', route, router);
  h5loading.value = true
  setTimeout(() => {
    const token = route.query.token
    const freg = route.query.db_freqCode
    const projectid = route.query.db_projectId
    const time = route.query.db_time  // new Date().getTime() //


    // if (token && freg && projectid && time) {
    //     getBasicReport({ db_freqCode: freg, db_projectId: projectid, db_time: time, token }, token).then(res => {
    //         console.log(res)
    //         if (res.data.data?.reportName) {
    //             $data.time = res.data.data.reportTime;
    //             $data.headerTab.projectName = res.data.data.projectName;
    //             $data.headerTab.projectRepair = res.data.data.insuCompany;
    //             $data.headerTab.support = res.data.data.techSupport;
    //             $data.headerTab.save = res.data.data.usedCompany;

    //         }
    //     })
    // } else {
    //     return
    // }


    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzUiLCJleHAiOjE2ODgzNDc4Njl9.RJ89ff8yOvywtOceq3-jeeAXwBoZ7ljQ7NEzcTFZK6Q'
    // const projectid = '1524688836977501090'
    // const freg = '02'
    switch (freg) {
      case '02': {
        $data.orderType.title = $data.trie.week.title
        $data.orderType.icon1 = $data.trie.week.icon1
        $data.orderType.icon2 = $data.trie.week.icon2
        $data.orderType.titleLabel = $data.trie.week.titleLabel
        $data.orderType.word = $data.trie.week.word

        break
      }
      case '03': {
        $data.orderType.title = $data.trie.month.title
        $data.orderType.icon1 = $data.trie.month.icon1
        $data.orderType.icon2 = $data.trie.month.icon2
        $data.orderType.titleLabel = $data.trie.month.titleLabel
        $data.orderType.word = $data.trie.month.word
        break
      }
    }
    getBasicReport({ db_freqCode: freg, db_projectId: projectid, db_time: time, token }, token).then(res => {
      console.log(res)
      if (res.data.data?.projectName) {
        $data.time = res.data.data.reportTime;
        $data.headerTab.projectName = res.data.data.projectName;
        $data.headerTab.projectRepair = res.data.data.maintCompany;
        $data.headerTab.support = res.data.data.techSupport;
        $data.headerTab.save = res.data.data.insuCompany;

      }
    })
    getDataApi([
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A041', count: '', regionCode: '', iscurrentDate: '0' },//困人次数

      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A042', count: '', regionCode: '', iscurrentDate: '0' },//救援人员到达现场平均用时（分钟）
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A043', count: '', regionCode: '', iscurrentDate: '0' },//现场实施救援平均用时（分钟）

      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A044', count: '', regionCode: '', iscurrentDate: '0' },//困人原因分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A045', count: '', regionCode: '', iscurrentDate: '0' },//故障分类（取召修工单（任务）里的导致故障原因）
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A046', count: '', regionCode: '', iscurrentDate: '0' },//直梯总运行次数
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A047', count: '', regionCode: '', iscurrentDate: '0' },//直梯总运行时长
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A048', count: '', regionCode: '', iscurrentDate: '0' },//直梯总开门次数
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A049', count: '', regionCode: '', iscurrentDate: '0' },//直梯总运行里程
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A019', count: '', regionCode: '', iscurrentDate: '0' },//召修原因分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A020', count: '', regionCode: '', iscurrentDate: '0' },//召修原因分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A016', count: '', regionCode: '', iscurrentDate: '0' },//解救被困人员
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A050', count: '', regionCode: '', iscurrentDate: '0' },//  直梯周开门次数，日运行里程分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A051', count: '', regionCode: '', iscurrentDate: '0' },//扶梯总运行时长
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A052', count: '', regionCode: '', iscurrentDate: '0' },// 扶梯周运行时长分布

      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A007', count: '', regionCode: '', iscurrentDate: '0' },//  总服务时长
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A054', count: '', regionCode: '', iscurrentDate: '0' },//  清洁大保养服务总时长
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A055', count: '', regionCode: '', iscurrentDate: '0' },// 每台电梯清洁大保养服务时长分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A056', count: '', regionCode: '', iscurrentDate: '0' },//  换修大保养服务总时长
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A057', count: '', regionCode: '', iscurrentDate: '0' },// 每台电梯换修大保养服务时长分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A058', count: '', regionCode: '', iscurrentDate: '0' },//  按需维保服务总时长
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A059', count: '', regionCode: '', iscurrentDate: '0' },// 1每台电梯常规大保养服务时长分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A060', count: '', regionCode: '', iscurrentDate: '0' },// 2维修服务总时长
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A061', count: '', regionCode: '', iscurrentDate: '0' },// 3每台梯维修服务时长分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A062', count: '', regionCode: '', iscurrentDate: '0' },// 体检服务总时长
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A063', count: '', regionCode: '', iscurrentDate: '0' },// 每台梯体检服务时长分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A064', count: '', regionCode: '', iscurrentDate: '0' },// 安装物联网服务总时长

      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A065', count: '', regionCode: '', iscurrentDate: '0' },// 每台梯物联网服务时长分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A069', count: '', regionCode: '', iscurrentDate: '0' },// 应急处置报表

      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A070', count: '', regionCode: '', iscurrentDate: '0' },// 召修报表

      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A071', count: '', regionCode: '', iscurrentDate: '0' },// 维保报表
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A072', count: '', regionCode: '', iscurrentDate: '0' },// 换件报表
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A103', count: '', regionCode: '', iscurrentDate: '0' },// 直梯周运行次数，周运行时长分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A009', count: '', regionCode: '', iscurrentDate: '0' },// 故障次数
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A036', count: '', regionCode: '', iscurrentDate: '0' },// 处理完成次数
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A012', count: '', regionCode: '', iscurrentDate: '0' },// 故障率
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A074', count: '', regionCode: '', iscurrentDate: '0' },// 换件类型分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A077', count: '', regionCode: '', iscurrentDate: '0' },// 服务类型分布
      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A011', count: '', regionCode: '', iscurrentDate: '0' },// 换件数

      { freq: freg, dateTime: time, projectid: projectid, funcType: 'A112', count: '', regionCode: '', iscurrentDate: '0' },// 扶梯开门次数





    ], token).then(res => {
      h5loading.value = false
      if (res?.data?.data) {
        const data = res.data.data;
        console.log(data.A050?.data.name)
        $data.oneTab.kunti_1.kunren = data.A041?.data.data || 0
        $data.oneTab.kunti_1.jiejiu = data.A016?.data.data || 0
        $data.oneTab.kunti_1.jiuyuan = data.A042?.data.data || 0
        $data.oneTab.kunti_1.xianchang = data.A043?.data.data || 0
        $data.oneTab.kunti_1.buglist = data.A044?.data.data || []
        showPie1.value = $data.oneTab.kunti_1.buglist.some(item => item.count)
        $data.oneTab.guzhang_2.bugType = data.A045?.data.data || []
        showPie4.value = $data.oneTab.guzhang_2.bugType.some(item => item.count)
        $data.oneTab.guzhang_2.bugReason = data.A020?.data.data || []
        showPie3.value = $data.oneTab.guzhang_2.bugReason.some(item => item.count)
        $data.oneTab.guzhang_2.repairList = data.A019?.data.data || []
        showPie2.value = $data.oneTab.guzhang_2.repairList.some(item => item.count)
        console.log($data.oneTab.guzhang_2.repairList)
        $data.oneTab.wulianwang_3.runTimes = data.A046?.data.data || 0
        $data.oneTab.wulianwang_3.runTime = data.A047?.data.data || 0
        $data.oneTab.wulianwang_3.openTimes = data.A048?.data.data || 0
        $data.oneTab.wulianwang_3.runMile = data.A049?.data.data || 0
        data.A050?.data.data.forEach(item => {//internet-2
          $data.oneTab.wulianwang_3.internet_2.xData.push(item.elevatorName)
          $data.oneTab.wulianwang_3.internet_2.yData1.push(parseInt(item.doorTimes))
          $data.oneTab.wulianwang_3.internet_2.yData2.push(parseInt(item.runningMiles))
        })
        $data.oneTab.wulianwang_3.internet_2.title = data.A050?.data.name
        data.A077?.data.data.forEach(item => {//service_1  
          $data.oneTab.fuwu_4.service_1.xData.push(item.name)
          $data.oneTab.fuwu_4.service_1.yData1.push(parseInt(item.data))
          $data.oneTab.fuwu_4.service_1.yData2.push('')
        })
        $data.oneTab.fuwu_4.service_1.title = data.A055?.data.name //data.A077?.data.name
        data.A103?.data.data.forEach(item => {//internet-1
          $data.oneTab.wulianwang_3.internet_1.xData.push(item.elevatorName)
          $data.oneTab.wulianwang_3.internet_1.yData1.push(parseInt(item.runningTimes))
          $data.oneTab.wulianwang_3.internet_1.yData2.push(parseInt(item.runningDuration))
        })
        $data.oneTab.wulianwang_3.internet_1.title = data.A103?.data.name
        $data.oneTab.wulianwang_3.futiRunTime = data.A051?.data.data
        data.A052?.data.data.forEach(item => {//internet-3
          $data.oneTab.wulianwang_3.internet_3.xData.push(item.elevatorName)
          $data.oneTab.wulianwang_3.internet_3.yData1.push(parseInt(item.doorTimes))
          $data.oneTab.wulianwang_3.internet_3.yData2.push(parseInt(item.runningMiles))
        })
        $data.oneTab.wulianwang_3.internet_3.title = data.A052?.data.name
        $data.oneTab.fuwu_4.serverTime = data.A007?.data.data
        $data.oneTab.fuwu_4.clearTime = data.A054?.data.data


        data.A055?.data.data.forEach(item => {//server-2
          $data.oneTab.fuwu_4.service_2.xData.push(item.elevatorName)
          $data.oneTab.fuwu_4.service_2.yData1.push(parseInt(item.serviceDuration))
          $data.oneTab.fuwu_4.service_2.yData2.push('')
        })
        $data.oneTab.fuwu_4.service_2.title = data.A055?.data.name
        $data.oneTab.fuwu_4.repareTime = data.A056?.data.data
        data.A057?.data.data.forEach(item => {//server-3
          $data.oneTab.fuwu_4.service_3.xData.push(item.elevatorName)
          $data.oneTab.fuwu_4.service_3.yData1.push(parseInt(item.serviceDuration))
          $data.oneTab.fuwu_4.service_3.yData2.push('')
        })
        $data.oneTab.fuwu_4.service_3.title = data.A057?.data.name
        $data.oneTab.fuwu_4.needRepairTime = data.A058?.data.data
        data.A059?.data.data.forEach(item => {//server-4
          $data.oneTab.fuwu_4.service_4.xData.push(item.elevatorName)
          $data.oneTab.fuwu_4.service_4.yData1.push(parseInt(item.serviceDuration))
          $data.oneTab.fuwu_4.service_4.yData2.push('')
        })
        $data.oneTab.fuwu_4.service_4.title = data.A059?.data.name
        $data.oneTab.fuwu_4.repareServerTime = data.A060?.data.data
        data.A061?.data.data.forEach(item => {//server-5
          $data.oneTab.fuwu_4.service_5.xData.push(item.elevatorName)
          $data.oneTab.fuwu_4.service_5.yData1.push(parseInt(item.serviceDuration))
          $data.oneTab.fuwu_4.service_5.yData2.push('')
        })
        $data.oneTab.fuwu_4.service_5.title = data.A061?.data.name
        $data.oneTab.fuwu_4.checkServerTime = data.A062?.data.data
        data.A063?.data.data.forEach(item => {//server-6
          $data.oneTab.fuwu_4.service_6.xData.push(item.elevatorName)
          $data.oneTab.fuwu_4.service_6.yData1.push(parseInt(item.serviceDuration))
          $data.oneTab.fuwu_4.service_6.yData2.push('')
        })
        $data.oneTab.fuwu_4.service_6.title = data.A063?.data.name

        $data.oneTab.fuwu_4.installInterTime = data.A064?.data.data
        data.A065?.data.data.forEach(item => {//server-7
          $data.oneTab.fuwu_4.service_7.xData.push(item.elevatorName)
          $data.oneTab.fuwu_4.service_7.yData1.push(parseInt(item.serviceDuration))
          $data.oneTab.fuwu_4.service_7.yData2.push('')
        })
        $data.oneTab.fuwu_4.service_7.title = data.A065?.data.name
        $data.oneTab.fuwu_4.changeTimes = data.A011?.data?.data

        $data.twoTab.yingji_1.push(...data.A069.data.data)
        $data.twoTab.zhaoxiu_2.push(...data.A070.data.data)
        $data.twoTab.weixiu_3.push(...data.A071.data.data)
        $data.twoTab.huanjian_4.push(...data.A072.data.data)
        $data.oneTab.guzhang_2.bugRate = data.A012?.data?.data || 0
        $data.oneTab.guzhang_2.resolved = data.A036?.data?.data
        $data.oneTab.guzhang_2.bugTimes = data.A009?.data?.data
      }
    })
  })


})

</script>

<style lang="scss" scoped>
:deep() .pieitem {
  margin-bottom: 20px;
}

.h5loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  color: #fff;
  font-size: 16px;
  text-align: center;
  height: 100vh;

  .load {
    width: 60px;
    margin: auto;
    margin-top: 50%;
    height: 60px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top: 3px solid #b149ff;
    border-left: 3px solid #b149ff;
    border-right: 3px solid #b149ff;
    animation: rotate 1s infinite ease-in-out;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
}

* {
  margin: 0;
  padding: 0;
}

.main {
  user-select: none;
  width: 100vw;
  background-color: #000125;

  .index {
    /* height: 549px; */
    padding-bottom: 100px;
    background: url('../public/images/h5/images/bg2.png') no-repeat;
    width: 100%;
    background-size: 100% 537px;
    box-sizing: border-box;

    .top {
      display: flex;
      justify-content: space-between;
      padding-top: 20.5px;

      .logo {
        width: 136px;
        height: 27.5px;
        margin-left: 19.5px;
        background: url('../public/images/h5/images/logo2.png') no-repeat center/cover;
      }

      .en {
        color: #fff;
        font-size: 12px;
        letter-spacing: 2px;
        margin-right: 17.5px;
      }
    }

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 48px;

      .title-desc {
        color: #fff;
        font-size: 37.5px;
        margin-left: 20px;
        letter-spacing: 1.5px;
      }

      .title-icon {
        margin-right: 51.5px;
        width: 60.5px;
        height: 38.5px;
        background: linear-gradient(#006cff, #05f0ff);
        font-size: 8px;
        line-height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;

        view {
          letter-spacing: 2px;
          transform: scale(0.8);
        }
      }
    }

    .time {
      width: 222px;
      height: 30.5px;
      line-height: 30.5px;
      margin-left: 19px;
      color: #fff;
      text-indent: 12.5px;
      margin-top: 18px;
      background: linear-gradient(to right,
          rgba(255, 202, 40, 1),
          rgba(0, 1, 37, 1));
    }

    .project {
      color: #fff;
      width: 341px;
      height: 286px;
      background: url('../public/images/h5/images/card.png') no-repeat center/cover;
      margin: 59.5px auto 0;

      .item {
        display: flex;
        position: relative;
        padding-left: 20px;
        font-size: 16px;
        padding: 22px 0px 22px 40px;
      }

      .item:first-child {
        padding-top: 40px;
      }

      .item:first-child::before {
        top: 40px;
      }

      .item::before {
        content: '';
        position: absolute;
        top: 22px;
        left: 10px;
        width: 6px;
        height: 25px;
        background-color: #6427de;
      }
    }

    /* 总览 */
    .one {
      width: 205.5px;
      height: 39px;
      font-size: 25px;
      line-height: 39px;
      font-weight: bold;
      color: #fff;
      background: url('../public/images/h5/images/titlebg.png') no-repeat center/cover;
      margin: 48px auto 42px;
      text-align: center;
    }

    .content {
      width: calc(100% - 36px);
      margin: 0 auto;
      margin-bottom: 51px;
      color: #fff;
      background: #001751;
      padding-top: 33.5px;

      .tabflex {
        display: flex;
        flex-wrap: wrap;
        padding-top: 40px;
        width: 100%;

        .item {
          width: 50%;
          box-sizing: border-box;
          margin-bottom: 57px;

          .num {
            font-size: 35px;
            font-weight: bold;
            padding-bottom: 9px;
            text-align: center;
            overflow: hidden;
          }
        }

        .kunren .num {
          color: #006cff;
        }

        .jiejiu .num {
          color: #18c097;
        }

        .jiuyuan .num {
          color: #006cff;
        }

        .shijiu .num {
          color: #006cff;
        }

        .label,
        .unit {
          text-align: center;
          overflow: hidden;
          font-size: 15px;
        }

        .item:nth-child(2n) {
          border-left: 1px solid rgba(255, 255, 255, 0.3);
        }
      }

      .tabflex.bug .item {
        width: 33%;
        box-sizing: border-box;
      }

      .tabflex.internet .item {
        width: 50%;
        box-sizing: border-box;
      }

      .tabflex.zhiti .num {
        color: #006cff;
      }

      .tabflex.futi {
        padding-top: 20px;

        .item {
          margin: 0 auto;
          width: 100%;
          display: flex;
          justify-content: center;
          padding-bottom: 10px;
        }
      }

      .content-type {
        margin-top: 24px;

        .icon {
          width: 32px;
          height: 32px;
          margin: 0 auto;
          background: url('../public/images/h5/images/zhiti.png') no-repeat;
        }

        text-align: center;
        font-size: 18px;
      }

      .content-type.futi {
        margin-top: 40px;

        icon {
          background: url('../public/images/h5/images/futi.png') no-repeat;
        }
      }

      .times .num,
      .rate .num {
        color: #006cff;
      }

      .resolved .num {
        color: #18c097;
      }

      .tabflex.bug .item:not(:first-child) {
        border-left: 1px solid rgba(255, 255, 255, 0.3);
      }

      .reasonlist {
        display: flex;
        font-size: 13px;
        padding-bottom: 30px;
        padding-top: 10px;

        .desc {
          width: 70px;
          justify-content: left;
          margin-left: 20px;
        }

        .list {
          .num {
            font-size: 20px;
          }
        }
      }

      .table {
        width: 100%;
        box-sizing: border-box;
        margin-top: 37px;

        .list {
          counter-reset: count;
          list-style: none;

          .nodata {
            text-align: center;
            padding-bottom: 30px;
          }

          .item {
            position: relative;
            padding: 20px 0;
            background-color: #013f86;
            counter-increment: count;
            margin-bottom: 2px;

            .tab {
              display: flex;
              line-height: 22px;
              margin-bottom: 4px;
              box-sizing: border-box;
              width: 100%;
              padding: 0 10px;

              .name {
                font-size: 16px;
                color: #fff;
                width: 110px;
                white-space: nowrap;
                box-sizing: border-box;
                padding-left: 30px;
              }

              .value {
                color: #c8acd5;
                font-size: 14px;
                width: calc(100% - 110px);
                line-height: 22px;
                // margin-left: 5px;
              }
            }
          }

          .item::before {
            content: counter(count, decimal) ' . ';
            color: #c8acd5;
            font-size: 15px;
            position: absolute;
            top: 23px;
            left: 15px;
          }
        }
      }

      .table:last-child .value {
        margin-left: 5px;
      }
    }
  }
}
</style>