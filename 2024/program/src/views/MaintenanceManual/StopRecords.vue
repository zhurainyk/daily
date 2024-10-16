<template>
  <div class="page-list">
    <ListComponet :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi" :save-api="saveApi" :update-by-id-api="updateByIdApi"
      :delete-by-id-api="deleteByIdApi" :select-by-id-api="selectByIdApi" :model-data="modelData" :table-map="tableMap"
      :add-model-prop="addModelProp" :search-where-model-prop="searchWhereModelProp" :maxwidth="true"
      :dialog-mount="dialogMount">
      <template #editaction="{ editFn, scope }">
        <span v-if="scope.row['db_entryTypeCode'] == '02'" class="edit auto-edit" @click="editFn(scope.row)">编辑</span>
        <span v-else></span>
      </template>
      <template #deleteaction="{ deleteFn, scope }">
        <span v-if="scope.row['db_entryTypeCode'] == '02'" class="delete auto-delete"
          @click="deleteFn(scope.row)">删除</span>
        <span v-else></span>
      </template>
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import moment from 'moment'
import { getProjectMapLoginApi, getUserMapLoginApi } from '@/api/module/login'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi
} from '@/api/module/stopRecords'
import ListComponet from '@/components/singlelist'
import { Elevator_StopRecords } from '@/module.ts/Elevator_StopRecords'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_StopRecords()

    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名'
      },
      {
        dbkey: 'ui_elevName',
        name: '电梯名'
      },

      {
        dbkey: 'db_registCode',
        name: '电梯注册码'
      },
      {
        dbkey: 'db_stopDuration',
        name: '停梯时长'
      },
      {
        dbkey: 'ui_stopType',
        name: '停梯类型'
      },
      {
        dbkey: 'ui_entryType',
        name: '录入类型'
      },
      // {
      //   dbkey: 'ui_stopStarttime',
      //   name: '停梯开始时间'
      // },
      {
        dbkey: 'ui_dataDate',
        name: '数据日期',
        computed: arg => {
          return arg ? moment(arg).format('YYYY-MM-DD') : ''
        }
      },
      {
        dbkey: 'ui_intime',
        name: '写入时间'
      },
      {
        dbkey: 'db_stopDesc',
        name: '停梯描述'
      }
    ]
    const changeProjectEdit = (args, addModel, item, dialogModel) => {
      const elevator = new Elevator_Elevator()

      elevator.db_projectId = args
      const tempItem = addModel.find((x: any) => x.dbkey == 'db_elevId')

      if (item) {
        dialogModel.db_elevId = ''
        // dialogModel.db_relateId = ''
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
        // dialogModel.db_relateId = ''
      }
      if (args) {
        if (item) {
          const tempE = item.list.find(x => x.value == args)
          dialogModel.db_registCode = tempE?.db_registCode
        }
      }
    }
    const addModelProp = reactive([
      {
        name: '项目',
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
        name: '电梯',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeElevartor
      },
      // {
      //   name: '停梯关联任务',
      //   dbkey: 'db_relateId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // },
      {
        name: '停梯时间',
        dbkey: 'db_stopEndtime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        list: [],
        type: 'datetimerange',
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.db_stopStarttime = args[0]
            dialogModel.db_stopEndtime = args[1]
            dialogModel.db_stopDuration = moment(args[1]).diff(
              moment(args[0]),
              'seconds'
            )
          } else {
            dialogModel.db_stopStarttime = ''
            dialogModel.db_stopEndtime = ''
            dialogModel.db_stopDuration = ''
          }
        }
      },
      {
        name: '停梯时长',
        dbkey: 'db_stopDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        disabled: true,
        multipledata: [],
        list: []
      },
      {
        name: '数据日期',
        dbkey: 'db_dataDate',
        isreuqired: true,
        isSelect: true,
        type: 'date',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '停梯类型',
        dbkey: 'db_stopTypeCode',
        isreuqired: false,
        isSelect: true,
        isDisable: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'stop_type' }
      },
      {
        name: '录入类型',
        dbkey: 'db_entryTypeCode',
        isreuqired: false,
        isDisable: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'entry_type' }
      },

      {
        name: '停梯描述',
        dbkey: 'db_stopDesc',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ])
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
    const searchWhereModelProp = reactive([
      {
        name: '项目',
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
        name: '电梯',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '电梯注册码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '停梯类型',
        dbkey: 'db_stopTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '录入类型',
        dbkey: 'db_entryTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '数据时间',
        dbkey: 'ui_start_dataDate',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_dataDate = args[0]
            dialogModel.ui_end_dataDate = args[1]
          } else {
            dialogModel.ui_start_dataDate = ''
            dialogModel.ui_end_dataDate = ''
          }
        }
      },
      {
        name: '写入时间',
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

    const sysList: any = ref([])
    const dialogMount = (dialogModel, addModel) => {
      changeProjectEdit(dialogModel.db_projectId, addModel, null, dialogModel)
      changeElevartor(dialogModel.db_elevId, addModel, null, dialogModel)
      if (!dialogModel.db_id) {
        dialogModel.db_entryTypeCode = '02'
        dialogModel.db_stopTypeCode = '08'
      }
      const temp = addModel.find(x => x.dbkey == 'db_stopEndtime')
      temp.multipledata = []
      if (dialogModel.db_stopStarttime) {
        temp.multipledata = [
          dialogModel.db_stopStarttime,
          dialogModel.db_stopEndtime
        ]
      }
    }
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
      selectByAllTypeApi({ constType: 'stop_type' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_stopTypeCode'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllTypeApi({ constType: 'entry_type' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_entryTypeCode'
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
      changeProject,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      selectByIdApi,
      dialogMount
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {}
</style>
