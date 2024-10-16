<template>
  <div class="contrac-edit">
    <AddEdit
      :current-data="modelData"
      :save-api="saveApi"
      :select-by-id-api="selectByIdApi"
      :update-by-id-api="updateByIdApi"
      :add-model="addModelProp"
      :is-have-head="false"
      :maxwidth="true"
      :dialog-mount="dialogMount"
      @close="backPage"
      @success="backPage"
    >
      <!-- <template #right="socpe">
        <div class="elevtor-list">
          <div class="head">已选择 {{ getElevatorCount(socpe) }} 台梯</div>
          <div class="list">
            <el-table
              ref="table"
              :data="getElevator(socpe)"
              height="100%"
              @selection-change="
                (...argument) => selectionchange(...argument, socpe)
              "
            >
              <el-table-column type="selection" row width="55" />
              <el-table-column
                label="内部编号"
                property="db_id_projectNum"
                width="110"
              />
              <el-table-column label="注册代码" property="db_registCode" />
            </el-table>
          </div>
        </div>
      </template> -->
    </AddEdit>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AddEdit from '@/components/singlelist/components/addEdit'
import { Elevator_Contract } from '@/module.ts/Elevator_Contract'
import { saveApi, updateByIdApi, selectByIdApi } from '@/api/module/contract'
import { selectByIdApi as selectProjecByIdApi } from '@/api/module/projectManage'
import { selectByAllTypeApi } from '@/api/module/commont'
import { selectAccountByposiTypeApi } from '@/api/module/user'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import {
  getProjectMapLoginApi,
  getPropCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getInsuCompanyMapLoginApi
} from '@/api/module/login'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { menulist } from '@/router/menu'

