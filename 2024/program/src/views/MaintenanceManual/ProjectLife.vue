<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :save-api="saveApi"
      :select-by-id-api="selectByIdApi"
      :update-by-id-api="updateByIdApi"
      :deleteByIdApi="deleteByIdApi"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
    >
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  selectByIdApi,
  updateByIdApi,
  deleteByIdApi
} from '@/api/module/projectlife'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_ProjectLife } from '@/module.ts/Elevator_ProjectLife'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import {
  getProjectMapLoginApi,
  getLoginUserProPropCompAuthApi,
  getLoginUserProMaintCompAuthApi,
  getLoginUserProInsuCompAuthApi
} from '@/api/module/login'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_ProjectLife()
    const { t } = useI18n()
    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: t('business.projectName')
      },
      {
        dbkey: 'ui_useCompanyName',
        name: t('business.useCompanyName')
      },
      {
        dbkey: 'ui_maintCompanyName',
        name: t('business.useCompanyName')
      },
      {
        dbkey: 'ui_insuCompanyName',
        name: t('business.insuCompanyName')
      },
      {
        dbkey: 'ui_genTime',
        name: t('business.happenTime')
      },
      {
        dbkey: 'ui_intime',
        name: t('business.createTime')
      },
      {
        dbkey: 'ui_inUserName',
        name: t('business.createUserName')
      },
      {
        dbkey: 'db_id_content',
        name: t('business.content')
      }
    ]

    const addModelProp = reactive([
      {
        name: t('business.projectName'),
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getProjectMapLoginApi,
        fnArgs: {}
      },
      {
        name: t('business.happenTime'),
        dbkey: 'db_genTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'date',
        list: []
      },
      {
        name: t('business.img'),
        dbkey: 'db_imgUrl',
        filekey: 'img',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        type: 'img',
        list: []
      },
      {
        name: t('business.file'),
        dbkey: 'db_fileUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'multiplefile',
        filekey: 'file'
      },
      {
        name: '描述',
        dbkey: 'db_id_content',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        type: 'textarea',
        autosize: { minRows: 4, maxRows: 14 }
      },
      {
        name: '事件描述',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        type: 'textarea',
        autosize: { minRows: 4, maxRows: 14 }
      }
    ])
    const searchWhereModelProp = reactive([
      {
        name: t('business.projectName'),
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: t('business.useCompanyName'),
        dbkey: 'db_useCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: t('business.maintCompanyName'),
        dbkey: 'db_maintCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: t('business.insuCompanyName'),
        dbkey: 'db_insuCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: t('business.happenTime'),
        dbkey: 'ui_start_genTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_genTime = args[0]
            dialogModel.ui_end_genTime = args[1]
          } else {
            dialogModel.ui_start_genTime = ''
            dialogModel.ui_end_genTime = ''
          }
        }
      },

      {
        name: t('business.createTime'),
        dbkey: 'ui_start_intime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_intime = args[0]
            dialogModel.ui_end_intime = args[1]
          } else {
            dialogModel.ui_start_intime = ''
            dialogModel.ui_end_intime = ''
          }
        }
      }
    ])

    onMounted(() => {
      getProjectMapLoginApi({}).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_projectId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

      getLoginUserProMaintCompAuthApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_maintCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      getLoginUserProPropCompAuthApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_useCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      getLoginUserProInsuCompAuthApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_insuCompanyId'
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
      saveApi,
      selectByIdApi,
      updateByIdApi,
      deleteByIdApi,
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
  :deep().page-body {
    height: calc(100% - 230px);
  }
}
</style>
