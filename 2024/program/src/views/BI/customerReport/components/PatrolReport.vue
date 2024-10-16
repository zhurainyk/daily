<template>
  <ListComponet
    :select-by-condition-api="selectByConditionApi"
    :select-count-by-condition-api="selectCountByConditionApi"
    :selectByIdApi="selectByIdApi"
    :model-data="modelData"
    :table-map="tableMap"
    :add-model-prop="addModelProp"
    :search-where-model-prop="searchWhereModelProp"
    :maxwidth="true"
    :show-action-detail-porp="true"
    :show-action-edit-porp="false"
    :show-action-delete-porp="false"
    :show-detail-btn="true"
    :is-have-export-btn="true"
    export-excel-name="巡查报表"
  >
  </ListComponet>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  selectByIdApi
} from '@/api/module/patrol'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_Patrol } from '@/module.ts/Elevator_Patrol'

export default defineComponent({
  components: { ListComponet },
  props: {
    elevType: {
      type: String,
      default: '0'
    }
  },
  setup(props, contx) {
    const modelData = new Elevator_Patrol()
    modelData.db_patrolState = '01'

    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目'
      },
      {
        dbkey: 'db_projectNum',
        name: '电梯编号'
      },
      {
        dbkey: 'ui_createtime',
        name: '巡检日期'
      },
      {
        dbkey: 'ui_dealtime',
        name: '处理时间'
      }
    ]
    const addModelProp = []
    const searchWhereModelProp = reactive([
      {
        name: '项目名称',
        dbkey: 'ui_projectName',
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
        name: '时间',
        dbkey: 'ui_start_dealtime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_dealtime = args[0]
            dialogModel.ui_end_dealtime = args[1]
          } else {
            dialogModel.ui_start_dealtime = ''
            dialogModel.ui_end_dealtime = ''
          }
        }
      }
    ])

    onMounted(() => {})
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      selectByIdApi
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
