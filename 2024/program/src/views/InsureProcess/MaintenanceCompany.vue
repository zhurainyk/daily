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
      :show-head-search-porp="false"
      :maxwidth="true"
    >
      <template #searchHead="{ searchBtnList, searchWhere, addBtn }">
        <div class="search-where">
          <el-button v-if="addBtn" type="primary" @click="newCompany"
            >新建公司</el-button
          >
          <authority-button
            apiUrl="/elevator_supplychain/imaintCompany/saveList"
            type="primary"
            @click="maintCompanyTemlepteApi"
            >模板下载</authority-button
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
              apiUrl="/elevator_supplychain/imaintCompany/saveList"
              type="primary"
              >导入</authority-button
            >
          </el-upload>
        </div>
        <div class="search-where">
          <!-- <el-select
            v-model="searchWhere.ui_isByProject"
            placeholder="关联项目"
            clearable
          >
            <el-option label="否" value="00">否</el-option>
            <el-option label="是" value="01">是</el-option>
          </el-select> -->
          <el-input
            v-model="searchWhere.db_id_companyName"
            placeholder="公司名称"
          />
          <el-button type="primary" @click="searchBtnList">查询</el-button>
        </div>
      </template>
      <template #editaction="{ scope }">
        <span class="edit" @click="editCompany(scope.row)">编辑</span>
      </template>
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { maintCompanyTemlepteApi } from '@/api/module/importExcel'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  saveListApi
} from '@/api/module/maincompany'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Usercenter_InsuCompany } from '@/module.ts/Usercenter_InsuCompany'
import { menulist } from '@/router/menu'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Usercenter_InsuCompany()
    const $route = useRoute()
    if ($route.query) {
      Object.entries<string>($route.query).forEach(([key, v]) => {
        modelData[key] = v
      })
    }
    const tableMap = [
      {
        dbkey: 'db_id_companyName',
        name: '公司名称'
      },
      {
        dbkey: 'db_companyAddr',
        name: '公司地址'
      },
      {
        dbkey: 'db_contactName',
        name: '联系人'
      }
    ]
    const addModelProp = [
      {
        name: '公司名称',
        dbkey: 'db_id_companyName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '纳税识别号',
        dbkey: 'db_companyCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '公司地址',
        dbkey: 'db_companyAddr',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '联系人姓名',
        dbkey: 'db_contactName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '联系人电话',
        dbkey: 'db_contactPhone',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '公司电话',
        dbkey: 'db_companyPhone',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '银行账号',
        dbkey: 'db_bankAccount',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '开户行名称',
        dbkey: 'db_bankName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '营业执照',
        dbkey: 'db_licenseUrl',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'license',
        multipledata: [],
        list: []
      }
    ]
    const searchWhereModelProp = [
      {
        name: '现象名称',
        dbkey: 'db_id_appearName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
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
    const $router = useRouter()
    const newCompany = () => {
      $router.push({
        name: menulist.MaintenanceCompanyInsureEdit.name,
        params: {
          id: '',
          action: 'new'
        }
      })
    }
    const editCompany = data => {
      $router.push({
        name: menulist.MaintenanceCompanyInsureEdit.name,
        params: {
          id: data.db_id,
          action: 'edit'
        }
      })
    }
    onMounted(() => {})
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
      newCompany,
      editCompany,
      maintCompanyTemlepteApi,
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
        > div {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
