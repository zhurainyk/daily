<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :show-new-porp="false"
      :pagesizes="[500, 1000, 2000]"
      :default-page-size="500"
      :show-action-detail-porp="true"
      :show-action-edit-porp="false"
      :show-action-delete-porp="false"
      :show-h-check-box-porp="true"
      :isClearCheckBox="true"
      exportExcelName="日志"
      dbkey="elevatorId"
      @detail-fn="detailLog"
    >
      <template #headpriority="{ scope }">
        <span>{{ event_priority[scope.row['priority']] }}</span>
      </template>
      <template #searchHead="{ selectedList, exportExcel }">
        <div>
          <authority-button
            @click="resetElevator(selectedList)"
            :api-url="'/elevator_iot/commonevent/sendEvent'"
            >重置</authority-button
          >
          <authority-button
            type="primary"
            @click="sendEvent(selectedList)"
            :api-url="'/elevator_iot/commonevent/sendEvent'"
            >模拟事件</authority-button
          >
          <authority-button
            type="primary"
            @click="reset0602Elevator(selectedList)"
            :api-url="'/elevator_iot/commonevent/sendEvent'"
            >人工报警恢复</authority-button
          >
          <authority-button
            type="primary"
            @click="reset0104Elevator(selectedList)"
            :api-url="'/elevator_iot/commonevent/sendEvent'"
            >物理按钮报警恢复</authority-button
          >
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </div>
      </template>
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  resetByIdsApi
} from '@/api/module/elevatorConfig'
import { getProjectMapLoginApi } from '@/api/module/login'
import { selectByConditionApi as selectByConditionForelevatorApi } from '@/api/module/projectManage'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import AuthorityButton from '@/components/common/AuthorityButton.vue'

export default defineComponent({
  components: { ListComponet, AuthorityButton },
  setup() {
    const modelData = {
      elevatorId: '',
      state_desc: '',
      elevatorName: '',
      videoMonitorProject: '',
      location: '',
      runningMonitorProject: '',
      emergencyProject: '',
      elevatorType: '',
      priority: '',
      iotOnlineState: '',
      projectName: '',
      projectId: '',
      registerCode: '',
      rescueCode: ''
    }
    const event_priority = ref({})
    const tableMap = [
      {
        dbkey: 'projectName',
        name: '项目名称'
      },
      {
        dbkey: 'elevatorName',
        name: '电梯名'
      },
      {
        dbkey: 'registerCode',
        name: '注册码'
      },
      {
        dbkey: 'rescueCode',
        name: '96333'
      },
      {
        dbkey: 'priority',
        name: '优先级',
        fn: args => {
          return event_priority.value[args.priority]
        }
      },
      {
        dbkey: 'location',
        name: '电梯位置'
      }
    ]
    const addModelProp = []
    const searchWhereModelProp = [
      {
        name: '项目名称',
        dbkey: 'projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '电梯名称',
        dbkey: 'elevatorName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '注册码',
        dbkey: 'registerCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '96333',
        dbkey: 'rescueCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '事件优先级',
        dbkey: 'priority',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      }
      // {
      //   name: '运行监测',
      //   dbkey: 'runningMonitorProject',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // },
      // {
      //   name: '视频监控方案',
      //   dbkey: 'videoMonitorProject',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // },
      // {
      //   name: '应急处置方案',
      //   dbkey: 'emergencyProject',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // }
    ]
    const $router = useRouter()
    const detailLog = data => {
      $router.push({
        name: menulist.LogManagement.name,
        params: {
          id: data.elevatorId
        }
      })
    }
    onBeforeMount(() => {
      selectByAllTypeApi({ constType: 'event_priority' }).then(x => {
        event_priority.value = x.data.data || {}
        const temp: any = searchWhereModelProp.find(x => x.dbkey == 'priority')
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
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
      // selectByAllApi({ tableName: 'Elevator_IotRunMonitorPlan' }).then(x => {
      //   const temp: any = searchWhereModelProp.find(
      //     x => x.dbkey == 'runningMonitorProject'
      //   )
      //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //     temp.list.push({
      //       value: key,
      //       label: v
      //     })
      //   })
      // })

      // selectByAllApi({ tableName: 'Elevator_IotEmergencyPlan' }).then(x => {
      //   const temp: any = searchWhereModelProp.find(
      //     x => x.dbkey == 'emergencyProject'
      //   )
      //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //     temp.list.push({
      //       value: key,
      //       label: v
      //     })
      //   })
      // })

      // selectByAllApi({ tableName: 'Elevator_IotVideoMonitorPlan' }).then(x => {
      //   const temp: any = searchWhereModelProp.find(
      //     x => x.dbkey == 'videoMonitorProject'
      //   )
      //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //     temp.list.push({
      //       value: key,
      //       label: v
      //     })
      //   })
      // })

      // selectByAllApi({ tableName: 'Elevator_Project' }).then(x => {
      //   const temp: any = searchWhereModelProp.find(x => x.dbkey == 'projectId')
      //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //     temp.list.push({
      //       value: key,
      //       label: v
      //     })
      //   })
      // })
      // selectByConditionForelevatorApi({
      //   ui_type: 'A0',
      //   ui_pageSize: 0,
      //   ui_currentPage: 0
      // }).then(x => {
      //   const temp: any = searchWhereModelProp.find(x => x.dbkey == 'projectId')
      //   const { objectList, condition } = x.data.data
      //   objectList.forEach((y: IElevator_Project) => {
      //     temp.list.push({
      //       value: y.db_id,
      //       label: y.db_id_proName
      //     })
      //   })
      // })
    })
    const resetElevator = args => {
      if (args.length > 0) {
        resetByIdsApi({
          eventType: '05',
          eventData: args.map((x: any) => {
            return {
              elevId: x.elevatorId,
              eventCode: '0699'
            }
          })
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
          } else {
            ElMessage.error('失败')
          }
        })
      } else {
        ElMessage.warning('选择电梯')
      }
    }

    const reset0602Elevator = args => {
      if (args.length > 0) {
        resetByIdsApi({
          eventType: '05',
          eventData: args.map((x: any) => {
            return {
              elevId: x.elevatorId,
              eventCode: '0635'
            }
          })
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
          } else {
            ElMessage.error('失败')
          }
        })
      } else {
        ElMessage.warning('选择电梯')
      }
    }

    const reset0104Elevator = args => {
      if (args.length > 0) {
        resetByIdsApi({
          eventType: '05',
          eventData: args.map((x: any) => {
            return {
              elevId: x.elevatorId,
              eventCode: '0638'
            }
          })
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
          } else {
            ElMessage.error('失败')
          }
        })
      } else {
        ElMessage.warning('选择电梯')
      }
    }

    const sendEvent = args => {
      if (args.length <= 0) return
      ElMessageBox.prompt('输入事件码', '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value) {
          resetByIdsApi({
            eventType: '05',
            eventData: args.map((x: any) => {
              return {
                elevId: x.elevatorId,
                eventCode: value
              }
            })
          }).then(x => {
            if (x.data.success) {
              ElMessage.success('成功')
            } else {
              ElMessage.error('失败')
            }
          })
        }
      })
    }
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      detailLog,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      event_priority,
      resetElevator,
      sendEvent,
      reset0602Elevator,
      reset0104Elevator
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
