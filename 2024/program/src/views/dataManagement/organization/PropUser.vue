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
    :maxwidth="true"
    :templeteApi="proUserTemlepteApi"
    :saveListApi="saveListApi"
    :isuploadBtn="true"
    authorurl="/usercenter/ipropUser/saveList"
    :dialogMount="dialogMount"
    :ishavePosiSelect="false"
    :company-api="getPropCompanyMapLoginApi"
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
  selectByIdApi,
  saveListApi
} from '@/api/module/propUser'
import {
  getDepartmentMapLoginApi,
  getUserTreeMapLoginApi,
  getPropCompanyMapLoginApi
} from '@/api/module/login'
import { proUserTemlepteApi } from '@/api/module/importExcel'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getPositionListByPosiTypeApi } from '@/api/module/position'
import { Usercenter_PropUser } from '@/module.ts/Usercenter_PropUser'
import UserManage from './UserManagement'

export default defineComponent({
  components: {
    UserManage
  },
  setup() {
    const modelData = new Usercenter_PropUser()
    const disablepostition = ref(true)
    const store = useStore()
    if (store.state.user.userInfo?.db_isSrc == '01') {
      modelData.ui_posiId = '1516732642610339853'
    } else if (
      store.state.user.userInfo?.db_isSrc != '01' &&
      store.state.user.userInfo?.db_isSrc
    ) {
      modelData.ui_posiId = '1516732642610339853'
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

    const dialogMount = (dialogModel, addModel) => {
      let tempdata = addModel.find(x => x.dbkey == 'db_safetyManaCertBeginTime')
      tempdata.multipledata = []
      if (dialogModel.db_safetyManaCertBeginTime) {
        tempdata.multipledata = [
          dialogModel.db_safetyManaCertBeginTime,
          dialogModel.db_safetyManaCertDeadTime
        ]
      }
    }
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
      {
        name: '身份证',
        dbkey: 'db_idCard',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '公司',
        dbkey: 'db_companyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: getPropCompanyMapLoginApi,
        fnArgs: {}
      },
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
        fnArgs: { posiType: 'PropUser' }
      },
      {
        name: '头像图片',
        dbkey: 'db_imgUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'img',
        multipledata: [],
        list: [],
        fullrow: true
      },
      {
        name: '安全管理证名称',
        dbkey: 'db_safetyManaCertName',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        ispartion: true,
        partionname: '个人证书'
      },
      {
        name: '安全管理证编号',
        dbkey: 'db_safetyManaCertCode',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '安全管理证首次获取时间',
        dbkey: 'db_safetyManaCertGetTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '安全管理证有效时间',
        dbkey: 'db_safetyManaCertBeginTime',
        isreuqired: false,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.db_safetyManaCertBeginTime = args[0]
            dialogModel.db_safetyManaCertDeadTime = args[1]
          } else {
            dialogModel.db_safetyManaCertBeginTime = ''
            dialogModel.db_safetyManaCertDeadTime = ''
          }
        }
      },
      {
        name: '安全管理证文件',
        dbkey: 'db_safetyManaCertFileUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'files',
        filekey: 'safetyManaCertFile'
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
      proUserTemlepteApi,
      saveListApi,
      dialogMount,
      getPropCompanyMapLoginApi
    }
  }
})
</script>
