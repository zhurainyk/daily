<template>
  <div v-if="showHeadSearchPorp" class="page-search">
    <div>
      <div v-for="x in searchWhereModelProp" :key="x.dbkey">
        <label style="white-space: nowrap">{{ x.name }}</label>
        <template v-if="x.isSelect">
          <template v-if="x.multiple">
            <template v-if="x.type == 'daterange'">
              <el-date-picker
                v-model="x.multipledata"
                :placeholder="x.name"
                type="daterange"
                range-separator="To"
                :class="x.dbkey"
                :popper-class="`auto-${x.dbkey}-popper`"
                :valueFormat="x.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                clearable
                :default-time="[
                  new Date(2000, 1, 1, 0, 0, 0),
                  new Date(2000, 2, 1, 23, 59, 59)
                ]"
                @change="
                  (...argument) => {
                    x.changefn
                      ? x.changefn(
                          ...argument,
                          searchWhereModelProp,
                          x,
                          searchWhere
                        )
                      : () => {}
                  }
                "
              />
            </template>
            <template v-else-if="x.type == 'datetimerange'">
              <el-date-picker
                style="min-width: 335px"
                :class="x.dbkey"
                v-model="x.multipledata"
                :valueFormat="x.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                :format="x.format"
                :placeholder="x.name"
                :popper-class="`auto-${x.dbkey}-popper`"
                type="datetimerange"
                range-separator="~"
                clearable
                @change="
                  (...argument) => {
                    x.changefn
                      ? x.changefn(
                          ...argument,
                          searchWhereModelProp,
                          x,
                          searchWhere
                        )
                      : () => {}
                  }
                "
              />
            </template>
            <template v-else>
              <el-select
                v-model="x.multipledata"
                placeholder=""
                :multiple="x.multiple"
                clearable
                filterable
                :class="x.dbkey"
                :popper-class="`auto-${x.dbkey}-popper`"
                @change="
                  (...argument) => {
                    x.changefn
                      ? x.changefn(
                          ...argument,
                          searchWhereModelProp,
                          x,
                          searchWhere
                        )
                      : mutilFn(...argument, x)
                  }
                "
              >
                <el-option
                  v-for="item in x.list"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </template>
          <template v-else>
            <template v-if="x.type == 'date' || x.type == 'datetime'">
              <el-date-picker
                v-model="searchWhere[x.dbkey]"
                :type="x.type"
                :valueFormat="x.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                clearable
                :class="x.dbkey"
                :placeholder="x.name"
                :popper-class="`auto-${x.dbkey}-popper`"
                @change="
                  (...argument) => {
                    x.changefn
                      ? x.changefn(
                          ...argument,
                          searchWhereModelProp,
                          x,
                          searchWhere
                        )
                      : () => {}
                  }
                "
              />
            </template>
            <template v-else>
              <el-select
                v-model="searchWhere[x.dbkey]"
                placeholder=""
                clearable
                filterable
                :class="x.dbkey"
                :popper-class="`auto-${x.dbkey}-popper`"
                @change="
                  (...argument) => {
                    x.changefn
                      ? x.changefn(
                          ...argument,
                          searchWhereModelProp,
                          x,
                          searchWhere
                        )
                      : () => {}
                  }
                "
              >
                <el-option
                  v-for="item in x.list"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </template>
        </template>
        <template v-else>
          <el-input
            v-model.trim="searchWhere[x.dbkey]"
            clearable
            :class="x.dbkey"
            @change="
              (...argument) => {
                x.changefn
                  ? x.changefn(...argument, searchWhereModelProp, x)
                  : () => {}
              }
            "
          />
        </template>
      </div>
      <div class="empty" v-if="empty"></div>
      <div
        :style="queryHeadStyle"
        :class="
          searchWhereModelProp.length % 3 == 0
            ? 'last-search-width-2 '
            : searchWhereModelProp.length % 3 == 1
            ? 'last-search-width-1'
            : ''
        "
      >
        <el-button
          class="auto-reset"
          v-show="_showResetSearch"
          @click="resetSearch"
          >{{ $t('common.reset') }}</el-button
        >
        <el-button class="auto-search" type="primary" @click="searchBtnList">{{
          $t('common.search')
        }}</el-button>
        <slot name="queryHead"></slot>
      </div>
      <!-- <div></div> -->
    </div>
  </div>
  <div class="page-body" :class="classNameCurrenPage">
    <div class="page-body-head">
      <slot
        name="customize"
        :new-fn="newFn"
        :search-btn-list="searchBtnList"
        :search-where="searchWhere"
        :table-ref="table"
        :selected-list="selectedList"
        :export-excel="exportExcel"
      ></slot>
      <slot
        name="searchHead"
        :new-fn="newFn"
        :search-btn-list="searchBtnList"
        :search-where="searchWhere"
        :table-ref="table"
        :selected-list="selectedList"
        :export-excel="exportExcel"
        :addBtn="addBtn"
      >
        <div>
          <el-button
            v-if="showNewPorp && addBtn"
            type="primary"
            @click="newFn"
            class="auto-new-list"
            >{{ $t('common.new') }}</el-button
          >
          <el-button v-if="isHaveExportBtn" @click="exportExcel">{{
            isexportCurrentPage
              ? $t('common.exportCurrentPage')
              : $t('common.export')
          }}</el-button>
        </div>
        <div v-if="!showHeadSearchPorp" class="search-where">
          <el-input
            v-for="x in searchWhereModelProp"
            :key="x.dbkey"
            v-model.trim="searchWhere[x.dbkey]"
            clearable
            :placeholder="x.name"
            :class="x.dbkey"
          />
          <el-button
            type="primary"
            @click="searchBtnList"
            class="auto-new-list-table"
            >{{ $t('common.search') }}</el-button
          >
        </div>
      </slot>
    </div>
    <div class="page-list-main">
      <el-table
        ref="table"
        :data="pageModal.list"
        height="100%"
        @select="selectChecked"
        @select-all="selectAllChecked"
        @sort-change="sortchange"
      >
        <el-table-column
          v-if="showHCheckBoxPorp"
          type="selection"
          row
          width="55"
          :selectable="selectablefn"
        />
        <el-table-column
          v-for="x in tableMap"
          :key="x.dbkey"
          :label="x.name"
          :property="x.dbkey"
          :show-overflow-tooltip="x.showOverflowTooltip"
          :sortable="x.sortablekey ? 'custom' : false"
        >
          <template #default="scope">
            <slot :name="`head${x.dbkey}`" :scope="scope">
              <span v-if="x.filters">{{ x.filters[scope.row[x.dbkey]] }}</span>
              <span v-else-if="x.computed">{{
                x.computed(scope.row[x.dbkey])
              }}</span>
              <span v-else>{{ scope.row[x.dbkey] }}</span>
            </slot>
          </template>
        </el-table-column>
        <el-table-column v-if="showActionPorp" :label="$t('common.action')">
          <template #default="scope">
            <slot
              v-if="showActionDetailPorp"
              name="detailaction"
              :scope="scope"
            >
              <span class="edit auto-detail" @click="detailFn(scope.row)">{{
                $t('common.view')
              }}</span>
            </slot>
            <slot
              v-if="showActionEditPorp && updateBtn && authorOrigin(scope.row)"
              name="editaction"
              :scope="scope"
              :editFn="editFn"
              :updateBtn="updateBtn"
            >
              <span class="edit auto-edit" @click="editFn(scope.row)">{{
                $t('common.edit')
              }}</span>
            </slot>
            <span
              v-if="showActionCopyPorp && updateBtn"
              class="edit auto-copy"
              @click="copy(scope.row)"
              >{{ $t('common.copy') }}</span
            >
            <slot
              v-if="
                showActionDeletePorp && deleteBtn && authorOrigin(scope.row)
              "
              name="deleteaction"
              :scope="scope"
              :deleteFn="deleteFn"
            >
              <span class="delete auto-delete" @click="deleteFn(scope.row)">{{
                $t('common.delete')
              }}</span>
            </slot>
            <slot name="actionOhther" :scope="scope"> </slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="isHavepagination" class="page-pagination">
      <el-pagination
        :page-size="pageModal.pagePagination.ui_pageSize"
        layout="total,sizes, prev, pager, next"
        :page-sizes="pagesizes"
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
    :class="!maxwidth ? 'min-dialog' : 'max-dialog'"
    :fullscreen="fullscreen"
    :show-close="false"
    top="2vw"
  >
    <AddEdit
      :dbkey="dbkey"
      :current-data="editCurrentData"
      :save-api="saveApi"
      :select-by-id-api="selectByIdApi"
      :update-by-id-api="updateByIdApi"
      :is-file-upload="isFileUpload"
      :dialog-mount="dialogMount"
      :maxwidth="maxwidth"
      :add-model="addModelProp"
      :authortity="authortity"
      :is-copy="isCopy"
      v-bind="$attrs"
      @close="dialog.visiableDialog = false"
      @success="searchInit"
    >
      <template v-for="x in addModelProp" :key="x.dbkey" #[x.dbkey]="scope">
        <slot :name="x.dbkey" :scope="scope"> </slot>
      </template>
      <template #headtitle>
        <slot name="headtitle"> </slot>
      </template>
    </AddEdit>
  </el-dialog>

  <el-dialog
    v-if="dialog.visiableDetail"
    v-model="dialog.visiableDetail"
    :class="!maxwidth ? 'min-dialog' : 'middle-dialog'"
    :show-close="false"
  >
    <DetailComponet
      :select-byid-api="selectByIdApi"
      :show-list="showList"
      :current-data="currentData"
      :dbkey="dbkey"
      @close="dialog.visiableDetail = false"
    >
      <template #detailfooter="{ closefn, detailModel }">
        <slot
          name="detailfooter"
          :closefn="closefn"
          :searchInit="searchInit"
          :detailModel="detailModel"
          :deleteFn="deleteFn"
        >
        </slot>
      </template>
      <template #detailmain="{ closefn, detailModel }">
        <slot
          name="detailmain"
          :closefn="closefn"
          :searchInit="searchInit"
          :detailModel="detailModel"
          :deleteFn="deleteFn"
        >
        </slot>
      </template>
    </DetailComponet>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  shallowReactive,
  watch,
  computed,
  onActivated
} from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import { ListDao } from '../../module.ts/page'
import AddEdit from './components/addEdit'
import DetailComponet from './components/detail'
import { UiType } from '@/constant'
import useDownFileHooks from '@/utils/hooks/downFile'

