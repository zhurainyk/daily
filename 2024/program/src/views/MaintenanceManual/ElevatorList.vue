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
      :show-h-check-box-porp="true"
      :is-clear-check-box="true"
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
            api-url="/elevator/ielevator/initSysCompPartState"
            @click="restPartMessage(selectedList)"
            >重置零部件信息</authority-button
          >
          <authority-button
            type="primary"
            api-url="/elevator/ielevator/updateListByConditon"
            @click="openModifyDialog(selectedList)"
            >批量修改</authority-button
          >
          <authority-button
            type="primary"
            api-url="/elevator/ielevator/saveList"
            @click="elevatorTemlepteApi"
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
              api-url="/elevator/ielevator/saveList"
              >导入</authority-button
            >
          </el-upload>

          <el-popover placement="bottom" trigger="click">
            <template #reference>
              <el-button type="primary">同步信息</el-button>
            </template>
            <template #default>
              <div class="elevator-select">
                <ul>
                  <li @click="getElevatorInfo(selectedList)">全设备信息</li>
                  <!-- <li @click="getsynVideoDeviceInfo(selectedList)">视频设备ID</li> -->
                  <li @click="getsynRunDeviceIdInfo(selectedList)">
                    运行设备id
                  </li>
                  <li @click="getsynFloorCount(selectedList)">总楼层</li>
                  <li @click="getsynAverageHeightInfo(selectedList)">
                    平均层高
                  </li>
                  <li @click="getElevatorInfoIndex(selectedList)">
                    楼层索引关系
                  </li>
                </ul>
              </div>
            </template>
          </el-popover>
        </div>
      </template>
      <template #actionOhther="{ scope }">
        <span class="edit" @click="dialog.visiableSearch = true">查询</span>
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
import {
  selectByConditionApi,
  selectCountByConditionApi,
  saveApi,
  selectByIdApi,
  deleteByIdApi,
  updateByIdApi,
  restPartInElevatorApi,
  updateElevatorFiledApi,
  saveListApi,
  selectSynDeviceInfoApi,
  selectSynFloorIndexApi,
  selectsynVideoDeviceIdApi,
  selectsynFloorCountApi,
  selectsynAverageHeightApi,
  selectsynRunDeviceIdApi
} from '@/api/module/elevator'
import { elevatorTemlepteApi } from '@/api/module/importExcel'
import ListComponet from '@/components/singlelist'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import Modify from '@/components/singlelist/components/addEdit'
import SearchNoPaperVue from './components/SearchNoPaper'
import useNormalValidateRespone from '@/utils/hooks/NormalValidate'
import { getProjectMapLoginApi } from '@/api/module/login'
import { selectByConditionApi as selectUserByConditionApi } from '@/api/module/user'
export default defineComponent({
  components: { ListComponet, Modify, SearchNoPaperVue },
  setup() {
    const modelData = new Elevator_Elevator()
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
        name: '电梯名'
      },
      {
        dbkey: 'db_registCode',
        name: '注册码'
      },
      {
        dbkey: 'db_mapAddr',
        name: '电梯位置'
      },
      {
        dbkey: 'ui_runMonitorPlanName',
        name: '运行监测方案'
      },
      {
        dbkey: 'ui_videoMonitorPlanName',
        name: '视频监控方案'
      },
      {
        dbkey: 'ui_emergencyPlanName',
        name: '应急处置方案'
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
      if (arg == 1) {
        dialogModel.db_floors = ''
      }
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
        name: '电梯内部编号',
        dbkey: 'db_innerNum',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '排序',
        dbkey: 'db_order',
        isreuqired: false,
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
        fn: getProjectMapLoginApi
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
        name: '96333救援识别码',
        dbkey: 'db_rescueCode',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
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
      {
        name: '地图地址',
        dbkey: 'db_mapAddr',
        isreuqired: false,
        type: 'map',
        isSelect: false,
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
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_Brand' },
        changefn: (arg, addModel, item, dialogModel) => {
          dialogModel.db_brandElseName = ''
          if (arg) {
            const temp = item.list.find(x => x.value == arg)
            dialogModel.db_brandElseName = temp?.label
          }
        }
      },
      {
        name: '更多品牌',
        dbkey: 'db_brandElseName',
        isreuqired: true,
        isSelect: false,
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
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_Model' },
        changefn: (arg, addModel, item, dialogModel) => {
          dialogModel.db_modelElseName = ''
          if (arg) {
            const temp = item.list.find(x => x.value == arg)
            dialogModel.db_modelElseName = temp?.label
          }
        }
      },
      {
        name: '更多型号',
        dbkey: 'db_modelElseName',
        isreuqired: true,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '实例',
        dbkey: 'db_partInstIds',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        disabled: true,
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
        name: '电梯生产商',
        dbkey: 'db_manuId',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],
        fn: selectByAllApi,
        fnArgs: { tableName: 'Elevator_Manufacturer' }
      },
      {
        name: '出厂编号',
        dbkey: 'db_factoryCode',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '出厂日期',
        dbkey: 'db_manuDate',
        isreuqired: false,
        isSelect: true,
        type: 'date',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '安装单位',
        dbkey: 'db_installCompanyId',
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
        name: '电梯改造单位',
        dbkey: 'db_reformCompanyId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '电梯改造日期',
        dbkey: 'db_reformDate',
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
        list: []
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
        name: '物联网入网时间',
        dbkey: 'db_iotIntime',
        isreuqired: false,
        isSelect: true,
        type: 'date',
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
        name: '运行监测设备',
        dbkey: 'db_runMonitorDeviceId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
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
        name: '视频监控设备',
        dbkey: 'db_videoMonitorDeviceId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
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
      },
      {
        name: '应急处置设备',
        dbkey: 'db_emergencyDeviceId',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '原始运行次数',
        dbkey: 'db_originRunTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '原始运行时长',
        dbkey: 'db_originRunDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '原始自然时长',
        dbkey: 'db_originDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '原始运行里程',
        dbkey: 'db_originRunMileage',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '原始开关门次数',
        dbkey: 'db_originDoorTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '保养初始时间',
        dbkey: 'db_upkeepInitTime',
        isreuqired: false,
        isSelect: true,
        type: 'date',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距初始的运行次数(维保周期内的)',
        dbkey: 'db_initRunTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距初始运行时长-小时(维保周期内的)',
        dbkey: 'db_initRunDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距初始自然时长-小时(维保周期内的)',
        dbkey: 'db_initDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距初始的运行里程(维保周期内的)',
        dbkey: 'db_initRunMileage',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距初始的开关门次数(维保周期内的)',
        dbkey: 'db_initDoorTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '上次维保时间',
        dbkey: 'db_lastMaintTime',
        isreuqired: false,
        isSelect: true,
        type: 'date',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次维保运行次数',
        dbkey: 'db_lastMaintRunTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次维保运行时长',
        dbkey: 'db_lastMaintRunDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次维保自然时长',
        dbkey: 'db_lastMaintDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次维保开关门次数',
        dbkey: 'db_lastMaintDoorTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次维保运行里程',
        dbkey: 'db_lastMaintRunMileage',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '上次召修时间',
        dbkey: 'db_lastRepairTime',
        isreuqired: false,
        isSelect: true,
        type: 'date',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次召修运行次数',
        dbkey: 'db_lastRepairRunTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次召修运行时长',
        dbkey: 'db_lastRepairRunDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次召修自然时长',
        dbkey: 'db_lastRepairDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次召修开关门次数',
        dbkey: 'db_lastRepairDoorTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次召修运行里程',
        dbkey: 'db_lastRepairRunMileage',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '上次应急时间',
        dbkey: 'db_lastEmergencyTime',
        isreuqired: false,
        isSelect: true,
        type: 'date',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次应急运行次数',
        dbkey: 'db_lastEmergencyRunTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次应急运行时长',
        dbkey: 'db_lastEmergencyRunDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次应急自然时长',
        dbkey: 'db_lastEmergencyDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次应急开关门次数',
        dbkey: 'db_lastEmergencyDoorTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '距上次应急运行里程',
        dbkey: 'db_lastEmergencyRunMileage',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '总运行次数',
        dbkey: 'db_totalRunTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '总运行时长',
        dbkey: 'db_totalRunDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '总自然时长',
        dbkey: 'db_totalDuration',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '总运行里程',
        dbkey: 'db_totalRunMileage',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '总开关门次数',
        dbkey: 'db_totalDoorTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '电梯状态信息json',
        dbkey: 'db_elevState',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '数据更新时间',
        dbkey: 'db_runUpdatetime',
        isreuqired: false,
        isSelect: true,
        type: 'date',
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '规则',
        dbkey: 'db_rule',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        maxlength: true
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
      {
        name: '电梯运行特性',
        dbkey: 'db_runFeature',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '维保次数',
        dbkey: 'db_maintTimes',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: [],
        type: 'number'
      },
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
        name: '运行监测',
        dbkey: 'db_runMonitorPlanId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '视频监控方案',
        dbkey: 'db_videoMonitorPlanId',
        isreuqired: true,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '应急处置方案',
        dbkey: 'db_emergencyPlanId',
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
        name: '为空选择',
        dbkey: 'ui_queryNullField',
        isreuqired: true,
        isSelect: true,
        multiple: true,
        multipledata: [],
        list: [
          {
            value: 'db_upkeepInitTime',
            label: '电梯保养初始时间'
          },
          {
            value: 'db_lastMaintTime',
            label: '上次维保时间'
          },
          {
            value: 'db_iotIntime',
            label: '物联网入网时间'
          },
          {
            value: 'db_rescueCode',
            label: '96333'
          },
          {
            value: 'db_floors',
            label: '楼层'
          },
          {
            value: 'db_runMonitorPlanId',
            label: '运行监测方案id'
          },
          {
            value: 'db_runMonitorDeviceId',
            label: '运行监测设备id'
          },
          {
            value: 'db_videoMonitorPlanId',
            label: '视频监控方案id'
          },
          {
            value: 'db_videoMonitorDeviceId',
            label: '视频监控设备id'
          },
          {
            value: 'db_emergencyPlanId',
            label: '应急处置方案id'
          },
          {
            value: 'db_emergencyDeviceId',
            label: '应急处置设备id'
          }
        ]
      }
    ])

    const restPartMessage = (args: Array<any>) => {
      if (args.length <= 0) {
        ElMessage.warning('勾选电梯')
      } else {
        restPartInElevatorApi({
          db_ids: args.map(x => x.db_id).join(',')
        }).then(x => {
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
      saveListApi({}, { multipartFile: args.file }).then(x => {
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
        fn: getProjectMapLoginApi
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
      selectByAllApi({ tableName: 'Elevator_IotRunMonitorPlan' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_runMonitorPlanId'
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

      selectByAllApi({ tableName: 'Elevator_IotEmergencyPlan' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_emergencyPlanId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

      selectByAllApi({ tableName: 'Elevator_IotVideoMonitorPlan' }).then(x => {
        const temp: any = searchWhereModelProp.find(
          x => x.dbkey == 'db_videoMonitorPlanId'
        )
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          temp.list.push({
            value: key,
            label: v
          })
        })
      })

      // selectByAllApi({ tableName: 'Elevator_Project' }).then(x => {
      //   const temp: any = searchWhereModelProp.find(
      //     x => x.dbkey == 'db_projectId'
      //   )
      //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //     temp.list.push({
      //       value: key,
      //       label: v
      //     })
      //   })
      // })
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
      elevatorTemlepteApi,
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
