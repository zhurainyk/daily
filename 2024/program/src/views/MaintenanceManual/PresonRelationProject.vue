<template>
  <div class="layout-left-right">
    <div class="left-mian">
      <div class="left-mian-body">
        <div class="header">
          <label>人员列表</label
          ><el-input v-model="searchName" placeholder="输入查询"></el-input>
        </div>
        <div class="list-body">
          <div
            v-for="x in dataSource"
            :key="x.value"
            :class="[
              {
                'seleced-item': currentUser && currentUser == x.value
              },
              { 'disable-not-show': findName(x.label) }
            ]"
            @click="clickOrg(x)"
          >
            <el-icon class="see-more" @click.stop="openAuthList(x)"
              ><View
            /></el-icon>
            <label>{{ `${x.label || ''}(${x.db_mobilePhone})` }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="page-list right-mian">
      <ListComponet
        ref="listRef"
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
        :show-h-check-box-porp="true"
        :maxwidth="true"
        :show-action-porp="false"
      >
        <template #searchHead="{ searchBtnList, searchWhere, selectedList }">
          <div class="search-where-head">
            <div>
              <el-button
                type="primary"
                @click="addUserToProjectFn(selectedList)"
                >保存</el-button
              >
            </div>
            <div class="search-where search-where-auth">
              <el-select
                v-model="searchWhere.db_useCompanyId"
                clearable
                filterable
                placeholder="使用单位"
              >
                <el-option
                  v-for="item in tempdb_useCompanyId.list"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select
                v-model="searchWhere.db_maintCompanyId"
                clearable
                filterable
                placeholder="维保单位"
              >
                <el-option
                  v-for="item in tempdb_maintCompanyId.list"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
              /></el-select>
              <el-select
                v-model="searchWhere.db_insuCompanyId"
                clearable
                filterable
                placeholder="承保单位"
              >
                <el-option
                  v-for="item in tempdb_insuCompanyId.list"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input
                v-model.trim="searchWhere.db_id_proName"
                placeholder="项目名称"
              />
              <el-button type="primary" @click="searchBtnList">查询</el-button>
            </div>
          </div>
        </template>
      </ListComponet>
    </div>
  </div>
  <auth-person-detail
    :list="authList"
    :dialogVisiable="dialog.visiableDialog"
    @close="dialog.visiableDialog = false"
    :title="title"
  ></auth-person-detail>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { View } from '@element-plus/icons-vue'
import ListComponet from '@/components/singlelist'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  selectByIdApi,
  getProjectByUserIdApi,
  updateUserIdByProjectIdsApi
} from '@/api/module/projectManage'
import { selectByConditionApi as selectAccountByConditionApi } from '@/api/module/user'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { Elevator_Project } from '@/module.ts/Elevator_Project'
import {
  getLoginUserProPropCompAuthApi,
  getLoginUserProMaintCompAuthApi,
  getLoginUserProInsuCompAuthApi
} from '@/api/module/login'
import AuthPersonDetail from './components/AuthPersonDetail'

