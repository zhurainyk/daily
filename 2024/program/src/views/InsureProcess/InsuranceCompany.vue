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
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi
} from '@/api/module/insucompany'
import ListComponet from '@/components/singlelist'
import { Usercenter_InsuCompany } from '@/module.ts/Usercenter_InsuCompany'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { selectByConditionApi as selectUserByConditionApi } from '@/api/module/user'

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
    let tempArr: any = []
    const store = useStore()

    if (store.state.user.userInfo?.db_isSrc == '01') {
    } else if (
      store.state.user.userInfo?.db_isSrc != '01' &&
      store.state.user.userInfo?.db_srcId
    ) {
    } else {
      tempArr = [
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
        }
      ]
    }
    const addModelProp = [
      {
        name: '公司名称',
        dbkey: 'db_id_companyName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        ispartion: true,
        partionname: '基本信息'
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
      ...tempArr,
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
      }
    ]

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
        > div {
          margin-right: 10px;
        }
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
}
</style>
