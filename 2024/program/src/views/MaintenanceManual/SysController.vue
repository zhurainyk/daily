<template>
  <div class="reload-memory">
    <div>
      <div v-for="x in list" :key="x.name">
        <div>
          <el-button plain @click="onDclick(x)">{{ x.name }}</el-button>
        </div>
        <div>{{ x.description }}</div>
      </div>

      <div>
        <div>
          <el-button plain @click="dialog.dayStatistics = true"
            >看板统计数据</el-button
          >
        </div>
        <div>
          进行统计所有看板数据，选择日期和统计时长，时长最好只写1天，避免统计量太大导致程序崩溃
        </div>
      </div>

      <div>
        <div>
          <el-button plain @click="dialog.ServiceReportStatisticsData = true"
            >统计服务报告</el-button
          >
        </div>
        <div>单独统计服务报告</div>
      </div>

      <div>
        <div>
          <el-button plain @click="dialog.countDataByProject = true"
            >按项目统计</el-button
          >
        </div>
        <div>单个项目按项目统计</div>
      </div>

      <div>
        <div>
          <el-button plain @click="dialog.revolution = true"
            >周期统计</el-button
          >
        </div>
        <div>运行数据统计按周和月统计，并写入相应周表月表</div>
      </div>

      <div>
        <div>
          <el-button plain @click="dialog.runData = true"
            >物联网运行数据统计</el-button
          >
        </div>
        <div>
          四项数据运行次数、运行时长、开关门次数、运行里程统计到统计周、月表
        </div>
      </div>

      <div>
        <div>
          <el-button plain @click="dialog.serviceDialog = true"
            >服务报告</el-button
          >
        </div>
        <div>生成周或者月服务报告列表， 日期需选择周一或者月一</div>
      </div>

      <div>
        <div>
          <el-button plain @click="dialog.IotVisible = true"
            >物联网统计</el-button
          >
        </div>
        <div>
          统计累计运行数据和距上次维保运行数据，并写入电梯信息里，问题清单KB001
        </div>
      </div>

      <div>
        <div>
          <el-button plain @click="dialog.requstVisible = true"
            >物联网数据汇总</el-button
          >
        </div>
        <div>统计上一周内物联网事件次数（模拟日期选择周一）</div>
      </div>

      <div>
        <div>
          <el-button plain @click="dialog.stopTime = true"
            >停梯时长数据统计</el-button
          >
        </div>
        <div>
          同步工单的停梯时长从停梯时长表中（物业验收时间在选择的时间范围内的工单)
        </div>
      </div>

      <div>
        <div>
          <el-button plain @click="dialog.delData = true"
            >删除无效统计数据</el-button
          >
        </div>
        <div>
          清除看板无效的统计数据，例如总表、按项目统计表、按项目等级统计表
        </div>
      </div>
    </div>

    <!-- <el-button v-for="x in list" :key="x.name" @click="onDclick(x)">{{
      x.name
    }}</el-button> -->
    <!-- <el-button @click="dialog.dayStatistics = true">每日统计</el-button> -->
    <!-- <el-button @click="dialog.revolution = true">周期统计</el-button> -->
    <!-- <el-button @click="dialog.runData = true">物联网运行数据统计</el-button> -->
    <!-- <el-button @click="dialog.serviceDialog = true">服务报告</el-button> -->
    <!-- <el-button @click="dialog.IotVisible = true">物联网统计</el-button> -->
    <!-- <el-button @click="dialog.requstVisible = true">模拟请求</el-button> -->
    <!-- <el-button @click="dialog.stopTime = true">停梯时长数据统计</el-button> -->
    <!-- <el-button @click="dialog.delData = true">删除无效统计数据</el-button> -->
    <!-- <el-button @click="dialog.sysUpdate = true">系统升级</el-button> -->
  </div>
  <el-dialog
    v-if="dialog.dayStatistics"
    v-model="dialog.dayStatistics"
    :width="'550px'"
    :show-close="false"
  >
    <div class="el-dialog-body-main">
      <div>
        <label>时间:</label>
        <el-date-picker
          v-model="data.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <div>
        <label>天数:</label>
        <el-input v-model="data.days"></el-input>
      </div>
      <el-button @click="dialog.dayStatistics = false">取消</el-button>
      <el-button type="primary" @click="onStatistic">确定</el-button>
    </div>
  </el-dialog>
  <el-dialog
    v-if="dialog.revolution"
    v-model="dialog.revolution"
    :width="'550px'"
    :show-close="false"
  >
    <div class="el-dialog-body-main">
      <div>
        <label>时间:</label>
        <el-date-picker
          v-model="data.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <div>
        <label>周期:</label>
        <el-select v-model="data.freq">
          <el-option label="周" value="01" />
          <el-option label="月" value="02" />
          <el-option label="季度" value="03" />
          <el-option label="半年" value="04" />
          <el-option label="年" value="05" />
        </el-select>
      </div>
      <el-button @click="dialog.revolution = false">取消</el-button>
      <el-button type="primary" @click="onStatistic(1)">确定</el-button>
    </div>
  </el-dialog>

  <el-dialog
    v-if="dialog.serviceDialog"
    v-model="dialog.serviceDialog"
    :width="'550px'"
    :show-close="false"
  >
    <div class="el-dialog-body-main">
      <div>
        <label>时间:</label>
        <el-date-picker
          v-model="data.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <el-button @click="dialog.serviceDialog = false">取消</el-button>
      <el-button type="primary" @click="onStatistic(2)">确定</el-button>
    </div>
  </el-dialog>

  <el-dialog
    v-if="dialog.IotVisible"
    v-model="dialog.IotVisible"
    :width="'550px'"
    :show-close="false"
  >
    <div class="el-dialog-body-main">
      <div>
        <label>时间:</label>
        <el-date-picker
          v-model="data.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <div>
        <label>是否:</label>
        <el-select v-model="data.accumulateFlag">
          <el-option label="否" value="00" />
          <el-option label="是" value="01" />
        </el-select>
      </div>
      <el-button @click="dialog.IotVisible = false">取消</el-button>
      <el-button type="primary" @click="onStatistic(3)">确定</el-button>
    </div>
  </el-dialog>

  <el-dialog
    v-if="dialog.requstVisible"
    v-model="dialog.requstVisible"
    :width="'550px'"
    :show-close="false"
  >
    <div class="el-dialog-body-main">
      <div>
        <label>时间:</label>
        <el-date-picker
          v-model="data.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <!-- <div style="padding: 10px 0">
        <label>类型:</label>
        <el-select v-model="data.imitateType">
          <el-option label="客户" value="01" />
          <el-option label="工程" value="02" />
          <el-option label="周报" value="03" />
          <el-option label="月报" value="04" />
          <el-option label="物联网数据汇总" value="05" />
        </el-select>
      </div> -->
      <el-button @click="dialog.requstVisible = false">取消</el-button>
      <el-button type="primary" @click="onStatistic(4)">确定</el-button>
    </div>
  </el-dialog>
  <el-dialog
    v-if="dialog.runData"
    v-model="dialog.runData"
    :width="'550px'"
    :show-close="false"
  >
    <div class="el-dialog-body-main">
      <div>
        <label>时间:</label>
        <el-date-picker
          v-model="data.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <div>
        <label>周期:</label>
        <el-select v-model="data.freq">
          <el-option label="周" value="01" />
          <el-option label="月" value="02" />
        </el-select>
      </div>
      <el-button @click="dialog.runData = false">取消</el-button>
      <el-button type="primary" @click="onStatistic(5)">确定</el-button>
    </div>
  </el-dialog>
  <el-dialog
    v-if="dialog.stopTime"
    v-model="dialog.stopTime"
    :width="'550px'"
    :show-close="false"
  >
    <div class="el-dialog-body-main">
      <div>
        <label>时间:</label>
        <el-date-picker
          v-model="data.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <div>
        <label>天数:</label>
        <el-input v-model="data.days"></el-input>
      </div>
      <el-button @click="dialog.stopTime = false">取消</el-button>
      <el-button type="primary" @click="onStatistic(6)">确定</el-button>
    </div>
  </el-dialog>
  <el-dialog
    v-if="dialog.delData"
    v-model="dialog.delData"
    :width="'550px'"
    :show-close="false"
  >
    <div class="el-dialog-body-main">
      <div>
        <label>时间:</label>
        <el-date-picker
          v-model="data.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <div>
        <label>天数:</label>
        <el-input v-model="data.days"></el-input>
      </div>
      <el-button @click="dialog.delData = false">取消</el-button>
      <el-button type="primary" @click="onStatistic(7)">确定</el-button>
    </div>
  </el-dialog>

  <el-dialog
    v-if="dialog.ServiceReportStatisticsData"
    v-model="dialog.ServiceReportStatisticsData"
    :width="'550px'"
    :show-close="false"
  >
    <div class="el-dialog-body-main">
      <div>
        <label>时间:</label>
        <el-date-picker
          v-model="data.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <div>
        <label>天数:</label>
        <el-input v-model="data.days"></el-input>
      </div>
      <el-button @click="dialog.ServiceReportStatisticsData = false"
        >取消</el-button
      >
      <el-button type="primary" @click="onStatistic(8)">确定</el-button>
    </div>
  </el-dialog>

  <el-dialog
    v-if="dialog.countDataByProject"
    v-model="dialog.countDataByProject"
    :width="'550px'"
    :show-close="false"
  >
    <div class="el-dialog-body-main">
      <div>
        <label>时间:</label>
        <el-date-picker
          v-model="data.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <div>
        <label>天数:</label>
        <el-input v-model="data.days"></el-input>
      </div>
      <div>
        <label>项目:</label>
        <el-select v-model="data.projectId" filterable>
          <el-option
            v-for="x in projects"
            :key="x.value"
            :label="x.label"
            :value="x.value"
          />
        </el-select>
      </div>
      <el-button @click="dialog.countDataByProject = false">取消</el-button>
      <el-button type="primary" @click="onStatistic(9)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  resetCacheApi,
  countCurrentDayDataApi,
  countPeriodDataApi,
  countAnnualInspectDataApi,
  statisticApi,
  countPatrolDataApi,
  countForecastAnalysisDataApi,
  countServiceReportDataApi,
  countIotRunningDataApi,
  clearLocalBiDataApi,
  imitateRequestDataApi,
  countElevatorStatisticInfoApi,
  countStatisticOnlineDataApi,
  countStatisticRunningDatApi,
  countStopDurationDataApi,
  deleteStatisticsDataApi,
  sysUpdateApi,
  updateUntrueEventApi,
  countCompanyDataApi,
  countServiceReportStatisticsDataApi,
  countDataByProjectIdApi
} from '@/api/module/syscontroller'
import { getProjectMapLoginApi } from '@/api/module/login'

