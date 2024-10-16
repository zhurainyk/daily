<template>
  <div class="page-list">
    <div class="page-head">
      <label>账号管理</label>
    </div>
    <div class="page-search">
      <div>
        <div>
          <label>用户名</label>
          <el-input placeholder="Please input" />
        </div>
        <div>
          <label>手机号</label>
          <el-input placeholder="Please input" />
        </div>
        <div>
          <label>用户角色</label>
          <el-select placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
        <div>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="page-body-head">
        <el-button type="primary" @click="dialog.visiableUser = true"
          >添加</el-button
        >
        <el-button type="danger">删除</el-button>
      </div>
      <div class="page-list-main">
        <el-table :data="pageModal.list" height="100%">
          <el-table-column type="selection" width="55" />
          <el-table-column label="用户名" property="db_id_username" width="120">
          </el-table-column>
          <el-table-column
            property="db_mobilePhone"
            label="手机号"
            width="120"
          />
          <!-- <el-table-column property="address" label="Address" show-overflow-tooltip /> -->
          <el-table-column label="操作" width="120">
            <template #default>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-pagination">
        <el-pagination
          :page-size="pageModal.pagePagination.ui_pageSize"
          layout="total,sizes, prev, pager, next"
          :page-sizes="[10, 20, 30, 40]"
          :total="pageModal.pagePagination.ui_dataSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog v-model="dialog.visiableUser" width="30%" :show-close="false">
      <AddUser @close="dialog.visiableUser = false"></AddUser>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import {
  selectByConditionApi,
  selectCountByConditionApi
} from '@/api/module/user'
import { ListDao } from '../../../module.ts/page'
import AddUser from './components/AddEditUser.vue'

export default defineComponent({
  components: { AddUser },
  setup() {
    const options = [
      {
        value: 'Option1',
        label: 'Option1'
      },
      {
        value: 'Option2',
        label: 'Option2'
      },
      {
        value: 'Option3',
        label: 'Option3'
      },
      {
        value: 'Option4',
        label: 'Option4'
      },
      {
        value: 'Option5',
        label: 'Option5'
      }
    ]

    const pageModal: ListDao<UserDao> = reactive(new ListDao())
    const dialog = reactive({
      visiableUser: false
    })
    const getListData = async () => {
      const result = await selectByConditionApi({ ...pageModal.pagePagination })
      if (result.data.success) {
        return result.data.data
      }
      return []
    }
    const pagecountFn = async () => {
      const result = await selectCountByConditionApi({
        ...pageModal.pagePagination
      })
      console.log(result)
      if (result.data.success) {
        return 16
      }
      return 0
    }
    const searchList = async () => {
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
    onMounted(async () => {
      searchInit()
    })

    return {
      options,
      pageModal,
      searchList,
      searchInit,
      handleCurrentChange,
      handleSizeChange,
      dialog
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  .page-body {
    height: calc(100% - 220px);
  }
}
</style>
