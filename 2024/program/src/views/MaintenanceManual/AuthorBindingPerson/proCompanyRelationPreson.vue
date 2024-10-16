<template>
  <div class="layout-left-right">
    <div class="left-mian">
      <div class="left-mian-body">
        <div class="header">
          <label>公司列表</label
          ><el-input v-model="searchName" placeholder="输入查询"></el-input>
        </div>
        <div class="list-body">
          <div
            v-for="x in dataSource"
            :key="x.value"
            :class="[
              {
                'seleced-item':
                  currentSelectItem && currentSelectItem.db_id == x.value
              },
              { 'disable-not-show': findName(x.label) }
            ]"
            @click="clickOrg(x)"
          >
            <el-icon class="see-more" @click.stop="openAuthList(x)">
              <View />
            </el-icon>
            <label>{{ x.label }}</label>
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
              <el-button type="primary" @click="addUserToAuthor(selectedList)"
                >保存</el-button
              >
            </div>
            <div class="search-where">
              <el-select
                v-model="searchWhere.db_posiId"
                clearable
                filterable
                placeholder="职位"
              >
                <el-option
                  v-for="item in positype"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input v-model.trim="searchWhere.db_id_username" />
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
    :isAuthorPerson="true"
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
  selectByIdApi
} from '@/api/module/user'
import {
  getCompanyUserByDbidApi as selectObjByIdApi,
  updateUserIdsByIdApi
} from '@/api/module/propcompany'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { Usercenter_Account } from '@/module.ts/Usercenter_Account'
import AuthPersonDetail from '../components/AuthPersonDetail'

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
    const currentSelectItem: any = ref(null)
    const modelData = new Usercenter_Account()
    const tableMap = [
      {
        dbkey: 'db_id_username',
        name: '姓名'
      },
      {
        dbkey: 'ui_depName',
        name: '部门'
      },
      {
        dbkey: 'db_mobilePhone',
        name: '电话号码'
      },
      {
        dbkey: 'ui_posiName',
        name: '职位'
      }
    ]
    const searchName = ref('')
    const searchWhereModelProp = [
      {
        name: '用户名称',
        dbkey: 'db_id_username',
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
    const positype = ref([])
    const title = ref('')
    const openAuthList = data => {
      title.value = data.label
      selectObjByIdApi({ db_id: data.value }).then((x: any) => {
        if (x.data.success) {
          //  listRef.value.searchInit()
          authList.value = x.data.data.map((x: any) => {
            return {
              id: x.db_id,
              name: x.db_id_username,
              type: x.db_posiId,
              showname: x.ui_posiName
            }
          })
          dialog.visiableDialog = true
        }
      })
    }
    const clickOrg = data => {
      // console.log(listRef.value.table.)

      selectObjByIdApi({ db_id: data.value }).then((x: any) => {
        if (x.data.success) {
          //  listRef.value.searchInit()
          currentSelectItem.value = {
            db_userIds: x.data.data
              ? x.data.data.map((x: any) => x.db_id).join(',')
              : [],
            db_id: data.value
          }
          listRef.value.setselectedList()
          if (currentSelectItem.value.db_userIds) {
            listRef.value.setselectedList(
              currentSelectItem.value.db_userIds.split(',')
            )
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
      selectByAllApi({ tableName: 'Elevator_PropCompany' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          dataSource.value.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllApi({ tableName: 'Usercenter_Position' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          positype.value.push({
            value: key,
            label: v
          })
        })
      })
    })
    const addUserToAuthor = (selecteds: any) => {
      const tempUserIds = selecteds.map((x: any) => x.db_id).join(',')
      if (currentSelectItem.value) {
        currentSelectItem.value.db_userIds = tempUserIds
        updateUserIdsByIdApi({
          userIds: tempUserIds,
          companyId: currentSelectItem.value.db_id
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
        ElMessage.warning('选择公司')
      }
    }
    const searchLeave = () => {
      if (listRef.value.searchWhere.ui_accState == 1) {
        listRef.value.searchWhere.ui_accState = 0
      } else {
        listRef.value.searchWhere.ui_accState = 1
      }
      listRef.value.searchInit()
    }
    return {
      dataSource,
      listRef,
      addUserToAuthor,
      clickOrg,
      searchLeave,
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
      currentSelectItem,
      searchName,
      findName,
      openAuthList,
      authList,
      positype,
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
              .el-select {
                margin-right: 10px;
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
