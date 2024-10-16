<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :show-new-porp="false"
      :show-action-porp="false"
      :is-have-export-btn="true"
      export-excel-name="电梯"
    >
      <template #headdb_elevType="{ scope }">
        <span v-if="scope.row.db_elevType == '1'">扶梯</span>
        <span v-else>直梯</span>
      </template>
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import {
  selectByConditionApi,
  selectCountByConditionApi
} from '@/api/module/elevator'
import ListComponet from '@/components/singlelist'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Elevator()
    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'db_innerNum',
        name: '电梯名'
      },
      {
        dbkey: 'db_registCode',
        name: '注册码'
      },
      {
        dbkey: 'db_elevType',
        name: '电梯类型',
        fn: row => {
          return row.db_elevType == '1' ? '扶梯' : '直梯'
        }
      },
      {
        dbkey: 'db_brandElseName',
        name: '电梯品牌'
      },
      {
        dbkey: 'db_modelElseName',
        name: '电梯型号'
      },
      {
        dbkey: 'ui_runMonitorPlanName',
        name: '运行监测方案'
      },
      {
        dbkey: 'ui_videoMonitorPlanName',
        name: '视频监控方案'
      }
      // {
      //   dbkey: 'ui_emergencyPlanName',
      //   name: '应急处置方案'
      // }
    ]
    const addModelProp = []
    const searchWhereModelProp = [
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
        dbkey: 'db_innerNum',
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
      }
      // {
      //   name: '应急处置方案',
      //   dbkey: 'db_emergencyPlanId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // }
    ]
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

      selectByAllApi({ tableName: 'Elevator_Project' }).then(x => {
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
    })
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      tableMap,
      addModelProp,
      searchWhereModelProp
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
