<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      fullscreen
      :save-api="saveApi"
      :update-by-id-api="updateByIdApi"
      :delete-by-id-api="deleteByIdApi"
      :select-by-id-api="selectByIdApi"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :dialog-mount="dialogMount"
      :search-where-model-prop="searchWhereModelProp"
      :maxwidth="true"
      :showActionCopyPorp="true"
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
} from '@/api/module/partInstance'
import { selectByConditionApi as selectByConditionPartApi } from '@/api/module/part'
import { selectByConditionApi as selectByConditionComponetApi } from '@/api/module/component'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_PartInstance } from '@/module.ts/Elevator_PartInstance'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_PartInstance()
    const initList = (args, addModel, item, dialogModel) => {
      const tempItem = addModel.find((x: any) => x.dbkey == 'db_partId')
      tempItem.list = []
      if (dialogModel && item) {
        dialogModel.db_spaceCode = ''
      }
      if (args) {
        if (item) {
          const temp = item.list.find(x => x.db_id == args)
          dialogModel.db_spaceCode = temp.db_spaceCode
        }
        selectByConditionPartApi({
          ui_type: 'A0',
          db_componentId: args
        }).then(x => {
          const { objectList, condition } = x.data.data
          objectList.forEach(y => {
            tempItem.list.push({
              value: y.db_id,
              label: y.db_id_partName
            })
          })
        })
      }
    }
    const changeComponentFn = (args, addModel, item, dialogModel) => {
      dialogModel.db_partId = ''
      if (args) {
        initList(args, addModel, item, dialogModel)
      }
    }
    const dialogMount = (dialogModel, addModel) => {
      if (dialogModel.db_componentId) {
        initList(dialogModel.db_componentId, addModel, null, dialogModel)
      }
    }
    const tableMap = [
      {
        dbkey: 'db_id_partInstanceName',
        name: '配件实例名称'
      },
      {
        dbkey: 'ui_componentName',
        name: '部件'
      },
      {
        dbkey: 'ui_partName',
        name: '零件'
      },
      {
        dbkey: 'db_partBrandId',
        name: '品牌'
      },
      {
        dbkey: 'db_model',
        name: '规格型号'
      },
      {
        dbkey: 'db_note',
        name: '说明'
      }
    ]
    const addModelProp = reactive([
      {
        name: '配件实例名称',
        dbkey: 'db_id_partInstanceName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '配件编号',
        dbkey: 'db_partInstanceNum',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '部件',
        dbkey: 'db_componentId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        key: 'db_id',
        value: 'db_id_componentName',
        fn: selectByConditionComponetApi,
        fnArgs: { ui_type: 'A0' },
        changefn: changeComponentFn
      },
      {
        name: '配件',
        dbkey: 'db_partId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
        // fn:selectByAllApi,
        //  fnArgs:{tableName:"Elevator_Part"}
      },
      {
        name: '品牌',
        dbkey: 'db_partBrandId',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
        // fn:selectByAllApi,
        //  fnArgs:{tableName:"Elevator_PartBrand"}
      },
      {
        name: '规格型号',
        dbkey: 'db_model',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '参数清单',
        dbkey: 'db_paramList',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '单位',
        dbkey: 'db_unit',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'measure_unit' }
      },
      {
        name: '运行时长(s)',
        dbkey: 'db_lifecycleRunDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'number'
      },
      {
        name: '运行次数',
        dbkey: 'db_lifecycleRunTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'number'
      },
      {
        name: '开关门次数',
        dbkey: 'db_lifecycleDoorTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'number'
      },
      {
        name: '运行里程(m)',
        dbkey: 'db_lifecycleRunMileage',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'number'
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
        name: '图示',
        dbkey: 'db_imgUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'img',
        multipledata: [],
        list: []
      }
    ])
    const searchWhereModelProp = [
      {
        name: '部件',
        dbkey: 'db_componentId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '零件',
        dbkey: 'db_partId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '规格型号',
        dbkey: 'db_model',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]

    onMounted(() => {
      selectByAllApi({ tableName: 'Elevator_Component' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_componentId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllApi({ tableName: 'Elevator_Part' }).then(x => {
        const temp: any = searchWhereModelProp.find(x => x.dbkey == 'db_partId')
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
      searchWhereModelProp,
      dialogMount
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
