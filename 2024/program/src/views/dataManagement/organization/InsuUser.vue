<template>
  <UserManage
    ref="listRef"
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
    :ishavePosiSelect="false"
    :company-api="getInsuCompanyMapLoginApi"
  >
  </UserManage>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi
} from '@/api/module/insuUser'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import {
  getDepartmentMapLoginApi,
  getUserTreeMapLoginApi,
  getInsuCompanyMapLoginApi
} from '@/api/module/login'
import { getPositionListByPosiTypeApi } from '@/api/module/position'
import { Usercenter_InsuUser } from '@/module.ts/Usercenter_InsuUser'
import UserManage from './UserManagement'

export default defineComponent({
  components: {
    UserManage
  },
  setup() {
    const modelData = new Usercenter_InsuUser()
    const disablepostition = ref(true)
    const store = useStore()
    if (store.state.user.userInfo?.db_isSrc == '01') {
      modelData.ui_posiId = '1516732642610339852'
    } else if (
      store.state.user.userInfo?.db_isSrc != '01' &&
      store.state.user.userInfo?.db_isSrc
    ) {
      modelData.ui_posiId = '1516732642610339852'
    } else {
      disablepostition.value = false
    }
    const tableMap = [
      {
        dbkey: 'ui_username',
        name: '姓名'
      },
      {
        dbkey: 'ui_companyName',
        name: '公司'
      },
      {
        dbkey: 'ui_mobilePhone',
        name: '电话号码'
      },
      {
        dbkey: 'ui_posiName',
        name: '职位'
      }
    ]
    const searchWhereModelProp = [
      {
        name: '用户名称',
        dbkey: 'ui_username',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ]
    const addModelProp = reactive([
      {
        name: '姓名',
        dbkey: 'ui_username',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        ispartion: true,
        partionname: '基本信息'
      },
      // {
      //   name: '部门',
      //   dbkey: 'ui_depId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: [],
      //   fn: getDepartmentMapLoginApi,
      //   fnArgs: {}
      // },
      {
        name: '公司',
        dbkey: 'db_companyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: getInsuCompanyMapLoginApi,
        fnArgs: {}
      },
      // {
      //     name:"职位类型",
      //     dbkey:"ui_posiType",
      //     isreuqired:true,
      //     isSelect:true,
      //     multiple:false,
      //     multipledata:[],
      //     isRules:true,
      //     list:[],
      //     fn:selectByAllTypeApi,
      //     fnArgs:{constType:"position_type"},
      // },
      {
        name: '手机号',
        dbkey: 'ui_mobilePhone',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      // {
      //   name: '上级',
      //   dbkey: 'ui_superiorId',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: [],
      //   fn: getUserTreeMapLoginApi,
      //   fnArgs: {},
      //   key: 'db_id',
      //   dealData: args => args,
      //   type: 'treeselect',
      //   value: 'db_id_username',
      //   props: {
      //     label: 'db_id_username',
      //     children: 'subAccountList'
      //   }
      // },
      {
        name: '职位',
        dbkey: 'ui_posiId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        isNotshowKey: disablepostition.value,
        multipledata: [],
        isRules: true,
        list: [],
        fn: getPositionListByPosiTypeApi,
        fnArgs: { posiType: 'InsuUser' }
      },
      {
        name: '头像',
        dbkey: 'db_imgUrl',
        filekey: 'img',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        type: 'img',
        list: []
      }
    ])
    return {
      addModelProp,
      searchWhereModelProp,
      tableMap,
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      selectByIdApi,
      getInsuCompanyMapLoginApi
    }
  }
})
</script>
