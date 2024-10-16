<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="[]"
      :search-where-model-prop="searchWhereModelProp"
      :show-h-check-box-porp="true"
      :is-clear-check-box="true"
      :maxwidth="true"
      :showNewPorp="false"
      :showActionPorp="false"
      isHaveExportBtn
    >
      <template #searchHead="{ selectedList, searchBtnList, exportExcel }">
        <div class="search-where">
          <authority-button
            @click="exportExcel"
            apiUrl="/elevator/imaintUploadLog/export"
            >导出</authority-button
          >
          <authority-button
            type="primary"
            @click="deleteLog(selectedList, searchBtnList)"
            apiUrl="/elevator/imaintUploadLog/deleteList"
            >批量删除</authority-button
          >

          <!-- <el-button type="primary" @click="elevatorDownTemlepteApi"
            >模板下载</el-button
          >
          <el-upload
            :show-file-list="false"
            :auto-upload="true"
            :http-request="
              (...argument) =>
                beforeAvatarUploadFile(...argument, x, searchBtnList)
            "
          >
            <el-button type="primary">导入</el-button>
          </el-upload> -->
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
  deleteListApi
} from '@/api/module/maintUploadLog'
import {
  getProjectMapLoginApi,
  getLoginUserProPropCompAuthApi,
  getLoginUserProMaintCompAuthApi
} from '@/api/module/login'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_MaintUploadLog } from '@/module.ts/Elevator_MaintUploadLog'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_MaintUploadLog()

    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名'
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
        dbkey: 'ui_uploadType',
        name: '报送类型'
      },

      {
        dbkey: 'ui_platformType',
        name: '报送平台类型'
      },
      {
        dbkey: 'ui_dataDate',
        name: '报送数据的日期'
      },
      {
        dbkey: 'db_maintCount',
        name: '维保条数'
      },
      {
        dbkey: 'db_repairCount',
        name: '回召条数'
      },
      {
        dbkey: 'ui_uploadState',
        name: '报送状态'
      },
      {
        dbkey: 'ui_uploadTime',
        name: '报送的时间'
      },
      {
        dbkey: 'db_content',
        name: '报送描述'
      }
    ]
    const addModelProp = []
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
        name: '报送数据的日期',
        dbkey: 'ui_start_dataDate',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_dataDate = args[0]
            dialogModel.ui_end_dataDate = args[1]
          } else {
            dialogModel.ui_start_dataDate = ''
            dialogModel.ui_end_dataDate = ''
          }
        }
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
        name: '报送类型',
        dbkey: 'db_uploadTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '报送平台类型',
        dbkey: 'db_platformTypeCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '报送状态',
        dbkey: 'db_uploadStateCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '报送的时间',
        dbkey: 'ui_start_uploadTime',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        type: 'daterange',
        list: [],
        changefn: (args: any, addModel, x, dialogModel) => {
          if (args) {
            dialogModel.ui_start_uploadTime = args[0]
            dialogModel.ui_end_uploadTime = args[1]
          } else {
            dialogModel.ui_start_uploadTime = ''
            dialogModel.ui_end_uploadTime = ''
          }
        }
      }
    ])

    const sysList: any = ref([])
    const deleteLog = (args, fn) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选日志')
      } else {
        deleteListApi({ idList: args.map(x => x.db_id).join(',') }).then(x => {
          if (x.data.success) {
            ElMessage.success('删除成功')
            fn()
          } else {
            ElMessage.error('失败')
          }
        })
      }
    }
    onMounted(() => {
      getProjectMapLoginApi({}).then(x => {
        if (x.data.data) {
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
      selectByAllTypeApi({ constType: 'platform_type' }).then(x => {
        if (x.data.data) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_platformTypeCode'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
      selectByAllTypeApi({ constType: 'upload_state' }).then(x => {
        if (x.data.data) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_uploadStateCode'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
      selectByAllTypeApi({ constType: 'upload_type' }).then(x => {
        if (x.data.data) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_uploadTypeCode'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
      getLoginUserProMaintCompAuthApi({}).then(x => {
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
      getLoginUserProPropCompAuthApi({}).then(x => {
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
    })
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      deleteLog
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
