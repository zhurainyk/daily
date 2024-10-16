<template>
  <div class="page-list">
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
      :show-action-edit-porp="false"
      :show-action-delete-porp="false"
      :show-new-porp="false"
      :maxwidth="true"
    >
      <template #actionOhther="{ scope }">
        <span class="edit" @click="newTask(scope.row)">新建</span>
      </template>
      <template #headnextMaintRunTimes="{ scope }">
        <span
          v-if="scope.row.modelCode == '01'"
          :class="{
            'red-promt':
              scope.row.conditionType == '02' || scope.row.conditionType == '03'
          }"
          >{{
            scope.row.nextMaintRunTimes >= 0
              ? `剩余${scope.row.nextMaintRunTimes / 1}次`
              : `已超过${Math.abs(scope.row.nextMaintRunTimes / 1)}次`
          }}</span
        >
        <span v-else></span>
      </template>
      <template #headnextMaintDuration="{ scope }">
        <span
          :class="{
            'red-promt':
              scope.row.conditionType == '01' || scope.row.conditionType == '03'
          }"
          >{{
            scope.row.nextMaintDuration >= 0
              ? `剩余${scope.row.nextMaintDuration / (24 * 60 * 60)}天`
              : `已超过${
                  Math.abs(scope.row.nextMaintDuration) / (24 * 60 * 60)
                }天`
          }}</span
        >
      </template>
      <template #headlastMaintDuration="{ scope }">
        <span>{{ scope.row.lastMaintDuration / (24 * 60 * 60) }}天</span>
      </template>

      <template #headmodelCode="{ scope }">
        <span v-if="scope.row.modelCode == '01'">按需维保</span>
        <span v-else-if="scope.row.modelCode == '02'">例行维保</span>
      </template>
    </ListComponet>

    <el-dialog
      v-if="dialog.visiableDialog"
      v-model="dialog.visiableDialog"
      :show-close="false"
      width="1155px"
    >
      <EditTask
        :current-data="currentData"
        authortity=""
        @close="dialog.visiableDialog = false"
        @close-task="dialog.visiableDialog = false"
      >
      </EditTask>
    </el-dialog>
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
} from '@/api/module/preAnalysis'
import { getProjectMapLoginApi } from '@/api/module/login'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_PreAnalysis } from '@/module.ts/Elevator_PreAnalysis'
import { Elevator_TaskInfo } from '@/module.ts/Elevator_TaskInfo'
import EditTask from './components/editTask'

export default defineComponent({
  components: { ListComponet, EditTask },
  setup() {
    const modelData = {
      projectName: '',
      projectNum: '',
      maintTypeDesc: '',
      lastMaintDuration: '',
      lastMaintRunDuration: '',
      lastMaintDoorTimes: '',
      lastMaintRunMileage: '',
      nextMaintRunTimes: '',
      nextMaintRunDuration: '',
      nextMaintDuration: '',
      nextMaintDoorTimes: '',
      nextMaintRunMileage: ''
    }
    const currentData = ref({})
    const dialog = reactive({
      visiableDialog: false
    })
    const tableMap = [
      {
        dbkey: 'projectName',
        name: '项目'
      },
      {
        dbkey: 'projectNum',
        name: '电梯编号'
      },
      {
        dbkey: 'modelCode',
        name: '维保模式'
      },
      {
        dbkey: 'maintTypeDesc',
        name: '建议维保类型'
      },
      {
        dbkey: 'lastMaintRunTimes',
        name: '距上次保养运行次数'
      },
      {
        dbkey: 'lastMaintDuration',
        name: '距上次保养运行时长'
      },
      {
        dbkey: 'nextMaintRunTimes',
        name: '距下次保养运行次数'
      },
      {
        dbkey: 'nextMaintDuration',
        name: '距下次保养运行天数'
      },
      {
        dbkey: 'note',
        name: '描述'
      }
      // {
      //   dbkey: 'lastMaintDuration',
      //   name: '已维保自然时长'
      // },
      // {
      //   dbkey: 'lastMaintDoorTimes',
      //   name: '已维保开关门次数'
      // },
      // {
      //   dbkey: 'lastMaintRunMileage',
      //   name: '已维保运行里程'
      // },
      // {
      //   dbkey: 'nextMaintRunTimes',
      //   name: '已维保运行次数'
      // },
      // {
      //   dbkey: 'nextMaintRunDuration',
      //   name: '已维保运行时长'
      // },
      // {
      //   dbkey: 'nextMaintDuration',
      //   name: '已维保自然时长'
      // },
      // {
      //   dbkey: 'nextMaintRunMileage',
      //   name: '已维保运行里程'
      // }
    ]
    const addModelProp = []
    const maintTypes = []
    const changeModeCodefn = (
      args,
      searchWhereModelPropP,
      item,
      searchWhere
    ) => {
      const temp: any = searchWhereModelPropP.find(x => x.dbkey == 'MaintType')
      temp.list = []
      searchWhere.MaintType = ''
      if (args == '01') {
        temp.list = maintTypes.filter(
          (x: any) =>
            x.value == '01' ||
            x.value == '02' ||
            x.value == '03' ||
            x.value == '04'
        )
      } else if (args == '02') {
        temp.list = maintTypes.filter(
          (x: any) =>
            x.value == '05' ||
            x.value == '06' ||
            x.value == '07' ||
            x.value == '08'
        )
      }
    }
    const searchWhereModelProp = [
      {
        name: '项目',
        dbkey: 'projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '维保模式',
        dbkey: 'modelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeModeCodefn
      },
      {
        name: '维保类型',
        dbkey: 'MaintType',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '电梯编号',
        dbkey: 'projectNum',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ]
    const newTask = args => {
      const tempTask: any = new Elevator_TaskInfo()
      tempTask.db_projectId = args.projectId
      tempTask.db_taskTypeCode = 'RegularUpkeep'
      tempTask.ui_typeTask = [
        {
          db_elevId: args.elevatorId,
          db_upkeepType: args.maintType,
          db_maintModelCode: args.modelCode
        }
      ]
      currentData.value = tempTask
      dialog.visiableDialog = true
    }
    onMounted(() => {
      selectByAllTypeApi({ constType: 'maint_model' }).then(x => {
        const temp: any = searchWhereModelProp.find(x => x.dbkey == 'modelCode')
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'maint_type' }).then(x => {
        // const temp: any = searchWhereModelProp.find(x => x.dbkey == 'MaintType')
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          maintTypes.push({
            value: key,
            label: v
          })
        })
      })
      getProjectMapLoginApi({}).then(x => {
        const temp: any = searchWhereModelProp.find(x => x.dbkey == 'projectId')
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
      dialog,
      currentData,
      newTask
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

    .red-promt {
      color: $p-color-error-deep;
    }
  }
}
</style>
