<template>
  <div class="page-list">
    <ListComponet :select-by-condition-api="selectByConditionApi" :model-data="modelData" :table-map="tableMap"
      :add-model-prop="addModelProp" :search-where-model-prop="searchWhereModelProp" :show-new-porp="false"
      :pagesizes="[1000]" :isHavepagination="false" :default-page-size="1000" :show-action-detail-porp="true"
      :show-action-edit-porp="false" :show-action-delete-porp="false" :show-h-check-box-porp="true" :isInitApi="false"
      :isClearCheckBox="true" :showResetSearch="true" :showActionPorp="false" exportExcelName="操作日志" dbkey="actionlog"
      @detail-fn="detailLog">
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
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  getEventCodeNameMap
} from '@/api/module/runningData'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getProjectList } from '@/api/module/customerBI'
const modelData = reactive({
  projectId: '',
  db_supplierCode: '01',
  startTime: moment(new Date().getTime() - 600 * 1000).format(
    'yyyy-MM-DD HH:mm:ss'
  ),
  endTime: moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
  db_eventCode: '',
  db_registCode: ''
})

const userList = reactive([])
const event_priority = ref({})
const tableMap = [
  {
    dbkey: 'ui_projectName',
    name: '项目名称'
  },
  {
    dbkey: 'ui_elevatorName',
    name: '电梯名称'
  },
  {
    dbkey: 'db_registCode',
    name: '注册码'
  },
  {
    dbkey: 'ui_supplierName',
    name: '供应商'
  },
  {
    dbkey: 'ui_eventName',
    name: '事件'
  },
  {
    dbkey: 'ui_doorStatusDesc',
    name: '开关门'
  },
  {
    dbkey: 'ui_somebodyInDesc',
    name: '是否有人'
  },
  {
    dbkey: 'db_curFloor',
    name: '楼层'
  },
  {
    dbkey: 'ui_directionDesc',
    name: '上下行'
  },
  {
    dbkey: 'ui_inTime',
    name: '时间'
  }

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
  // {
  //     dbkey: 'db_actionContent',
  //     name: '操作地址'
  //     // fn: args => {
  //     //   return event_priority.value[args.priority]
  //     // }
  // },
]
const addModelProp = []
const searchWhereModelProp = reactive([{
  name: '供应商',
  dbkey: 'db_supplierCode',
  isreuqired: true,
  isSelect: true,
  multiple: false,
  multipledata: [],
  isRules: true,
  list: [
    { value: '01', label: '迅达' },
    { value: '02', label: '安智' }
  ]
},
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
  name: '注册码',
  dbkey: 'db_registCode',
  isreuqired: true,
  isSelect: false,
  multiple: false,
  multipledata: [],
  isRules: true,
  list: []
},

{
  name: '时间',
  dbkey: 'startTime',
  isreuqired: true,
  isSelect: true,
  multiple: true,
  type: 'datetimerange',
  valueFormat: 'YYYY-MM-DD HH:mm:ss',
  format: 'YYYY-MM-DD HH:mm:ss',
  multipledata: [modelData.startTime, modelData.endTime],
  isRules: true,
  list: [],
  changefn: (args, addModel, item, dialogModel) => {
    console.log({ args })
    if (args) {
      if (
        Math.abs(moment(args[0]).valueOf() - moment(args[1]).valueOf()) >=
        24 * 3600 * 1000
      ) {
        console.log('大于一天', addModel, item, dialogModel)
        ElMessage.error('时间范围不能超过一天')
        dialogModel.startTime = ''
        dialogModel.endTime = ''
        item.multipledata = []
        // dialogModel.multipledata = []
      } else {
        console.log('小于一天')
        dialogModel.startTime = args[0]
        dialogModel.endTime = args[1]
      }

      console.log()
    } else {
      dialogModel.startTime = ''
      dialogModel.endTime = ''
    }
  }
},
{
  name: '事件码',
  dbkey: 'db_eventCode',
  isreuqired: true,
  isSelect: true,
  multiple: false,
  multipledata: '',
  isRules: true,
  list: []
}
])
const $router = useRouter()
const detailLog = data => {
  $router.push({
    name: menulist.LogManagement.name,
    params: {
      id: data.elevatorId
    }
  })
}
onMounted(() => {
  getEventCodeNameMap({ ui_type: 'A0' }).then(res => {
    console.log(res.data.data)
    let arr = []
    Object.entries(res.data.data).forEach(([k, v]) => {
      arr.push({
        label: v,
        value: k
      })
    })
    searchWhereModelProp.forEach(item => {
      if (item.dbkey === 'db_eventCode') {
        item.list.push(...arr)
      }
    })
  })
  getProjectList()
    .then(res => {
      if (res.data.data?.length) {
        let arr = res.data.data
        // options.push(...res.data.data)

        searchWhereModelProp.forEach(item => {
          if (item.dbkey === 'projectId') {
            item.list.push(
              ...arr.reduce((pre, cur) => {
                return [...pre, { label: cur.name, value: cur.id }]
              }, [])
            )
          }
        })
      }
    })
    .catch(e => {
      console.log({ e })
    })
  selectByAllTypeApi({ constType: 'provider_code' }).then(x => {
    console.log(x.data.data)
    const data = x.data?.data
    if (Object.keys(data).length) {
      const list = []
      Object.keys(data).forEach(key => {
        const obj = {
          label: data[key],
          value: key
        }
        list.push(obj)

      })
      const temp = searchWhereModelProp.find(x => x.dbkey == 'db_supplierCode')
      temp.list = list
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
