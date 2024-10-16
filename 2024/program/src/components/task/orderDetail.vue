<template>
  <div class="task-order-detail">
    <div class="info-detail-left">
      <div class="task-detail-head">
        <div class="item head">
          <label>任务详情 </label>
        </div>
        <div class="item">
          <label>任务名称:</label>
          <span>{{ taskInfoData.db_id_taskName }}</span>
        </div>
        <div
          v-if="taskInfoData.db_taskTypeCode == 'RegularUpkeep'"
          class="item"
        >
          <label>保养类型:</label>
          <span>{{ currentData.ui_upkeepTypeDesc }}</span>
        </div>
        <div v-if="currentData.ui_workTemplateName" class="item">
          <label>保养模板:</label>
          <span>{{ currentData.ui_workTemplateName }}</span>
        </div>
        <div class="item">
          <label>任务类型:</label>
          <span>{{ taskInfoData.ui_taskType }}</span>
        </div>
        <div v-if="taskInfoData.db_taskTypeCode == 'InstallIot'" class="item">
          <label>运维类型:</label>
          <span>{{ currentData.ui_installIotType }}</span>
        </div>
        <div class="item">
          <label>任务状态:</label>
          <span>{{ taskInfoData.ui_taskStateDesc }}</span>
        </div>
        <div class="item">
          <label>电梯注册代码:</label>
          <span>{{ taskInfoData.db_registCode }}</span>
        </div>
        <!-- <div class="item">
          <label>关联计划:</label>
          <span>{{ taskInfoData.ui_scheduleName }}</span>
        </div> -->
        <div class="item">
          <label>所属项目:</label>
          <span>{{ taskInfoData.ui_projectName }}</span>
        </div>
        <div class="item">
          <label>工单列表:</label>
          <div class="order-list">
            <span v-for="or in list" :key="or.db_id">{{
              or.db_orderState == '08'
                ? `${or.db_id_orderName}(已退回)`
                : or.db_id_orderName
            }}</span>
          </div>
        </div>
        <div class="item line-split"></div>
        <div class="item">
          <label>创建人:</label>
          <span>{{ taskInfoData.ui_createUserName }}</span>
        </div>
        <div class="item">
          <label>项目内编号:</label>
          <span>{{ taskInfoData.db_projectNum }}</span>
        </div>
        <div class="item">
          <label>执行人:</label>
          <span>{{ userExcuter }}</span>
        </div>
        <div class="item" v-if="taskInfoData.db_taskTypeCode != 'Emergency'">
          <label>工程验收人:</label>
          <span>{{ modelData.ui_superiorPassUserName }}</span>
        </div>
        <div class="item" v-if="taskInfoData.db_taskTypeCode != 'Emergency'">
          <label>物业验收人:</label>
          <span>{{ modelData.ui_propPassUserName }}</span>
        </div>
        <div class="item">
          <label>创建时间:</label>
          <span>{{ taskInfoData.ui_createtime }}</span>
        </div>
        <div class="item">
          <label>预计开始时间:</label>
          <span>{{ taskInfoData.ui_preEndtime }}</span>
        </div>
        <div class="item">
          <label>开始作业时间:</label>
          <span>{{ modelData.ui_dealStarttime }}</span>
        </div>
        <div class="item">
          <label>完成作业时间:</label>
          <span>{{ modelData.ui_dealEndtime }}</span>
        </div>
        <div class="item" v-if="taskInfoData.db_taskTypeCode != 'Emergency'">
          <label>工程验收时间:</label>
          <span>{{ modelData.ui_superiorPassTime }}</span>
        </div>
        <div class="item" v-if="taskInfoData.db_taskTypeCode != 'Emergency'">
          <label>物业验收时间:</label>
          <span>{{ modelData.ui_propPassTime }}</span>
        </div>
        <div class="item line-split"></div>

        <div class="item score">
          <label>评分:</label>
          <span v-if="taskInfoData.db_evaluation">
            <el-rate
              v-model="taskInfoData.db_evaluation.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} 分"
            />
          </span>
        </div>

        <div class="item">
          <label>评论:</label>
          <span v-if="taskInfoData.db_evaluation">{{
            taskInfoData.db_evaluation.content
          }}</span>
        </div>
        <div class="item">
          <label>评论图片:</label>
          <div v-if="taskInfoData.db_evaluation" class="evaluation-img">
            <img
              v-for="x in taskInfoData.db_evaluation.imgUrls"
              :key="x"
              :src="x"
              @click="onpenImg(x)"
            />
          </div>
        </div>
        <div class="item">
          <label>签名:</label>
          <div
            v-if="taskInfoData.db_proElecSignatureUrl"
            class="evaluation-img"
          >
            <img
              :src="taskInfoData.db_proElecSignatureUrl"
              @click="onpenImg(taskInfoData.db_proElecSignatureUrl)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="info-detail-right">
      <div class="task-detail-mian">
        <div>
          <div class="detail-tag">
            <el-tabs v-model="selectTabs">
              <el-tab-pane label="基本信息" name="first1"></el-tab-pane>
              <el-tab-pane
                v-if="
                  modelData.db_flowRecords &&
                  modelData.db_flowRecords.length > 0
                "
                label="作业流程"
                name="first11"
              ></el-tab-pane>
              <el-tab-pane
                v-if="
                  currentData.db_workItemList &&
                  currentData.db_workItemList.length > 0
                "
                label="工作项"
                name="first2"
              ></el-tab-pane>
              <el-tab-pane
                v-if="modelData && modelData.db_dynamicWorkItem"
                label="动态工作项"
                name="first8"
              ></el-tab-pane>
              <el-tab-pane
                v-if="currentData.db_environmentState"
                label="环境信息"
                name="first6"
              ></el-tab-pane>
              <el-tab-pane
                v-if="currentData.db_sysCompPartState"
                label="健康表"
                name="first3"
              ></el-tab-pane>
              <el-tab-pane
                v-if="
                  currentData.db_partList && currentData.db_partList.length > 0
                "
                label="换件清单"
                name="first4"
              ></el-tab-pane>
              <el-tab-pane
                v-if="
                  currentData.db_issueList &&
                  currentData.db_issueList.length > 0
                "
                label="问题清单"
                name="first5"
              ></el-tab-pane>
              <el-tab-pane
                v-if="modelData && modelData.db_videoUrls"
                label="处理视频"
                name="first7"
              ></el-tab-pane>
            </el-tabs>
          </div>
          <div class="body">
            <template v-if="selectTabs == 'first1'">
              <template
                v-if="
                  taskInfoData.db_taskTypeCode == 'Medical' ||
                  taskInfoData.db_taskTypeCode == 'CleanUpkeep' ||
                  taskInfoData.db_taskTypeCode == 'RepairUpkeep' ||
                  taskInfoData.db_taskTypeCode == 'RegularUpkeep' ||
                  taskInfoData.db_taskTypeCode == 'CallRepair'
                "
              >
                <MedicalInfo
                  :order-info="modelData"
                  :base-info="currentData.db_baseInfo || {}"
                  :current-data="currentData"
                ></MedicalInfo>
              </template>
              <template v-if="taskInfoData.db_taskTypeCode == 'Emergency'">
                <Emergency
                  :order-info="modelData"
                  :base-info="currentData"
                ></Emergency>
              </template>

              <template v-if="taskInfoData.db_taskTypeCode == 'InstallIot'">
                <InstallIot
                  :order-info="modelData"
                  :base-info="currentData"
                ></InstallIot>
              </template>
            </template>
            <div v-else-if="selectTabs == 'first11'" class="work-step">
              <el-timeline>
                <el-timeline-item
                  v-for="x in modelData.db_flowRecords"
                  :key="x.dealtime"
                  center
                  :timestamp="x.dealtime"
                  placement="top"
                  type="success "
                >
                  <el-card>
                    <h4>{{ x.note }}</h4>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>

            <template v-else-if="selectTabs == 'first2'">
              <div
                v-if="taskInfoData.db_taskTypeCode == 'RepairUpkeep'"
                class="work-item"
              >
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item title="工作项">
                    <ul>
                      <li
                        v-for="y in currentData.db_workItemList"
                        :key="y.desc"
                      >
                        <div>
                          <h4>
                            {{ y.desc }}
                            <span
                              :class="{ 'item-not-normal': y.value == '00' }"
                            >
                              {{ getshow('option_normal', y.value) }}</span
                            >
                          </h4>
                          <img
                            v-for="h in y.imgUrls"
                            :key="h"
                            :src="h"
                            @click="onpenImg(h)"
                          />
                        </div>
                      </li>
                    </ul>
                  </el-collapse-item>
                </el-collapse>
              </div>

              <div v-else class="work-item">
                <ul>
                  <template v-for="x in currentData.db_workItemList">
                    <li v-for="y in x.list" :key="y.db_code + x.tag">
                      <div>
                        <h4>
                          {{ y.db_id_itemName }}
                          <span
                            :class="{ 'item-not-normal': y.ui_value == '00' }"
                          >
                            {{ getshow(y.db_itemContent, y.ui_value) }}</span
                          >
                        </h4>
                        <div>{{ y.ui_note }}</div>
                        <img
                          v-for="h in y.ui_imgUrls"
                          :key="h"
                          :src="h"
                          @click="onpenImg(h)"
                        />
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
            </template>

            <div v-else-if="selectTabs == 'first3'" class="work-item">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item
                  v-for="x in currentData.db_sysCompPartState.data"
                  :key="x.space"
                  :title="elevator_space[x.space]"
                >
                  <ul>
                    <li v-for="y in x.list" :key="y.db_id">
                      <div>
                        <h4>
                          {{ y.db_id_partInstanceName }}
                          <span
                            :class="{
                              'item-not-normal': y.ui_lossDegree == '04'
                            }"
                          >
                            {{ lossDegree[y.ui_lossDegree] }}</span
                          >
                        </h4>
                      </div>
                    </li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div
              v-else-if="selectTabs == 'first6'"
              class="work-item environmentState-item"
            >
              <el-collapse v-model="activeNameEnv">
                <el-collapse-item
                  v-for="x in currentData.db_environmentState.data"
                  :key="x.space"
                  :name="x.space"
                  :title="elevator_space[x.space]"
                >
                  <ul class="environmentState-item-image">
                    <li
                      v-for="(y, index) in x.list"
                      :key="y"
                      :attr-num="index + 1"
                    >
                      <el-image
                        :src="y"
                        :preview-src-list="x.list"
                        :initial-index="index"
                        fit="cover"
                        lazy
                      />
                      <!-- <img :src="y" @click="onpenImg(y)" /> -->
                    </li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div v-else-if="selectTabs == 'first4'" class="work-item">
              <ul class="repalce-part-item">
                <li
                  v-for="x in currentData.db_partList"
                  :key="x.db_partInstanceName"
                >
                  <div>
                    <div>
                      <div>
                        <label>名称</label
                        ><span>{{ `${x.db_partInstanceName}` }}</span>
                      </div>
                      <div>
                        <label>单价</label
                        ><span>{{ `${x.db_totalPrice}` }}元</span>
                      </div>
                      <div>
                        <label>换件数量</label
                        ><span>{{ `${x.db_replaceCount}${x.ui_unit}` }}</span>
                      </div>
                    </div>
                    <div class="repalce-part" v-if="x.db_beforeImgUrl">
                      <label>换件前:</label>
                      <img
                        :src="x.db_beforeImgUrl"
                        @click="onpenImg(x.db_beforeImgUrl)"
                      />
                    </div>
                    <div class="repalce-part" v-if="x.db_afterImgUrl">
                      <label>换件后:</label>
                      <img
                        :src="x.db_afterImgUrl"
                        @click="onpenImg(x.db_afterImgUrl)"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else-if="selectTabs == 'first5'" class="work-item">
              <ul>
                <li v-for="x in currentData.db_issueList" :key="x.desc">
                  <div>
                    <h3>{{ x.desc }}</h3>
                    <img
                      v-for="img in x.imgUrls"
                      :key="img"
                      :src="img"
                      @click="onpenImg(img)"
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-else-if="selectTabs == 'first7'"
              class="work-item video-page"
            >
              <video
                v-for="x in modelData.db_videoUrls"
                :key="x"
                :src="x"
                :autoplay="false"
                controls
              ></video>
            </div>
            <div v-else-if="selectTabs == 'first8'" class="work-item">
              <ul>
                <li v-for="y in modelData.db_dynamicWorkItem" :key="y.db_id">
                  <div>
                    <h4>
                      {{ y.db_content }}
                      <span
                        class="item-not-normal"
                        v-if="y.db_dealLabelCode == '00'"
                      >
                        未完成</span
                      >
                      <span v-else-if="y.db_dealLabelCode == '01'">
                        已完成</span
                      >
                      <span v-else-if="y.db_dealLabelCode == '02'">
                        已解决</span
                      >
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-btn">
          <el-button type="primary" @click="dialog.visiableModify = true"
            >修改基本信息</el-button
          >
          <el-button type="primary" @click="dialog.visiableDialog = true"
            >修改图片视频</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-if="dialog.visiableDialog"
    v-model="dialog.visiableDialog"
    class="max-dialog"
    :show-close="false"
    top="2vw"
  >
    <ModifyImgAndVido
      :base-info="currentData"
      @close-dialog="dialog.visiableDialog = false"
    >
    </ModifyImgAndVido>
  </el-dialog>

  <el-dialog
    v-if="dialog.visiableModify"
    v-model="dialog.visiableModify"
    class="max-dialog"
    :show-close="false"
    top="2vw"
  >
    <Modify
      :current-data="currentData"
      :maxwidth="true"
      :update-by-id-api="Emergency_BaseInfo_updateByIdApi"
      :select-by-id-api="Emergency_selectByIdApi"
      :add-model="addModePropUpdate"
      @close="dialog.visiableModify = false"
      authortity="/elevator_order/iorderEmergencyCurd"
      dbkey="db_id"
      @success="successFn"
    >
    </Modify>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed, reactive } from 'vue'
