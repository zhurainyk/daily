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
} from '@/api/module/versionhelmet'
import ListComponet from '@/components/singlelist'
import { Elevator_VersionAndroid } from '@/module.ts/Elevator_VersionAndroid'

export default defineComponent({
  components: { ListComponet },
  setup() {
    const modelData = new Elevator_VersionAndroid()
    const tableMap = [
      {
        dbkey: 'db_id_versioCode',
        name: '版本号'
      },
      {
        dbkey: 'db_versionValue',
        name: '版本值'
      },
      {
        dbkey: 'db_upgradeDesc',
        name: '更新描述'
      },
      {
        dbkey: 'db_note',
        name: '备注'
      }
    ]
    const addModelProp = reactive([
      {
        name: '版本号',
        dbkey: 'db_id_versioCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '版本值',
        dbkey: 'db_versionValue',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '更新描述',
        dbkey: 'db_upgradeDesc',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '是否强制更新',
        dbkey: 'db_versionType',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            label: '否',
            value: '00'
          },
          {
            label: '是',
            value: '01'
          }
        ]
      },
      {
        name: 'app下载地址',
        dbkey: 'db_appUrl',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'files',
        filekey: 'app'
      },
      {
        name: '备注',
        dbkey: 'db_note',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      }
    ])
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

    const sysList: any = ref([])
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
}
</style>
