<template>
  <div class="page-list">
    <ListComponet :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi" :save-api="saveApi" :update-by-id-api="updateByIdApi"
      :delete-by-id-api="deleteByIdApi" :select-by-id-api="selectByIdApi" :model-data="modelData" :table-map="tableMap"
      :add-model-prop="addModelProp" :search-where-model-prop="searchWhereModelProp" :showNewPorp="false"
      :dialogMount="dialogMount">
      <template #editaction="{ editFn, scope }">
        <span v-if="scope.row['db_dealLabelCode'] != '02'" class="edit auto-edit" @click="editFn(scope.row)">编辑</span>
        <span v-else></span>
      </template>
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
} from '@/api/module/dynamicWorkIt'
import { selectByConditionApi as selectByConditionForelevatorApi } from '@/api/module/projectManage'
import ListComponet from '@/components/singlelist'
import { Elevator_DynamicWorkItem } from '@/module.ts/Elevator_DynamicWorkItem'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_DynamicWorkItem()

    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名'
      },
      {
        dbkey: 'db_projectNum',
        name: '电梯名'
      },

      {
        dbkey: 'db_registCode',
        name: '电梯注册码'
      },
      {
        dbkey: 'ui_dealLabel',
        name: '完成标识'
      },
      {
        dbkey: 'ui_createTime',
        name: '创建时间'
      },
      {
        dbkey: 'ui_createUserName',
        name: '创建人'
      },
      {
        dbkey: 'db_content',
        name: '描述内容'
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

      const tempItemtask = addModel.find((x: any) => x.dbkey == 'db_relateId')
      tempItemtask.list = []
      tempItemtask.multipledata = []
      if (item) {
        dialogModel.db_registCode = ''
        dialogModel.db_projectNum = ''
      }
      if (args) {
        const tempE = item.list.find(x => x.value == args)
        dialogModel.db_registCode = tempE?.db_registCode
        dialogModel.db_projectNum = tempE?.db_projectNum
      }
    }
    const addModelProp = reactive([
      {
        name: '项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        isDisable: true,
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
        isDisable: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeElevartor
      },
      {
        name: '完成标识',
        dbkey: 'db_dealLabelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'workItem_dealLabel' }
      },
      {
        name: '描述内容',
        dbkey: 'db_content',
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
        name: '完成标识',
        dbkey: 'db_dealLabelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '创建时间',
        dbkey: 'ui_start_createTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_createTime = args[0]
            dialogModel.ui_end_createTime = args[1]
          } else {
            dialogModel.ui_start_createTime = ''
            dialogModel.ui_end_createTime = ''
          }
        }
      }
    ])

    const sysList: any = ref([])
    const dialogMount = (dialogModel, addModel) => {
      changeProjectEdit(dialogModel.db_projectId, addModel, null, dialogModel)
      if (dialogModel.db_id) {
        if (dialogModel.db_dealLabelCode == '00') {
          let tempdealLabel = addModel.find(x => x.dbkey == 'db_dealLabelCode')
          tempdealLabel.isDisable = true
        } else if (dialogModel.db_dealLabelCode == '01') {
          let tempcontent = addModel.find(x => x.dbkey == 'db_content')
          tempcontent.disabled = true
        } else {
          let tempdealLabel = addModel.find(x => x.dbkey == 'db_dealLabelCode')
          tempdealLabel.isDisable = true
          let tempcontent = addModel.find(x => x.dbkey == 'db_content')
          tempcontent.disabled = true
        }
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
      selectByAllTypeApi({ constType: 'workItem_dealLabel' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_dealLabelCode'
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
