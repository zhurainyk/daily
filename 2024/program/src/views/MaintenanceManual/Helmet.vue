<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :save-api="saveApi"
      :update-by-id-api="updateByIdApi"
      :delete-by-id-api="deleteByIdApi"
      :select-by-id-api="selectByIdApi"
      :model-data="modelData"
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
import { getProjectMapLoginApi, getUserMapLoginApi } from '@/api/module/login'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi
} from '@/api/module/helmet'
import ListComponet from '@/components/singlelist'
import { Elevator_Helmet } from '@/module.ts/Elevator_Helmet'
import { selectAccountByposiTypeApi } from '@/api/module/user'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Helmet()

    const tableMap = [
      {
        dbkey: 'db_IMEI',
        name: '移动设备识别码'
      },
      {
        dbkey: 'db_code',
        name: 'ID'
      },

      {
        dbkey: 'db_id_name',
        name: '名称'
      },
      {
        dbkey: 'db_model',
        name: '型号'
      },
      {
        dbkey: 'db_manufacturer',
        name: '厂商'
      },
      {
        dbkey: 'ui_manuDate',
        name: '出厂日期'
      },
      {
        dbkey: 'ui_bindAccName',
        name: '绑定人员'
      },
      {
        dbkey: 'db_mobilePhone',
        name: '手机号'
      },
      {
        dbkey: 'ui_createtime',
        name: '录入时间'
      }
    ]

    const dealData = list => {
      let temp: any = []
      Object.entries<any>(list).forEach(([key, v]) => {
        temp.push({
          db_id: v.db_id,
          db_id_username: v.db_id_username,
          db_mobilePhone: v.db_mobilePhone
        })
      })
      return temp
    }
    const addModelProp = reactive([
      {
        name: '名称',
        dbkey: 'db_id_name',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '移动设备识别码',
        dbkey: 'db_IMEI',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: 'ID',
        dbkey: 'db_code',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '型号',
        dbkey: 'db_model',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '厂商',
        dbkey: 'db_manufacturer',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '出厂日期',
        dbkey: 'db_manuDate',
        isreuqired: true,
        isSelect: true,
        type: 'date',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '工程经理',
        dbkey: 'db_bindAccId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectAccountByposiTypeApi,
        key: 'db_id',
        value: 'db_id_username',
        fnArgs: { posiType: 'EnginUser' },
        dealData
      },
      {
        name: '手机号',
        dbkey: 'db_mobilePhone',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ])
    const searchWhereModelProp = reactive([
      {
        name: '绑定人员',
        dbkey: 'db_bindAccId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '移动设备识别码',
        dbkey: 'db_IMEI',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '名称',
        dbkey: 'db_id_name',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '型号',
        dbkey: 'db_model',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '出厂日期',
        dbkey: 'ui_start_manuDate',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_manuDate = args[0]
            dialogModel.ui_end_manuDate = args[1]
          } else {
            dialogModel.ui_start_manuDate = ''
            dialogModel.ui_end_manuDate = ''
          }
        }
      },
      {
        name: '录入时间',
        dbkey: 'ui_start_createtime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_createtime = args[0]
            dialogModel.ui_end_createtime = args[1]
          } else {
            dialogModel.ui_start_createtime = ''
            dialogModel.ui_end_createtime = ''
          }
        }
      }
    ])

    onMounted(() => {
      selectAccountByposiTypeApi({ posiType: 'EnginUser' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_bindAccId'
        )
        Object.entries<any>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: v.db_id,
            label: v.db_id_username,
            db_mobilePhone: v.db_mobilePhone
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
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      selectByIdApi
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
}
</style>
