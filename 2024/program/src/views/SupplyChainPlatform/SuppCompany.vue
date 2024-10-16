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
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi
} from '@/api/module/suppcompany'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import ListComponet from '@/components/singlelist'
import { Elevator_SuppCompany } from '@/module.ts/Elevator_SuppCompany'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_SuppCompany()
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
        name: '公司法人',
        dbkey: 'db_legalPerson',
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
      searchWhereModelProp
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
  :deep().db_licenseUrl {
    width: 500px !important;
  }
}
</style>
