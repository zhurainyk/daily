<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :save-api="updateByIdApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :update-by-id-api="updateByIdApi"
      :selectByIdApi="selectByIdApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :maxwidth="true"
      :showActionDeletePorp="false"
      :showNewPorp="false"
      :search-where-model-prop="searchWhereModelProp"
      :fullscreen="false"
    >
    </ListComponet>
  </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  updateByIdApi,
  selectByIdApi
} from '@/api/module/user'
import { getDepartmentTreeLoginApi } from '@/api/module/department'
import { getUserMapLoginApi } from '@/api/module/login'
import { selectByConditionApi as selectByConditionPositonApi } from '@/api/module/position'
import ListComponet from '@/components/singlelist'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { UiType } from '@/constant'
const modelData = {
  db_id_username: '',
  db_mobilePhone: ''
}
const userList = reactive([])
const event_priority = ref({})
const typesList = reactive([])
const postionListAll = reactive([])
const tableMap = [
  {
    dbkey: 'db_id_username',
    name: '用户名'
  },
  {
    dbkey: 'db_mobilePhone',
    name: '手机号'
  },
  {
    dbkey: 'ui_depName',
    name: '部门'
  },
  // {
  //     dbkey: 'db_extra',
  //     name: '公司',

  //     computed: (arg) => {

  //         if (arg == null) return ''

  //         else if (typeof arg === 'string') {

  //             const o = JSON.parse(arg)

  //             return o.company_name
  //             // return arg
  //         }

  //     }
  // },
  {
    dbkey: 'ui_posiName',
    name: '职位'
  },
  {
    dbkey: 'ui_createtime',
    name: '创建时间'
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
]
const addModelProp = reactive([
  {
    name: '用户名',
    dbkey: 'db_id_username',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: false,
    list: []
  },
  {
    name: '手机号',
    dbkey: 'db_mobilePhone',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: false,
    list: []
  },
  {
    name: '用户状态',
    dbkey: 'db_accState',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: false,
    list: [
      {
        label: '停用',
        value: '0'
      },
      {
        label: '启用',
        value: '1'
      }
    ]
  },
  {
    name: '部门',
    dbkey: 'db_depId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: false,
    list: []
  },
  {
    name: '职位类型',
    dbkey: 'db_posiType',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: false,
    list: [],
    changefn: (a, b, c, d) => {
      console.log({ a, b, c, d })
    }
  },
  {
    name: '职位',
    dbkey: 'db_posiId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: false,
    list: [],
    _list: []
  },

  {
    name: '上级',
    dbkey: 'db_superiorId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: false,
    list: []
  },

  {
    name: '其他信息',
    dbkey: 'db_extra',
    isreuqired: false,
    isSelect: false,
    multiple: false,
    multipledata: [],
    isRules: false,
    list: []
  }
])
const store = useStore()

if (store.state.user.userInfo?.db_isSrc == '01') {
} else if (
  store.state.user.userInfo?.db_isSrc != '01' &&
  store.state.user.userInfo?.db_srcId
) {
} else {
  addModelProp.push({
    name: '源id',
    dbkey: 'db_srcId',
    isreuqired: false,
    isSelect: true,
    multiple: false,
    multipledata: [],
    isRules: false,
    list: [],
    fn: selectByConditionApi,
    fnArgs: {
      ui_type: 'A1',
      ui_currentPage: 1,
      ui_pageSize: 0,
      db_isSrc: '01'
    },
    key: 'db_id',
    value: 'db_id_username'
  })
}

const searchWhereModelProp = [
  {
    name: '用户名',
    dbkey: 'db_id_username',
    isreuqired: true,
    isSelect: false,
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
onMounted(() => {
  getUserMapLoginApi({}).then(res => {
    const data = res.data.data
    const arr = []
    Object.entries(data).forEach(([key, value]) => {
      arr.push({
        label: value,
        value: key
      })
    })
    console.log({ arr })

    addModelProp.forEach(item => {
      if (item.dbkey == 'db_superiorId') {
        item.list.push(...arr)
      }
    })
  })
  selectByAllTypeApi({ constType: 'position_type' }).then(types => {
    if (types.data.success) {
      let arr = []
      Object.entries(types.data.data).forEach(([key, v]) => {
        typesList.push({
          value: key,
          label: v
        })
        arr.push({
          value: key,
          label: v
        })
      })
      addModelProp.forEach(item => {
        if (item.dbkey == 'db_posiType') {
          item.list.push(...arr)
        }
      })
      console.log({ typesList, addModelProp })
    }
  })
  selectByConditionPositonApi({ ui_type: UiType.A0 }).then(position => {
    if (position.data.success) {
      let arr = []
      postionListAll.push(...position.data.data.objectList)
      console.log({ postionListAll })
      postionListAll.forEach(item => {
        arr.push({
          label: item.db_id_posiName,
          value: item.db_id
        })
      })
      addModelProp.forEach(item => {
        if (item.dbkey == 'db_posiId') {
          item.list.push(...arr)
          item._list.push(...arr)
        }
      })
    }
  })
  getDepartmentTreeLoginApi({}).then(res => {
    console.log(res.data.data)
    const data = res.data.data
    const flatArr = arr => {
      const tempArr = []
      arr.forEach(item => {
        tempArr.push({
          label: item.db_id_depName,
          value: item.db_id
        })
        if (item.subDepartmentList.length) {
          tempArr.push(...flatArr(item.subDepartmentList))
        }
      })
      return tempArr
    }
    const arr = flatArr(data)
    console.log({ arr })

    addModelProp.forEach(item => {
      if (item.dbkey == 'db_depId') {
        item.list.push(...arr)
      }
    })
  })

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
    .page-body-head {
      .search-where {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
