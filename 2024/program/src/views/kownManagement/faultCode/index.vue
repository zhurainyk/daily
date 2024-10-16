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
} from '@/api/module/controleventcode'
import { selectBySysIdApi } from '@/api/module/component'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { ControlEventCode } from '@/module.ts/controleventcode'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new ControlEventCode()

    const tableMap = [
      {
        dbkey: 'ui_controlSys',
        name: '控制系统'
      },
      {
        dbkey: 'db_id_eventCode',
        name: '故障码'
      },
      {
        dbkey: 'db_eventDesc',
        name: '故障说明'
      },
      {
        dbkey: 'ui_eventPriority',
        name: '事件优先级'
      }
    ]
    const addModelProp = reactive([
      {
        name: '故障码',
        dbkey: 'db_id_eventCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '控制系统',
        dbkey: 'db_controlSysCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'control_sys' }
      },
      {
        name: '事件优先级',
        dbkey: 'db_eventPriorityCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'event_priority' }
      },
      {
        name: '故障优先级',
        dbkey: 'db_faultPriorityCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'controlfault_priority' }
      },
      {
        name: '故障说明',
        dbkey: 'db_eventDesc',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '解决方案',
        dbkey: 'db_solution',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '工作项',
        dbkey: 'db_workItemIds',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_ControlWorkItem' }
      }
    ])
    const searchWhereModelProp = [
      {
        name: '故障码',
        dbkey: 'db_id_eventCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '控制系统',
        dbkey: 'db_controlSysCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '故障等级',
        dbkey: 'db_eventPriorityCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]

    const sysList: any = ref([])
    onMounted(() => {
      selectByAllTypeApi({ constType: 'control_sys' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_controlSysCode'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'event_priority' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_eventPriorityCode'
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
