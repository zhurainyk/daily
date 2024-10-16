<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :select-by-id-api="selectByIdApi"
      :save-api="saveApi"
      :update-by-id-api="updateByIdApi"
      :delete-by-id-api="deleteByIdApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :show-detail-list="showDetailList"
      :maxwidth="true"
      :dialog-mount="dialogMount"
      :showDetailBtn="true"
      :showActionDetailPorp="true"
    >
      <template #searchHead="{ searchBtnList, addBtn, newFn }">
        <div class="search-where">
          <el-button v-if="addBtn" type="primary" @click="newFn"
            >新建</el-button
          >
          <authority-button
            type="primary"
            api-url="/elevator_supplychain/ipartInstReplace/saveList"
            @click="anunalTemlepteApi"
            >模板下载</authority-button
          >

          <el-upload
            :show-file-list="false"
            :auto-upload="true"
            :http-request="
              (...argument) =>
                beforeAvatarUploadFile(...argument, null, searchBtnList)
            "
          >
            <authority-button
              type="primary"
              api-url="/elevator_supplychain/ipartInstReplace/saveList"
              >导入</authority-button
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
import {
  selectByConditionApi,
  selectCountByConditionApi,
  selectByIdApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  saveListApi
} from '@/api/module/annualInspect'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_AnnualInspect } from '@/module.ts/Elevator_AnnualInspect'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { getUserMapLoginApi, getProjectMapLoginApi } from '@/api/module/login'
import { selectAccountByposiTypeApi } from '@/api/module/user'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'
import { anunalTemlepteApi } from '@/api/module/importExcel'

export default defineComponent({
  components: { ListComponet },
  props: {
    elevType: {
      type: String,
      default: '0'
    }
  },
  setup(props, contx) {
    const modelData = new Elevator_AnnualInspect()
    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目'
      },
      {
        dbkey: 'db_registCode',
        name: '电梯注册码'
      },
      {
        dbkey: 'db_projectNum',
        name: '电梯编号'
      },
      {
        dbkey: 'ui_inspectStateDesc',
        name: '检验状态'
      },
      {
        dbkey: 'ui_dealStateDesc',
        name: '处理状态'
      },
      {
        dbkey: 'ui_inspectTypeDesc',
        name: '检验类型'
      },
      {
        dbkey: 'ui_genTime',
        name: '产生时间'
      },
      {
        dbkey: 'ui_inspectTime',
        name: '检验时间'
      },
      {
        dbkey: 'ui_licenseTime',
        name: '取证时间'
      },
      {
        dbkey: 'ui_dealtime',
        name: '处理时间'
      }
    ]
    const showDetailList = [
      ...tableMap,
      {
        dbkey: 'db_note',
        name: ' 备注'
      },
      {
        dbkey: 'db_fileUrl',
        name: '图片',
        type: 'img'
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
        dialogModel.db_projectNum = ''
      }
      if (args) {
        const tempE = item.list.find(x => x.value == args)
        dialogModel.db_registCode = tempE?.db_registCode
        dialogModel.db_projectNum = tempE?.db_id_projectNum
      }
    }
    const dealData = list => {
      const temp: any = []
      Object.entries<any>(list).forEach(([key, v]) => {
        temp.push({
          db_id: v.db_id,
          db_id_username: v.db_id_username,
          db_mobilePhone: v.db_mobilePhone
        })
      })
      return temp
    }
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
    const addModelProp = reactive([
      {
        name: '项目',
        dbkey: 'db_projectId',
        isreuqired: true,
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
        name: '检验类型',
        dbkey: 'db_inspectTypeCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'inspect_type' }
      },
      {
        name: '检验状态',
        dbkey: 'db_inspectState',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'inspect_state' }
      },
      {
        name: '处理状态',
        dbkey: 'db_dealState',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'deal_state' }
      },
      {
        name: '检验时间',
        dbkey: 'db_inspectTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        list: []
      },
      {
        name: '取证时间',
        dbkey: 'db_licenseTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        list: []
      },
      {
        name: '产生时间',
        dbkey: 'db_genTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        list: []
      },
      {
        name: '处理时间',
        dbkey: 'db_dealtime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        list: []
      },
      {
        name: '备注',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '处理人',
        dbkey: 'db_dealUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectAccountByposiTypeApi,
        key: 'db_id',
        value: 'db_id_username',
        fnArgs: { posiType: 'PropUser' },
        dealData
      },
      {
        name: '附件',
        dbkey: 'db_fileUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'multiplefile',
        filekey: 'file'
      }
    ])
    const searchWhereModelProp = reactive([
      {
        name: '项目',
        dbkey: 'db_projectId',
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
        isRules: true,
        list: []
      },
      {
        name: '检验状态',
        dbkey: 'db_inspectState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '处理状态',
        dbkey: 'db_dealState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '检验类型',
        dbkey: 'db_inspectTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '处理时间',
        dbkey: 'ui_start_dealtime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_dealtime = args[0]
            dialogModel.ui_end_dealtime = args[1]
          } else {
            dialogModel.ui_start_dealtime = ''
            dialogModel.ui_end_dealtime = ''
          }
        }
      }
    ])

    onMounted(() => {
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
      selectByAllTypeApi({ constType: 'inspect_state' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_inspectState'
        )
        if (temp) {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            temp?.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      selectByAllTypeApi({ constType: 'deal_state' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_dealState'
        )
        if (temp) {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            temp?.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      selectByAllTypeApi({ constType: 'inspect_type' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_inspectTypeCode'
        )
        if (temp) {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            temp?.list.push({
              value: key,
              label: v
            })
          })
        }
      })
    })
    const dialogMount = (dialogModel, addModel) => {
      if (dialogModel.db_projectId) {
        const elevator = new Elevator_Elevator()
        const tempItem = addModel.find((x: any) => x.dbkey == 'db_elevId')
        elevator.db_projectId = dialogModel.db_projectId
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
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      selectByIdApi,
      showDetailList,
      dialogMount,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      beforeAvatarUploadFile,
      anunalTemlepteApi
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
