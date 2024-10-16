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
      :show-detail-list="showList"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
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
            @click="replacePartTemlepteApi"
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
} from '@/api/module/partInstReplace'
import ListComponet from '@/components/singlelist'
import { Elevator_PartInstReplace } from '@/module.ts/Elevator_PartInstReplace'
import { getUserMapLoginApi, getProjectMapLoginApi } from '@/api/module/login'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { getwebEnginUserByProjectIdApi } from '@/api/module/projectManage'
import { replacePartTemlepteApi } from '@/api/module/importExcel'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'

export default defineComponent({
  components: { ListComponet },
  props: {
    elevType: {
      type: String,
      default: '0'
    }
  },
  setup(props, contx) {
    const modelData = new Elevator_PartInstReplace()
    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'db_registCode',
        name: '电梯注册码'
      },
      {
        dbkey: 'ui_taskName',
        name: '任务名称'
      },
      {
        dbkey: 'ui_projectNum',
        name: '电梯编号'
      },
      {
        dbkey: 'db_note',
        name: '换件内容'
      },
      {
        dbkey: 'db_replaceCount',
        name: '换件数量'
      },
      {
        dbkey: 'db_unitPrice',
        name: '单价'
      },
      {
        dbkey: 'ui_unitName',
        name: '单位'
      },
      {
        dbkey: 'db_totalPrice',
        name: '总价'
      },
      {
        dbkey: 'ui_replaceTime',
        name: '换件时间'
      }
    ]
    const showList = [
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'db_registCode',
        name: '电梯注册码'
      },
      {
        dbkey: 'ui_projectNum',
        name: '电梯编号'
      },
      {
        dbkey: 'db_note',
        name: '换件内容'
      },
      {
        dbkey: 'ui_taskName',
        name: '任务名称'
      },
      {
        dbkey: 'db_replaceCount',
        name: '换件数量'
      },
      {
        dbkey: 'db_unitPrice',
        name: '单价'
      },
      {
        dbkey: 'ui_unitName',
        name: '单位'
      },
      {
        dbkey: 'db_totalPrice',
        name: '总价'
      },
      {
        dbkey: 'ui_replaceTime',
        name: '换件时间'
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
    const changeProjectEdit = (args, addModel, item, dialogModel) => {
      const elevator = new Elevator_Elevator()

      elevator.db_projectId = args
      const tempItem = addModel.find((x: any) => x.dbkey == 'db_elevId')
      const tempfollowUser = addModel.find(
        (x: any) => x.dbkey == 'db_replaceUserId'
      )
      if (item) {
        dialogModel.db_elevId = ''
        dialogModel.db_registCode = ''
        dialogModel.db_replaceUserId = ''
      }

      if (tempItem) {
        tempItem.list = []
        tempItem.multipledata = []
        if (args) {
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

      if (tempfollowUser) {
        tempfollowUser.list = []
        if (args) {
          getwebEnginUserByProjectIdApi({ db_id: args }).then(x => {
            if (x.data.success) {
              x.data.data.forEach(y => {
                tempfollowUser.list.push({
                  value: y.db_id,
                  label: y.db_id_username
                })
              })
            }
          })
        }
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
        name: '任务id',
        dbkey: 'db_taskId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '工单id',
        dbkey: 'db_orderId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '单价',
        dbkey: 'db_unitPrice',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'number'
      },
      {
        name: '换件数量',
        dbkey: 'db_replaceCount',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'number'
      },
      {
        name: '总价',
        dbkey: 'db_totalPrice',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'number'
      },
      {
        name: '单位',
        dbkey: 'db_unit',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'measure_unit' }
      },
      {
        name: '换件时间',
        dbkey: 'db_replaceTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        list: []
      },
      {
        name: '换件人',
        dbkey: 'db_replaceUserId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '换件内容',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 14 }
      }
    ])
    const searchWhereModelProp = reactive([
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
        name: '电梯注册代码',
        dbkey: 'db_registCode',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      // {
      //   name: '任务名称',
      //   dbkey: 'ui_taskName',
      //   isreuqired: true,
      //   isSelect: false,
      //   multiple: false,
      //   multipledata: [],
      //   isRules: true,
      //   list: []
      // },
      {
        name: '换件时间',
        dbkey: 'ui_start_replaceTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_replaceTime = args[0]
            dialogModel.ui_end_replaceTime = args[1]
          } else {
            dialogModel.ui_start_replaceTime = ''
            dialogModel.ui_end_replaceTime = ''
          }
        }
      }
    ])
    const dialogMount = (dialogModel, addModel) => {
      if (dialogModel.db_projectId) {
        const elevator = new Elevator_Elevator()
        const tempItem = addModel.find((x: any) => x.dbkey == 'db_elevId')
        const tempfollowUser = addModel.find(
          (x: any) => x.dbkey == 'db_replaceUserId'
        )
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

        getwebEnginUserByProjectIdApi({ db_id: dialogModel.db_projectId }).then(
          x => {
            if (x.data.success) {
              x.data.data.forEach(y => {
                tempfollowUser.list.push({
                  value: y.db_id,
                  label: y.db_id_username
                })
              })
            }
          }
        )
      }
    }
    onMounted(() => {
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
      selectByIdApi,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      showList,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      beforeAvatarUploadFile,
      replacePartTemlepteApi,
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
