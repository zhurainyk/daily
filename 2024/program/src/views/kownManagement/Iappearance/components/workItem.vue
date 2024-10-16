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
} from '@/api/module/appearanceworkitem'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_AppearWorkItem } from '@/module.ts/Elevator_AppearWorkItem'

export default defineComponent({
  components: { ListComponet },
  props: {
    elevType: {
      type: String,
      default: '0'
    }
  },
  setup(props, contx) {
    const modelData = new Elevator_AppearWorkItem()
    modelData.db_elevType = props.elevType
    const tableMap = [
      {
        dbkey: 'db_id_itemName',
        name: '工作项名称'
      },
      {
        dbkey: 'ui_skillLevel',
        name: '技能等级'
      },
      {
        dbkey: 'db_expectDuration',
        name: '耗时时长'
      },
      {
        dbkey: 'db_itemContent',
        name: '工作项内容'
      }
    ]
    const addModelProp = reactive([
      {
        name: '工作项名称',
        dbkey: 'db_id_itemName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '技能等级',
        dbkey: 'db_skillLevelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'skill_level' }
      },
      {
        name: '工作项内容',
        dbkey: 'db_itemContent',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '耗时时长',
        dbkey: 'db_expectDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
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
        name: '技能等级',
        dbkey: 'db_skillLevelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '工作项名称',
        dbkey: 'db_id_itemName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]

    const sysList: any = ref([])
    onMounted(() => {
      selectByAllTypeApi({ constType: 'skill_level' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_skillLevelCode'
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
