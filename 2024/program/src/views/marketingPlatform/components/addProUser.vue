<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="getPropUserByProjectIdApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :search-where-model-prop="searchWhereModelProp"
      :show-head-search-porp="false"
      :show-action-edit-porp="false"
      :show-action-delete-porp="false"
      :show-action-porp="false"
      :is-havepagination="false"
      :lis-function="lisFunction"
    >
      <template #searchHead>
        <div></div>
      </template>
    </ListComponet>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getPropUserByProjectIdApi } from '@/api/module/projectManage'
import ListComponet from '@/components/singlelist'
import { Usercenter_PropUser } from '@/module.ts/Usercenter_PropUser'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  components: { ListComponet },
  props: {
    modelDataProps: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const modelData = new Usercenter_PropUser()
    modelData.db_id = props.modelDataProps.db_id
    const addModelProp = reactive([
      {
        name: '物业人员',
        dbkey: 'ui_posiType',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Usercenter_PropUser' }
      }
    ])
    const tableMap = [
      {
        dbkey: 'db_id_username',
        name: '姓名'
      },
      {
        dbkey: 'db_mobilePhone',
        name: '手机号'
      },
      {
        dbkey: 'ui_posiName',
        name: '职位'
      }
    ]
    const searchWhereModelProp = [
      {
        name: '姓名',
        dbkey: 'ui_username',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ]
    const lisFunction = args => ({
      objectList: args,
      condition: null
    })
    return {
      searchWhereModelProp,
      tableMap,
      getPropUserByProjectIdApi,
      modelData,
      addModelProp,
      lisFunction
    }
  }
})
</script>
