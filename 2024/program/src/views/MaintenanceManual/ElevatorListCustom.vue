<template>
  <div class="page-list">
    <ListComponet
      :select-by-condition-api="selectByConditionApi"
      :select-count-by-condition-api="selectCountByConditionApi"
      :save-api="saveApi"
      :select-by-id-api="selectByIdApi"
      :update-by-id-api="updateByIdApi"
      :delete-by-id-api="deleteByIdApi"
      :model-data="modelData"
      :table-map="tableMap"
      :add-model-prop="addModelProp"
      :maxwidth="true"
      :search-where-model-prop="searchWhereModelProp"
      :fullscreen="true"
      :pagesizes="[10, 20, 50, 100]"
      :dialogMount="dialogMount"
    >
      <template #searchHead="{ selectedList, newFn, addBtn }">
        <div class="search-where">
          <el-button v-if="addBtn" type="primary" @click="newFn"
            >新增</el-button
          >
          <authority-button
            type="primary"
            api-url="/elevator/ielevator/saveBriefList"
            @click="elevatorCustomTemlepteApi"
            >模板下载</authority-button
          >
          <el-upload
            :show-file-list="false"
            :auto-upload="true"
            :http-request="
              (...argument) =>
                beforeAvatarUploadFile(...argument, x, searchBtnList)
            "
          >
            <authority-button
              type="primary"
              api-url="/elevator/ielevator/saveBriefList"
              >导入</authority-button
            >
          </el-upload>
        </div>
      </template>
    </ListComponet>
    <el-dialog
      v-if="dialog.visiableModify"
      v-model="dialog.visiableModify"
      class="max-dialog"
      :show-close="false"
    >
      <Modify
        :current-data="currentData"
        dbkey="kkk"
        :save-api="updateElevatorFiledApi"
        :add-model="addModePropUpdate"
        @close="dialog.visiableModify = false"
        :maxwidth="true"
      >
        <template #headtitle>
          <label>批量修改</label>
        </template>
      </Modify>
    </el-dialog>

    <el-dialog
      v-if="dialog.visiableSearch"
      v-model="dialog.visiableSearch"
      class="max-dialog"
      :show-close="false"
    >
      <SearchNoPaperVue @close="dialog.visiableSearch = false">
      </SearchNoPaperVue>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  selectByIdApi,
  deleteByIdApi,
  updateByIdApi,
  restPartInElevatorApi,
  updateElevatorFiledApi,
  saveBriefListApi,
  selectSynDeviceInfoApi,
  selectSynFloorIndexApi,
  selectsynVideoDeviceIdApi,
  selectsynFloorCountApi,
  selectsynAverageHeightApi,
  selectsynRunDeviceIdApi
} from '@/api/module/elevator'
import { elevatorCustomTemlepteApi } from '@/api/module/importExcel'
import {
  getProjectMapLoginApi,
  getPropCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getInsuCompanyMapLoginApi
} from '@/api/module/login'
import ListComponet from '@/components/singlelist'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import Modify from '@/components/singlelist/components/addEdit'
import SearchNoPaperVue from './components/SearchNoPaper'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'

import { selectByConditionApi as selectUserByConditionApi } from '@/api/module/user'

