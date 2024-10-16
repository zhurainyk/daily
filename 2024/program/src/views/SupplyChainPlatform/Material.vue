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
      :maxwidth="true"
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
} from '@/api/module/material'
import { selectBySysIdApi } from '@/api/module/component'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_Material } from '@/module.ts/Elevator_Material'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Material()

    const tableMap = [
      {
        dbkey: 'db_materNum',
        name: '物料号'
      },
      {
        dbkey: 'db_id_materName',
        name: '物料名称'
      },
      {
        dbkey: 'ui_partInstanceName',
        name: '配件'
      },
      {
        dbkey: 'ui_suppCompanyName',
        name: '供应商'
      }
    ]
    const addModelProp = reactive([
      {
        name: '物料编号',
        dbkey: 'db_materNum',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '物料名称',
        dbkey: 'db_id_materName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '关联配件实例',
        dbkey: 'db_partInstanceId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_PartInstance' }
      },
      {
        name: '供应商',
        dbkey: 'db_suppCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_SuppCompany' }
      },
      {
        name: '供货周期',
        dbkey: 'db_suppDuration',
        isreuqired: true,
        isSelect: false,
        type: 'number',
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '成本(单价)',
        dbkey: 'db_costing',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        type: 'number',
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '单位',
        dbkey: 'db_unit',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'measure_unit' }
      },

      {
        name: '备注说明',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '物料附件',
        dbkey: 'db_materFileUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'files',
        filekey: 'materFile',
        multipledata: [],
        list: []
      }
    ])
    const searchWhereModelProp = [
      {
        name: '物料名称',
        dbkey: 'db_id_materName',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ]
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
