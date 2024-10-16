<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :save-api="saveApi"
      :select-by-id-api="selectByIdApi"
      :deleteByIdApi="deleteByIdApi"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :showActionEditPorp="false"
      :showDetailList="showlist"
      :show-detail-btn="true"
      :show-action-detail-porp="true"
      :maxwidth="true"
      :showActionDeletePorp="false"
    >
      <template #deleteaction="{ scope, deleteFn }">
        <span
          v-if="scope.row.db_stateCode == '01'"
          class="delete auto-delete"
          @click="deleteFn(scope.row)"
          >{{ $t('common.delete') }}</span
        >
        <span v-else class="delete auto-delete"
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
        >
      </template>
      <template #detailfooter="{ closefn, detailModel, deleteFn }">
        <div class="btn" v-if="detailModel.db_stateCode == '01'">
          <el-button type="primary" @click="deleteFn(detailModel, closefn)">{{
            $t('business.cancelApply')
          }}</el-button>
        </div>
      </template>
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import moment from 'moment'
import { useI18n } from 'vue-i18n'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  selectByIdApi,
  deleteByIdApi
} from '@/api/module/maintdelay'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_MaintDelay } from '@/module.ts/Elevator_MaintDelay'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import {
  getProjectMapLoginApi,
  getLoginUserProPropCompAuthApi,
  getLoginUserProMaintCompAuthApi,
  getLoginUserProInsuCompAuthApi
} from '@/api/module/login'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_MaintDelay()
    const { t } = useI18n()
    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: t('business.projectName')
      },
      {
        dbkey: 'db_projectNum',
        name: t('business.elevatorName')
      },

      {
        dbkey: 'db_registCode',
        name: t('business.registCode')
      },
      {
        dbkey: 'ui_useCompanyName',
        name: t('business.useCompanyName')
      },
      {
        dbkey: 'ui_maintCompanyName',
        name: t('business.maintCompanyName')
      },
      {
        dbkey: 'ui_insuCompanyName',
        name: t('business.insuCompanyName')
      },
      {
        dbkey: 'ui_applyUserName',
        name: t('business.applyUserName')
      },
      {
        dbkey: 'ui_propUserName',
        name: t('business.approveuserName')
      },

      {
        dbkey: 'ui_applytTime',
        name: t('business.applytTime')
      },

      {
        dbkey: 'ui_auditTime',
        name: t('business.auditTime')
      },
      {
        dbkey: 'ui_delayStart',
        name: t('business.delayStartTime')
      },
      {
        dbkey: 'db_delayDuration',
        name: t('business.delayDuration')
      },
      {
        dbkey: 'ui_stateDesc',
        name: t('business.state')
      }
    ]
    const showlist = [
      {
        dbkey: 'ui_projectName',
        name: t('business.projectName')
      },
      {
        dbkey: 'db_projectNum',
        name: t('business.elevatorName')
      },

      {
        dbkey: 'db_registCode',
        name: t('business.registCode')
      },
      {
        dbkey: 'ui_useCompanyName',
        name: t('business.useCompanyName')
      },
      {
        dbkey: 'ui_maintCompanyName',
        name: t('business.maintCompanyName')
      },
      {
        dbkey: 'ui_insuCompanyName',
        name: t('business.insuCompanyName')
      },
      {
        dbkey: 'ui_applyUserName',
        name: t('business.applyUserName')
      },
      {
        dbkey: 'ui_applytTime',
        name: t('business.applytTime')
      },

      {
        dbkey: 'ui_auditTime',
        name: t('business.auditTime')
      },
      {
        dbkey: 'ui_delayStart',
        name: t('business.delayStartTime')
      },
      {
        dbkey: 'db_delayDuration',
        name: t('business.delayDuration')
      },
      {
        dbkey: 'ui_stateDesc',
        name: t('business.state')
      },
      {
        dbkey: 'db_applyFor',
        name: t('business.applyForReason')
      }
    ]
    const changeProjectEdit = (args, addModel, item, dialogModel) => {
      const elevator = new Elevator_Elevator()

      elevator.db_projectId = args
      const tempItem = addModel.find((x: any) => x.dbkey == 'db_elevId')

      if (item) {
        dialogModel.db_elevId = ''
        dialogModel.db_registCode = ''
        dialogModel.db_projectNum = ''
      }

      if (tempItem) {
        tempItem.list = []
        tempItem.multipledata = []
        if (!args) return
        selectElevatorByConditionApi({
          ...elevator,
          ui_type: 'A0',
          ui_pageSize: 0,
          ui_currentPage: 0
        }).then(x => {
          const { objectList, condition } = x.data.data
          objectList.forEach(y => {
            tempItem.list.push({
              value: y.db_id,
              label: y.db_id_projectNum,
              db_maintModelCode: y.db_maintModelCode,
              ...y
            })
          })
        })
      }
    }
    const changeElevartor = (args, addModel, item, dialogModel) => {
      if (item) {
        dialogModel.db_registCode = ''
        dialogModel.db_projectNum = ''
      }
      if (args) {
        const tempE = item.list.find(x => x.value == args)
        dialogModel.db_registCode = tempE?.db_registCode
        dialogModel.db_projectNum = tempE?.db_id_projectNum
      }
    }
    const changeProject = (arg, searchWhereModelProp, x, searchWhere) => {
      const elevator = new Elevator_Elevator()
      elevator.db_projectId = arg
      const tempItem = searchWhereModelProp.find(
        (x: any) => x.dbkey == 'db_elevId'
      )
      searchWhere.db_elevId = ''

      if (tempItem) {
        tempItem
        tempItem.list = []
        tempItem.multipledata = []
        if (!arg) return
        selectElevatorByConditionApi({
          ...elevator,
          ui_type: 'A0',
          ui_pageSize: 0,
          ui_currentPage: 0
        }).then(x => {
          const { objectList, condition } = x.data.data
          objectList.forEach(y => {
            tempItem.list.push({
              value: y.db_id,
              label: y.db_id_projectNum,
              db_maintModelCode: y.db_maintModelCode,
              ...y
            })
          })
        })
      }
    }
    const addModelProp = reactive([
      {
        name: t('business.project'),
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getProjectMapLoginApi,
        fnArgs: {},
        changefn: changeProjectEdit
      },
      {
        name: t('business.elevotar'),
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeElevartor
      },
      {
        name: t('business.delayTime'),
        dbkey: 'db_delayStart',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'date',
        list: []
        // disableddate: date => {
        //   if (moment(date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))
        //     return true
        //   return false
        // }
      },
      {
        name: t('business.delayDuration'),
        dbkey: 'db_delayDuration',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        type: 'number',
        list: []
      },
      {
        name: t('business.applyForReason'),
        dbkey: 'db_applyFor',
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
        name: t('business.note'),
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
        list: [],
        changefn: changeProject
      },
      {
        name: t('business.elevatorName'),
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: t('business.registCode'),
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
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
        name: t('business.applytTime'),
        dbkey: 'ui_start_applytTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_applytTime = args[0]
            dialogModel.ui_end_applytTime = args[1]
          } else {
            dialogModel.ui_start_applytTime = ''
            dialogModel.ui_end_applytTime = ''
          }
        }
      },

      {
        name: t('business.auditTime'),
        dbkey: 'ui_start_auditTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_auditTime = args[0]
            dialogModel.ui_end_auditTime = args[1]
          } else {
            dialogModel.ui_start_auditTime = ''
            dialogModel.ui_end_auditTime = ''
          }
        }
      },
      {
        name: t('business.delayStartTime'),
        dbkey: 'ui_start_delayStart',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_delayStart = args[0]
            dialogModel.ui_end_delayStart = args[1]
          } else {
            dialogModel.ui_start_delayStart = ''
            dialogModel.ui_end_delayStart = ''
          }
        }
      },
      {
        name: t('business.state'),
        dbkey: 'db_stateCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
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
      selectByAllTypeApi({ constType: 'delayMaint_state' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_stateCode'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp?.list.push({
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
      selectByIdApi,
      deleteByIdApi,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      showlist
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
