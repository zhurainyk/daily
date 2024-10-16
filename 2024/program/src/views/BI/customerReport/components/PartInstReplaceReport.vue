<template>
  <ListComponet
    :select-by-condition-api="selectByConditionApi"
    :select-count-by-condition-api="selectCountByConditionApi"
    :selectByIdApi="selectByIdApi"
    :model-data="modelData"
    :table-map="tableMap"
    :showDetailList="showList"
    :add-model-prop="addModelProp"
    :search-where-model-prop="searchWhereModelProp"
    :maxwidth="true"
    :show-action-detail-porp="true"
    :show-action-edit-porp="false"
    :show-action-delete-porp="false"
    :show-detail-btn="true"
    :is-have-export-btn="true"
    export-excel-name="换件报表"
  >
  </ListComponet>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  selectByIdApi
} from '@/api/module/partInstReplace'
import ListComponet from '@/components/singlelist'
import { Elevator_PartInstReplace } from '@/module.ts/Elevator_PartInstReplace'
import { getUserMapLoginApi, getProjectMapLoginApi } from '@/api/module/login'

export default defineComponent({
  components: { ListComponet },
  props: {
    elevType: {
      type: String,
      default: '0'
    }
  },
  setup(props, contx) {
    const modelData = new Elevator_PartInstReplace()
    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'db_registCode',
        name: '电梯注册码'
      },
      {
        dbkey: 'ui_taskName',
        name: '任务名称'
      },
      {
        dbkey: 'ui_projectNum',
        name: '电梯编号'
      },
      {
        dbkey: 'db_note',
        name: '换件内容'
      },
      {
        dbkey: 'db_replaceCount',
        name: '换件数量'
      },
      {
        dbkey: 'db_unitPrice',
        name: '单价'
      },
      {
        dbkey: 'ui_unitName',
        name: '单位'
      },
      {
        dbkey: 'db_totalPrice',
        name: '总价'
      },
      {
        dbkey: 'ui_replaceTime',
        name: '换件时间'
      }
    ]
    const showList = [
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'db_registCode',
        name: '电梯注册码'
      },
      {
        dbkey: 'ui_projectNum',
        name: '电梯编号'
      },
      {
        dbkey: 'db_note',
        name: '换件内容'
      },
      {
        dbkey: 'ui_taskName',
        name: '任务名称'
      },
      {
        dbkey: 'db_replaceCount',
        name: '换件数量'
      },
      {
        dbkey: 'db_unitPrice',
        name: '单价'
      },
      {
        dbkey: 'ui_unitName',
        name: '单位'
      },
      {
        dbkey: 'db_totalPrice',
        name: '总价'
      },
      {
        dbkey: 'ui_replaceTime',
        name: '换件时间'
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
        name: '任务名称',
        dbkey: 'ui_taskName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '时间',
        dbkey: 'ui_start_replaceTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_replaceTime = args[0]
            dialogModel.ui_end_replaceTime = args[1]
          } else {
            dialogModel.ui_start_replaceTime = ''
            dialogModel.ui_end_replaceTime = ''
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
    })
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      selectByIdApi,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      showList
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
