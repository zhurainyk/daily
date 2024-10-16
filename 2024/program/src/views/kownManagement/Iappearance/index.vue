<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :save-api="saveApi"
      :update-by-id-api="updateByIdApi"
      :delete-by-id-api="deleteByIdApi"
      :select-by-id-api="selectByIdApi"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :show-head-search-porp="false"
    >
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi
} from '@/api/module/appearance'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_Appearance } from '@/module.ts/Elevator_Appearance'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Appearance()
    const tableMap = [
      {
        dbkey: 'db_id_appearName',
        name: '现象名称'
      },
      {
        dbkey: 'db_appearDesc',
        name: '现象描述'
      }
    ]
    const addModelProp = reactive([
      {
        name: '现象名称',
        dbkey: 'db_id_appearName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '现象描述',
        dbkey: 'db_appearDesc',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '解决方案',
        dbkey: 'db_solution',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '工作项',
        dbkey: 'db_workItemIds',
        isreuqired: false,
        isSelect: true,
        multiple: true,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_AppearWorkItem' }
      },
      {
        name: '备注',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ])
    const searchWhereModelProp = [
      {
        name: '现象名称',
        dbkey: 'db_id_appearName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ]

    const sysList: any = ref([])
    onMounted(() => {})
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      selectByIdApi,
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
