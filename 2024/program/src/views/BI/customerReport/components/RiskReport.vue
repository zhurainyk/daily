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
    export-excel-name="风险报表"
  >
  </ListComponet>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  selectByIdApi
} from '@/api/module/risk'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getUserMapLoginApi, getProjectMapLoginApi } from '@/api/module/login'
import ListComponet from '@/components/singlelist'
import { Elevator_Risk } from '@/module.ts/Elevator_Risk'

export default defineComponent({
  components: { ListComponet },
  props: {
    elevType: {
      type: String,
      default: '0'
    }
  },
  setup(props, contx) {
    const modelData = new Elevator_Risk()
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
        dbkey: 'db_registCode',
        name: '电梯注册码'
      },
      {
        dbkey: 'db_id_riskEvent',
        name: '风险事件'
      },
      {
        dbkey: 'ui_riskTime',
        name: '风险产生时间'
      },
      {
        dbkey: 'ui_riskState',
        name: '风险处理状态'
      },
      {
        dbkey: 'ui_dealtime',
        name: '风险处理时间'
      }
    ]
    const addModelProp = []
    const searchWhereModelProp = reactive([
      {
        name: '项目名称',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '电梯注册代码',
        dbkey: 'db_registCode',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '风险事件',
        dbkey: 'db_id_riskEvent',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '风险处理状态',
        dbkey: 'db_riskState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '时间',
        dbkey: 'ui_riskTimeStart',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_riskTimeStart = args[0]
            dialogModel.ui_riskTimeEnd = args[1]
          } else {
            dialogModel.ui_riskTimeStart = ''
            dialogModel.ui_riskTimeEnd = ''
          }
        }
      }
    ])

    onMounted(() => {
      getProjectMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_projectId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
      selectByAllTypeApi({ constType: 'risk_state' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_riskState'
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
