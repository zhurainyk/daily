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
      :dialog-mount="dialogMount"
    >
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import moment from 'moment'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi
} from '@/api/module/schedule'
import { getProjectMapLoginApi } from '@/api/module/login'
import { selectByConditionApi as selectByConditionForelevatorApi } from '@/api/module/projectManage'
import ListComponet from '@/components/singlelist'
import { Elevator_Schedule } from '@/module.ts/Elevator_Schedule'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Schedule()
    const tableMap = [
      {
        dbkey: 'db_id_scheName',
        name: '计划名称'
      },
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'ui_createtime',
        name: '创建时间'
      },
      {
        dbkey: 'ui_createUserName',
        name: '创建人'
      },
      {
        dbkey: 'ui_starttime',
        name: '开始时间'
      },
      {
        dbkey: 'ui_endtime',
        name: '结束时间'
      }
    ]
    const addModelProp = reactive([
      {
        name: '计划名称',
        dbkey: 'db_id_scheName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByConditionForelevatorApi,
        fnArgs: { ui_type: 'A0', ui_pageSize: 0, ui_currentPage: 0 },
        key: 'db_id',
        value: 'db_id_proName'
      },
      {
        name: '计划详情',
        dbkey: 'db_scheDetail',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '时间',
        dbkey: 'db_starttime',
        isreuqired: true,
        isSelect: true,
        type: 'daterange',
        multiple: true,
        multipledata: [],
        list: [],
        changefn: (args, addModel, item, dialogModel) => {
          if (args) {
            dialogModel.db_starttime = args[0]
            dialogModel.db_endtime = args[1]
          } else {
            dialogModel.db_starttime = ''
            dialogModel.db_endtime = ''
          }
        }
      }
    ])
    const searchWhereModelProp = [
      {
        name: '计划名称',
        dbkey: 'db_id_scheName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '项目名称',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ]
    const dialogMount = (dialogModel, addModel) => {
      const tempTime = addModel.find(x => x.dbkey == 'db_starttime')
      tempTime.multipledata = []
      if (!dialogModel.db_id) {
        dialogModel.db_starttime = moment(Date())
          .startOf('months')
          .format('YYYY-MM-DD')
        dialogModel.db_endtime = moment(Date())
          .endOf('months')
          .format('YYYY-MM-DD')
      }
      if (dialogModel.db_starttime) {
        tempTime.multipledata = [
          dialogModel.db_starttime,
          dialogModel.db_endtime
        ]
      }
    }

    onMounted(() => {
      selectByConditionForelevatorApi({
        ui_type: 'A0',
        ui_pageSize: 0,
        ui_currentPage: 0
      }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_projectId'
        )
        const { objectList, condition } = x.data.data
        objectList.forEach((y: IElevator_Project) => {
          temp.list.push({
            value: y.db_id,
            label: y.db_id_proName
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
