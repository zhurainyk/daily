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
} from '@/api/module/forecastdamage'
import { selectByConditionApi as selectByConditionForelevatorApi } from '@/api/module/projectManage'
import ListComponet from '@/components/singlelist'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { Elevator_Forecastdamage } from '@/module.ts/Elevator_Forecastdamage'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Forecastdamage()
    const typelist = ref([])
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
        dbkey: 'db_forecast_damage_type',
        name: '类型',
        computed: value => {
          return typelist.value.find(x => x.value == value)?.label
        }
      },
      {
        dbkey: 'db_sys_description',
        name: '描述'
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
        name: '类型',
        dbkey: 'db_forecast_damage_type',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '时间',
        dbkey: 'db_dayTime',
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
      selectByAllTypeApi({ constType: 'damage_type' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_forecast_damage_type'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          typelist.value.push({
            value: key,
            label: v
          })
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
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
