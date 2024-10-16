<template>
  <div class="page-list">
    <div class="page-body">
      <div class="page-list-main">
        <el-table :data="list" height="100%">
          <el-table-column label="电梯编号" property="db_id_projectNum">
          </el-table-column>
          <el-table-column label="电梯型号" property="db_elevType">
            <template #default="scope">
              <span v-if="scope.row.db_elevType == '1'">扶梯</span>
              <span v-else>直梯</span>
            </template>
          </el-table-column>
          <el-table-column
            label="注册代码"
            property="db_registCode"
          ></el-table-column>
          <el-table-column
            label="品牌名称"
            property="ui_brandName"
          ></el-table-column>
          <!-- <el-table-column
            label="电梯类型"
            property="ui_brandName"
          ></el-table-column> -->
          <el-table-column
            label="型号"
            property="ui_modelName"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getElevatorByDbIdsApi } from '@/api/module/elevator'
import { selectByIdApi } from '@/api/module/contract'

export default defineComponent({
  props: {
    modelDataProps: {
      type: Object,
      default: () => {}
    },
    showNewPorp: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const list = ref([])
    const tableMap = [
      {
        dbkey: 'db_id_projectNum',
        name: '电梯编号'
      },
      {
        dbkey: 'db_registCode',
        name: '注册代码'
      },
      {
        dbkey: 'ui_brandName',
        name: '品牌名称'
      },
      {
        dbkey: 'ui_brandName',
        name: '电梯类型'
      },
      {
        dbkey: 'ui_brandName',
        name: '型号'
      }
    ]
    const searchWhereModelProp = [
      {
        name: '注册代码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ]
    onMounted(async () => {
      const tempPosi = await selectByIdApi({
        id: props.modelDataProps.db_id
      })
      if (tempPosi.data.data.db_contEleIds) {
        getElevatorByDbIdsApi({
          db_ids: tempPosi.data.data.db_contEleIds
        }).then(x => {
          if (x.data.success) {
            list.value = x.data.data
          }
        })
      }
    })
    return {
      searchWhereModelProp,
      tableMap,
      list
    }
  }
})
</script>
