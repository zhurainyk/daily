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
    :dialog-mount="dialogMount"
    :search-where-model-prop="searchWhereModelProp"
    :maxwidth="true"
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
} from '@/api/module/part'
import { selectBySysIdApi } from '@/api/module/component'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Part } from '@/module.ts/part'

export default defineComponent({
  components: { ListComponet },
  props: {
    elevType: {
      type: String,
      default: '0'
    }
  },
  setup(props, contx) {
    const modelData = new Part()
    modelData.db_elevType = props.elevType
    const syschange = (args, searchall, item, searchmodal) => {
      searchmodal.db_componentId = ''
      const temp = searchall.find(x => x.dbkey == 'db_componentId')
      temp.list = []
      selectBySysIdApi({ sysCode: args }).then(x => {
        if (x.data.data) {
          x.data.data.forEach(res => {
            temp.list.push({
              value: res.db_id,
              label: res.db_id_componentName
            })
          })
        }
      })
    }
    const tableMap = [
      {
        dbkey: 'ui_sysName',
        name: '系统'
      },
      {
        dbkey: 'ui_componentName',
        name: '部件'
      },
      {
        dbkey: 'db_id_partName',
        name: '零件'
      }
    ]
    const addModelProp = reactive([
      {
        name: '系统',
        dbkey: 'db_sysCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: {
          constType:
            props.elevType == '0' ? 'elevater_system' : 'escalator_system'
        },
        changefn: syschange
      },
      {
        name: '部件',
        dbkey: 'db_componentId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '零件名称',
        dbkey: 'db_id_partName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      // {
      //     name:"生命周期",
      //     dbkey:"db_lifeCycelTypeCode",
      //     isreuqired:true,
      //     isSelect:true,
      //     multiple:false,
      //     multipledata:[],
      //     list:[],
      //     fn:selectByAllTypeApi,
      //     fnArgs:{constType:"lifeCycle_type"}
      // },
      // {
      //     name:"时间",
      //     dbkey:"db_lifeCycle",
      //     isreuqired:true,
      //     isSelect:false,
      //     multiple:false,
      //     multipledata:[],
      //     list:[],
      // },
      {
        name: '是否易损件',
        dbkey: 'db_isVulnerable',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            value: '01',
            label: '是'
          },
          {
            value: '00',
            label: '否'
          }
        ]
      },
      {
        name: '是否大修范畴',
        dbkey: 'db_isOverhaul',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            value: '01',
            label: '是'
          },
          {
            value: '00',
            label: '否'
          }
        ]
      },
      {
        name: '是否核心',
        dbkey: 'db_isCore',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            value: '01',
            label: '是'
          },
          {
            value: '00',
            label: '否'
          }
        ]
      },
      {
        name: '机电属性',
        dbkey: 'db_electromechanicalCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'electro_mechanical' }
      },
      {
        name: '说明',
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
        name: '系统',
        dbkey: 'db_sysCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        changefn: syschange
      },
      {
        name: '部件',
        dbkey: 'db_componentId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '零件名称',
        dbkey: 'db_id_partName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]

    const dialogMount = (dialogModel, addModel) => {
      if (dialogModel.db_sysCode) {
        const temp = addModel.find(x => x.dbkey == 'db_componentId')
        selectBySysIdApi({ sysCode: dialogModel.db_sysCode }).then(x => {
          if (x.data.data) {
            x.data.data.forEach(res => {
              temp.list.push({
                value: res.db_id,
                label: res.db_id_componentName
              })
            })
          }
        })
      }
    }
    onMounted(() => {
      selectByAllTypeApi({
        constType:
          props.elevType == '0' ? 'elevater_system' : 'escalator_system'
      }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_sysCode'
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
