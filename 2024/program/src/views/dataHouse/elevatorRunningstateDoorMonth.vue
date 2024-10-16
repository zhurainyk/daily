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
} from '@/api/module/runningstatedoormonth'
import { selectByConditionApi as selectByConditionForelevatorApi } from '@/api/module/projectManage'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_Runningstatedoormonth } from '@/module.ts/Elevator_Runningstatedoormonth'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Runningstatedoormonth()

    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名'
      },
      {
        dbkey: 'ui_projectNum',
        name: '电梯名'
      },

      {
        dbkey: 'db_registCode',
        name: '注册代码'
      },
      {
        dbkey: 'ui_dayTime',
        name: '统计时间'
      },
      {
        dbkey: 'db_curFloor',
        name: '楼层索引'
      },
      {
        dbkey: 'db_door_total_num',
        name: '开门次数(楼层平均)'
      },
      {
        dbkey: 'db_door_average_num',
        name: '开门次数(整楼平均)'
      },
      {
        dbkey: 'db_month_type',
        name: '频率',
        computed: val => {
          return val == '1' ? '15天' : '30天'
        }
      }
    ]
    const addModelProp = []
    const searchWhereModelProp = reactive([
      {
        name: '项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
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
        list: []
      },
      {
        name: '频率',
        dbkey: 'db_month_type',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            value: '1',
            label: '15天'
          },
          {
            value: '2',
            label: '30天'
          }
        ]
      },
      {
        name: '楼层索引',
        dbkey: 'db_curFloor',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '开门次数(楼层)',
        dbkey: 'db_door_total_num',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '时间',
        dbkey: 'ui_start_dayTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_dayTime = args[0]
            dialogModel.ui_end_dayTime = args[1]
          } else {
            dialogModel.ui_start_dayTime = ''
            dialogModel.ui_end_dayTime = ''
          }
        }
      }
    ])

    const sysList: any = ref([])
    onMounted(() => {
      selectByConditionForelevatorApi({
        ui_type: 'A0',
        ui_pageSize: 0,
        ui_currentPage: 0
      }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_projectId'
        )
        const { objectList, condition } = x.data.data
        objectList.forEach((y: IElevator_Project) => {
          temp.list.push({
            value: y.db_id,
            label: y.db_id_proName
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
