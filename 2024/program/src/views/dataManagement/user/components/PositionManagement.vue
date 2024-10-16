<template>
  <div class="page-body">
    <div class="page-body-head">
      <el-button v-if="addBtn" type="primary" @click="newFn">新建</el-button>
      <div v-else></div>
      <div class="search-where">
        <el-input
          v-model.trim="searchWhere.db_id_posiName"
          clearable
          placeholder="职位名称"
        />
        <el-button type="primary" @click="searchBtnList">查询</el-button>
      </div>
    </div>
    <div class="page-list-main">
      <el-table :data="pageModal.list" height="100%">
        <el-table-column label="职位名称" property="db_id_posiName">
        </el-table-column>
        <el-table-column property="ui_posiTypeName" label="职位类型" />
        <el-table-column property="ui_createtime" label="创建时间" />
        <!-- <el-table-column  label="状态" >
                     <template #default="scope">
                         <span v-if="scope.row.db_posiState=='1'">启用</span>
                         <span v-else>禁用</span>
                     </template>
                 </el-table-column> -->
        <el-table-column label="操作">
          <template #default="scope">
            <span v-if="deleteBtn" class="edit" @click="editFn(scope.row)"
              >编辑</span
            >
            <span v-if="updateBtn" class="delete" @click="deleteFn(scope.row)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-pagination">
      <el-pagination
        :page-size="pageModal.pagePagination.ui_pageSize"
        layout="total,sizes, prev, pager, next"
        :page-sizes="[10, 20, 30, 40]"
        :current-page="pageModal.pagePagination.ui_currentPage"
        :total="pageModal.pagePagination.ui_dataSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <el-dialog
    v-if="dialog.visiableDialog"
    v-model="dialog.visiableDialog"
    width="550px"
    :show-close="false"
  >
    <AddEditPosition
      :position-prop="currentData"
      @close="dialog.visiableDialog = false"
      @success="searchInit"
    ></AddEditPosition>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  deleteByIdApi
} from '@/api/module/position'
import { ListDao } from '../../../../module.ts/page'
import { Position } from '../../../../module.ts/position'
import AddEditPosition from './AddEditPosition'
import { UiType } from '@/constant'

export default defineComponent({
  components: { AddEditPosition },
  setup() {
    const pageModal: ListDao<PositionDao> = reactive(new ListDao<PositionDao>())
    const searchWhere: PositionDao = reactive(new Position())
    const dialog = reactive({
      visiableDialog: false
    })
    const currentData = ref<PositionDao>(new Position())
    const getListData = async () => {
      const result = await selectByConditionApi({
        ...pageModal.pagePagination,
        ...searchWhere
      })
      if (result.data.success) {
        const { objectList, condition } = result.data.data
        if (condition) {
          searchWhere.db_id_posiName = condition.db_id_posiName
        }
        return objectList || 0
      }
      return []
    }
    const pagecountFn = async () => {
      const result = await selectCountByConditionApi({
        ...pageModal.pagePagination,
        ...searchWhere
      })
      if (result.data.success) {
        return result.data.data || 0
      }
      return 0
    }
    const searchList = async () => {
      pageModal.pagePagination.ui_type = UiType.A0
      pageModal.list = await getListData()
      pageModal.pagePagination.ui_dataSize = await pagecountFn()
    }
    const searchInit = () => {
      pageModal.pagePagination.ui_currentPage = 1
      searchList()
    }
    const handleSizeChange = (size: number) => {
      pageModal.pagePagination.ui_pageSize = size
      pageModal.pagePagination.ui_currentPage = 1
      searchList()
    }
    const handleCurrentChange = (page: number) => {
      pageModal.pagePagination.ui_currentPage = page
      searchList()
    }
    const searchBtnList = async () => {
      pageModal.pagePagination.ui_currentPage = 1
      pageModal.pagePagination.ui_type = UiType.A1
      pageModal.list = await getListData()
      pageModal.pagePagination.ui_dataSize = await pagecountFn()
    }
    const editFn = (args: PositionDao) => {
      currentData.value = args
      dialog.visiableDialog = true
    }
    const newFn = () => {
      currentData.value = new Position()
      dialog.visiableDialog = true
    }
    const deleteFn = (args: PositionDao) => {
      ElMessageBox.confirm('是否删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(() => {
          deleteByIdApi({ id: args.db_id }).then(x => {
            if (x.data.success) {
              searchList()
            }
          })
        })
        .catch(() => {})
    }

    onMounted(async () => {
      searchInit()
    })
    const store = useStore()
    const addBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex(
          (x: any) => x.indexOf(`iposition/save`) > -1
        ) > -1
    )
    const deleteBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex(
          (x: any) => x.indexOf(`iposition/deleteById`) > -1
        ) > -1
    )
    const updateBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex(
          (x: any) => x.indexOf(`iposition/updateById`) > -1
        ) > -1
    )
    return {
      pageModal,
      searchList,
      searchInit,
      handleCurrentChange,
      handleSizeChange,
      deleteFn,
      editFn,
      searchBtnList,
      newFn,
      searchWhere,
      dialog,
      currentData,
      addBtn,
      deleteBtn,
      updateBtn
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
        > button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