import moment from 'moment'
import { useRouter, useRoute } from 'vue-router'
import { uniq } from 'lodash'
import Modify from '@/components/singlelist/components/addEdit'
import {
  selectOrderByIdApi,
  getOrderListByTaskIdApi
} from '@/api/module/taskedit'
import {
  Emergency_selectByIdApi,
  Emergency_BaseInfo_updateByIdApi
} from '@/api/module/ordermanagement'
import {
  selectByIdApi,
  playbackApi,
  addVideoByIdApi
} from '@/api/module/taskInfo'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import MedicalInfo from './components/MedicalInfo'
import Emergency from './components/Emergency'
import InstallIot from './components/InstallIot'
import { Elevator_TaskInfo } from '@/module.ts/Elevator_TaskInfo'
import { menulist } from '@/router/menu'
import ModifyImgAndVido from './components/ModifyImgAndVido'

export default defineComponent({
  components: { MedicalInfo, Emergency, InstallIot, ModifyImgAndVido, Modify },
  setup() {
    const selectTabs = ref('first1')
    const $route = useRoute()
    const list = ref([])
    const modelData = ref({})
    const currentData = ref({ baseInfo: {} })
    const taskInfoData: any = ref({})
    const activeName = ref([])
    const activeNameEnv: any = ref([])
    let taskType = {}
    const itemTag = ref({})
    let option_whether = {}
    let option_complete = {}
    let option_normal = {}
    let option_with = {}
    const $router = useRouter()
    const lossDegree = ref({})
    const elevator_space = ref({})
    const dialog = reactive({
      visiableDialog: false,
      visiableModify: false
    })
    const successFn = (arg, data) => {
      data.ui_alarmTime = data.db_policeTime
        ? moment(data.db_alarmTime).format('YYYY-MM-DD HH:mm:ss')
        : ''
      data.ui_arriveTime = data.db_arriveTime
        ? moment(data.db_arriveTime).format('YYYY-MM-DD HH:mm:ss')
        : ''
      data.ui_rescueTime = data.db_rescueTime
        ? moment(data.db_rescueTime).format('YYYY-MM-DD HH:mm:ss')
        : ''
      data.ui_trappedTime = data.db_trappedTime
        ? moment(data.db_trappedTime).format('YYYY-MM-DD HH:mm:ss')
        : ''
      data.ui_policeTime = data.db_policeTime
        ? moment(data.db_policeTime).format('YYYY-MM-DD HH:mm:ss')
        : ''
      currentData.value = data
    }
    const addModePropUpdate = reactive([
      {
        name: '被困时间',
        dbkey: 'db_trappedTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        multipledata: [],
        list: []
      },
      {
        name: '接警时间',
        dbkey: 'db_alarmTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        type: 'datetime',
        multipledata: [],
        list: []
      },

      {
        name: '救援等级',
        dbkey: 'db_rescueLevel',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],

        fn: selectByAllTypeApi,
        fnArgs: { constType: 'rescue_level' }
      },
      {
        name: '出警时间',
        dbkey: 'db_policeTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        list: []
      },
      {
        name: '到达时间',
        dbkey: 'db_arriveTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        list: []
      },
      {
        name: '解救时间',
        dbkey: 'db_rescueTime',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        type: 'datetime',
        list: []
      },
      {
        name: '解救人数',
        dbkey: 'db_alarmNumber',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '被困人员信息',
        dbkey: 'db_trappedUser',
        isreuqired: false,
        isSelect: false,
        multiple: false,
        multipledata: [],
        list: []
      },
      {
        name: '困人原因',
        dbkey: 'db_trappedReason',
        isreuqired: false,
        isSelect: true,
        multiple: false,
        multipledata: [],
        list: [],

        fn: selectByAllTypeApi,
        fnArgs: { constType: 'fault_reasonAnalysis' }
      }
    ])
    const getshow = (type, value) => {
      switch (type) {
        case 'option_whether':
          return option_whether[value]
        case 'option_complete':
          return option_complete[value]
        case 'option_normal':
          return option_normal[value]
        case 'option_with':
          return option_with[value]
        default:
          return ''
      }
    }
    const editDetailPrintFn = () => {
      let url = $router.resolve({
        name: menulist.taskDetailPrint.name,
        params: {
          id: $route.params.id
        }
      }).href
      window.open(url, '_blank')
    }
    const getOrder = async () => {
      const x = await selectOrderByIdApi($route.params.type)({
        id: $route.params.id
      })
      if (x.data.success) {
        const temp = x.data.data
        if (temp.db_baseInfo) {
          temp.db_baseInfo = JSON.parse(temp.db_baseInfo)
        }
        if (temp.db_issueList) {
          temp.db_issueList = JSON.parse(temp.db_issueList)
          temp.db_issueList.forEach(ele => {
            if (ele.imgUrls) {
              ele.imgUrls = ele.imgUrls.split(',')
            }
          })
        }
        if (temp.db_sysCompPartState) {
          temp.db_sysCompPartState = JSON.parse(temp.db_sysCompPartState)
          if (
            !temp.db_sysCompPartState.data ||
            temp.db_sysCompPartState.data.length <= 0
          ) {
            temp.db_sysCompPartState = ''
          }
        }
        if (temp.db_workItemList) {
          temp.db_workItemList = JSON.parse(temp.db_workItemList)
          if (taskInfoData.value.db_taskTypeCode == 'RepairUpkeep') {
            temp.db_workItemList.forEach(ele => {
              if (ele.imgUrls) {
                ele.imgUrls = ele.imgUrls.split(',')
              }
            })
          } else {
            temp.db_workItemList.forEach(ele => {
              if (ele.list) {
                ele.list.forEach(l => {
                  if (l.ui_imgUrls) {
                    l.ui_imgUrls = l.ui_imgUrls.split(',')
                  }
                })
              }
            })
          }
        }
        if (temp.orderInfo.db_flowRecords) {
          temp.orderInfo.db_flowRecords = JSON.parse(
            temp.orderInfo.db_flowRecords
          )
          temp.orderInfo.db_flowRecords.forEach(element => {
            element.dealtime = moment(element.dealtime).format(
              'YYYY-MM-DD HH:mm:ss'
            )
            element.note = `${element.dealUserName} 将 ${
              temp.orderInfo.db_id_orderName
            } 改成 ${taskType[element.dealafterState]}`
            if (element.showMessages) {
              element.note = element.showMessages
            }
          })
        }
        if (temp.orderInfo.db_dynamicWorkItem) {
          temp.orderInfo.db_dynamicWorkItem = JSON.parse(
            temp.orderInfo.db_dynamicWorkItem
          )
        } else {
          temp.orderInfo.db_dynamicWorkItem = ''
        }
        if (temp.db_partList) {
          temp.db_partList = JSON.parse(temp.db_partList)
        }

        if (temp.orderInfo.db_videoUrls) {
          temp.orderInfo.db_videoUrls = temp.orderInfo.db_videoUrls.split(',')
        } else {
          temp.orderInfo.db_videoUrls = ''
        }

        if (temp.db_environmentState) {
          temp.db_environmentState = JSON.parse(temp.db_environmentState)
          if (temp.db_environmentState.data) {
            activeNameEnv.value = temp.db_environmentState.data.map(
              x => x.space
            )
          } else {
            temp.db_environmentState = ''
          }
        }
        modelData.value = temp.orderInfo
        delete temp.orderInfo
        currentData.value = temp
      }
    }
    const onpenImg = url => {
      if (!url) return
      const image = new Image()
      image.src = url
      const imwindow = window.open(url)
      imwindow?.document.write(image.outerHTML)
    }
    const userExcuter = computed(() => {
      let temp = []
      if (taskInfoData.value.ui_executeUserName)
        temp = temp.concat(taskInfoData.value.ui_executeUserName.split(','))
      if (taskInfoData.value.ui_followUserName)
        temp = temp.concat(taskInfoData.value.ui_followUserName.split(','))

      temp = temp.filter(x => x)
      temp = uniq(temp)
      return temp.join(',')
    })
    onBeforeMount(async () => {
      await getOrder()
      selectByIdApi({ db_id: modelData.value.db_taskId }).then(x => {
        if (x.data.success) {
          if (x.data.data.db_evaluation) {
            x.data.data.db_evaluation = JSON.parse(x.data.data.db_evaluation)
            if (x.data.data.db_evaluation.imgUrls) {
              x.data.data.db_evaluation.imgUrls =
                x.data.data.db_evaluation.imgUrls.split(',')
            }
          }
          taskInfoData.value = x.data.data
        }
      })
      let temporderList = await getOrderListByTaskIdApi({
        taskId: modelData.value.db_taskId
      })
      if (temporderList.data.success) {
        const { objectList } = temporderList.data.data
        list.value = objectList
      }

      const x = await selectByAllTypeApi({ constType: 'taskOrder_state' })
      if (x.data.data) {
        taskType = x.data.data
      }

      selectByAllTypeApi({ constType: 'item_tag' }).then(x => {
        if (x.data.data) {
          itemTag.value = x.data.data
        }
      })
      selectByAllTypeApi({ constType: 'loss_degree' }).then(x => {
        if (x.data.data) {
          lossDegree.value = x.data.data
        }
      })

      const tempSpace = await selectByAllTypeApi({
        constType: 'elevator_space'
      })
      if (tempSpace.data.data) {
        elevator_space.value = tempSpace.data.data
      }

      selectByAllTypeApi({ constType: 'escalator_sapce' }).then(x => {
        if (x.data.data) {
          Object.entries<string>(x.data.data).forEach(([key, v]) => {
            elevator_space.value[key] = v
          })
        }
      })
      const tempoption_normal = await selectByAllTypeApi({
        constType: 'option_normal'
      })
      if (tempoption_normal.data.data) {
        option_normal = tempoption_normal.data.data
      }
      const tempoption_complete = await selectByAllTypeApi({
        constType: 'option_complete'
      })
      if (tempoption_complete.data.data) {
        option_complete = tempoption_complete.data.data
      }

      const tempoption_whether = await selectByAllTypeApi({
        constType: 'option_whether'
      })
      if (tempoption_whether.data.data) {
        option_whether = tempoption_whether.data.data
      }

      const tempoption_with = await selectByAllTypeApi({
        constType: 'option_with'
      })
      if (tempoption_with.data.data) {
        option_with = tempoption_with.data.data
      }
    })
    return {
      selectTabs,
      modelData,
      currentData,
      activeName,
      itemTag,
      getshow,
      lossDegree,
      elevator_space,
      taskInfoData,
      onpenImg,
      list,
      getOrder,
      activeNameEnv,
      userExcuter,
      editDetailPrintFn,
      dialog,
      Emergency_selectByIdApi,
      Emergency_BaseInfo_updateByIdApi,
      addModePropUpdate,
      successFn
    }
  }
})
</script>

