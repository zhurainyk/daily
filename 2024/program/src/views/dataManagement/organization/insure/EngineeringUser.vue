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
    :disabled-edit-btn="true"
    :disabled-new-btn="true"
    :templete-api="enginUserTemlepteApi"
    :save-list-api="saveListApi"
    :isupload-btn="true"
    authorurl="/usercenter/ienginUser/saveList"
    :ishave-posi-select="false"
    :company-api="getMaintCompanyMapLoginApi"
    @edit-fn="editFn"
    @new-fn="newFn"
  >
  </UserManage>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  saveListApi
} from '@/api/module/engineUser'
import { enginUserTemlepteApi } from '@/api/module/importExcel'
import {
  getDepartmentMapLoginApi,
  getUserMapLoginApi,
  getMaintCompanyMapLoginApi
} from '@/api/module/login'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getPositionListByPosiTypeApi } from '@/api/module/position'
import { Usercenter_EnginUser } from '@/module.ts/Usercenter_EnginUser'
import UserManage from '../UserNoPartManagement'
import { menulist } from '@/router/menu'

export default defineComponent({
  components: {
    UserManage
  },
  setup() {
    const modelData = new Usercenter_EnginUser()
    const $route = useRoute()
    modelData.ui_posiId = $route.meta.posiId
    const tableMap = [
      {
        dbkey: 'ui_username',
        name: '姓名'
      },
      {
        dbkey: 'ui_mobilePhone',
        name: '电话号码'
      },
      {
        dbkey: 'ui_companyName',
        name: '公司'
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
        list: []
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
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_PropCompany' }
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
      {
        name: '上级',
        dbkey: 'ui_superiorId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: getUserMapLoginApi,
        fnArgs: {}
      },
      {
        name: '职位',
        dbkey: 'ui_posiId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: getPositionListByPosiTypeApi,
        fnArgs: { posiType: 'EnginUser' }
      }
    ])
    const $router = useRouter()
    const editFn = args => {
      $router.push({
        name:
          $route.meta.posiId == '1516732642610339840'
            ? menulist.TeamEngineeringBlowUserEdit.name
            : menulist.TeamEngineeringUserEdit.name,
        params: {
          id: args.db_id,
          action: 'edit'
        },
        query: {
          depid: modelData.ui_depId,
          posiId: $route.meta.posiId
        }
      })
    }
    const newFn = args => {
      $router.push({
        name:
          $route.meta.posiId == '1516732642610339840'
            ? menulist.TeamEngineeringBlowUserEdit.name
            : menulist.TeamEngineeringUserEdit.name,
        params: {
          id: '',
          action: 'new'
        },
        query: {
          depid: modelData.ui_depId,
          posiId: $route.meta.posiId
        }
      })
    }
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
      editFn,
      newFn,
      enginUserTemlepteApi,
      saveListApi,
      getMaintCompanyMapLoginApi
    }
  }
})
</script>
