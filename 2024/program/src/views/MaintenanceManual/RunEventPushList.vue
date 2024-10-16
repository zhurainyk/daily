<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="[]"
      :search-where-model-prop="searchWhereModelProp"
      :showActionPorp="false"
      :showNewPorp="false"
      :maxwidth="true"
    >
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import {
  selectByConditionApi,
  selectCountByConditionApi
} from '@/api/module/runningeventpushlogs'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_RunningEventPushLogs } from '@/module.ts/Elevator_RunningEventPushLogs'
import { getProjectMapLoginApi } from '@/api/module/login'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { getEventCodeNameMap } from '@/api/module/runningData'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_RunningEventPushLogs()

    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        name: '电梯名',
        dbkey: 'ui_elevName'
      },
      {
        dbkey: 'db_registCode',
        name: '电梯注册码'
      },
      {
        dbkey: 'ui_eventName',
        name: '事件名称'
      },
      {
        dbkey: 'ui_eventPriority',
        name: '事件优先级'
      },
      {
        dbkey: 'ui_supplier',
        name: '供应商名称'
      },
      {
        dbkey: 'ui_access',
        name: '接入技术'
      },
      {
        dbkey: 'db_pushGoal',
        name: '推送目标'
      },
      {
        dbkey: 'ui_pushTime',
        name: '推送时间'
      },
      {
        dbkey: 'ui_gatewayTime',
        name: '网关时间'
      },
      {
        dbkey: 'ui_inTime',
        name: '入库时间'
      }
    ]
    const changeProject = (arg, searchWhereModelProp, x, searchWhere) => {
      const elevator = new Elevator_Elevator()
      elevator.db_projectId = arg
      const tempItem = searchWhereModelProp.find(
        (x: any) => x.dbkey == 'db_elevId'
      )
      searchWhere.db_elevId = ''

      if (tempItem) {
        tempItem
        tempItem.list = []
        tempItem.multipledata = []
        if (!arg) return
        selectElevatorByConditionApi({
          ...elevator,
          ui_type: 'A0',
          ui_pageSize: 0,
          ui_currentPage: 0
        }).then(x => {
          const { objectList, condition } = x.data.data
          objectList.forEach(y => {
            tempItem.list.push({
              value: y.db_id,
              label: y.db_id_projectNum,
              db_maintModelCode: y.db_maintModelCode,
              ...y
            })
          })
        })
      }
    }
    const searchWhereModelProp = reactive([
      {
        name: '项目名称',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        changefn: changeProject
      },
      {
        name: '电梯名',
        dbkey: 'db_elevId',
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
        name: '事件名称',
        dbkey: 'db_eventCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '事件优先级',
        dbkey: 'db_eventPriorityCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '供应商名称',
        dbkey: 'db_supplierCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '推送时间',
        dbkey: 'ui_start_pushTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_pushTime = args[0]
            dialogModel.ui_end_pushTime = args[1]
          } else {
            dialogModel.ui_start_pushTime = ''
            dialogModel.ui_end_pushTime = ''
          }
        }
      },
      {
        name: '入库时间',
        dbkey: 'ui_start_inTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_inTime = args[0]
            dialogModel.ui_end_inTime = args[1]
          } else {
            dialogModel.ui_start_inTime = ''
            dialogModel.ui_end_inTime = ''
          }
        }
      },
      {
        name: '网关时间',
        dbkey: 'ui_start_gatewayTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_gatewayTime = args[0]
            dialogModel.ui_end_gatewayTime = args[1]
          } else {
            dialogModel.ui_start_gatewayTime = ''
            dialogModel.ui_end_gatewayTime = ''
          }
        }
      }
    ])

    onMounted(() => {
      getProjectMapLoginApi({}).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_projectId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllApi({ tableName: 'control_sys' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_eventCode'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      getEventCodeNameMap({ ui_type: 'A0' }).then(res => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_eventCode'
        )
        Object.entries(res.data.data).forEach(([k, v]) => {
          temp.list.push({
            label: v,
            value: k
          })
        })
      })
      selectByAllTypeApi({ constType: 'event_priority' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_eventPriorityCode'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'provider_code' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_supplierCode'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
    })
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      tableMap,
      searchWhereModelProp
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  :deep().page-body {
    height: calc(100% - 260px);
  }
}
</style>
