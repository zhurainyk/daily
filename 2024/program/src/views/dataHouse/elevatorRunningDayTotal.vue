<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="[]"
      :search-where-model-prop="searchWhereModelProp"
      :maxwidth="true"
      :showNewPorp="false"
      :showActionPorp="false"
    >
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import {
  selectByConditionApi,
  selectCountByConditionApi
} from '@/api/module/runningdaytotal'
import { selectByConditionApi as selectByConditionForelevatorApi } from '@/api/module/projectManage'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_Runningdaytotal } from '@/module.ts/Elevator_Runningdaytotal'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Runningdaytotal()

    const tableMap = [
      {
        dbkey: 'ui_projectNum',
        name: '电梯名'
      },
      {
        dbkey: 'db_registCode',
        name: '注册代码'
      },
      {
        dbkey: 'ui_genTime',
        name: '统计时间'
      },
      {
        dbkey: 'db_lastRunningMileage',
        name: '运行里程(m)'
      },
      {
        dbkey: 'db_lastRunningDuration',
        name: '运行时间(s)'
      },
      {
        dbkey: 'db_lastRunningTimes',
        name: '启停次数'
      },
      {
        dbkey: 'db_lastDoorTimes',
        name: '开关门次数'
      }
    ]
    const addModelProp = []
    const searchWhereModelProp = reactive([
      {
        name: '注册码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '时间',
        dbkey: 'ui_start_genTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_genTime = args[0]
            dialogModel.ui_end_genTime = args[1]
          } else {
            dialogModel.ui_start_genTime = ''
            dialogModel.ui_end_genTime = ''
          }
        }
      }
    ])

    const sysList: any = ref([])
    onMounted(() => {
      // selectByConditionForelevatorApi({
      //   ui_type: 'A0',
      //   ui_pageSize: 0,
      //   ui_currentPage: 0
      // }).then(x => {
      //   const temp: any = searchWhereModelProp.find(
      //     x => x.dbkey == 'db_projectId'
      //   )
      //   const { objectList, condition } = x.data.data
      //   objectList.forEach((y: IElevator_Project) => {
      //     temp.list.push({
      //       value: y.db_id,
      //       label: y.db_id_proName
      //     })
      //   })
      // })
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
