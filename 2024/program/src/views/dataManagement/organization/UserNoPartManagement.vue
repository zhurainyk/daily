<template>
  <div class="layout-left-right">
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
        v-bind="$attrs"
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
              <!-- <el-button
                v-if="addBtn"
                type="primary"
                @click="moveUser(selectedList)"
                >移动</el-button
              > -->
              <authority-button
                type="primary"
                :apiUrl="authorurl"
                @click="templeteApi"
                v-if="isuploadBtn"
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
                <authority-button type="primary" :apiUrl="authorurl"
                  >导入</authority-button
                >
              </el-upload>
            </div>
            <div class="search-where">
              <el-input
                v-model.trim="searchWhere.ui_username"
                placeholder="姓名"
                clearable
              />
              <el-input
                v-model.trim="searchWhere.ui_mobilePhone"
                placeholder="电话号码"
                clearable
              />
              <el-select
                v-model="searchWhere.db_companyId"
                placeholder="公司"
                clearable
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="searchWhere.ui_posiId"
                placeholder="职位"
                clearable
                v-if="ishavePosiSelect"
              >
                <el-option
                  v-for="item in postionList"
                  :key="item.db_id"
                  :label="item.db_id_posiName"
                  :value="item.db_id"
                ></el-option>
              </el-select>
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
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
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
    const dataSourceUser: any = ref([])
    const listRef: any = ref(null)
    const companyList: any = ref([])
    const postionList: any = ref([])
    const dialog = reactive({
      visiableDialog: false
    })
    const curentSelecteds = ref([])
    const treeProps = {
      children: 'subDepartmentList',
      label: 'db_id_depName'
    }
    const haveNewBtndepId: any = ref(false)
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
        dataSourceUser.value = x.data.data
        if (x.data.data[0]) {
          if (
            x.data.data[0] &&
            x.data.data[0].subDepartmentList &&
            x.data.data[0].subDepartmentList.length > 0
          ) {
            props.modelData!.ui_depId =
              x.data.data[0].subDepartmentList[0].db_id
            listRef.value.searchWhere[props.depIdKey] =
              x.data.data[0].subDepartmentList[0].db_id
          } else {
            props.modelData!.ui_depId = x.data.data[0].db_id
            listRef.value.searchWhere[props.depIdKey] = x.data.data[0].db_id
          }
          searchInit()
          haveNewBtndepId.value = true
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
      dataSourceUser,
      treeProps,
      listRef,
      moveUser,
      clickOrg,
      searchLeave,
      searchInit,
      dialog,
      curentSelecteds,
      addBtn,
      companyList,
      beforeAvatarUploadFile,
      haveNewBtndepId,
      postionList
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
                width: 200px;
                margin-right: 20px;
              }
              .el-input {
                width: 200px;
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
