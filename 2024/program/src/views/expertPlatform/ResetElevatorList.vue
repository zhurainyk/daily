<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :maxwidth="true"
      :search-where-model-prop="searchWhereModelProp"
      :fullscreen="true"
      :pagesizes="[10, 20, 50, 100]"
    >
      <template #actionOhther="{ scope }">
        <span class="edit" @click="resRunTimes(scope)">重置钢丝绳</span>
      </template>
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi
} from '@/api/module/elevator'
import { resetIotDataApi } from '@/api/module/dynamicWorkIt'
import { elevatorTemlepteApi } from '@/api/module/importExcel'
import { selectByConditionApi as selectByConditionForelevatorApi } from '@/api/module/projectManage'
import ListComponet from '@/components/singlelist'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { getProjectMapLoginApi } from '@/api/module/login'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Elevator()

    const currentData: any = {
      db_id: '',
      db_projectId: '',
      db_elevType: '',
      db_categoryCode: '',
      db_usePlaceCode: '',
      db_brandId: '',
      db_modelId: '',
      db_maintModelCode: '',
      db_runMonitorPlanId: '',
      db_videoMonitorPlanId: '',
      db_emergencyPlanId: ''
    }
    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'db_id_projectNum',
        name: '电梯名'
      },
      {
        dbkey: 'db_registCode',
        name: '注册码'
      },
      {
        dbkey: 'db_mapAddr',
        name: '电梯位置'
      },
      {
        dbkey: 'ui_runMonitorPlanName',
        name: '运行监测方案'
      },
      {
        dbkey: 'ui_videoMonitorPlanName',
        name: '视频监控方案'
      },
      {
        dbkey: 'ui_emergencyPlanName',
        name: '应急处置方案'
      }
    ]
    const resRunTimes = arg => {
      console.log(arg)
      resetIotDataApi({ db_elevId: arg.row.db_id }).then(x => {
        if (x.data.success) {
          ElMessage.success('成功')
        } else {
          ElMessage.error('失败')
        }
      })
    }

    const addModelProp = []

    const searchWhereModelProp = reactive([
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
        name: '电梯名称',
        dbkey: 'db_id_projectNum',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '注册码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '96333',
        dbkey: 'db_rescueCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '运行监测',
        dbkey: 'db_runMonitorPlanId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '视频监控方案',
        dbkey: 'db_videoMonitorPlanId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '应急处置方案',
        dbkey: 'db_emergencyPlanId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '品牌',
        dbkey: 'db_brandId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '型号',
        dbkey: 'db_modelId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '维保模式',
        dbkey: 'db_maintModelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '为空选择',
        dbkey: 'ui_queryNullField',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        list: [
          {
            value: 'db_upkeepInitTime',
            label: '电梯保养初始时间'
          },
          {
            value: 'db_lastMaintTime',
            label: '上次维保时间'
          },
          {
            value: 'db_iotIntime',
            label: '物联网入网时间'
          },
          {
            value: 'db_rescueCode',
            label: '96333'
          },
          {
            value: 'db_floors',
            label: '楼层'
          },
          {
            value: 'db_runMonitorPlanId',
            label: '运行监测方案id'
          },
          {
            value: 'db_runMonitorDeviceId',
            label: '运行监测设备id'
          },
          {
            value: 'db_videoMonitorPlanId',
            label: '视频监控方案id'
          },
          {
            value: 'db_videoMonitorDeviceId',
            label: '视频监控设备id'
          },
          {
            value: 'db_emergencyPlanId',
            label: '应急处置方案id'
          },
          {
            value: 'db_emergencyDeviceId',
            label: '应急处置设备id'
          }
        ]
      }
    ])

    onBeforeMount(() => {
      selectByAllApi({ tableName: 'Elevator_IotRunMonitorPlan' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_runMonitorPlanId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllApi({ tableName: 'Elevator_Model' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_modelId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllApi({ tableName: 'Elevator_IotEmergencyPlan' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_emergencyPlanId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllApi({ tableName: 'Elevator_IotVideoMonitorPlan' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_videoMonitorPlanId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

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
      selectByAllApi({ tableName: 'Elevator_Brand' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_brandId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'maint_model' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_maintModelCode'
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
      addModelProp,
      searchWhereModelProp,
      currentData,
      elevatorTemlepteApi,
      resRunTimes
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  :deep().page-body {
    height: calc(100% - 230px);
  }

  :deep().page-search {
    padding-bottom: 10px;
  }

  :deep().dialog-mian {
    &.max-dialog-height {
      height: 100%;
    }
  }
}
</style>