<style lang="scss" scoped>
.task-order-detail {
  display: flex;
  justify-content: space-between;
  height: 100%;

  .info-detail-left {
    width: 440px;
    box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
    background-color: white;
    margin: 50px 28px;
    border-radius: 10px;
    overflow: auto;

    .task-detail-head {
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .print-page {
        color: $p-color-primary;
        cursor: pointer;
        margin-left: 10px;
        font-weight: bold;
      }

      .score {
        > label {
          line-height: 30px;
        }
      }

      > div {
        align-items: flex-start;
        width: 100%;
        margin-left: 50px;
        margin-top: 10px;
        margin-right: 10px;
        display: flex;

        > label {
          font-weight: bold;
          white-space: nowrap;
          margin-right: 20px;
          width: 100px;
          text-align: right;
        }

        .order-list {
          display: flex;
          flex-wrap: wrap;
          width: 250px;
          overflow: hidden;

          span {
            color: $p-color-primary;
            cursor: pointer;
            margin-bottom: 5px;
            overflow: hidden;
          }
        }

        .evaluation-img {
          img {
            width: 50px;
            margin-right: 5px;
          }
        }
      }

      .line-split {
        background-color: rgba(0, 0, 1, 0.1);
        width: 296px;
        height: 1px;
        margin: 20px 0;
      }

      .head {
        margin: 20px 0 10px 0;
        text-align: center;
        justify-content: center;
      }
    }
  }

  .info-detail-right {
    width: calc(100% - 480px);
    box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
    background-color: white;
    margin: 50px 28px 50px 0;
    border-radius: 10px;

    .task-detail-mian {
      display: flex;
      flex-wrap: wrap;
      height: 100%;

      > div {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        &:first-child {
          height: calc(100% - 40px);
        }
        > div {
          width: 100%;
        }
        &.footer-btn {
          text-align: center;
          justify-content: center;
        }
      }

      .detail-tag {
        margin: 10px 30px;
        height: 30px;

        :deep().el-tabs {
          .el-tabs__nav-wrap {
            &::after {
              width: 0;
            }
          }

          .el-tabs__header {
            margin: 0;
          }

          .el-tabs__active-bar {
            height: 4px;
            border-radius: 3px;
          }

          .is-active {
            font-weight: bold;
          }
        }
      }

      .body {
        height: calc(100% - 50px);
        overflow: auto;

        .work-step {
          margin: 10px 30px;
          padding: 0 10px;

          .el-card {
            border-radius: 10px;
          }
        }

        .work-item {
          margin: 10px 30px;
          background-color: white;
          border-radius: 10px;
          padding: 10px;
          overflow: auto;

          &.video-page {
            video {
              width: 500px;
              margin-right: 10px;
            }
          }

          :deep().el-collapse {
            border-top: 0;

            .el-collapse-item__header {
              height: 60px;
            }

            .el-collapse-item__content {
              padding-bottom: 0px;
            }
          }

          ul {
            list-style: decimal-leading-zero;
            margin-left: 50px;

            > li {
              margin: 10px;

              span {
                color: #999999;
              }
            }
          }

          .work-title {
            margin-left: 10px;
            font-weight: bold;
          }

          .item-not-normal {
            color: $p-color-error;
          }

          .repalce-part-item {
            display: flex;
            flex-wrap: wrap;

            label {
              margin-right: 10px;
              margin-bottom: 10px;
              width: 100px;
              display: inline-flex;
            }

            span {
              flex: 1;
              background: #f1f1f1;
              border-radius: 10px;
              height: 40px;
              display: flex;
              padding-left: 10px;
              align-items: center;
            }

            list-style: none;

            li {
              margin-right: 30px;
              padding: 10px;
              width: 200px;
              height: 400px;
              box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
              display: flex;
              justify-content: center;
              > div {
                width: 160px;
              }
              img {
                height: 80px;
                width: 100%;
              }
            }
          }

          .repalce-part {
            display: flex;
            align-items: flex-start;

            label {
              margin-right: 10px;
              padding-bottom: 10px;
              display: inline-flex;
              margin-top: 10px;
            }
          }

          &.environmentState-item {
            .el-image {
              width: 60px;
              height: 60px;
            }

            ul {
              display: flex;

              > li {
                padding-right: 10px;
              }

              &.environmentState-item-image {
                > li {
                  list-style: none;

                  &::after {
                    content: ' ' attr(attr-num) '';
                    display: flex;
                    width: 100%;
                    text-align: center;
                    justify-content: center;
                  }
                }
              }
            }
          }

          img {
            width: 80px;
            margin-right: 10px;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
