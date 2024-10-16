<template>
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
  >
  </ListComponet>
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
} from '@/api/module/constType'
import ListComponet from '@/components/singlelist'
import { Elevator_ConstType } from '@/module.ts/Elevator_ConstType'

export default defineComponent({
  components: { ListComponet },
  props: {
    elevType: {
      type: String,
      default: '0'
    }
  },
  setup(props, contx) {
    const modelData = new Elevator_ConstType()
    const tableMap = [
      {
        dbkey: 'db_id',
        name: '唯一主键'
      },
      {
        dbkey: 'db_constTypeNum',
        name: '常量类型'
      },
      {
        dbkey: 'db_constTypeName',
        name: '常量名'
      }
    ]
    const addModelProp = reactive([
      {
        name: '常量类型',
        dbkey: 'db_constTypeNum',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '常量名',
        dbkey: 'db_constTypeName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ])
    const searchWhereModelProp = [
      {
        name: '常量类型',
        dbkey: 'db_constTypeNum',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '常量名',
        dbkey: 'db_constTypeName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]

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
