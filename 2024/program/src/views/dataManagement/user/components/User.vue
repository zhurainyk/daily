<template>
  <div class="page-search">
    <div>
      <div>
        <label>用户名</label>
        <el-input v-model.trim="searchWhere.db_id_username" />
      </div>
      <div>
        <label>手机号</label>
        <el-input v-model.trim="searchWhere.db_mobilePhone" />
      </div>
      <div>
        <label>职位类型</label>
        <el-select
          v-model="searchWhere.db_posiType"
          placeholder=""
          clearable
          @change="changePostionType"
        >
          <el-option
            v-for="item in typesList"
            :key="item.label"
            :label="item.label"
            :value="item.value + ''"
          ></el-option>
        </el-select>
      </div>
      <div>
        <label>职位名称</label>
        <el-select v-model="searchWhere.db_posiId" placeholder="" clearable>
          <el-option
            v-for="item in postionList"
            :key="item.db_id"
            :label="item.db_id_posiName"
            :value="item.db_id"
          ></el-option>
        </el-select>
      </div>
      <div>
        <label>用户状态</label>
        <el-select v-model="searchWhere.db_accState" placeholder="" clearable>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </div>
      <div>
        <el-button class="auto-reset" @click="resetSearch">重置</el-button>
        <el-button type="primary" @click="searchBtnList">查询</el-button>
      </div>
    </div>
  </div>
  <div class="page-body">
    <div class="page-body-head"></div>
    <div class="page-list-main">
      <el-table :data="pageModal.list" height="100%">
        <el-table-column label="用户名" property="db_id_username">
        </el-table-column>
        <el-table-column property="db_mobilePhone" label="手机号" />
        <el-table-column property="ui_posiName" label="职位名称" />
        <el-table-column property="ui_posiTypeName" label="职位类型" />
        <el-table-column property="db_accState" label="用户状态">
          <template #default="scope">
            <span v-if="scope.row.db_accState == '1'">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column property="ui_createtime" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <div class="action">
              <el-button type="primary" @click="resetPsd(scope.row)"
                >重置密码</el-button
              >
              <el-button type="primary" @click="getPsd(scope.row)"
                >提取密码</el-button
              >
              <el-button type="primary" @click="disableEnableFn(scope.row)">{{
                scope.row.db_accState == '1' ? '禁用' : '启用'
              }}</el-button>

              <el-button type="primary" @click="getAuthorList(scope.row)"
                >权限</el-button
              >
            </div>
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
  <el-dialog v-model="dialog.visiableDialog" width="30%" :show-close="false">
    <AddUser
      :model-data="currentData"
      @close="dialog.visiableDialog = false"
      @success="searchInit"
    ></AddUser>
  </el-dialog>
  <auth-person-detail
    :userid="currentUserId"
    :dialog-visiable="dialog.visiableAuthor"
    @close="dialog.visiableAuthor = false"
    v-if="dialog.visiableAuthor"
  ></auth-person-detail>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  resetPasswordApi,
  getUserPsdByIdApi,
  enableByIdApi,
  disableByIdApi
} from '@/api/module/user'
import { selectByConditionApi as selectByConditionPositonApi } from '@/api/module/position'
import { selectByAllTypeApi } from '@/api/module/commont'
import { ListDao } from '../../../../module.ts/page'
import AddUser from './AddEditUser.vue'
import { UserSearch } from '@/module.ts/search/usersearch'
import { UiType } from '@/constant'
import { Usercenter_Account } from '@/module.ts/Usercenter_Account'
import AuthPersonDetail from './AuthPersonDetail'

