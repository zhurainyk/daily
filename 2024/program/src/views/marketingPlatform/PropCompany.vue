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
      :dialogSelectMount="dialogSelectMount"
      :submitBeforeFn="submitBeforeFn"
    >
      <template #searchHead="{ searchWhere, newFn, searchBtnList, addBtn }">
        <div class="search-where">
          <el-button
            v-if="addBtn"
            type="primary"
            @click="newFn"
            class="auto-new-list"
            >新建</el-button
          >
          <authority-button
            apiUrl="/elevator/ipropCompany/saveList"
            type="primary"
            @click="propCompanyDownTemlepteApi"
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
              apiUrl="/elevator/ipropCompany/saveList"
              type="primary"
              >导入</authority-button
            >
          </el-upload>
        </div>
        <div class="search-where">
          <el-input
            v-model.trim="searchWhere['db_id_companyName']"
            clearable
            placeholder="公司名称"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  saveListApi
} from '@/api/module/propcompany'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Usercenter_PropCompany } from '@/module.ts/Usercenter_PropCompany'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'
import { propCompanyDownTemlepteApi } from '@/api/module/importExcel'
import AuthorityButton from '@/components/common/AuthorityButton.vue'
import { selectByConditionApi as selectUserByConditionApi } from '@/api/module/user'

export default defineComponent({
  components: { ListComponet, AuthorityButton },
  setup() {
    const modelData = new Usercenter_PropCompany()
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
    const addModelProp = reactive([
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
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '公司地址',
        dbkey: 'db_companyAddr',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '法定代表人',
        dbkey: 'db_legalPerson',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '联系人姓名',
        dbkey: 'db_contactName',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '联系人电话',
        dbkey: 'db_contactPhone',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '公司电话',
        dbkey: 'db_companyPhone',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '银行账号',
        dbkey: 'db_bankAccount',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '开户行名称',
        dbkey: 'db_bankName',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '源id',
        dbkey: 'db_srcId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: false,
        list: [],
        fn: selectUserByConditionApi,
        fnArgs: {
          ui_type: 'A1',
          ui_currentPage: 1,
          ui_pageSize: 0,
          db_isSrc: '01'
        },
        key: 'db_id',
        value: 'db_id_username'
      },
      {
        name: '是否启用Logo',
        dbkey: 'db_extraOnOff',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'public_whether' }
      },
      {
        name: '展示的公司名称',
        dbkey: 'company_name',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '系统展示名称',
        dbkey: 'system_name',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '营业执照',
        dbkey: 'db_licenseUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'license',
        multipledata: [],
        list: []
      },
      {
        name: 'web端logo',
        dbkey: 'logo_url',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'license',
        multipledata: [],
        list: []
      },
      {
        name: 'APP端logo',
        dbkey: 'appLogo_url',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'license',
        multipledata: [],
        list: []
      },
      {
        name: '小程序logo',
        dbkey: 'wxLogo_url',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'license',
        multipledata: [],
        list: []
      }
    ])
    const searchWhereModelProp = [
      {
        name: '公司名称',
        dbkey: 'db_id_companyName',
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
    const dialogSelectMount = dialogModel => {
      let tempJosn: any = {}
      if (dialogModel.db_extra) {
        try {
          tempJosn = JSON.parse(dialogModel.db_extra)
        } catch (error) {
          console.log('数据不合格')
        }
      }
      dialogModel.company_name = tempJosn.company_name

      dialogModel.system_name = tempJosn.system_name

      dialogModel.logo_url = tempJosn.logo_url

      dialogModel.appLogo_url = tempJosn.appLogo_url

      dialogModel.wxLogo_url = tempJosn.wxLogo_url
    }
    const submitBeforeFn = (dialogModel: any) => {
      const tempJosn = {
        company_name: dialogModel.company_name,
        system_name: dialogModel.system_name,
        logo_url: dialogModel.logo_url,
        appLogo_url: dialogModel.appLogo_url,
        wxLogo_url: dialogModel.wxLogo_url
      }
      dialogModel.db_extra = JSON.stringify(tempJosn)
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
      beforeAvatarUploadFile,
      propCompanyDownTemlepteApi,
      dialogSelectMount,
      submitBeforeFn
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
