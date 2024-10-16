<template>
  <div class="layout-left-right">
    <div v-if="havedepIdTree" class="left-mian">
      <div class="left-mian-body">
        <div class="header"><label>部门列表</label></div>
        <TreeOrg @selectednode="clickOrg"></TreeOrg>
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
        :show-head-search-porp="false"
        :show-h-check-box-porp="true"
        v-bind="$attrs"
        :isInitApi="false"
      >
        <template
          #searchHead="{ newFn, searchBtnList, searchWhere, selectedList }"
        >
          <!-- <div class="user-search" :class="{'selected':searchWhere.ui_accState=='1'}">
            <label>全部</label>
            <span @click="searchLeave"><i class="iconfont icon-yanjing"></i>查看已离职人员</span>
          </div> -->
          <div class="search-where-head">
            <div class="search-where">
              <el-button
                v-if="haveNewBtndepId && addBtn"
                type="primary"
                @click="newFn"
                >新建</el-button
              >
              <el-button
                v-if="addBtn && havedepIdTree"
                type="primary"
                @click="moveUser(selectedList)"
                >移动</el-button
              >
              <authority-button
                v-if="isuploadBtn"
                type="primary"
                :api-url="authorurl"
                @click="templeteApi"
                >模板下载</authority-button
              >

              <el-upload
                v-if="isuploadBtn"
                :show-file-list="false"
                :auto-upload="true"
                :http-request="
                  (...argument) =>
                    beforeAvatarUploadFile(...argument, x, searchBtnList)
                "
              >
                <authority-button type="primary" :api-url="authorurl"
                  >导入</authority-button
                >
              </el-upload>
            </div>
            <div class="search-where">
              <el-input
                v-model.trim="searchWhere.ui_mobilePhone"
                placeholder="电话号码"
                clearable
              />
              <el-select
                v-model="searchWhere.db_companyId"
                placeholder="公司"
                clearable
                filterable
                v-if="companyApi"
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-if="ishavePosiSelect"
                v-model="searchWhere.ui_posiId"
                placeholder="职位"
                clearable
              >
                <el-option
                  v-for="item in postionList"
                  :key="item.db_id"
                  :label="item.db_id_posiName"
                  :value="item.db_id"
                ></el-option>
              </el-select>
              <el-input
                v-model.trim="searchWhere.ui_username"
                placeholder="姓名"
                clearable
              />
              <el-button type="primary" @click="searchBtnList">查询</el-button>
            </div>
          </div>
        </template>
      </ListComponet>
    </div>
    <el-dialog
      v-if="dialog.visiableDialog"
      v-model="dialog.visiableDialog"
      :show-close="false"
    >
      <MoveUser
        :current-data="modelData"
        :update-by-id-api="updateByIdApi"
        :selected-lists="curentSelecteds"
        dbkey="db_accId"
        @close="dialog.visiableDialog = false"
        @success="searchInit"
      >
      </MoveUser>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getDepartmentTreeLoginApi } from '@/api/module/department'
import { selectByConditionApi as selectByConditionPositonApi } from '@/api/module/position'
import ListComponet from '@/components/singlelist'
import TreeOrg from './components/TreeOrg'
import MoveUser from './components/moveUser'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'
import AuthorityButton from '@/components/common/AuthorityButton.vue'

