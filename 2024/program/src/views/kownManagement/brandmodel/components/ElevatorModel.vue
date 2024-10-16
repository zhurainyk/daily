<template>
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
    :show-head-search-porp="false"
    :dialog-mount="dialogMount"
    :is-file-upload="true"
    :show-action-copy-porp="true"
    :show-action-detail-porp="true"
    authortity="imodel"
    @detail-fn="detailFn"
  >
    <template #db_fileUrl="{ scope }">
      <el-upload
        class="avatar-uploader"
        :show-file-list="true"
        :http-request="beforeAvatarUpload"
        :data="scope"
        v-model:file-list="fileList"
        :on-remove="(...argument) => handleRemove(...argument, scope)"
        :auto-upload="true"
      >
        <el-button>上传</el-button>
      </el-upload>
    </template>
    <template #searchHead="{ searchWhere, newFn, searchBtnList }">
      <div class="search-where">
        <el-button type="primary" @click="newFn" class="auto-new-list"
          >新建</el-button
        >
        <el-button type="primary" @click="modalDownTemlepteApi"
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
        </el-upload>
      </div>
      <div class="search-where">
        <el-input
          v-model.trim="searchWhere['db_id_modelName']"
          clearable
          placeholder="型号名称"
        />
        <el-button
          type="primary"
          @click="searchBtnList"
          class="auto-new-list-table"
          >查询</el-button
        >
      </div>
    </template>
  </ListComponet>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  saveListApi
} from '@/api/module/elevatormodel'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { ElevatorModel } from '@/module.ts/elevatormodel'
import { menulist } from '@/router/menu'
import { modalDownTemlepteApi } from '@/api/module/importExcel'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new ElevatorModel()

    const tableMap = [
      {
        dbkey: 'db_id_modelName',
        name: '型号名称'
      },
      {
        dbkey: 'ui_brandName',
        name: '品牌'
      },
      {
        dbkey: 'ui_createtime',
        name: '创建时间'
      }
    ]
    const addModelProp: Array<IAddModel> = reactive([
      {
        name: '型号',
        dbkey: 'db_id_modelName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '品牌',
        dbkey: 'db_brandId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_Brand' }
      },
      {
        name: '型号版本',
        dbkey: 'db_modelVersion',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '制造商',
        dbkey: 'db_manuId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_Manufacturer' }
      },
      {
        name: '电梯种类',
        dbkey: 'db_elevCategCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'elevatorAll_category' }
      },

      {
        name: '相关文件',
        dbkey: 'db_fileUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ])
    const searchWhereModelProp = [
      {
        name: '型号名称',
        dbkey: 'db_id_modelName',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ]
    const fileList: any = ref([])
    const { showError } = useNormalValidateRespone()
    const beforeAvatarUploadFile = (args: any, model: any, fn) => {
      saveListApi({ multipartFile: args.file }).then(x => {
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
    const beforeAvatarUpload = (args: any) => {
      args.data.files.file = args.file
      fileList.value = [
        {
          name: args.file.name
        }
      ]
    }
    const dialogMount = (model: ElevatorModel, addModel: Array<any>) => {
      if (model.db_fileUrl) {
        fileList.value = [
          {
            name: model.db_fileName
          }
        ]
      }
    }
    const handleRemove = (file, uploadFiles, scope) => {
      scope.files.file = null
    }
    const $router = useRouter()
    const detailFn = args => {
      $router.push({
        name: menulist.BrandModelDetail.name,
        params: {
          id: args.db_id
        }
      })
    }
    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      selectByIdApi,
      beforeAvatarUpload,
      dialogMount,
      handleRemove,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      fileList,
      detailFn,
      beforeAvatarUploadFile,
      modalDownTemlepteApi
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