export default defineComponent({
  components: { ListComponet, Modify, SearchNoPaperVue },
  setup() {
    const $route = useRoute()
    const modelData = new Elevator_Elevator()
    if ($route.query) {
      Object.entries<string>($route.query).forEach(([key, v]) => {
        modelData[key] = v
      })
    }
    const { showError } = useNormalValidateRespone()
    const dialog = reactive({
      visiableModify: false,
      visiableSearch: false
    })
    const currentData: any = {
      db_id: '',
      db_projectId: '',
      db_elevType: '',
      db_categoryCode: '',
      db_usePlaceCode: '',
      db_brandId: '',
      db_modelId: '',
      db_maintModelCode: '',
      db_runMonitorPlanId: '',
      db_videoMonitorPlanId: '',
      db_emergencyPlanId: ''
    }
    const tableMap = [
      {
        dbkey: 'ui_projectName',
        name: '项目名称'
      },
      {
        dbkey: 'db_id_projectNum',
        name: '电梯名称'
      },
      {
        dbkey: 'db_registCode',
        name: '注册码'
      },
      {
        dbkey: 'db_rescueCode',
        name: '96333'
      },
      {
        dbkey: 'ui_useCompanyName',
        name: '使用单位'
      },
      {
        dbkey: 'ui_maintCompanyName',
        name: '维保单位'
      },
      {
        dbkey: 'ui_insuCompanyName',
        name: '承保单位'
      },
      {
        dbkey: 'db_brandElseName',
        name: '品牌'
      },
      {
        dbkey: 'db_modelElseName',
        name: '型号'
      },
      {
        dbkey: 'ui_maintModel',
        name: '维保模式'
      },
      {
        dbkey: 'ui_latestInspectDate',
        name: '年检时间'
      }
    ]
    const changeElevtorTypeFn = (arg, addModel, item, dialogModel) => {
      // 0
      const tempdb_width = addModel.find(x => x.dbkey == 'db_width')
      const tempdb_angle = addModel.find(x => x.dbkey == 'db_angle')
      const tempdb_length = addModel.find(x => x.dbkey == 'db_length')
      // 1
      const tempdb_averageHeight = addModel.find(
        x => x.dbkey == 'db_averageHeight'
      )
      const tempdb_topHeight = addModel.find(x => x.dbkey == 'db_topHeight')
      const tempdb_pitDepth = addModel.find(x => x.dbkey == 'db_pitDepth')

      const tempdb_floors = addModel.find(x => x.dbkey == 'db_floors')

      const tempdb_stops = addModel.find(x => x.dbkey == 'db_stops')

      const tempdb_doors = addModel.find(x => x.dbkey == 'db_doors')

      const tempdb_ratedLoad = addModel.find(x => x.dbkey == 'db_ratedLoad')

      const tempdb_machineRoom = addModel.find(x => x.dbkey == 'db_machineRoom')

      const tempdb_driveWay = addModel.find(x => x.dbkey == 'db_driveWay')

      const tempdb_tractionRatio = addModel.find(
        x => x.dbkey == 'db_tractionRatio'
      )

      tempdb_width.disabled = arg == '0'
      tempdb_angle.disabled = arg == '0'
      tempdb_length.disabled = arg == '0'

      tempdb_averageHeight.disabled = arg == 1
      tempdb_topHeight.disabled = arg == 1
      tempdb_pitDepth.disabled = arg == 1
      tempdb_floors.disabled = arg == 1
      tempdb_stops.disabled = arg == 1
      tempdb_doors.disabled = arg == 1
      tempdb_ratedLoad.disabled = arg == 1
      tempdb_machineRoom.isDisable = arg == 1
      tempdb_driveWay.isDisable = arg == 1
      tempdb_tractionRatio.isDisable = arg == 1
    }

    let tempArr: any = []
    const store = useStore()

    if (store.state.user.userInfo?.db_isSrc == '01') {
    } else if (
      store.state.user.userInfo?.db_isSrc != '01' &&
      store.state.user.userInfo?.db_srcId
    ) {
    } else {
      tempArr = [
        {
          name: '源id',
          dbkey: 'db_srcId',
          isreuqired: false,
          isSelect: true,
          multiple: false,
          multipledata: [],
          isRules: false,
          list: [],
          fn: selectUserByConditionApi,
          fnArgs: {
            ui_type: 'A1',
            ui_currentPage: 1,
            ui_pageSize: 0,
            db_isSrc: '01'
          },
          key: 'db_id',
          value: 'db_id_username'
        }
      ]
    }
    const addModelProp = reactive([
      {
        name: '注册代码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getProjectMapLoginApi,
        fnArgs: {}
      },
      {
        name: '楼栋梯号',
        dbkey: 'db_id_projectNum',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '电梯类型',
        dbkey: 'db_elevType',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            value: '0',
            label: '直梯'
          },
          {
            value: '1',
            label: '扶梯'
          }
        ],
        changefn: changeElevtorTypeFn
      },
      {
        name: '维保模式',
        dbkey: 'db_maintModelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'maint_model' }
      },

      {
        name: '使用性质',
        dbkey: 'db_usePlaceCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'used_place' }
      },
      // {
      //   name: '品牌',
      //   dbkey: 'db_brandId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectByAllApi,
      //   fnArgs: { tableName: 'Elevator_Brand' },
      //   changefn: (arg, addModel, item, dialogModel) => {}
      // },
      {
        name: '品牌',
        dbkey: 'db_brandElseName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      // {
      //   name: '型号',
      //   dbkey: 'db_modelId',
      //   isreuqired: true,
      //   isSelect: true,
      //   multiple: false,
      //   multipledata: [],
      //   list: [],
      //   fn: selectByAllApi,
      //   fnArgs: { tableName: 'Elevator_Model' },
      //   changefn: (arg, addModel, item, dialogModel) => {}
      // },
      {
        name: '型号',
        dbkey: 'db_modelElseName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '电梯品种',
        dbkey: 'db_categoryCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'elevatorAll_category' }
      },

      {
        name: '96333救援识别码',
        dbkey: 'db_rescueCode',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '初装验收合格日期',
        dbkey: 'db_installPassedDate',
        isreuqired: false,
        isSelect: true,
        type: 'date',
        multiple: false,
        multipledata: [],
        list: []
      },

      {
        name: '上次年检日期',
        dbkey: 'db_latestInspectDate',
        isreuqired: false,
        isSelect: true,
        type: 'date',
        multiple: false,
        multipledata: [],
        list: [],
        isDisable: false
      },
      {
        name: '提升高度',
        dbkey: 'db_rise',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '额定速度',
        dbkey: 'db_ratedSpeed',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '平均层高',
        dbkey: 'db_averageHeight',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '顶层高度',
        dbkey: 'db_topHeight',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '底坑深度',
        dbkey: 'db_pitDepth',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '楼层数',
        dbkey: 'db_floors',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'number'
      },
      {
        name: '停站数',
        dbkey: 'db_stops',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '门数',
        dbkey: 'db_doors',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '额定载重量',
        dbkey: 'db_ratedLoad',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '是否有机房',
        dbkey: 'db_machineRoom',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            label: '有',
            value: '01'
          },
          {
            label: '无',
            value: '00'
          }
        ]
      },
      {
        name: '传动方式',
        dbkey: 'db_driveWay',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'drive_way' }
      },
      {
        name: '曳引比',
        dbkey: 'db_tractionRatio',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'traction_ratio' }
      },
      {
        name: '宽度',
        dbkey: 'db_width',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '倾斜角',
        dbkey: 'db_angle',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '使用区长度',
        dbkey: 'db_length',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '控制方式',
        dbkey: 'db_controlModelCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'control_model' }
      },

      {
        name: '验收合格证',
        dbkey: 'db_acceptanceCertUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'acceptanceCert',
        multipledata: [],
        list: []
      },
      {
        name: '使用运营证地址',
        dbkey: 'db_perationCertUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'perationCert',
        multipledata: [],
        list: []
      },
      {
        name: '电梯使用标识',
        dbkey: 'db_useLabelUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'useLabel',
        multipledata: [],
        list: []
      },
      {
        name: '电梯应急救援电话',
        dbkey: 'db_emergencyPhoneUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'emergencyPhone',
        multipledata: [],
        list: []
      },
      {
        name: '电梯安全警示标识',
        dbkey: 'db_warningLabelUrl',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        type: 'img',
        filekey: 'warningLabel',
        multipledata: [],
        list: []
      },
      ...tempArr
    ])
    const searchWhereModelProp = reactive([
      {
        name: '项目名称',
        dbkey: 'db_projectId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '电梯名称',
        dbkey: 'db_id_projectNum',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '注册码',
        dbkey: 'db_registCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '96333',
        dbkey: 'db_rescueCode',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '使用单位',
        dbkey: 'db_useCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '维保单位',
        dbkey: 'db_maintCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '承保单位',
        dbkey: 'db_insuCompanyId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '品牌',
        dbkey: 'db_brandId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '型号',
        dbkey: 'db_modelId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '维保模式',
        dbkey: 'db_maintModelCode',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '年检状态',
        dbkey: 'db_inspectState',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: []
      },
      {
        name: '关联单位',
        dbkey: 'ui_isByCompany',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        isRules: true,
        list: [
          {
            value: '01',
            label: '物业单位相关'
          },
          {
            value: '02',
            label: '维保单位相关'
          },
          {
            value: '03',
            label: '保险单位相关'
          }
        ]
      }
    ])

    const restPartMessage = (args: Array<any>) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选电梯')
      } else {
        restPartInElevatorApi({ db_ids: args.map(x => x.db_id) }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
          } else {
            ElMessage.error('失败')
          }
        })
      }
      console.log(args)
    }
    const openModifyDialog = (args: Array<any>) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选电梯')
      } else {
        currentData.db_id = args.map(x => x.db_id).join(',')
        dialog.visiableModify = true
      }
      console.log(args)
    }
    const dialogMount = (dialogModel, addModel) => {
      changeElevtorTypeFn(dialogModel.db_elevType, addModel, null, dialogModel)
      let temp = addModel.find(x => x.dbkey == 'db_latestInspectDate')
      if (dialogModel.db_latestInspectDate) {
        temp.isDisable = true
      } else {
        temp.isDisable = false
      }
    }
    const getElevatorInfo = (args: Array<any>) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选电梯')
      } else {
        // let run_id = args
        //   .filter(x => x.db_runMonitorPlanId)
        //   .map(x => x.db_runMonitorPlanId)
        // run_id = Array.from(new Set(run_id))
        // if (run_id.length <= 0 || run_id.length > 1) {
        //   ElMessage.warning('运行监测方案不一致')
        // }
        selectSynDeviceInfoApi({
          elevIds: args.map(x => x.db_id).join(',')
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
          } else {
            ElMessage.error(x.data.message || '失败')
          }
        })
      }
    }
    const getElevatorInfoIndex = (args: Array<any>) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选电梯')
      } else {
        // let run_id = args
        //   .filter(x => x.db_runMonitorPlanId)
        //   .map(x => x.db_runMonitorPlanId)
        // run_id = Array.from(new Set(run_id))
        // if (run_id.length <= 0 || run_id.length > 1) {
        //   ElMessage.warning('运行监测方案不一致')
        // }
        selectSynFloorIndexApi({
          elevIds: args.map(x => x.db_id).join(',')
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
          } else {
            ElMessage.error(x.data.message || '失败')
          }
        })
      }
    }

    const getsynVideoDeviceInfo = (args: Array<any>) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选电梯')
      } else {
        // let run_id = args
        //   .filter(x => x.db_runMonitorPlanId)
        //   .map(x => x.db_runMonitorPlanId)
        // run_id = Array.from(new Set(run_id))
        // if (run_id.length <= 0 || run_id.length > 1) {
        //   ElMessage.warning('运行监测方案不一致')
        // }
        selectsynVideoDeviceIdApi({
          elevIds: args.map(x => x.db_id).join(',')
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
          } else {
            ElMessage.error(x.data.message || '失败')
          }
        })
      }
    }
    const getsynRunDeviceIdInfo = (args: Array<any>) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选电梯')
      } else {
        // let run_id = args
        //   .filter(x => x.db_runMonitorPlanId)
        //   .map(x => x.db_runMonitorPlanId)
        // run_id = Array.from(new Set(run_id))
        // if (run_id.length <= 0 || run_id.length > 1) {
        //   ElMessage.warning('运行监测方案不一致')
        // }
        selectsynRunDeviceIdApi({
          elevIds: args.map(x => x.db_id).join(',')
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
          } else {
            ElMessage.error(x.data.message || '失败')
          }
        })
      }
    }
    const getsynFloorCount = (args: Array<any>) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选电梯')
      } else {
        // let run_id = args
        //   .filter(x => x.db_runMonitorPlanId)
        //   .map(x => x.db_runMonitorPlanId)
        // run_id = Array.from(new Set(run_id))
        // if (run_id.length <= 0 || run_id.length > 1) {
        //   ElMessage.warning('运行监测方案不一致')
        // }
        selectsynFloorCountApi({
          elevIds: args.map(x => x.db_id).join(',')
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
          } else {
            ElMessage.error(x.data.message || '失败')
          }
        })
      }
    }
    const getsynAverageHeightInfo = (args: Array<any>) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选电梯')
      } else {
        // let run_id = args
        //   .filter(x => x.db_runMonitorPlanId)
        //   .map(x => x.db_runMonitorPlanId)
        // run_id = Array.from(new Set(run_id))
        // if (run_id.length <= 0 || run_id.length > 1) {
        //   ElMessage.warning('运行监测方案不一致')
        // }
        selectsynAverageHeightApi({
          elevIds: args.map(x => x.db_id).join(',')
        }).then(x => {
          if (x.data.success) {
            ElMessage.success('成功')
          } else {
            ElMessage.error(x.data.message || '失败')
          }
        })
      }
    }
    const beforeAvatarUploadFile = (args: any, model: any, fn) => {
      saveBriefListApi({}, { multipartFile: args.file }).then(x => {
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
    const addModePropUpdate = reactive([
      {
        name: '所属项目',
        dbkey: 'db_projectId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: getProjectMapLoginApi,
        fnArgs: {}
      },
      {
        name: '电梯类型',
        dbkey: 'db_elevType',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [
          {
            value: '0',
            label: '直梯'
          },
          {
            value: '1',
            label: '扶梯'
          }
        ]
      },
      {
        name: '电梯品种',
        dbkey: 'db_categoryCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'elevatorAll_category' }
      },
      {
        name: '使用性质',
        dbkey: 'db_usePlaceCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'used_place' }
      },
      {
        name: '品牌',
        dbkey: 'db_brandId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_Brand' }
      },
      {
        name: '型号',
        dbkey: 'db_modelId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_Model' }
      },
      {
        name: '维保模式',
        dbkey: 'db_maintModelCode',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllTypeApi,
        fnArgs: { constType: 'maint_model' }
      },
      {
        name: '运行监测方案',
        dbkey: 'db_runMonitorPlanId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_IotRunMonitorPlan' }
      },
      {
        name: '视频监控方案',
        dbkey: 'db_videoMonitorPlanId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_IotVideoMonitorPlan' }
      },

      {
        name: '应急处置方案',
        dbkey: 'db_emergencyPlanId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_IotEmergencyPlan' }
      }
    ])
    onBeforeMount(() => {
      selectByAllApi({ tableName: 'Elevator_Model' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_modelId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

      getProjectMapLoginApi({}).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_projectId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllApi({ tableName: 'Elevator_Brand' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_brandId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })
      selectByAllTypeApi({ constType: 'maint_model' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_maintModelCode'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllTypeApi({ constType: 'inspect_status' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_inspectState'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

      getMaintCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_maintCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      getPropCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_useCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })

      getInsuCompanyMapLoginApi({}).then(x => {
        if (x.data.success) {
          const tempSearch: any = searchWhereModelProp.find(
            (x: any) => x.dbkey == 'db_insuCompanyId'
          )
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            tempSearch.list.push({
              value: key,
              label: v
            })
          })
        }
      })
    })
    return {
      modelData,
      getsynVideoDeviceInfo,
      getsynRunDeviceIdInfo,
      getsynFloorCount,
      getsynAverageHeightInfo,
      selectByConditionApi,
      selectCountByConditionApi,
      saveApi,
      selectByIdApi,
      updateByIdApi,
      deleteByIdApi,
      tableMap,
      addModelProp,
      searchWhereModelProp,
      restPartMessage,
      changeElevtorTypeFn,
      dialog,
      currentData,
      updateElevatorFiledApi,
      addModePropUpdate,
      openModifyDialog,
      dialogMount,
      beforeAvatarUploadFile,
      elevatorCustomTemlepteApi,
      getElevatorInfo,
      getElevatorInfoIndex
    }
  }
})
</script>

<style lang="scss" scoped>
.page-list {
  :deep().page-body {
    height: calc(100% - 270px);
  }

  :deep().page-search {
    padding-bottom: 10px;
  }

  :deep().dialog-mian {
    &.max-dialog-height {
      height: 100%;
    }
  }
}
.elevator-select {
  ul {
    list-style: none;
    li {
      margin-bottom: 5px;
      text-align: left;
      cursor: pointer;
      padding: 5px 0;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