export default defineComponent({
  components: { AddUser, AuthPersonDetail },
  setup() {
    const options = [
      {
        value: '0',
        label: '停用'
      },
      {
        value: '1',
        label: '启用'
      }
    ]

    const pageModal: ListDao<Usercenter_Account> = reactive(new ListDao())
    const searchWhere: IUserSearch = reactive(new UserSearch())
    const currentData = ref<Usercenter_Account>(new Usercenter_Account())
    const currentUserId = ref('')
    const typesList: any = ref([])
    const postionList: any = ref([])
    let postionListAll = []
    const dialog = reactive({
      visiableDialog: false,
      visiableAuthor: false
    })
    const getListData = async () => {
      const result = await selectByConditionApi({
        ...pageModal.pagePagination,
        ...searchWhere
      })
      if (result.data.success) {
        const { objectList, condition } = result.data.data
        if (condition) {
          //  searchWhere.db_accState = condition.db_accState
          searchWhere.db_id_username = condition.db_id_username
          searchWhere.db_mobilePhone = condition.db_mobilePhone
        }
        return objectList
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
    const searchBtnList = async () => {
      pageModal.pagePagination.ui_currentPage = 1
      pageModal.pagePagination.ui_type = UiType.A1
      pageModal.list = await getListData()
      pageModal.pagePagination.ui_dataSize = await pagecountFn()
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
    const resetSearch = () => {
      searchWhere.db_accState = ''
      searchWhere.db_id_username = ''
      searchWhere.db_mobilePhone = ''
      searchWhere.db_posiType = ''
      searchWhere.db_posiId = ''
    }
    const disableEnableFn = row => {
      ElMessageBox.confirm(
        row.db_accState == '1' ? '确认禁用?' : '确认启用?',
        '提示',
        {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }
      )
        .then(() => {
          if (row.db_accState == '1') {
            disableByIdApi({ id: row.db_id }).then(x => {
              if (x.data.success) {
                searchBtnList()
                ElMessage.success('成功')
              } else {
                ElMessage.error('失败')
              }
            })
          } else {
            enableByIdApi({ id: row.db_id }).then(x => {
              if (x.data.success) {
                searchBtnList()
                ElMessage.success('成功')
              } else {
                ElMessage.error('失败')
              }
            })
          }
        })
        .catch(() => {})
    }
    const editFn = (args: Usercenter_Account) => {
      currentData.value = args
      dialog.visiableDialog = true
    }
    const newFn = () => {
      currentData.value = new Usercenter_Account()
      dialog.visiableDialog = true
    }
    const changePostionType = args => {
      postionList.value = []
      console.log(args)
      if (args) {
        postionList.value = postionListAll.filter(
          (x: any) => x.db_posiType == args
        )
      } else {
        searchWhere.db_posiId = ''
      }
    }

    const resetPsd = row => {
      resetPasswordApi({ db_id: row.db_id }).then(x => {
        if (x.data.success) {
          ElMessage.success('成功')
        } else {
          ElMessage.error('失败')
        }
      })
    }
    const getPsd = row => {
      getUserPsdByIdApi({ db_id: row.db_id }).then(x => {
        if (x.data.success) {
          ElMessageBox.alert(x.data?.data?.db_password, '密码', {
            confirmButtonText: '确定'
          })
        }
      })
    }
    const getAuthorList = row => {
      currentUserId.value = row.db_id
      dialog.visiableAuthor = true
    }

    onMounted(async () => {
      selectByAllTypeApi({ constType: 'position_type' }).then(types => {
        if (types.data.success) {
          Object.entries<string>(types.data.data).forEach(([key, v]) => {
            typesList.value.push({
              value: key,
              label: v
            })
          })
        }
      })
      selectByConditionPositonApi({ ui_type: UiType.A0 }).then(position => {
        if (position.data.success) {
          postionListAll = position.data.data.objectList
        }
      })
      searchInit()
    })

    return {
      options,
      pageModal,
      searchList,
      searchInit,
      handleCurrentChange,
      handleSizeChange,
      resetSearch,
      searchBtnList,
      currentData,
      editFn,
      newFn,
      dialog,
      searchWhere,
      typesList,
      postionList,
      changePostionType,
      resetPsd,
      getPsd,
      disableEnableFn,
      currentUserId,
      getAuthorList
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  background-color: white;
  .page-body {
    /* height: calc(100% - 220px); */
    .action {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      > button {
        margin-bottom: 10px;
        margin-left: 0;
      }
    }
  }
}
</style>