export default defineComponent({
  components: { AddEdit },
  setup() {
    const $route = useRoute()
    const modelData = new Elevator_Contract()
    const elevator = new Elevator_Elevator()
    modelData.db_id = $route.params.id.toString()
    modelData.db_contState = '02'
    const table: any = ref(null)
    const $router = useRouter()
    const backPage = () => {
      $router.push({ name: menulist.ContractManagement.name })
    }
    const changeProject = async (args, addModel, item, dialogModel) => {
      dialogModel.db_contEleIds = ''
      dialogModel.db_useCompanyId = ''
      dialogModel.db_maintCompanyId = ''
      dialogModel.db_insuCompanyId = ''
      elevator.db_projectId = args
      const tempdb_useCompanyId = addModel.find(
        (x: any) => x.dbkey == 'db_useCompanyId'
      )
      const tempdb_maintCompanyId = addModel.find(
        (x: any) => x.dbkey == 'db_maintCompanyId'
      )
      const tempdb_insuCompanyId = addModel.find(
        (x: any) => x.dbkey == 'db_insuCompanyId'
      )
      tempdb_useCompanyId.isDisable = false
      tempdb_maintCompanyId.isDisable = false
      tempdb_insuCompanyId.isDisable = false
      if (args) {
        tempdb_useCompanyId.isDisable = true
        tempdb_maintCompanyId.isDisable = true
        tempdb_insuCompanyId.isDisable = true
        const tempItem = addModel.find((x: any) => x.dbkey == 'db_contEleIds')
        if (tempItem) {
          tempItem.list = []
          tempItem.multipledata = []
          const x = await selectElevatorByConditionApi({
            ...elevator,
            ui_type: 'A0',
            ui_pageSize: 0,
            ui_currentPage: 0
          })
          const { objectList, condition } = x.data.data
          objectList.forEach(y => {
            tempItem.list.push(y)
          })
        }
        const company = await selectProjecByIdApi({ id: args })
        if (company.data.success) {
          dialogModel.db_useCompanyId = company.data.data.db_useCompanyId
          dialogModel.db_maintCompanyId = company.data.data.db_maintCompanyId
          dialogModel.db_insuCompanyId = company.data.data.db_insuCompanyId
        }
      }
    }
    const getElevator = ars => {
      const tmep = ars.addModel.find(x => x.dbkey == 'db_contEleIds')
      if (tmep) {
        return tmep.list
      }
      return []
    }
    const getElevatorCount = ars => {
      const tmep = ars.addModel.find(x => x.dbkey == 'db_contEleIds')
      if (tmep) {
        return tmep.multipledata.length
      }
      return 0
    }
    const selectionchange = (args, model) => {
      const tmep = model.addModel.find(x => x.dbkey == 'db_contEleIds')
      if (tmep) {
        tmep.multipledata = args.map(x => x.db_id)
        model.dialogModel.db_contEleIds = tmep.multipledata.join(',')
      }
    }
    const dealData = list => {
      let temp: any = []
      Object.entries<any>(list).forEach(([key, v]) => {
        temp.push({
          db_id: v.db_id,
          db_id_username: v.db_id_username,
          db_mobilePhone: v.db_mobilePhone
        })
      })
      return temp
    }
    const changeUser = (agrs, addModel, item, dialogModel) => {
      const key = `${item.dbkey.replace('Id', '')}Phone`
      if (agrs) {
        const tempUser = item.list.find((x: any) => x.value == agrs)
        if (tempUser) {
          dialogModel[key] = tempUser.db_mobilePhone
        }
      } else {
        dialogModel[key] = ''
      }
    }
    const store = useStore()
    const addModelProp = reactive([
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
        name: '是否主要合同',
        dbkey: 'db_contState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'contract_state' },
        list: []
      },
      {
        name: '合同日期',
        dbkey: 'db_starttime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        type: 'daterange',
        multipledata: [],
        isRules: true,
        list: [],
        changefn: (args, addModel, item, dialogModel) => {
          if (args) {
            dialogModel.db_starttime = args[0]
            dialogModel.db_endtime = args[1]
          } else {
            dialogModel.db_starttime = ''
            dialogModel.db_endtime = ''
          }
        }
      },
      {
        name: '合同项目',
        dbkey: 'db_projectId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getProjectMapLoginApi,
        fnArgs: {},
        changefn: changeProject
      },
      // {
      //   name: '电梯',
      //   dbkey: 'db_contEleIds',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: true,
      //   isNotshowKey: true,
      //   multipledata: [],
      //   list: []
      // },
      {
        name: '使用单位',
        dbkey: 'db_useCompanyId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getPropCompanyMapLoginApi,
        fnArgs: {}
      },
      {
        name: '维保单位',
        dbkey: 'db_maintCompanyId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getMaintCompanyMapLoginApi,
        fnArgs: {}
      },
      {
        name: '承保单位',
        dbkey: 'db_insuCompanyId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getInsuCompanyMapLoginApi,
        fnArgs: {}
      },
      // {
      //   name: '物业经理',
      //   dbkey: 'db_propMUserId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectAccountByposiTypeApi,
      //   key: 'db_id',
      //   value: 'db_id_username',
      //   fnArgs: { posiType: 'PropUser' },
      //   changefn: changeUser,
      //   dealData
      // },
      // {
      //   name: '物业验收人',
      //   dbkey: 'db_propPassUserId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectAccountByposiTypeApi,
      //   key: 'db_id',
      //   value: 'db_id_username',
      //   fnArgs: { posiType: 'PropUser' },
      //   changefn: changeUser,
      //   dealData
      // },
      // {
      //   name: '项目经理',
      //   dbkey: 'db_projectMUserId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectAccountByposiTypeApi,
      //   key: 'db_id',
      //   value: 'db_id_username',
      //   fnArgs: { posiType: 'MarkUser' },
      //   dealData
      // },
      // {
      //   name: '工程经理',
      //   dbkey: 'db_enginMUserId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectAccountByposiTypeApi,
      //   key: 'db_id',
      //   value: 'db_id_username',
      //   fnArgs: { posiType: 'EnginUser' },
      //   changefn: changeUser,
      //   dealData
      // },
      // {
      //   name: '保险客户经理',
      //   dbkey: 'db_insuMUserId',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectAccountByposiTypeApi,
      //   fnArgs: { posiType: 'InsuUser' },
      //   key: 'db_id',
      //   value: 'db_id_username',
      //   changefn: changeUser,
      //   dealData
      // },
      {
        name: '合同扫描件',
        dbkey: 'db_contFileUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'files',
        filekey: 'contFile'
      }

      // {
      //   name: '现场联系人1',
      //   dbkey: 'db_sceneUserId1',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectAccountByposiTypeApi,
      //   fnArgs: { posiType: 'EnginUser' },
      //   key: 'db_id',
      //   value: 'db_id_username',
      //   changefn: changeUser,
      //   dealData
      // },
      // {
      //   name: '现场联系人2',
      //   dbkey: 'db_sceneUserId2',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectAccountByposiTypeApi,
      //   fnArgs: { posiType: 'EnginUser' },
      //   key: 'db_id',
      //   value: 'db_id_username',
      //   changefn: changeUser,
      //   dealData
      // },
      // {
      //   name: '现场联系人3',
      //   dbkey: 'db_sceneUserId3',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectAccountByposiTypeApi,
      //   fnArgs: { posiType: 'EnginUser' },
      //   key: 'db_id',
      //   value: 'db_id_username',
      //   changefn: changeUser,
      //   dealData
      // },
      // {
      //   name: '现场联系人4',
      //   dbkey: 'db_sceneUserId4',
      //   isreuqired: false,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectAccountByposiTypeApi,
      //   fnArgs: { posiType: 'EnginUser' },
      //   key: 'db_id',
      //   value: 'db_id_username',
      //   changefn: changeUser,
      //   dealData
      // }
    ])
    // if (store.state.user.userInfo?.db_isSrc != '01') {
    //   addModelProp.push({
    //     name: '短信接收号码',
    //     dbkey: 'db_smsToPhones',
    //     isreuqired: false,
    //     isSelect: false,
    //     multiple: false,
    //     multipledata: [],
    //     list: []
    //   })
    // }
    const dialogMount = async (dialog, addModel) => {
      if (dialog.db_starttime) {
        const tempItem = addModel.find((x: any) => x.dbkey == 'db_starttime')
        tempItem.multipledata = [dialog.db_starttime, dialog.db_endtime]
      }
      if (dialog.db_projectId) {
        const tempItem = addModel.find((x: any) => x.dbkey == 'db_contEleIds')
        const tempdb_useCompanyId = addModel.find(
          (x: any) => x.dbkey == 'db_useCompanyId'
        )
        const tempdb_maintCompanyId = addModel.find(
          (x: any) => x.dbkey == 'db_maintCompanyId'
        )
        const tempdb_insuCompanyId = addModel.find(
          (x: any) => x.dbkey == 'db_insuCompanyId'
        )
        tempdb_useCompanyId.isDisable = true
        tempdb_maintCompanyId.isDisable = true
        tempdb_insuCompanyId.isDisable = true
        if (tempItem) {
          tempItem.list = []
          tempItem.multipledata = []
          let temp = []
          if (dialog.db_contEleIds) {
            temp = dialog.db_contEleIds.split(',')
          }
          elevator.db_projectId = dialog.db_projectId
          const x = await selectElevatorByConditionApi({
            ...elevator,
            ui_type: 'A0'
          })
          const { objectList, condition } = x.data.data
          objectList.forEach(y => {
            tempItem.list.push(y)
          })
          temp.forEach(x => {
            const index = tempItem.list.findIndex(y => y.db_id == x)
            if (index > -1) {
              tempItem.multipledata.push(x)
              table.value.toggleRowSelection(tempItem.list[index])
            }
          })
          dialog.db_contEleIds = tempItem.multipledata.join(',')
        }
      }
    }
    return {
      backPage,
      saveApi,
      updateByIdApi,
      selectByIdApi,
      modelData,
      addModelProp,
      getElevator,
      getElevatorCount,
      table,
      selectionchange,
      dialogMount
    }
  }
})
</script>

<style lang="scss" scoped>
.contrac-edit {
  background-color: white;
  width: 100%;
  display: flex;
  height: 100%;
  :deep().dialog-mian {
    width: 1200px;
  }
  .elevtor-list {
    flex: 1;
    margin: 10px;
    padding: 10px 10px;
    // padding-left: 20px;
    border-radius: 10px;
    box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
    width: calc(100% - 1200px);
    .head {
      padding-top: 20px;
      padding-left: 10px;
    }
    .list {
      height: calc(100% - 40px);
      :deep().el-table__inner-wrapper {
        &::before {
          display: none;
        }
      }
    }
  }
}
</style>
