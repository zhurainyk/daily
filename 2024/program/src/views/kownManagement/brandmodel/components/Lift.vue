<template>
  <ListComponet :select-by-condition-api="selectByConditionApi"
    :select-count-by-condition-api="selectCountByConditionApi" :model-data="modelData" :save-api="saveApi"
    :update-by-id-api="updateByIdApi" :delete-by-id-api="deleteByIdApi" :select-by-id-api="selectByIdApi"
    :table-map="tableMap" :add-model-prop="addModelProp" :search-where-model-prop="searchWhereModelProp"
    :show-head-search-porp="false" :is-file-upload="true" authortity="ibrand">
    <!-- <template #db_logoUrl="{ scope }">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :http-request="beforeAvatarUpload"
        :data="scope"
        :auto-upload="true"
      >
        <img
          v-if="scope.dialogModel && scope.dialogModel.db_logoUrl"
          :src="scope.dialogModel.db_logoUrl"
          class="avatar"
        />
        <el-icon v-else class="avatar-uploader-icon">+</el-icon>
      </el-upload>
    </template> -->

    <template #headdb_logoUrl="{ scope }">
      <img :src="scope.row.db_logoUrl" />
    </template>
    <template #searchHead="{ searchWhere, newFn, searchBtnList }">
      <div class="search-where">
        <el-button type="primary" @click="newFn" class="auto-new-list">新建</el-button>
        <el-button type="primary" @click="brandDownTemlepteApi">模板下载</el-button>
        <el-upload :show-file-list="false" :auto-upload="true" :http-request="
          (...argument) =>
            beforeAvatarUploadFile(...argument, x, searchBtnList)
        ">
          <el-button type="primary">导入</el-button>
        </el-upload>
      </div>
      <div class="search-where">
        <el-input v-model.trim="searchWhere['db_id_brandName']" clearable placeholder="品牌名称" />
        <el-button type="primary" @click="searchBtnList" class="auto-new-list-table">查询</el-button>
      </div>
    </template>
  </ListComponet>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  saveListApi
} from '@/api/module/brand'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { brandDownTemlepteApi } from '@/api/module/importExcel'
import ListComponet from '@/components/singlelist'
import { Brand } from '@/module.ts/brand'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Brand()
    const tableMap = [
      {
        dbkey: 'db_logoUrl',
        name: '品牌LOGO'
      },
      {
        dbkey: 'db_id_brandName',
        name: '品牌名称'
      },
      {
        dbkey: 'ui_createtime',
        name: '创建时间'
      }
    ]
    const addModelProp: Array<IAddModel> = [
      {
        name: '品牌名称',
        dbkey: 'db_id_brandName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: 'LOGO',
        dbkey: 'db_logoUrl',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [],
        type: 'img'
      }
    ]
    const searchWhereModelProp = [
      {
        name: '品牌名称',
        dbkey: 'db_id_brandName',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ]
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

    return {
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      selectByIdApi,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      brandDownTemlepteApi,
      beforeAvatarUploadFile
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

  .avatar-uploader {
    .avatar-uploader-icon {
      font-size: 30px;
      border: 1px dashed #8c939d;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 178px;
      height: 178px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 178px;
      height: 178px;
    }
  }

  img {
    width: 80px;
  }
}
</style>
