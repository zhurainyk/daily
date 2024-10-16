<template>
  <div class="page-body">
    <div class="page-body-head">
      <el-button v-if="addBtn" type="primary" @click="roleNewFn"
        >新建</el-button
      >
      <div v-else></div>
      <div class="search-where">
        <el-input
          v-model.trim="searchWhere.db_id_roleName"
          placeholder="角色名称"
        />
        <el-button type="primary" @click="searchBtnList">查询</el-button>
      </div>
    </div>
    <div class="page-list-main">
      <el-table :data="pageModal.list" height="100%">
        <el-table-column label="角色名称" property="db_id_roleName">
        </el-table-column>
        <el-table-column property="ui_createtime" label="创建时间" />
        <!-- <el-table-column  label="状态" >
                      <template #default="scope">
                         <span v-if="scope.row.db_roleState=='1'">启用</span>
                         <span v-else>禁用</span>
                     </template>
                 </el-table-column> -->
        <el-table-column label="操作">
          <template #default="scope">
            <span v-if="updateBtn" class="edit" @click="roleEdit(scope.row)"
              >编辑</span
            >
            <span
              v-if="deleteBtn"
              class="delete"
              @click="deleteRoleFn(scope.row)"
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
    width="30%"
    :show-close="false"
  >
    <AddEditRole
      :role="currentRole"
      @close="dialog.visiableDialog = false"
      @success="addNewSuccess"
    ></AddEditRole>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  deleteByIdApi
} from '@/api/module/role'
import { ListDao } from '../../../../module.ts/page'
import { Role } from '../../../../module.ts/role'
import AddEditRole from './AddEditRole'
import { UiType } from '@/constant'

export default defineComponent({
  components: { AddEditRole },
  setup() {
    const pageModal: ListDao<RoleDao> = reactive(new ListDao<RoleDao>())
    const searchWhere: RoleDao = reactive(new Role())
    const currentRole: RoleDao = new Role()
    console.log(3644)
    const dialog = reactive({
      visiableDialog: false
    })
    const getListData = async () => {
      const result = await selectByConditionApi({
        ...pageModal.pagePagination,
        ...searchWhere
      })
      if (result.data.success) {
        const { objectList, condition } = result.data.data
        if (condition) {
          searchWhere.db_id_roleName = condition.db_id_roleName
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
    const searchBtnList = async () => {
      pageModal.pagePagination.ui_currentPage = 1
      pageModal.pagePagination.ui_type = UiType.A1
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
    const roleNewFn = () => {
      currentRole.db_id = ''
      dialog.visiableDialog = true
    }
    const roleEdit = (args: RoleDao) => {
      currentRole.db_id = args.db_id
      console.log(currentRole)
      dialog.visiableDialog = true
    }
    const addNewSuccess = () => {
      searchList()
    }
    const deleteRoleFn = (args: RoleDao) => {
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
          (x: any) => x.indexOf(`irole/save`) > -1
        ) > -1
    )
    const deleteBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex(
          (x: any) => x.indexOf(`irole/deleteById`) > -1
        ) > -1
    )
    const updateBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex(
          (x: any) => x.indexOf(`irole/updateById`) > -1
        ) > -1
    )
    return {
      pageModal,
      searchList,
      searchInit,
      handleCurrentChange,
      handleSizeChange,
      searchBtnList,
      deleteRoleFn,
      roleEdit,
      roleNewFn,
      addNewSuccess,
      dialog,
      currentRole,
      searchWhere,
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
