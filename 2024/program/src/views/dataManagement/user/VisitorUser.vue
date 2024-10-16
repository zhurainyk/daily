<template>
  <div class="page-list">
    <ListComponet
      ref="listRef"
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="[]"
      :search-where-model-prop="searchWhereModelProp"
      :maxwidth="true"
      :showActionPorp="true"
      :showNewPorp="false"
    >
      <template #actionOhther="{ scope }">
        <span class="edit" @click="openDialog(scope)">编辑</span>
      </template>
    </ListComponet>
  </div>
  <el-dialog
    v-if="dialog.visiableUpdate"
    v-model="dialog.visiableUpdate"
    class="min-dialog"
    :show-close="false"
  >
    <Modify
      :current-data="modelDataUpdate"
      dbkey="kkk"
      :save-api="updatePosiTypeByIdApi"
      :add-model="addModePropUpdate"
      @close="dialog.visiableUpdate = false"
      authortity="iaccount"
      @success="successSave"
      :dialogMount="dialogMount"
    >
      <template #headtitle>
        <label>修改{{ updatename }}职位</label>
      </template>
    </Modify>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  updatePosiTypeByIdApi
} from '@/api/module/user'
import { getDepartmentTreeLoginApi } from '@/api/module/department'
import ListComponet from '@/components/singlelist'
import { Usercenter_Account } from '@/module.ts/Usercenter_Account'
import Modify from '@/components/singlelist/components/addEdit'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getPositionListByPosiTypeApi } from '@/api/module/position'
import {
  getPropCompanyMapLoginApi,
  getInsuCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getUserTreeMapLoginApi
} from '@/api/module/login'

export default defineComponent({
  components: { ListComponet, Modify },
  setup() {
    const modelData = new Usercenter_Account()
    const listRef: any = ref(null)
    modelData.db_posiType = 'VisitorUser'
    let modelDataUpdate = {
      db_id: '',
      db_posiType: '',
      db_posiId: '',
      db_depId: '',
      db_companyId: '',
      db_superiorId: '',
      db_id_username: '',
      db_mobilePhone: ''
    }
    const updatename = ref('')
    const openDialog = args => {
      modelDataUpdate.db_id = args.row.db_id
      updatename.value = args.row.db_id_username
      modelDataUpdate.db_posiType = args.row.db_posiType

      modelDataUpdate.db_posiId = args.row.db_posiId
      modelDataUpdate.db_depId = args.row.db_depId

      modelDataUpdate.db_mobilePhone = args.row.db_mobilePhone
      dialog.visiableUpdate = true
    }
    const successSave = () => {
      listRef.value.searchInit()
    }
    const changePositypeFn = (args, addModel, item, dialogModel) => {
      dialogModel.db_companyId = ''
      dialogModel.db_posiId = ''
      const posits = addModel.find(x => x.dbkey == 'db_posiId')
      const companys = addModel.find(x => x.dbkey == 'db_companyId')
      companys.isNotshowKey = true
      if (posits) {
        posits.list = []
      }
      if (companys) {
        companys.list = []
      }

      if (args) {
        getPositionListByPosiTypeApi({ posiType: args }).then(x => {
          if (x.data.success) {
            Object.entries<string>(x.data.data).forEach(([key, v]) => {
              posits.list.push({
                value: key,
                label: v
              })
            })
          }
        })
        if (args == 'PropUser') {
          companys.isNotshowKey = false
          getPropCompanyMapLoginApi({}).then(x => {
            if (x.data.success) {
              Object.entries<string>(x.data.data).forEach(([key, v]) => {
                companys.list.push({
                  value: key,
                  label: v
                })
              })
            }
          })
        } else if (args == 'InsuUser') {
          companys.isNotshowKey = false
          getInsuCompanyMapLoginApi({}).then(x => {
            if (x.data.success) {
              Object.entries<string>(x.data.data).forEach(([key, v]) => {
                companys.list.push({
                  value: key,
                  label: v
                })
              })
            }
          })
        } else if (args == 'EnginUser') {
          companys.isNotshowKey = false
          getMaintCompanyMapLoginApi({}).then(x => {
            if (x.data.success) {
              Object.entries<string>(x.data.data).forEach(([key, v]) => {
                companys.list.push({
                  value: key,
                  label: v
                })
              })
            }
          })
        }
      }
    }

    const addModePropUpdate = reactive([
      {
        name: '用户名',
        dbkey: 'db_id_username',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '手机号',
        dbkey: 'db_mobilePhone',
        isreuqired: false,
        disabled: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '职位类型',
        dbkey: 'db_posiType',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'position_type' },
        changefn: changePositypeFn
      },
      {
        name: '职位',
        dbkey: 'db_posiId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '部门',
        dbkey: 'db_depId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        loading: true,
        type: 'treeselect',
        list: [],
        key: 'db_id',
        props: {
          children: 'subDepartmentList',
          label: 'db_id_depName'
        }
      },
      {
        name: '上级',
        dbkey: 'db_superiorId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: getUserTreeMapLoginApi,
        fnArgs: {},
        key: 'db_id',
        dealData: args => args,
        type: 'treeselect',
        value: 'db_id_username',
        props: {
          label: 'db_id_username',
          children: 'subAccountList'
        }
      },
      {
        name: '公司',
        dbkey: 'db_companyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        isNotshowKey: true
      }
    ])
    const dialog = reactive({
      visiableUpdate: false
    })
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
        dbkey: 'ui_posiName',
        name: '职位名称'
      },
      {
        dbkey: 'ui_posiTypeName',
        name: '职位类型'
      },
      {
        dbkey: 'ui_createtime',
        name: '创建时间'
      }
    ]
    const searchWhereModelProp = [
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
        list: []
      }
    ]
    const dialogMount = (dialogModel, addModel) => {
      const companys = addModel.find(x => x.dbkey == 'db_companyId')
      const posits = addModel.find(x => x.dbkey == 'db_posiId')
      if (companys) {
        companys.list = []
        companys.isNotshowKey = true
      }
      const args = dialogModel.db_posiType
      if (args) {
        getPositionListByPosiTypeApi({ posiType: args }).then(x => {
          if (x.data.success) {
            Object.entries<string>(x.data.data).forEach(([key, v]) => {
              posits.list.push({
                value: key,
                label: v
              })
            })
          }
        })
      }
    }
    onMounted(() => {
      const tempDep = addModePropUpdate.find(x => x.dbkey == 'db_depId')
      getDepartmentTreeLoginApi({}).then(x => {
        if (tempDep) {
          tempDep.list = x.data.data
        }
      })
    })
    return {
      modelData,
      modelDataUpdate,
      selectByConditionApi,
      selectCountByConditionApi,
      tableMap,
      searchWhereModelProp,
      updatePosiTypeByIdApi,
      dialog,
      addModePropUpdate,
      updatename,
      openDialog,
      listRef,
      successSave,
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
