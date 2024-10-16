<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :delete-by-id-api="deleteByIdApi"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :dialogMount="dialogMount"
      :showNewPorp="false"
      :showActionEditPorp="false"
    >
      <template #searchHead>
        <div class="search-where">
          <authority-button
            type="primary"
            apiUrl="/elevator/iQRCode/saveList"
            @click="dialog.qrdownVisiable = true"
            >批量下载</authority-button
          >
        </div>
      </template>
      <template #actionOhther="{ scope }">
        <span class="edit" @click="oprenPrint(scope.row)">打印</span>
      </template>
    </ListComponet>
  </div>
  <print-elevtor-qrcode
    :qrurl="printurl"
    :dialogVisiable="dialog.dialogVisiable"
    @close="dialog.dialogVisiable = false"
    >二维码</print-elevtor-qrcode
  >
  <el-dialog
    v-if="dialog.qrdownVisiable"
    v-model="dialog.qrdownVisiable"
    class="min-dialog"
    :show-close="false"
    top="2vw"
  >
    <Qrworddown @close-dialog="dialog.qrdownVisiable = false"></Qrworddown>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  deleteByIdApi,
  saveListApi,
  getApiUrlApi
} from '@/api/module/qrcode'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { getProjectMapLoginApi } from '@/api/module/login'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_QRCode } from '@/module.ts/Elevator_QRCode'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import AuthorityButton from '@/components/common/AuthorityButton'
import PrintElevtorQrcode from '@/components/common/PrintElevtorQrcode'
import Qrworddown from './components/qrworddown'

export default defineComponent({
  components: { ListComponet, AuthorityButton, PrintElevtorQrcode, Qrworddown },
  setup() {
    const modelData = new Elevator_QRCode()
    const dialog = reactive({
      dialogVisiable: false,
      qrdownVisiable: false
    })
    let apiurl = ''
    const printurl = ref('')
    const tableMap = [
      {
        dbkey: 'db_id_code',
        name: '二维码编号'
      },
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'ui_elevName',
        name: '电梯名'
      },
      {
        dbkey: 'db_registCode',
        name: '电梯注册码'
      },
      {
        dbkey: 'ui_bindStateDesc',
        name: '绑定状态'
      },
      {
        dbkey: 'ui_bindTime',
        name: '绑定时间'
      }
    ]
    const changeProjectEdit = (args, addModel, item, dialogModel) => {
      const elevator = new Elevator_Elevator()

      elevator.db_projectId = args
      const tempItem = addModel.find((x: any) => x.dbkey == 'db_elevId')

      if (item) {
        dialogModel.db_elevId = ''
        dialogModel.db_registCode = ''
        dialogModel.db_projectNum = ''
      }

      if (tempItem) {
        tempItem.list = []
        tempItem.multipledata = []
        if (!args) return
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
              label: y.db_id_projectNum,
              db_maintModelCode: y.db_maintModelCode,
              ...y
            })
          })
        })
      }
    }
    const changeElevartor = (args, addModel, item, dialogModel) => {
      if (item) {
        dialogModel.db_registCode = ''
      }
      if (args) {
        const tempE = item.list.find(x => x.value == args)
        dialogModel.db_registCode = tempE?.db_registCode
      }
    }
    const changeProject = (arg, searchWhereModelProp, x, searchWhere) => {
      const elevator = new Elevator_Elevator()
      elevator.db_projectId = arg
      const tempItem = searchWhereModelProp.find(
        (x: any) => x.dbkey == 'db_elevId'
      )
      searchWhere.db_elevId = ''

      if (tempItem) {
        tempItem
        tempItem.list = []
        tempItem.multipledata = []
        if (!arg) return
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
              label: y.db_id_projectNum,
              db_maintModelCode: y.db_maintModelCode,
              ...y
            })
          })
        })
      }
    }
    const addModelProp = reactive([
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getProjectMapLoginApi,
        fnArgs: {},
        changefn: changeProjectEdit
      },
      {
        name: '电梯',
        dbkey: 'db_elevId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        changefn: changeElevartor
      },
      {
        name: '电梯注册码',
        dbkey: 'db_registCode',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '绑定状态',
        dbkey: 'db_bindState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'bind_status' }
      },
      {
        name: '备注',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ])
    const searchWhereModelProp = [
      {
        name: '项目名称',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        changefn: changeProject
      },
      {
        name: '电梯名',
        dbkey: 'db_elevId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '电梯注册码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
      // {
      //   name: '绑定状态',
      //   dbkey: 'db_bindState',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: []
      // }
    ]
    const batchAdd = callbackfn => {
      ElMessageBox.prompt('输入数量', '批量新增', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        saveListApi({ num: value }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
            callbackfn()
          } else {
            ElMessage.error(x.data.message || '失败')
          }
        })
      })
    }
    const oprenPrint = row => {
      printurl.value = `${apiurl}/static/wechat?bind_id=${row.db_id_code}`
      dialog.dialogVisiable = true
    }
    const dialogMount = (dialogModel, addModel) => {
      changeProjectEdit(dialogModel.db_projectId, addModel, null, dialogModel)
    }
    onMounted(() => {
      getApiUrlApi({}).then(tempurl => {
        if (tempurl.data.apiurl) {
          apiurl = tempurl.data.apiurl // 'https://ecp.tlzn-cq.com:8131' // tempurl.data.apiurl
        }
      })
      // selectByAllTypeApi({ constType: 'bind_status' }).then(x => {
      //   const temp: any = searchWhereModelProp.find(
      //     x => x.dbkey == 'db_bindState'
      //   )
      //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //     temp.list.push({
      //       value: key,
      //       label: v
      //     })
      //   })
      // })
      getProjectMapLoginApi({}).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_projectId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
    })
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      deleteByIdApi,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      dialogMount,
      batchAdd,
      dialog,
      printurl,
      oprenPrint
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