export default defineComponent({
  components: {
    ListComponet,
    View,
    AuthPersonDetail
  },
  props: {
    depIdKey: {
      type: String,
      default: 'ui_depId'
    }
  },
  setup(props) {
    const dataSource: any = ref([])
    const listRef: any = ref(null)
    const dialog = reactive({
      visiableDialog: false
    })
    const currentUser: any = ref(null)
    const modelData = new Elevator_Project()
    const tableMap = [
      {
        dbkey: 'db_id_proName',
        name: '项目名称'
      },
      {
        dbkey: 'db_addr',
        name: '公司地址'
      },
      {
        dbkey: 'ui_useCompanyName',
        name: '使用单位'
      },
      {
        dbkey: 'db_chargeUser',
        name: '项目负责人'
      },
      {
        dbkey: 'ui_maintCompanyName',
        name: '维保单位'
      }
    ]
    const searchName = ref('')
    const tempdb_useCompanyId = ref({
      name: '使用单位',
      dbkey: 'db_useCompanyId',
      isreuqired: true,
      isSelect: true,
      multiple: false,
      multipledata: [],
      list: []
    })

    const tempdb_maintCompanyId = ref({
      name: '维保单位',
      dbkey: 'db_maintCompanyId',
      isreuqired: true,
      isSelect: true,
      multiple: false,
      multipledata: [],
      list: []
    })

    const tempdb_insuCompanyId = ref({
      name: '承保单位',
      dbkey: 'db_insuCompanyId',
      isreuqired: true,
      isSelect: true,
      multiple: false,
      multipledata: [],
      list: []
    })
    const searchWhereModelProp = [
      {
        name: '项目名称',
        dbkey: 'db_id_proName',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      }
    ]
    const addModelProp = []
    const authList = ref([])
    const title = ref('')
    const openAuthList = data => {
      title.value = data.label
      getProjectByUserIdApi({ userId: data.value }).then((x: any) => {
        if (x.data.success) {
          //  listRef.value.searchInit()
          authList.value = x.data.data.map((x: any) => {
            return {
              id: x.db_id,
              name: x.db_id_proName
            }
          })
          dialog.visiableDialog = true
        }
      })
    }
    const clickOrg = data => {
      getProjectByUserIdApi({ userId: data.value }).then((x: any) => {
        if (x.data.success) {
          currentUser.value = data.value
          listRef.value.setselectedList()
          if (x.data.data) {
            listRef.value.setselectedList(x.data.data.map(y => y.db_id))
          }
        }
      })
    }
    const searchInit = () => {
      listRef.value.searchInit()
    }
    const findName = (args: string) => {
      if (searchName.value) {
        if ((args || '').indexOf(searchName.value) > -1) {
          return false
        }
        return true
      }
      return false
    }
    onMounted(async () => {
      getLoginUserProMaintCompAuthApi({}).then(x => {
        if (x.data.success) {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempdb_maintCompanyId.value.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      getLoginUserProPropCompAuthApi({}).then(x => {
        if (x.data.success) {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempdb_useCompanyId.value.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      getLoginUserProInsuCompAuthApi({}).then(x => {
        if (x.data.success) {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempdb_insuCompanyId.value.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      selectAccountByConditionApi({ ui_type: 'A0' }).then(x => {
        if (x.data.success) {
          let { objectList } = x.data.data
          dataSource.value = objectList.map((x: any) => {
            return {
              value: x.db_id,
              label: x.db_id_username,
              ...x
            }
          })
        }
        console.log(x)
      })
      // selectByAllApi({ tableName: 'Usercenter_Account' }).then(x => {
      //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //     dataSource.value.push({
      //       value: key,
      //       label: v
      //     })
      //   })
      // })
    })
    const addUserToProjectFn = (selecteds: any) => {
      const tempUserIds = selecteds
        .map((x: IUsercenter_Account) => x.db_id)
        .join(',')
      if (currentUser.value) {
        updateUserIdByProjectIdsApi({
          projectIds: tempUserIds,
          userId: currentUser.value
        }).then(x => {
          if (x.data.success) {
            ElMessage({
              message: '新增成功',
              type: 'success'
            })
          } else {
            ElMessage({
              message: '新增失败',
              type: 'error'
            })
          }
        })
      } else {
        ElMessage.warning('选择人员')
      }
    }
    return {
      dataSource,
      listRef,
      addUserToProjectFn,
      clickOrg,
      searchInit,
      dialog,
      addModelProp,
      searchWhereModelProp,
      tableMap,
      modelData,
      selectByConditionApi,
      selectCountByConditionApi,
      saveApi,
      updateByIdApi,
      deleteByIdApi,
      selectByIdApi,
      currentUser,
      searchName,
      findName,
      tempdb_useCompanyId,
      tempdb_maintCompanyId,
      tempdb_insuCompanyId,
      openAuthList,
      authList,
      title
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-left-right {
  height: calc(100% - 52px);
  display: flex;
  padding: 26px;
  background-color: #f6f6ff;
  .left-mian {
    width: 330px;
    height: 100%;
    box-shadow: 0px 5px 19px 1px rgba(3, 0, 55, 0.1);
    border-radius: 10px;
    margin-right: 20px;
    background-color: white;
    overflow: hidden;
    .left-mian-body {
      padding-left: 30px;
      padding-top: 30px;
      height: 100%;
      .header {
        margin-bottom: 23px;
        display: flex;
        align-items: center;
        margin-right: 10px;
        > label {
          font-weight: bold;
          font-size: 16px;
          width: 100px;
        }
      }
      .list-body {
        height: calc(100% - 84px);
        overflow: auto;
        position: relative;
        > div {
          margin-bottom: 10px;
          margin-right: 20px;
          padding: 10px;
          border-radius: 10px;
          // box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          &:hover {
            background-color: $p-color-primary;
            color: white;
            .see-more {
              color: white;
            }
          }
          &.seleced-item {
            background-color: $p-color-primary;
            color: white;
            .see-more {
              color: white;
            }
          }
          &.disable-not-show {
            display: none;
          }
          .see-more {
            font-size: 16px;
            color: $p-color-primary;
            cursor: pointer;
            position: absolute;
            left: 0;
            margin-left: 5px;
          }
          > label {
            margin-left: 16px;
          }
        }
      }
    }
  }
  .right-mian {
    flex: 1;
    height: 100%;
    border-radius: 10px;
    background-color: white;
    padding: 0;
    width: calc(100% - 330px);
    :deep().page-body {
      height: 100%;
      margin-top: 0;
      .page-body-head {
        flex-wrap: wrap;
        display: flex;
        > div {
          width: 100%;
          display: flex;
          &.search-where-head {
            align-items: center;
            justify-content: space-between;
            .search-where {
              display: flex;
              &.search-where-auth {
                .el-input {
                  width: 200px;
                }
                .el-select {
                  width: 200px;
                  margin-right: 10px;
                }
              }
            }
          }
          &.user-search {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            i {
              margin-right: 10px;
            }
            &.selected {
              > span {
                color: $p-color-primary;
                > i {
                  color: $p-color-primary;
                }
              }
            }
            > label {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
