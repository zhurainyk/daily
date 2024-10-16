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
      :maxwidth="true"
      :disabled-edit-btn="true"
      :disabled-new-btn="true"
      @detail-fn="detailProject"
      @edit-fn="editProject"
      @new-fn="newProject"
    >
      <template #searchHead="{ newFn, searchBtnList, addBtn }">
        <div class="search-where">
          <el-button v-if="addBtn" type="primary" @click="newFn"
            >新增</el-button
          >
          <authority-button
            type="primary"
            api-url="/elevator/icontract/saveList"
            @click="contractTemlepteApi"
            >合同模板下载</authority-button
          >
          <el-upload
            :show-file-list="false"
            :auto-upload="true"
            :http-request="
              (...argument) =>
                beforeAvatarUploadFile(...argument, x, searchBtnList)
            "
          >
            <authority-button
              type="primary"
              api-url="/elevator/icontract/saveList"
              >合同导入</authority-button
            >
          </el-upload>
        </div>
      </template>
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { contractTemlepteApi } from '@/api/module/importExcel'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  saveListApi
} from '@/api/module/contract'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { selectByposiTypeApi } from '@/api/module/user'
import {
  getProjectMapLoginApi,
  getPropCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getInsuCompanyMapLoginApi
} from '@/api/module/login'
import ListComponet from '@/components/singlelist'
import { Elevator_Contract } from '@/module.ts/Elevator_Contract'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { menulist } from '@/router/menu'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_Contract()
    const elevator = new Elevator_Elevator()
    const $route = useRoute()
    modelData.ui_dueState = $route.query.status
    modelData.db_contState = $route.query.db_contState
    modelData.db_useCompanyId = $route.query.db_useCompanyId
    if ($route.query) {
      Object.entries<string>($route.query).forEach(([key, v]) => {
        modelData[key] = v
      })
    }
    const tableMap = [
      {
        dbkey: 'db_id_contNum',
        name: '合同编号'
      },
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'ui_contState',
        name: '是否主要合同'
      },
      {
        dbkey: 'ui_useCompanyName',
        name: '使用单位'
      },
      {
        dbkey: 'ui_maintCompanyName',
        name: '维保单位'
      },
      {
        dbkey: 'ui_insuCompanyName',
        name: '承保单位'
      },
      {
        dbkey: 'ui_createtime',
        name: '创建时间'
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
    const { showError } = useNormalValidateRespone()
    const beforeAvatarUploadFile = (args: any, model: any, fn) => {
      saveListApi({}, { multipartFile: args.file }).then(x => {
        if (x.data.success) {
          if (showError(x.data.data)) {
            ElMessage.success('上传成功')
            fn()
          }
        } else {
          ElMessage.error('上传失败')
        }
      })
    }
    const changeProject = (args, addModel, item, dialogModel) => {
      dialogModel.db_contEleIds = ''
      elevator.db_projectId = args
      if (args) {
        const tempItem = addModel.find((x: any) => x.dbkey == 'db_contEleIds')
        if (tempItem) {
          tempItem.list = []
          tempItem.multipledata = []
          selectElevatorByConditionApi({
            ...elevator,
            ui_type: 'A0',
            ui_pageSize: 0,
            ui_currentPage: 0
          }).then(x => {
            const { objectList, condition } = x.data.data
            objectList.forEach(y => {
              tempItem.list.push({
                value: y.db_id,
                label: y.db_innerNum
              })
            })
          })
        }
        console.log(args, addModel, item, dialogModel)
      }
    }
    const addModelProp = []
    const searchWhereModelProp = reactive([
      {
        name: '合同编号',
        dbkey: 'db_id_contNum',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
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
        name: '是否主要合同',
        dbkey: 'db_contState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '使用单位',
        dbkey: 'db_useCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '维保单位',
        dbkey: 'db_maintCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '承保单位',
        dbkey: 'db_insuCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '开始时间',
        dbkey: 'ui_start_starttime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_starttime = args[0]
            dialogModel.ui_end_starttime = args[1]
          } else {
            dialogModel.ui_start_starttime = ''
            dialogModel.ui_end_starttime = ''
          }
        }
      },
      {
        name: '结束时间',
        dbkey: 'ui_start_endtime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_endtime = args[0]
            dialogModel.ui_end_endtime = args[1]
          } else {
            dialogModel.ui_start_endtime = ''
            dialogModel.ui_end_endtime = ''
          }
        }
      },
      {
        name: '合同状态',
        dbkey: 'ui_dueState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [
          {
            value: '00',
            label: '即将到期'
          },
          {
            value: '01',
            label: '已到期'
          }
        ]
      },
      {
        name: '关联单位',
        dbkey: 'ui_isByCompany',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [
          {
            value: '01',
            label: '物业单位相关'
          },
          {
            value: '02',
            label: '维保单位相关'
          },
          {
            value: '03',
            label: '保险单位相关'
          }
        ]
      }
    ])
    const $router = useRouter()
    const detailProject = data => {
      $router.push({
        name: menulist.ContractManagementDetail.name,
        params: {
          id: data.db_id
        }
      })
    }
    const newProject = () => {
      $router.push({
        name: menulist.ContractManagementEditDetail.name,
        params: {
          id: ''
        }
      })
    }
    const editProject = data => {
      $router.push({
        name: menulist.ContractManagementEditDetail.name,
        params: {
          id: data.db_id
        }
      })
    }
    onMounted(() => {
      getPropCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_useCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
      getMaintCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_maintCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      getInsuCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_insuCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      // selectByAllApi({ tableName: 'Elevator_PropCompany' }).then(x => {
      //   if (x.data.success) {
      //     const tempSearch: any = searchWhereModelProp.find(
      //       (x: any) => x.dbkey == 'db_usedCompanyId'
      //     )
      //     Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //       tempSearch.list.push({
      //         value: key,
      //         label: v
      //       })
      //     })
      //   }
      // })
      // selectByAllApi({ tableName: 'Elevator_MaintCompany' }).then(x => {
      //   if (x.data.success) {
      //     const tempSearch: any = searchWhereModelProp.find(
      //       (x: any) => x.dbkey == 'db_maintCompanyId'
      //     )
      //     Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //       tempSearch.list.push({
      //         value: key,
      //         label: v
      //       })
      //     })
      //   }
      // })
      selectByAllTypeApi({ constType: 'contract_state' }).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_contState'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
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
    })
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      selectByIdApi,
      detailProject,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      newProject,
      editProject,
      contractTemlepteApi,
      beforeAvatarUploadFile
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  background-color: white;
  :deep().page-body {
    height: calc(100% - 230px);
  }
}
</style>