export default defineComponent({
  components: { AddEdit, DetailComponet },
  props: {
    modelData: {
      type: Object
    },
    showDetailList: {
      type: Array,
      default: () => []
    },
    maxwidth: {
      type: Boolean,
      default: false
    },
    empty: {
      type: Boolean,
      default: false
    },
    deleteByIdApi: {
      type: Function,
      required: false,
      default: () => {}
    },
    selectByConditionApi: {
      type: Function,
      required: false,
      default: () => {}
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
      required: false,
      default: () => {}
    },
    selectByIdApi: {
      type: Function,
      required: false,
      default: undefined
    },
    tableMap: {
      type: Array,
      required: true
    },
    showActionPorp: {
      type: Boolean,
      default: true
    },
    showHeadSearchPorp: {
      type: Boolean,
      default: true
    },
    showResetSearch: {
      type: Boolean,
      default: true
    },
    showHCheckBoxPorp: {
      type: Boolean,
      default: false
    },
    showNewPorp: {
      type: Boolean,
      default: true
    },
    addModelProp: {
      type: Array,
      default: () => []
    },
    searchWhereModelProp: {
      type: Array,
      default: () => []
    },
    dbkey: {
      type: String,
      default: 'db_id'
    },
    isFileUpload: {
      type: Boolean,
      default: false
    },
    dialogMount: {
      type: Function,
      default: undefined
    },
    disabledEditBtn: {
      type: Boolean,
      default: false
    },
    disabledNewBtn: {
      type: Boolean,
      default: false
    },
    showDetailBtn: {
      type: Boolean,
      default: false
    },
    showActionEditPorp: {
      type: Boolean,
      default: true
    },
    showActionDeletePorp: {
      type: Boolean,
      default: true
    },
    showActionDetailPorp: {
      type: Boolean,
      default: false
    },
    defaultPageSize: {
      type: Number,
      default: 10
    },
    pagesizes: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    authortity: {
      type: String,
      default: ''
    },
    queryHeadStyle: {
      type: Object,
      defualt: {}
    },
    isHavepagination: {
      type: Boolean,
      default: true
    },
    lisFunction: {
      type: Function,
      required: false,
      default: undefined
    },
    showActionCopyPorp: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    exportExcelName: {
      type: String,
      default: '报表'
    },
    isHaveExportBtn: {
      type: Boolean,
      default: false
    },
    isClearCheckBox: {
      type: Boolean,
      default: false
    },
    isInitApi: {
      type: Boolean,
      default: true
    },
    showTaskOrderBtns: {
      type: Boolean,
      default: false
    },
    selectablefn: {
      type: Function,
      default: (row, index) => true
    },
    exportSize: {
      type: Number,
      default: 10000
    },
    isexportCurrentPage: {
      type: Boolean,
      default: false
    },
    editModal: {
      type: Object,
      default: null
    }
  },
  emits: ['edit-fn', 'new-fn', 'detail-fn', 'select-fn'],
  setup(props, { emit }) {
    const pageModal: ListDao<any> = reactive(new ListDao<any>())
    pageModal.pagePagination.ui_pageSize = props.defaultPageSize
    const searchWhere: any = ref(JSON.parse(JSON.stringify(props.modelData)))
    const dialog = reactive({
      visiableDialog: false,
      visiableDetail: false
    })
    const { t } = useI18n()
    const _showResetSearch = computed(() => {
      return props.showResetSearch
    })
    const { downFileByArrays } = useDownFileHooks()
    const selectKeys: any = ref([])
    const selectedList: any = ref([])
    const showList: any = ref([])
    if (props.showDetailList.length <= 0) {
      showList.value = props.tableMap
    } else {
      showList.value = props.showDetailList
    }
    const table: any = ref(null)
    const currentData = ref(JSON.parse(JSON.stringify(props.modelData)))

    let editCurrentData = ref(JSON.parse(JSON.stringify(props.modelData)))
    if (props.editModal) {
      editCurrentData = ref(JSON.parse(JSON.stringify(props.editModal)))
    }
    const isCopy = ref(false)
    const getListData = async (isAll = false) => {
      let args = { ...pageModal.pagePagination, ...searchWhere.value }
      if (isAll) {
        args = {
          ...searchWhere.value,
          ui_type: UiType.A0
        }
        if (!props.isexportCurrentPage) {
          args = {
            ...args,
            ui_currentPage: 1,
            ui_pageSize: props.exportSize
          }
        } else {
          args = {
            ...pageModal.pagePagination,
            ...args
          }
        }
      }

      const result = await props.selectByConditionApi(args)
      if (result.data.success) {
        if (props.lisFunction) {
          const { objectList, condition } = props.lisFunction(result.data.data)
          // if (condition) {
          //   Object.entries(searchWhere.value).forEach((k, v: any) => {
          //     searchWhere.value[`${k[0]}`] = k[1]
          //   })
          // }
          return objectList || []
        }
        const { objectList, condition } = result.data.data
        // if (condition) {
        //   Object.entries(searchWhere.value).forEach((k, v: any) => {
        //     searchWhere.value[`${k[0]}`] = k[1]
        //   })
        // }
        return objectList || []
      }
      return []
    }
    const resetSearch = () => {
      searchWhere.value = JSON.parse(JSON.stringify(props.modelData))
      props.searchWhereModelProp.forEach((x: any) => {
        x.multipledata = []
      })
    }
    const sortchange = arg => {
      if (arg.order) {
        const temp = props.tableMap.find(x => x.dbkey == arg.prop)
        searchWhere.value.ui_orderBy = temp?.sortablekey
        if (arg.order == 'ascending') {
          searchWhere.value.ui_orderWay = 'asc'
        } else {
          searchWhere.value.ui_orderWay = 'desc'
        }
      } else {
        searchWhere.value.ui_orderBy = ''
        searchWhere.value.ui_orderWay = ''
      }
      searchBtnList()
    }
    const pagecountFn = async () => {
      const result = await props.selectCountByConditionApi({
        ...pageModal.pagePagination,
        ...searchWhere.value
      })
      if (result.data.success) {
        return result.data.data || 0
      }
      return 0
    }
    const searchList = async () => {
      pageModal.pagePagination.ui_type = UiType.A0
      pageModal.list = await getListData()
      if (props.isHavepagination) {
        pageModal.pagePagination.ui_dataSize = await pagecountFn()
      }
    }

    const searchInit = () => {
      // pageModal.pagePagination.ui_currentPage = 1
      searchList()
      selectedList.value = []
      emit('select-fn', selectedList)
    }
    const setCheckeBox = () => {
      table.value.clearSelection()
      pageModal.list.forEach(x => {
        if (
          selectedList.value.findIndex(y => y[props.dbkey] == x[props.dbkey]) >
          -1
        ) {
          table.value.toggleRowSelection(x, undefined)
        }
      })
    }
    const mutilFn = (args, item) => {
      searchWhere.value[item.dbkey] = args.join(',')
    }
    const handleSizeChange = async (size: number) => {
      pageModal.pagePagination.ui_pageSize = size
      pageModal.pagePagination.ui_currentPage = 1
      await searchList()
      if (props.showHCheckBoxPorp) {
        setCheckeBox()
      }
    }
    const handleCurrentChange = async (page: number) => {
      pageModal.pagePagination.ui_currentPage = page
      await searchList()
      if (props.showHCheckBoxPorp) {
        setCheckeBox()
      }
    }
    const searchBtnList = async () => {
      pageModal.pagePagination.ui_currentPage = 1
      pageModal.pagePagination.ui_type = UiType.A1
      pageModal.list = await getListData()
      if (props.isHavepagination) {
        pageModal.pagePagination.ui_dataSize = await pagecountFn()
      }
      if (!props.isClearCheckBox) {
        if (props.showHCheckBoxPorp) {
          setCheckeBox()
        }
      } else {
        selectedList.value = []
      }
    }
    const detailFn = (args: any) => {
      currentData.value = args
      editCurrentData.value = args
      if (props.showDetailBtn) {
        dialog.visiableDetail = true
      }
      emit('detail-fn', args)
    }
    const editFn = (args: any) => {
      isCopy.value = false
      if (!props.disabledEditBtn) {
        currentData.value = args
        editCurrentData.value = args
        dialog.visiableDialog = true
      }
      emit('edit-fn', args)
    }
    const newFn = () => {
      isCopy.value = false
      if (!props.disabledNewBtn) {
        currentData.value = JSON.parse(JSON.stringify(props.modelData))
        editCurrentData.value = JSON.parse(JSON.stringify(props.modelData))
        dialog.visiableDialog = true
      }
      emit('new-fn')
    }
    const copy = (args: any) => {
      isCopy.value = true
      currentData.value = args
      editCurrentData.value = args
      dialog.visiableDialog = true
    }
    const deleteFn = (args: any, successfn: any = null) => {
      ElMessageBox.confirm(t('common.comfireDelete'), t('common.prompt'), {
        confirmButtonText: t('common.yes'),
        cancelButtonText: t('common.no'),
        type: 'warning'
      })
        .then(() => {
          props.deleteByIdApi({ id: args[props.dbkey] }).then(x => {
            if (x.data.success) {
              searchList()
              if (successfn) {
                successfn()
              }
            }
          })
        })
        .catch(() => {})
    }
    const selectChecked = (args: any, row) => {
      if (args.findIndex(x => x[props.dbkey] == row[props.dbkey]) > -1) {
        selectedList.value.push(row)
      } else {
        const tempIndex = selectedList.value.findIndex(
          x => x[props.dbkey] == row[props.dbkey]
        )
        selectedList.value.splice(tempIndex, 1)
      }
      emit('select-fn', selectedList)
    }

    const selectAllChecked = (args: any) => {
      if (args.length > 0) {
        args.forEach(element => {
          const tempIndex = selectedList.value.findIndex(
            x => x[props.dbkey] == element[props.dbkey]
          )
          if (tempIndex <= -1) {
            selectedList.value.push(element)
          }
        })
      } else {
        pageModal.list.forEach(element => {
          const tempIndex = selectedList.value.findIndex(
            x => x[props.dbkey] == element[props.dbkey]
          )
          if (tempIndex > -1) {
            selectedList.value.splice(tempIndex, 1)
          }
        })
      }
      emit('select-fn', selectedList)
    }
    // watch(selectedList.value,() => {
    //   table.value.clearSelection()
    //   pageModal.list.forEach(x => {
    //     if (selectedList.value.findIndex(y => y[props.dbkey] == x[props.dbkey]) > -1) {
    //       table.value.toggleRowSelection(x, undefined)
    //     }
    //   })
    // })

    const setselectedList = args => {
      if (args) {
        selectedList.value = args.map(x => {
          const tempObj = {}
          tempObj[props.dbkey] = x
          return tempObj
        })
        pageModal.list.forEach(x => {
          if (args.findIndex(y => y == x[props.dbkey]) > -1) {
            table.value.toggleRowSelection(x, undefined)
          }
        })
      } else {
        table.value.clearSelection()
        selectedList.value = []
      }
    }
    const exportExcel = async () => {
      const list = await getListData(true)
      downFileByArrays(props.tableMap, list, props.exportExcelName)
    }
    const $route = useRoute()
    const store = useStore()
    const classNameCurrenPage = computed(() => $route.name)
    const addBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex((x: any) =>
          new RegExp(`${$route.meta.add}$`).test(x)
        ) > -1 ||
        (props.authortity &&
          store.state.menu.menuAuth.findIndex(
            (x: any) => x.indexOf(`${props.authortity}/save`) > -1
          ) > -1)
    )
    const deleteBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex((x: any) =>
          new RegExp(`${$route.meta.delete}$`).test(x)
        ) > -1 ||
        (props.authortity &&
          store.state.menu.menuAuth.findIndex(
            (x: any) => x.indexOf(`${props.authortity}/deleteById`) > -1
          ) > -1)
    )
    const updateBtn = computed(
      () =>
        store.state.menu.menuAuth.findIndex((x: any) =>
          new RegExp(`${$route.meta.edit}$`).test(x)
        ) > -1 ||
        (props.authortity &&
          store.state.menu.menuAuth.findIndex(
            (x: any) => x.indexOf(`${props.authortity}/updateById`) > -1
          ) > -1)
    )
    const authorOriginComputed = computed(
      () => store.state.user.userInfo?.db_isSrc == '01'
    )
    const authorOrigin = row => {
      if (authorOriginComputed.value) {
        if (
          store.state.user.userInfo.db_id == row.db_srcId ||
          store.state.user.userInfo.db_id == row.ui_srcId
        ) {
          return true
        }
        return false
      }
      return true
    }
    let isOnMount = true
    onMounted(async () => {
      if (props.isInitApi) {
        searchInit()
      }
    })
    onActivated(() => {
      if (!isOnMount) {
        if (props.isInitApi) {
          searchBtnList()
        }
      }
      isOnMount = false
    })
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
      resetSearch,
      table,
      selectChecked,
      selectAllChecked,
      setselectedList,
      selectedList,
      selectKeys,
      detailFn,
      addBtn,
      deleteBtn,
      updateBtn,
      copy,
      isCopy,
      _showResetSearch,
      classNameCurrenPage,
      exportExcel,
      showList,
      mutilFn,
      authorOrigin,
      sortchange,
      editCurrentData
    }
  }
})
</script>
