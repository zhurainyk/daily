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
} from '@/api/module/constDetail'
import { selectByConditionApi as selectByConstypeConditionApi } from '@/api/module/constType'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_ConstDetail } from '@/module.ts/Elevator_ConstDetail'

export default defineComponent({
  components: { ListComponet },
  props: {
    elevType: {
      type: String,
      default: '0'
    }
  },
  setup(props, contx) {
    const modelData = new Elevator_ConstDetail()
    const tableMap = [
      {
        dbkey: 'db_id',
        name: '唯一主键'
      },
      {
        dbkey: 'db_constId',
        name: '常量Code'
      },
      {
        dbkey: 'db_constValue',
        name: '名称'
      },

      {
        dbkey: 'ui_constTypeName',
        name: '常量类型'
      },
      {
        dbkey: 'db_constDescribe',
        name: '描述'
      },
      {
        dbkey: 'db_constOrder',
        name: '排序'
      }
    ]
    const addModelProp = reactive([
      {
        name: '常量类型',
        dbkey: 'db_constTypeNum',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByConstypeConditionApi,
        fnArgs: { ui_type: 'A0' },
        key: 'db_constTypeNum',
        value: 'db_constTypeName'
      },
      {
        name: '常量Code',
        dbkey: 'db_constId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '名称',
        dbkey: 'db_constValue',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '描述',
        dbkey: 'db_constDescribe',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '排序',
        dbkey: 'db_constOrder',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ])
    const searchWhereModelProp: any = [
      {
        name: '常量类型',
        dbkey: 'db_constTypeNum',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '名称',
        dbkey: 'db_constValue',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]
    onMounted(() => {
      selectByConstypeConditionApi({ ui_type: 'A0' }).then(x => {
        if (x.data.success) {
          let temp = searchWhereModelProp.find(
            x => x.dbkey == 'db_constTypeNum'
          )
          if (temp) {
            x.data.data.objectList.forEach(item => {
              temp?.list.push({
                label: item.db_constTypeName,
                value: item.db_constTypeNum
              })
            })
          }
        }
      })
    })
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
