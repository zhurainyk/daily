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
} from '@/api/module/passengersdays'
import { getProjectMapLoginApi } from '@/api/module/login'
import ListComponet from '@/components/singlelist'
import { Elevator_Every_Day_Passengers_Times } from '@/module.ts/Elevator_Every_Day_Passengers_Times'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Every_Day_Passengers_Times()

    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目'
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
        name: '生成日期'
      },
      {
        dbkey: 'db_total_passengers',
        name: '总乘梯人数'
      },
      {
        dbkey: 'db_total_stop_times',
        name: '总启停次数'
      },
      {
        dbkey: 'db_avg_passengers',
        name: '平均乘梯人数'
      },
      {
        dbkey: 'db_type',
        name: '频度',
        computed: value => {
          switch (value) {
            case '00':
              return '天'
            case '01':
              return '周'
            case '02':
              return '月'
            case '03':
              return '年'
            default:
              return '天'
          }
        }
      }
    ]
    const addModelProp = []
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
        name: '项目',
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
        name: '注册代码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '生成日期',
        dbkey: 'db_dayTime',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'date',
        list: [],
        valueFormat: 'YYYY-MM-DD'
      },
      {
        name: '频度',
        dbkey: 'db_type',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            value: '00',
            label: '天'
          },
          {
            value: '01',
            label: '周'
          },
          {
            value: '02',
            label: '月'
          }
          // {
          //   value: '03',
          //   label: '年'
          // }
        ]
      }
    ])

    const sysList: any = ref([])
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
