<template>
  <ListComponet
    :select-by-condition-api="selectByConditionApi"
    :select-count-by-condition-api="selectCountByConditionApi"
    :model-data="modelData"
    :table-map="tableMap"
    :add-model-prop="addModelProp"
    :search-where-model-prop="searchWhereModelProp"
    :maxwidth="true"
    :is-have-export-btn="true"
    :show-action-detail-porp="true"
    :show-action-edit-porp="false"
    :show-action-delete-porp="false"
    @detail-fn="editDetailFn"
    export-excel-name="服务报表"
  >
  </ListComponet>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  selectByConditionApi,
  selectCountByConditionApi
} from '@/api/module/taskInfo'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getUserMapLoginApi, getProjectMapLoginApi } from '@/api/module/login'
import ListComponet from '@/components/singlelist'
import { Elevator_TaskInfo } from '@/module.ts/Elevator_TaskInfo'
import { menulist } from '@/router/menu'

export default defineComponent({
  components: { ListComponet },
  props: {
    elevType: {
      type: String,
      default: '0'
    }
  },
  setup(props, contx) {
    const modelData = new Elevator_TaskInfo()
    modelData.db_taskState = '10,11'
    const tableMap = [
      {
        dbkey: 'db_id_taskName',
        name: '任务名称'
      },
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'db_registCode',
        name: '电梯注册代码'
      },
      {
        dbkey: 'db_projectNum',
        name: '电梯编号'
      },
      {
        dbkey: 'ui_followUserName',
        name: '负责人'
      },
      {
        dbkey: 'ui_taskType',
        name: '任务类型'
      },
      {
        dbkey: 'ui_dealStarttime',
        name: '开始作业时间'
      },
      {
        dbkey: 'ui_dealEndtime',
        name: '完成作业时间'
      }
    ]
    const $router = useRouter()
    const addModelProp = []
    const searchWhereModelProp = reactive([
      {
        name: '任务名称',
        dbkey: 'db_id_taskName',
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
      },
      {
        name: '电梯注册代码',
        dbkey: 'db_registCode',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '任务类型',
        dbkey: 'db_taskTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '开始作业时间',
        dbkey: 'ui_start_dealStarttime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_dealStarttime = args[0]
            dialogModel.ui_end_dealStarttime = args[1]
          } else {
            dialogModel.ui_start_dealStarttime = ''
            dialogModel.ui_end_dealStarttime = ''
          }
        }
      },
      {
        name: '完成作业时间',
        dbkey: 'ui_start_dealEndtime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_dealEndtime = args[0]
            dialogModel.ui_end_dealEndtime = args[1]
          } else {
            dialogModel.ui_start_dealEndtime = ''
            dialogModel.ui_end_dealEndtime = ''
          }
        }
      }
    ])
    const showList = [
      {
        dbkey: 'db_id_taskName',
        name: '任务名称'
      },
      {
        dbkey: 'ui_projectName',
        name: '所属项目'
      },
      {
        dbkey: 'ui_scheduleName',
        name: '关联计划'
      },
      {
        dbkey: 'ui_taskType',
        name: '任务类型'
      },
      {
        dbkey: 'db_registCode',
        name: '电梯注册代码'
      },
      {
        dbkey: 'ui_createUserName',
        name: '创建人'
      },
      {
        dbkey: 'ui_followUserName',
        name: '跟进人'
      },
      {
        dbkey: 'ui_executeUserName',
        name: '执行人'
      },
      {
        dbkey: 'ui_createtime',
        name: '创建时间'
      },
      {
        dbkey: 'ui_dealStarttime',
        name: '开始作业时间'
      },
      {
        dbkey: 'ui_dealEndtime',
        name: '完成作业时间'
      },
      {
        dbkey: 'ui_trappedTime',
        name: '被困时间'
      },
      {
        dbkey: 'ui_alarmTime',
        name: '接警时间'
      },
      {
        dbkey: 'ui_policeTime',
        name: '出警时间'
      },
      {
        dbkey: 'ui_arriveTime',
        name: '到达时间'
      },
      {
        dbkey: 'ui_rescueTime',
        name: '解救时间'
      },
      {
        dbkey: 'db_trappedUser',
        name: '被困人员信息'
      },
      {
        dbkey: 'ui_iotPlanName',
        name: '物联网方案'
      },
      {
        dbkey: 'ui_firstOnlineTime',
        name: '首次在线时间'
      },
      {
        dbkey: 'ui_workTemplateName',
        name: '工作模板名称'
      }
    ]
    const editDetailFn = args => {
      let url = $router.resolve({
        name: menulist.taskDetail.name,
        params: {
          id: args.db_id
        }
      }).href
      window.open(url, '_blank')
    }
    onMounted(() => {
      getProjectMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_projectId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
      selectByAllTypeApi({ constType: 'taskOrder_type' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_taskTypeCode'
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
      tableMap,
      addModelProp,
      searchWhereModelProp,
      showList,
      editDetailFn
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