export default defineComponent({
  setup() {
    const data = reactive({
      time: '',
      days: '',
      accumulateFlag: '',
      imitateFlag: '',
      freq: '',
      imitateType: '05',
      projectId: ''
    })
    const projects: any = ref([])
    const dialog = reactive({
      dayStatistics: false,
      revolution: false,
      serviceDialog: false,
      IotVisible: false,
      requstVisible: false,
      runData: false,
      stopTime: false,
      delData: false,
      sysUpdate: false,
      ServiceReportStatisticsData: false,
      countDataByProject: false
    })
    const list = reactive([
      {
        api: countCurrentDayDataApi,
        name: '周故障风险统计',
        description:
          '截止到当前的7天内发生两次及以上故障的电梯写入风险表,问题清单 EA001、EA002'
      },
      {
        api: countAnnualInspectDataApi,
        name: '年检',
        description: '判断上次年检到当前时间超过335天的梯写入年检表'
      },
      {
        api: countPatrolDataApi,
        name: '巡查',
        description: '手动把工作项按电梯写入巡检表'
      },
      {
        api: countForecastAnalysisDataApi,
        name: '预测性分析',
        description: '按维保模式把需要维保的电梯写入预测表'
      },
      {
        api: clearLocalBiDataApi,
        name: '清除缓存',
        description:
          '清除看板缓存的数据，点击每日统计按钮执行完会自动清理看板缓存数据'
      },
      {
        api: countElevatorStatisticInfoApi,
        name: '电梯数据统计',
        description:
          '统计运行数据和故障数据写入电梯db_statisticInfo，问题清单一周无运行数据（IA001、IA002、IA003、IA004、IA005）、IB001、IB002'
      },
      {
        api: countStatisticOnlineDataApi,
        name: '电梯离线统计',
        description: '电梯在线分布统计'
      },
      {
        api: sysUpdateApi,
        name: '系统升级',
        description:
          '版本更新前点击一下，系统显示在升级中，如果gateway未升级，升级完成后，需再次点击，系统结束升'
      },
      {
        api: updateUntrueEventApi,
        name: '非正常发生事件统计',
        description:
          '最近一周的事件发生次数超过规定次数即为非正常发生的事件，写入电梯画像'
      },
      {
        api: countCompanyDataApi,
        name: '统计公司数据',
        description: '执行按公司维度的统计，分别统计物业，维保和保险公司的数据.'
      }
    ])
    const onDclick = args => {
      args.api().then(x => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        }
      })
    }
    const onStatistic = args => {
      let temp: any = statisticApi
      if (args == 1) {
        temp = countPeriodDataApi
      } else if (args == 2) {
        temp = countServiceReportDataApi
      } else if (args == 3) {
        temp = countIotRunningDataApi
      } else if (args == 4) {
        temp = imitateRequestDataApi
      } else if (args == 5) {
        temp = countStatisticRunningDatApi
      } else if (args == 6) {
        temp = countStopDurationDataApi
      } else if (args == 7) {
        temp = deleteStatisticsDataApi
      } else if (args == 8) {
        temp = countServiceReportStatisticsDataApi
      } else if (args == 9) {
        if (!data.projectId) {
          ElMessage.warning('请选择项目')
        }
        temp = countDataByProjectIdApi
      }
      temp(data).then(x => {
        if (x.data.success) {
          ElMessage.success('成功')
          dialog.dayStatistics = false
          dialog.revolution = false
          dialog.serviceDialog = false
          dialog.IotVisible = false
          dialog.requstVisible = false
          dialog.runData = false
          dialog.stopTime = false
          dialog.delData = false
          dialog.ServiceReportStatisticsData = false
          dialog.countDataByProject = false
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }
    onMounted(() => {
      getProjectMapLoginApi({}).then(x => {
        if (x.data.success) {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            projects.value.push({
              value: key,
              label: v
            })
          })
        }
      })
    })
    return {
      onDclick,
      list,
      onStatistic,
      data,
      dialog,
      projects
    }
  }
})
</script>

<style lang="scss" scoped>
.sys {
  background: white;
}
.reload-memory {
  width: 100%;
  height: 100%;
  padding: 0 60px 0 60px;
  overflow: auto;
  > div {
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 300px;
      height: 150px;
      margin-right: 80px;
      margin-top: 80px;
      > div:last-child {
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        margin-top: 10px;
        color: #999999;
        word-break: break-all;
        min-height: 100px;
      }
    }
  }
}
.el-dialog-body-main {
  min-height: 250px;
  padding: 50px;
  text-align: center;
  > div {
    width: 100%;
    margin-bottom: 20px;
    > label {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
    }
    :deep().el-input {
      width: 450px !important;
    }
    > div {
    }
  }
}
</style>