export default defineComponent({
  components: {
    ListComponet,
    TreeOrg,
    MoveUser,
    AuthorityButton
  },
  props: {
    modelData: {
      type: Object
    },
    addModelProp: {
      type: Array
    },
    deleteByIdApi: {
      type: Function,
      required: true
    },
    selectByConditionApi: {
      type: Function,
      required: true
    },
    selectCountByConditionApi: {
      type: Function,
      required: true
    },
    saveApi: {
      type: Function,
      required: true
    },
    updateByIdApi: {
      type: Function,
      required: true
    },
    selectByIdApi: {
      type: Function,
      required: true
    },
    tableMap: {
      type: Array,
      required: true
    },
    depIdKey: {
      type: String,
      default: 'ui_depId'
    },
    saveListApi: {
      type: Function,
      required: false
    },
    templeteApi: {
      type: Function,
      required: false
    },
    isuploadBtn: {
      type: Boolean,
      default: false
    },
    authorurl: {
      type: String,
      default: ''
    },
    companyApi: {
      type: Function,
      required: false
    },
    ishavePosiSelect: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const dataSource: any = ref([])
    const listRef: any = ref(null)
    const companyList: any = ref([])
    const postionList: any = ref(null)
    const dialog = reactive({
      visiableDialog: false
    })
    const curentSelecteds = ref([])
    const treeProps = {
      children: 'subDepartmentList',
      label: 'db_id_depName'
    }
    const haveNewBtndepId: any = ref(false)
    const havedepIdTree: any = ref(false)
    const { showError } = useNormalValidateRespone()
    const beforeAvatarUploadFile = (args: any, model: any, fn) => {
      props.saveListApi({}, { multipartFile: args.file }).then(x => {
        if (x.data.success) {
          if (showError(x.data.data)) {
            ElMessage.success('上传成功')
            fn()
          }
        } else {
          ElMessage.error('上传失败')
        }
      })
    }

    const clickOrg = data => {
      listRef.value.searchWhere[props.depIdKey] = data.db_id

      props.modelData!.ui_depId = data.db_id
      haveNewBtndepId.value = true
      listRef.value.searchInit()
    }
    const searchInit = () => {
      listRef.value.searchInit()
    }
    onMounted(async () => {
      const temp: any = props.addModelProp?.find(
        (x: any) => x.dbkey == 'ui_posiId'
      )
      if (temp) {
        selectByConditionPositonApi({
          ui_type: 'A0',
          db_posiType: temp.fnArgs.posiType
        }).then(position => {
          if (position.data.success) {
            postionList.value = position.data.data.objectList
          }
        })
      }
      if (props.companyApi) {
        props.companyApi({}).then(x => {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            companyList.value.push({
              value: key,
              label: v
            })
          })
        })
      }
      const x = await getDepartmentTreeLoginApi({})
      if (x.data.data) {
        if (x.data.data.length > 1) {
          dataSource.value = [
            {
              db_id: -1,
              db_id_depName: '全部',
              subDepartmentList: x.data.data,
              ui_dataSize: 0
            }
          ]
          havedepIdTree.value = true
        } else {
          if (x.data.data[0]) {
            if (x.data.data[0].subDepartmentList.length > 0) {
              dataSource.value = [
                {
                  db_id: -1,
                  db_id_depName: '全部',
                  subDepartmentList: x.data.data,
                  ui_dataSize: 0
                }
              ]
              havedepIdTree.value = true
            } else {
              props.modelData!.ui_depId = x.data.data[0].db_id
              listRef.value.searchWhere[props.depIdKey] = x.data.data[0].db_id
              searchInit()
              haveNewBtndepId.value = true
            }
          }
        }
      }
    })
    const moveUser = (selecteds: any) => {
      curentSelecteds.value = []
      if (selecteds && selecteds.length > 0) {
        curentSelecteds.value = selecteds
        dialog.visiableDialog = true
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
    const $route = useRoute()
    const store = useStore()

    const addBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex((x: any) =>
          new RegExp(`${$route.meta.add}$`).test(x)
        ) > -1
    )

    return {
      dataSource,
      treeProps,
      listRef,
      moveUser,
      clickOrg,
      searchLeave,
      searchInit,
      dialog,
      curentSelecteds,
      addBtn,
      postionList,
      beforeAvatarUploadFile,
      haveNewBtndepId,
      havedepIdTree,
      companyList
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
    overflow: auto;
    .left-mian-body {
      padding-left: 30px;
      padding-top: 30px;
      padding-right: 30px;
      .header {
        margin-bottom: 23px;
        > label {
          font-weight: bold;
          font-size: 16px;
        }
      }
      .el-tree {
        .custom-tree-node {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          .display-bth {
            display: none;
            > i {
              font-size: 14px;
              color: #8a8a8a;
              margin-right: 8px;
            }
          }
          &:hover {
            .display-bth {
              display: flex;
              margin-right: 27px;
            }
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
                width: 160px;
                margin-right: 20px;
              }
              .el-input {
                width: 160px;
                margin-right: 20px;
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
