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
} from '@/api/module/everydaystatus'
import { selectByConditionApi as selectByConditionForelevatorApi } from '@/api/module/projectManage'
import ListComponet from '@/components/singlelist'
import { Elevator_Everydaystatus } from '@/module.ts/Elevator_Everydaystatus'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Everydaystatus()

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
        dbkey: 'db_status',
        name: '状态',
        computed: value => {
          return value == '00' ? '正常' : '不正常'
        }
      },
      {
        dbkey: 'db_sys_description',
        name: '状态描述'
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
        name: '状态',
        dbkey: 'db_status',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            value: '00',
            label: '正常'
          },
          {
            value: '01',
            label: '不正常'
          }
        ]
      },
      {
        name: '时间',
        dbkey: 'ui_end_dayTime',
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
