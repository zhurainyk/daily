<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi2"
      :select-count-by-condition-api="selectCountByConditionApi2"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :show-new-porp="false"
      :pagesizes="[100, 200, 300, 400]"
      :default-page-size="100"
      :show-action-detail-porp="true"
      :show-action-edit-porp="false"
      :show-action-delete-porp="false"
      :show-h-check-box-porp="true"
      :isClearCheckBox="true"
      :showResetSearch="false"
      :showActionPorp="false"
      exportExcelName="电梯物联网事件统计"
      dbkey="eventmanage"
      @detail-fn="detailLog"
    >
      <!-- <template #headpriority="{ scope }">
        <span>{{ event_priority[scope.row['priority']] }}</span>
      </template> -->
      <template #searchHead="{ selectedList, exportExcel }">
        <div>
          <!-- <el-button type="primary" @click="resetElevator(selectedList)"
            >重置</el-button
          >
          <el-button type="primary" @click="sendEvent(selectedList)"
            >模拟事件</el-button
          > -->
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </div>
      </template>
    </ListComponet>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'

import { ElMessage, ElMessageBox } from 'element-plus'
import {
  selectByConditionApi2,
  selectCountByConditionApi2,
  resetByIdsApi
} from '@/api/module/elevatorConfig'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getProjectList } from '@/api/module/customerBI'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = {
      db_supplierCode: '02',
      ui_statisticTime: moment().startOf('week').format('YYYY-MM-DD'),
      db_eventCode: ''
    }
    const event_priority = ref({})
    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'ui_projectNum',
        name: '编号'
      },
      {
        dbkey: 'db_registCode',
        name: '注册码'
      },
      {
        dbkey: 'db_eventCode',
        name: '事件',
        filters: {
          '0101': '困人',
          '0202': '电梯运行时安全回路断路',
          '0203': '轿厢在开锁区域外停止',
          '0401': '停止服务',
          '0402': '检修',
          '0204': '蹲底',
          '0205': '冲顶',
          '0313': '物联网设备长时间离线',
          '0314': '电梯长时间停留楼层',
          '0315': '疑似故障停梯',
          '0207': '轿厢意外移动',
          '0201': '开关门故障',
          '0317': '电动车告警'
        },
        fn: args => {
          const obj = {
            '0101': '困人',
            '0202': '电梯运行时安全回路断路',
            '0203': '轿厢在开锁区域外停止',
            '0401': '停止服务',
            '0402': '检修',
            '0204': '蹲底',
            '0205': '冲顶',
            '0313': '物联网设备长时间离线',
            '0314': '电梯长时间停留楼层',
            '0315': '疑似故障停梯',
            '0207': '轿厢意外移动',
            '0201': '开关门故障',
            '0317': '电动车告警'
          }
          return obj[args.db_eventCode]
        }
      },
      {
        dbkey: 'db_count',
        name: '数量'
        // fn: args => {
        //   return event_priority.value[args.priority]
        // }
      },
      {
        dbkey: 'ui_supplierName',
        name: '供应商'
      },
      {
        dbkey: 'ui_statisticTime',
        name: '日期'
      }
    ]
    const addModelProp = []
    const searchWhereModelProp = [
      {
        name: '供应商',
        dbkey: 'db_supplierCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '项目名称',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '电梯注册码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '日期',
        dbkey: 'ui_statisticTime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        multipledata: '',
        isRules: true,
        list: []
      },
      {
        name: '事件类型',
        dbkey: 'db_eventCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [
          {
            label: '困人',
            value: '0101'
          },
          {
            label: '电梯运行时安全回路断路',
            value: '0202'
          },
          {
            label: '轿厢在开锁区域外停止',
            value: '0203'
          },
          {
            label: '停止服务',
            value: '0401'
          },
          {
            label: '检修',
            value: '0402'
          },
          {
            label: '蹲底',
            value: '0204'
          },
          {
            label: '冲顶',
            value: '0205'
          },
          {
            label: '物联网设备长时间离线',
            value: '0313'
          },
          {
            label: '电梯长时间停留楼层',
            value: '0314'
          },
          {
            label: '疑似故障停梯',
            value: '0315'
          },
          {
            label: '轿厢意外移动',
            value: '0207'
          },
          {
            label: '开关门故障',
            value: '0201'
          },
          {
            label: '电动车告警',
            value: '0317'
          }
        ]
      }
    ]
    const $router = useRouter()
    const detailLog = data => {
      $router.push({
        name: menulist.LogManagement.name,
        params: {
          id: data.elevatorId
        }
      })
    }
    onBeforeMount(() => {
      selectByAllTypeApi({ constType: 'provider_code' }).then(x => {
        console.log(x.data.data)
        const data = x.data?.data
        if (Object.keys(data).length) {
          const list = []
          Object.keys(data).forEach(key => {
            const obj = {
              label: data[key],
              value: key
            }
            if (obj.value == '03') {
            } else {
              searchWhereModelProp.forEach(item => {
                if (item.dbkey === 'db_supplierCode') {
                  item.list.push(obj)
                }
              })
            }
          })
        }
      })

      selectByAllApi({ tableName: 'Elevator_Project' }).then(x => {
        const temp = searchWhereModelProp.find(x => x.dbkey == 'db_projectId')
        Object.entries(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
    })
    const resetElevator = args => {
      if (args.length > 0) {
        resetByIdsApi({
          eventType: '05',
          eventData: args.map(x => {
            return {
              elevId: x.elevatorId,
              eventCode: '0699'
            }
          })
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
          } else {
            ElMessage.error('失败')
          }
        })
      }
    }
    const sendEvent = args => {
      if (args.length <= 0) return
      ElMessageBox.prompt('输入事件码', '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value) {
          resetByIdsApi({
            eventType: '05',
            eventData: args.map(x => {
              return {
                elevId: x.elevatorId,
                eventCode: value
              }
            })
          }).then(x => {
            if (x.data.success) {
              ElMessage.success('成功')
            } else {
              ElMessage.error('失败')
            }
          })
        }
      })
    }
    return {
      modelData,
      selectByConditionApi2,
      selectCountByConditionApi2,
      detailLog,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      event_priority,
      resetElevator,
      sendEvent
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  background-color: white;

  .page-body {
    /* height: calc(100% - 220px); */
    .page-body-head {
      .search-where {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
