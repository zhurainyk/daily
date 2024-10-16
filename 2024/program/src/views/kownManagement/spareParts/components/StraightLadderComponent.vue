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
} from '@/api/module/component'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_Component } from '@/module.ts/Elevator_Component'

export default defineComponent({
  components: { ListComponet },
  props: {
    elevType: {
      type: String,
      default: '0'
    }
  },
  setup(props, contx) {
    const modelData = new Elevator_Component()
    modelData.db_elevType = props.elevType
    const tableMap = [
      {
        dbkey: 'ui_sysName',
        name: '系统'
      },
      {
        dbkey: 'db_id_componentName',
        name: '部件'
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
        }
      },
      {
        name: '部件名称',
        dbkey: 'db_id_componentName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '所属空间',
        dbkey: 'db_spaceCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: {
          constType:
            props.elevType == '0' ? 'elevator_space' : 'escalator_sapce'
        }
      },
      {
        name: '所属装置',
        dbkey: 'db_deviceCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: {
          constType:
            props.elevType == '0' ? 'elevator_device' : 'escalator_device'
        }
      },
      {
        name: '是否属于改造范畴',
        dbkey: 'db_isTransform',
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
        name: '是否核心部件',
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
        name: '是否安全部件',
        dbkey: 'db_isSafety',
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
        list: []
      },
      {
        name: '部件名称',
        dbkey: 'db_id_componentName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]

    const sysList: any = ref([])
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
