<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionActionlogApi"
      :select-count-by-condition-api="selectCountByConditionActionlogApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :show-new-porp="false"
      :pagesizes="[100, 200, 300, 400]"
      :default-page-size="100"
      :show-action-detail-porp="true"
      :show-action-edit-porp="false"
      :show-action-delete-porp="false"
      :show-h-check-box-porp="true"
      :isClearCheckBox="true"
      :showResetSearch="true"
      :showActionPorp="false"
      exportExcelName="操作日志"
      dbkey="actionlog"
      @detail-fn="detailLog"
      :empty="true"
    >
      <!-- <template #headpriority="{ scope }">
        <span>{{ event_priority[scope.row['priority']] }}</span>
      </template> -->
      <template #searchHead="{ selectedList, exportExcel }">
        <div>
          <!-- <el-button type="primary" @click="resetElevator(selectedList)"
            >重置</el-button
          >
          <el-button type="primary" @click="sendEvent(selectedList)"
            >模拟事件</el-button
          > -->
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </div>
      </template>
    </ListComponet>
  </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  selectByConditionActionlogApi,
  selectCountByConditionActionlogApi
} from '@/api/module/log'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'

const modelData = {
  db_userId: '',
  db_mobilePhone: '',
  db_actionContent: '',
  ui_start_actionTime: '',
  ui_end_actionTime: ''
}
const userList = reactive([])
const event_priority = ref({})
const tableMap = [
  {
    dbkey: 'ui_userName',
    name: '用户'
  },
  // {
  //     dbkey: 'db_userId',
  //     name: '用户id'
  // },
  {
    dbkey: 'db_mobilePhone',
    name: '手机号'
  },
  {
    dbkey: 'db_actionClient',
    name: '操作客户端'
  },
  {
    dbkey: 'ui_actionTime',
    name: '操作时间'
  },

  // {
  //     dbkey: 'db_eventCode',
  //     name: '操作',
  //     filters: {
  //         '0101': '困人',
  //         '0202': '电梯运行时安全回路断路',
  //         '0203': '轿厢在开锁区域外停止',
  //         '0401': '停止服务',
  //         '0402': '检修',
  //         '0204': '蹲底',
  //         '0205': '冲顶'
  //     },
  //     fn: args => {
  //         const obj = {
  //             '0101': '困人',
  //             '0202': '电梯运行时安全回路断路',
  //             '0203': '轿厢在开锁区域外停止',
  //             '0401': '停止服务',
  //             '0402': '检修',
  //             '0204': '蹲底',
  //             '0205': '冲顶'
  //         }
  //         return obj[args.db_eventCode]
  //     }
  // },
  {
    dbkey: 'db_actionContent',
    name: '操作地址'
    // fn: args => {
    //   return event_priority.value[args.priority]
    // }
  }
]
const addModelProp = []
const searchWhereModelProp = [
  {
    name: '用户',
    dbkey: 'db_userId',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '手机号',
    dbkey: 'db_mobilePhone',
    isreuqired: true,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '操作地址',
    dbkey: 'db_actionContent',
    isreuqired: true,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: []
  },
  {
    name: '开始时间',
    dbkey: 'ui_start_actionTime',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    type: 'datetime',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multipledata: '',
    isRules: true,
    list: []
  },
  {
    name: '结束时间',
    dbkey: 'ui_end_actionTime',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    type: 'datetime',
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    multipledata: '',
    isRules: true,
    list: []
  },
  {
    name: '客户端',
    dbkey: 'db_actionClient',
    isreuqired: true,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: true,
    list: [
      {
        label: 'WEB端',
        value: 'WEB端'
      },
      {
        label: 'Android端',
        value: 'Android端'
      },
      {
        label: '微信端',
        value: '微信端'
      }
    ]
  }
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
  // selectByAllTypeApi({ constType: 'provider_code' }).then(x => {
  //     console.log(x.data.data)
  //     const data = x.data?.data
  //     if (Object.keys(data).length) {
  //         const list = []
  //         Object.keys(data).forEach(key => {
  //             const obj = {
  //                 label: data[key],
  //                 value: key
  //             }
  //             if (obj.value == '03') {
  //             } else {
  //                 searchWhereModelProp[0].list.push(obj)
  //             }
  //         })
  //     }
  // })

  selectByAllApi({ tableName: 'Usercenter_Account' }).then(x => {
    console.log(x)
    const data = x.data?.data
    if (Object.keys(data).length) {
      Object.keys(data).forEach(key => {
        const o = {
          label: data[key],
          value: key
        }
        searchWhereModelProp[0].list.push(o)
      })
    }
  })
})
</script>

<style lang="scss" scoped>
.page-list {
  background-color: white;

  :deep() .page-body {
    height: calc(100% - 250px);

    .page-body-head {
      .search-where {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
