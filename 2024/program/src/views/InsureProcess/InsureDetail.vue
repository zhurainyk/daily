<template>
  <div class="insure-edit">
    <div class="step-insure">
      <el-steps
        :active="activestep"
        finish-status="success"
        direction="vertical"
      >
        <el-step
          v-for="x in currentStatus"
          :key="x.activestep"
          :description="x.description"
          :status="x.status"
          class="step-action"
          @click="clickstep(x.activestep)"
        >
          <template #title>
            <div class="step-title">
              <div>
                <label
                  >{{ x.title }}
                  <span
                    v-if="x.activestep == 1"
                    @click.stop="dialog.visiableRecordList = true"
                    class="record-list"
                    >作业流程<el-icon><Right /></el-icon></span
                ></label>
              </div>
              <div v-if="x.activestep == 1 && insureInfo.ui_createUserName">
                <span>{{ insureInfo.ui_createUserName }}</span
                ><span>{{ insureInfo.ui_createtime }}</span>
              </div>
              <div
                v-else-if="x.activestep == 2 && insureInfo.ui_onSiteUserName"
              >
                <span>{{ insureInfo.ui_onSiteUserName }}</span
                ><span>{{ insureInfo.ui_onSiteTime }}</span>
              </div>

              <div
                v-else-if="x.activestep == 3 && insureInfo.ui_maintPlanUserName"
              >
                <span>{{ insureInfo.ui_maintPlanUserName }}</span
                ><span>{{ insureInfo.ui_maintPlanSubmitTime }}</span>
              </div>

              <div
                v-else-if="x.activestep == 4 && insureInfo.ui_quotationUserName"
              >
                <span>{{ insureInfo.ui_quotationUserName }}</span
                ><span>{{ insureInfo.ui_quotationSubmitTime }}</span>
              </div>

              <div v-else-if="x.activestep == 5 && insureInfo.db_taskId">
                <span
                  v-if="insureInfo.ui_taskName"
                  class="task-title"
                  @click.stop="getDetailtpage"
                  >{{ insureInfo.ui_taskName }}<el-icon><Right /></el-icon
                ></span>
              </div>
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
    <div class="insure-body-mian">
      <div class="insure-body" @scroll.prevent.stop="scrollDiv">
        <div id="step1" class="title"><label>基本信息</label></div>
        <base-info :base-info="insureInfo"></base-info>
        <template v-if="insureInfo.db_onSiteUserId">
          <div class="line"></div>
          <div id="step2" class="title"><label>勘验信息</label></div>
          <file-img-detail :data="insureInfo" dbshowkey="db_onSiteImgUrls">
            <template #description> 故障原因: </template>
            <!-- <template #other>
          <div class="item">
            <label>勘验时间:</label>
            <span>
              {{ insureInfo.ui_onSiteTime }}
            </span>
          </div>
          <div class="item">
            <label>勘验人:</label>
            <span> {{ insureInfo.ui_onSiteUserName }}</span>
          </div>
        </template> -->
          </file-img-detail>
        </template>
        <template v-if="insureInfo.db_maintPlanUserId">
          <div class="line"></div>
          <div id="step3" class="title"><label>维修方案</label></div>
          <file-img-detail :data="insureInfo" dbshowkey="db_maintPlan">
            <template #description> 范围及路径: </template>
            <template #other>
              <div class="item">
                <label>预计天数(天):</label>
                <span> {{ insureInfo.db_preDuration }} </span>
              </div>
              <!-- <div class="item">
            <label>提交时间:</label>
            <span>
              {{ insureInfo.ui_maintPlanSubmitTime }}
            </span>
          </div>
          <div class="item">
            <label>方案制定人:</label>
            <span>
              {{ insureInfo.ui_maintPlanUserName }}
            </span>
          </div> -->
            </template>
            <div class="line line-with"></div>
            <div class="comment-aggree">
              <div>
                <h2>物业审核</h2>
                <div class="name">
                  <label>审核人:</label>
                  <span>{{ insureInfo.ui_maintPlanPropAuditUserName }}</span>
                </div>
                <div class="time">
                  <label>审核时间:</label>
                  <div class="note">
                    {{ insureInfo.ui_maintPlanPropAuditTime }}
                  </div>
                </div>
                <div class="note">
                  <label>审核描述:</label>
                  <div>
                    {{ insureInfo.db_maintPlanPropAuditNote }}
                  </div>
                </div>
                <i
                  class="status-pass-reject"
                  :class="
                    !insureInfo.db_maintPlanPropAuditUserId
                      ? 'no-process'
                      : insureInfo.db_maintPlanPropAuditState == '01'
                      ? 'pass'
                      : 'reject'
                  "
                ></i>
              </div>

              <div>
                <h2>平台审核</h2>
                <div class="name">
                  <label>审核人:</label>
                  <span>{{ insureInfo.ui_maintPlanTLAuditUserName }}</span>
                </div>
                <div class="time">
                  <label>审核时间:</label>
                  <div>
                    {{ insureInfo.ui_maintPlanTLAuditTime }}
                  </div>
                </div>
                <div class="note">
                  <label>审核描述:</label>
                  <div>
                    {{ insureInfo.db_maintPlanTLAuditNote }}
                  </div>
                </div>
                <i
                  class="status-pass-reject"
                  :class="
                    !insureInfo.db_maintPlanTLAuditUserId
                      ? 'no-process'
                      : insureInfo.db_maintPlanTLAuditState == '01'
                      ? 'pass'
                      : 'reject'
                  "
                ></i>
              </div>

              <div>
                <h2>保险审核</h2>
                <div class="name">
                  <label>审核人:</label>
                  <span>{{ insureInfo.ui_maintPlanInsuAuditUserName }}</span>
                </div>
                <div class="time">
                  <label>审核时间:</label>
                  <div>
                    {{ insureInfo.ui_maintPlanInsuAuditTime }}
                  </div>
                </div>
                <div class="note">
                  <label>审核描述:</label>
                  <div>
                    {{ insureInfo.db_maintPlanInsuAuditNote }}
                  </div>
                </div>
                <i
                  class="status-pass-reject"
                  :class="
                    !insureInfo.db_maintPlanInsuAuditUserId
                      ? 'no-process'
                      : insureInfo.db_maintPlanInsuAuditState == '01'
                      ? 'pass'
                      : 'reject'
                  "
                ></i>
              </div>
            </div>
          </file-img-detail>
        </template>

        <template v-if="insureInfo.db_quotationUserId">
          <div class="line"></div>
          <div id="step4" class="title"><label>报价方案</label></div>
          <file-img-detail :data="insureInfo" dbshowkey="db_quotation">
            <template #description> 报价描述:</template>
            <template #other>
              <div class="item">
                <label>残值处理方式:</label
                ><span>{{ insureInfo.ui_scrapValueDealDesc }}</span>
              </div>
              <div class="item">
                <label>残值(元):</label
                ><span>{{ insureInfo.db_scrapValue }}</span>
              </div>
              <div class="item">
                <label>工时费(元):</label
                ><span>{{ insureInfo.db_manhourCost }}</span>
              </div>
              <div class="item">
                <label>配件费(元):</label
                ><span>{{ insureInfo.db_partCost }}</span>
              </div>
              <div class="item">
                <label>合计费用(元):</label
                ><span>{{ insureInfo.db_totalCost }}</span>
              </div>
              <!-- <div class="item">
            <label>报价时间:</label
            ><span>{{ insureInfo.ui_quotationSubmitTime }}</span>
          </div>
          <div class="item">
            <label>报价人:</label
            ><span>{{ insureInfo.ui_quotationUserName }}</span>
          </div> -->
              <div class="item">
                <label></label>
              </div>
            </template>
            <div class="part-list">
              <div class="part-title"><label>配件更换登记</label></div>
              <div class="part-body">
                <div v-for="x in partscompute" :key="x.db_partInstanceName">
                  <div>
                    <label>配件信息:</label
                    ><span class="part-name" :title="x.db_partInstanceName">{{
                      x.db_partInstanceName
                    }}</span>
                  </div>
                  <div>
                    <label>单价(元):</label><span>{{ x.db_unitPrice }}</span>
                  </div>
                  <div>
                    <label>{{ `更换数量(${x.ui_unit}):` }}</label
                    ><span>{{ `${x.db_replaceCount}` }}</span>
                  </div>
                  <div>
                    <label>总价(元):</label><span>{{ x.db_totalPrice }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="line line-with"></div>
            <div class="comment-aggree">
              <div>
                <h2>平台审核</h2>
                <div class="name">
                  <label>审核人:</label>
                  <span>{{ insureInfo.ui_quotationTLAuditUserName }}</span>
                </div>
                <div class="time">
                  <label>审核时间:</label>
                  <div class="note">
                    {{ insureInfo.ui_quotationTLAuditTime }}
                  </div>
                </div>
                <div class="note">
                  <label>审核描述:</label>
                  <div>
                    {{ insureInfo.db_quotationTLAuditNote }}
                  </div>
                </div>
                <i
                  class="status-pass-reject"
                  :class="
                    !insureInfo.db_quotationTLAuditUserId
                      ? 'no-process'
                      : quotationAgree
                      ? 'pass'
                      : 'reject'
                  "
                ></i>
              </div>

              <div>
                <h2>定责审核</h2>
                <div class="name">
                  <label>审核人:</label>
                  <span>{{ insureInfo.ui_assessLossUserName }}</span>
                </div>
                <div class="time">
                  <label>审核时间:</label>
                  <div class="note">
                    {{ insureInfo.ui_assessLossTime }}
                  </div>
                </div>
                <div class="note">
                  <label>审核描述:</label>
                  <div>
                    {{ insureInfo.db_assessLossNote }}
                  </div>
                </div>
                <i
                  class="status-pass-reject"
                  :class="
                    !insureInfo.db_assessLossUserId
                      ? 'no-process'
                      : assessLossAgree
                      ? 'pass'
                      : 'reject'
                  "
                ></i>
              </div></div
          ></file-img-detail>
        </template>

        <template
          v-if="
            insureInfo.db_state >= '09' &&
            (insureInfo.db_taskId || insureInfo.db_maintAfterImgUrls)
          "
        >
          <div class="line"></div>
          <div id="step5" class="title"><label>维修施工</label></div>
          <RepairDetail :base-info="insureInfo"></RepairDetail>
        </template>

        <template
          v-if="
            insureInfo.db_state >= '13' &&
            (insureInfo.db_finishTLComfirmUserId ||
              insureInfo.db_settleAuditUserId ||
              insureInfo.db_payComfirmUserId)
          "
        >
          <div class="line"></div>
          <div id="step6" class="title"><label>确认与支付</label></div>
          <PayResult :base-info="insureInfo"></PayResult>
        </template>
      </div>
      <div class="insure-footer">
        <authority-button
          v-if="InsureOnSite && insureInfo.db_state == '03'"
          api-url="/elevator_order/iinsuranceInfo/onSite"
          type="primary"
          @click="openuploadFileDialog"
          ><el-icon><Plus /></el-icon>勘验信息</authority-button
        >
        <authority-button
          v-if="InsureSubmitPlan && insureInfo.db_state == '04'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/submitMaintPlan"
          @click="openuploadFileDialog"
        >
          <el-icon><Plus /></el-icon>维修方案</authority-button
        >
        <authority-button
          v-if="Insurequotation && insureInfo.db_state == '06'"
          api-url="/elevator_order/iinsuranceInfo/submitQuotation"
          type="primary"
          @click="openuploadFileDialog"
          ><el-icon><Plus /></el-icon>报价信息</authority-button
        >

        <authority-button
          v-if="InsureList && insureInfo.db_state == '02'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/comfirmProceed"
          @click="comfirmProceed"
          >继续发起</authority-button
        >

        <authority-button
          v-if="
            InsureAudit &&
            insureInfo.db_state == '05' &&
            insureInfo.db_maintPlanPropAuditState != '01'
          "
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/maintPlanPropAudit"
          @click="openAgreeDialog('01', '物业审核')"
          >物业审核</authority-button
        >
        <authority-button
          v-if="
            InsureTLAudit &&
            insureInfo.db_state == '05' &&
            insureInfo.db_maintPlanTLAuditState != '01'
          "
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/maintPlanTLAudit"
          @click="openAgreeDialog('02', '平台审核')"
          >平台审核</authority-button
        >
        <authority-button
          v-if="
            InsureInuserAudit &&
            insureInfo.db_state == '05' &&
            insureInfo.db_maintPlanInsuAuditState != '01'
          "
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/maintPlanInsuAudit"
          @click="openAgreeDialog('03', '保险审核')"
          >保险审核</authority-button
        >

        <authority-button
          v-if="InsurequotationTLAudit && insureInfo.db_state == '07'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/quotationTLAuditPass"
          @click="openAgreeDialog('04', '报价初审')"
          >报价初审</authority-button
        >
        <authority-button
          v-if="InsureassessLoss && insureInfo.db_state == '08'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/assessLossPass"
          @click="openAgreeDialog('05', '定责定损')"
          >定责定损</authority-button
        >
        <authority-button
          v-if="InsurefinishTLComfirm && insureInfo.db_state == '12'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/finishTLComfirmPass"
          @click="openAgreeDialog('06', '完成维修')"
          >完成维修</authority-button
        >

        <authority-button
          v-if="InsuresettleAudit && insureInfo.db_state == '13'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/settleAudit"
          @click="openAgreeDialog('07', '审核结算')"
          >审核结算</authority-button
        >
        <authority-button
          v-if="InsurePayComfirm && insureInfo.db_state == '14'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/payComfirm"
          @click="openAgreeDialog('08', '支付确认')"
          >支付确认</authority-button
        >
        <!-- <authority-button
          v-if="Insurefiling && insureInfo.db_state == '15'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/filing"
          @click="filing"
          >归档</authority-button
        > -->

        <authority-button
          v-if="
            (InsureList &&
              insureInfo.db_state != '15' &&
              insureInfo.db_state != '16' &&
              insureInfo.db_state != '17') ||
            (InsureInsuList && insureInfo.db_state == '02')
          "
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/cancel"
          @click="cancelInsure"
          >取消任务</authority-button
        >
      </div>
    </div>
  </div>
  <el-dialog
    v-if="dialog.visiableDialog"
    v-model="dialog.visiableDialog"
    :class="insureInfo.db_state == '04' ? 'min-dialog' : 'max-dialog'"
    :show-close="false"
    top="2vw"
  >
    <add-comment
      :data="objupfile"
      :base-info="insureInfo"
      @close-dialog="dialog.visiableDialog = false"
      @save-data="saveAddComment"
    >
      <template #btn="{ savefn, validationData }">
        <authority-button
          v-if="InsureOnSite && insureInfo.db_state == '03'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/backComfirm"
          @click="backComfirm(savefn, validationData)"
          >退回</authority-button
        >
        <authority-button
          v-if="Insurequotation && insureInfo.db_state == '06'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/backMaintPlan"
          @click="backMaintPlan"
          >回退维修方案</authority-button
        >
        <authority-button
          v-if="InsureSubmitPlan && insureInfo.db_state == '04'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/backToOnSite"
          @click="backToOnSite"
          >退回勘验</authority-button
        >
        <authority-button
          v-if="Insurequotation && insureInfo.db_state == '06'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/submitQuotation"
          @click="submitQuotation(savefn, validationData)"
          >提交</authority-button
        >
        <authority-button
          v-if="InsureOnSite && insureInfo.db_state == '03'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/onSite"
          @click="insureOnSite(savefn, validationData)"
          >提交</authority-button
        >
        <authority-button
          v-if="InsureSubmitPlan && insureInfo.db_state == '04'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/submitMaintPlan"
          @click="submitMaintPlan(savefn, validationData)"
          >提交</authority-button
        >
      </template>
    </add-comment>
  </el-dialog>

  <el-dialog
    v-if="dialog.visiableAgreeDialog"
    v-model="dialog.visiableAgreeDialog"
    class="min-dialog"
    :show-close="false"
  >
    <AddAgreeComment
      :insure-info="insureInfo"
      @close-dialog="dialog.visiableAgreeDialog = false"
      @save-data="getAgreeDialog"
      @cancel-data="getAgreeDialog"
      :titleName="dialogName"
    ></AddAgreeComment>
  </el-dialog>

  <el-dialog
    v-if="dialog.visiableRecordList"
    v-model="dialog.visiableRecordList"
    class="min-dialog"
    :show-close="false"
  >
    <RecordList
      :baseinfo="insureInfo"
      @close-dialog="dialog.visiableRecordList = false"
    ></RecordList>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  computed,
  nextTick
} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Right } from '@element-plus/icons-vue'
import { throttle } from 'lodash'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import BaseInfo from './components/BaseInfo'
import FileImgDetail from './components/FileImgDetail'
import AddComment from './components/AddCommentInsure'
import AddAgreeComment from './components/AddCommentInsureAgree'
import RepairDetail from './components/RepairDetail'
import PayResult from './components/PayResult'
import AuthorityButton from '@/components/common/AuthorityButton'
import {
  selectByIdApi,
  insureOnSiteApi,
  comfirmProceedApi,
  backComfirmApi,
  submitMaintPlanApi,
  backToOnSiteApi,
  maintPlanPropAuditApi,
  maintPlanTLAuditApi,
  maintPlanInsuAuditApi,
  submitQuotationApi,
  backMaintPlanApi,
  quotationTLAuditPassApi,
  quotationTLAuditRejectApi,
  assessLossPassApi,
  assessLossRejectApi,
  finishTLComfirmPassApi,
  finishTLComfirmRejectApi,
  settleAuditApi,
  payComfirmApi,
  filingApi,
  cancelApi
} from '@/api/module/insuranceInfo'
import { selectByAllTypeApi } from '@/api/module/commont'
import { menulist } from '@/router/menu'
import RecordList from './components/RecordList'

export default defineComponent({
  components: {
    BaseInfo,
    FileImgDetail,
    AddComment,
    AddAgreeComment,
    RepairDetail,
    PayResult,
    AuthorityButton,
    Plus,
    Right,
    RecordList
  },
  setup() {
    const activestep = ref(1)
    const insureInfo: any = ref({})
    const dialog = reactive({
      visiableDialog: false,
      visiableAgreeDialog: false,
      visiableRecordList: false
    })
    const currentStore = useStore()
    const currentStatus = reactive([
      {
        statusIndex: ['01', '02'],
        status: 'wait',
        title: '基本信息',
        description: '未完成',
        activestep: 1
      },
      {
        statusIndex: ['03'],
        status: 'wait',
        title: '现场勘验',
        description: '未完成',
        activestep: 2
      },
      {
        statusIndex: ['04', '05'],
        status: 'wait',
        title: '维修方案',
        description: '未完成',
        activestep: 3
      },
      {
        statusIndex: ['06', '07', '08'],
        status: 'wait',
        title: '报价方案',
        description: '未完成',
        activestep: 4
      },
      {
        statusIndex: ['09', '10', '11'],
        status: 'wait',
        title: '维修施工',
        description: '未完成',
        activestep: 5
      },
      {
        statusIndex: ['12', '13', '14', '15', '16'],
        status: 'wait',
        title: '确认与支付',
        description: '未完成',
        activestep: 6
      }
    ])
    const $route = useRoute()
    const objupfile = ref('')
    const scrapValueDeals: any = ref([])
    const unitlist: any = ref([])
    const currentAgree = ref('')
    const dialogName = ref('')
    const isClick = ref(false)
    const currentUser = computed(() => currentStore.state.user)
    const haveCancelBtn = computed(
      () =>
        currentUser.value?.userInfo.db_id == insureInfo.value.db_createUserId
    )
    const $router = useRouter()
    // const changeMoney = val => {
    //   val.db_totalCost =
    //     parseFloat(val.db_partCost || 0) +
    //     parseFloat(val.db_manhourCost || 0) -
    //     parseFloat(val.db_scrapValue || 0)
    //   val.db_totalCost = val.db_totalCost.toFixed(2)
    // }
    // const changedealwith = (val, modal) => {
    //   modal.db_scrapValue = ''
    //   changeMoney(modal)
    // }
    const clickstep = val => {
      activestep.value = val
      isClick.value = true
      nextTick(() => {
        document.getElementById(`step${val}`)?.scrollIntoView({
          behavior: 'smooth'
        })
        setTimeout(() => {
          isClick.value = false
        }, 800)
      })
    }
    const getCurrentStaus = (status: string, isFrist = false) => {
      const index = currentStatus.findIndex(
        x => x.statusIndex.findIndex(y => y == status) > -1
      )
      if (index > -1) {
        currentStatus.forEach((x, tempindex) => {
          if (tempindex < index) {
            x.description = '完成'
            x.status = 'success'
          } else if (tempindex == index) {
            x.status = 'process'
            if (x.activestep > 1) {
              clickstep(x.activestep - 1)
            }
            x.description = insureInfo.value.ui_stateDesc
            if (status == '16' || status == '15') {
              x.status = 'success'
              clickstep(1)
            }
          } else {
            x.description = '未完成'
            x.status = 'wait'
          }
        })
      } else {
        currentStatus.forEach(x => {
          if (status == '17') {
            x.description = '已取消'
            x.status = 'wait'
          } else {
            x.description = '未知错误'
            x.status = 'wait'
          }
        })
      }
    }
    const backComfirm = (savefn, validationData) => {
      if (!validationData()) return
      dialog.visiableDialog = false
      const temp = savefn()
      saveAddComment(temp)
      backComfirmApi({
        db_id: insureInfo.value.db_id,
        db_onSiteImgUrls: insureInfo.value.db_onSiteImgUrls
      }).then(x => {
        changeInfo(x)
      })
    }
    const comfirmProceed = () => {
      comfirmProceedApi({ db_id: insureInfo.value.db_id }).then(x => {
        changeInfo(x)
      })
    }
    const insureOnSite = (savefn, validationData) => {
      // 提交勘验
      if (!validationData()) return
      const temp = savefn()
      saveAddComment(temp)
      insureOnSiteApi({
        db_id: insureInfo.value.db_id,
        db_onSiteImgUrls: insureInfo.value.db_onSiteImgUrls
      }).then(x => {
        changeInfo(x)
      })
    }
    const submitMaintPlan = (savefn, validationData) => {
      // 提交方案
      if (!validationData()) return
      const temp = savefn()
      saveAddComment(temp)
      submitMaintPlanApi({
        db_id: insureInfo.value.db_id,
        db_maintPlan: insureInfo.value.db_maintPlan,
        db_preDuration: insureInfo.value.db_preDuration
      }).then(x => {
        changeInfo(x)
      })
    }
    const backToOnSite = () => {
      // 退回勘验
      dialog.visiableDialog = false
      backToOnSiteApi({ db_id: insureInfo.value.db_id }).then(x => {
        changeInfo(x)
      })
    }
    const changeInfo = result => {
      if (result.data.success) {
        insureInfo.value = result.data.data
        // $router.push({
        //   name: `${$route.meta.routerName}`
        // })
        getCurrentStaus(insureInfo.value.db_state)
        ElMessage.success('操作成功')
      } else {
        ElMessage.error(result.data.message)
      }
    }
    const submitQuotation = (savefn, validationData) => {
      // 提交报价方案
      if (!validationData()) return
      const temp = savefn()
      saveAddComment(temp)
      submitQuotationApi({
        db_id: insureInfo.value.db_id,
        db_quotation: insureInfo.value.db_quotation,
        db_partCost: insureInfo.value.db_partCost,
        db_manhourCost: insureInfo.value.db_manhourCost,
        db_totalCost: insureInfo.value.db_totalCost,
        db_scrapValue: insureInfo.value.db_scrapValue,
        db_scrapValueDeal: insureInfo.value.db_scrapValueDeal,
        db_partList: insureInfo.value.db_partList
      }).then(x => {
        changeInfo(x)
      })
    }
    const backMaintPlan = () => {
      // 回退维修方案
      dialog.visiableDialog = false
      backMaintPlanApi({
        db_id: insureInfo.value.db_id
      }).then(x => {
        changeInfo(x)
      })
    }
    const openAgreeDialog = (val, name) => {
      currentAgree.value = val // 01 物业 02平台  03 保险
      dialogName.value = name
      dialog.visiableAgreeDialog = true
    }
    const getAgreeDialog = data => {
      if (currentAgree.value == '01') {
        maintPlanPropAudit(data)
      } else if (currentAgree.value == '02') {
        maintPlanTLAudit(data)
      } else if (currentAgree.value == '03') {
        maintPlanInsuAudit(data)
      } else if (currentAgree.value == '04') {
        quotationTLAuditPassReject(data)
      } else if (currentAgree.value == '05') {
        assessLossPassReject(data)
      } else if (currentAgree.value == '06') {
        finishTLComfirmPassReject(data)
      } else if (currentAgree.value == '07') {
        settleAudit(data)
      } else if (currentAgree.value == '08') {
        payComfirm(data)
      }
    }
    const maintPlanPropAudit = data => {
      // 物业同意审核

      maintPlanPropAuditApi({
        db_maintPlanPropAuditState: data.status,
        db_id: insureInfo.value.db_id,
        db_maintPlanPropAuditNote: data.db_description
      }).then(x => {
        changeInfo(x)
      })
    }
    const maintPlanTLAudit = data => {
      // 平台同意审核

      maintPlanTLAuditApi({
        db_maintPlanTLAuditState: data.status,
        db_id: insureInfo.value.db_id,
        db_maintPlanTLAuditNote: data.db_description
      }).then(x => {
        changeInfo(x)
      })
    }

    const maintPlanInsuAudit = data => {
      // 保险同意审核

      maintPlanInsuAuditApi({
        db_maintPlanInsuAuditState: data.status,
        db_id: insureInfo.value.db_id,
        db_maintPlanInsuAuditNote: data.db_description
      }).then(x => {
        changeInfo(x)
      })
    }

    const quotationTLAuditPassReject = data => {
      // 保险同意审核
      if (data.status == '01') {
        quotationTLAuditPassApi({
          db_id: insureInfo.value.db_id,
          db_quotationTLAuditNote: data.db_description
        }).then(x => {
          changeInfo(x)
        })
      } else {
        quotationTLAuditRejectApi({
          db_id: insureInfo.value.db_id,
          db_quotationTLAuditNote: data.db_description
        }).then(x => {
          changeInfo(x)
        })
      }
    }

    const assessLossPassReject = data => {
      // 定责定损同意审核
      if (data.status == '01') {
        assessLossPassApi({
          db_id: insureInfo.value.db_id,
          db_assessLossNote: data.db_description
        }).then(x => {
          changeInfo(x)
        })
      } else {
        assessLossRejectApi({
          db_id: insureInfo.value.db_id,
          db_assessLossNote: data.db_description
        }).then(x => {
          changeInfo(x)
        })
      }
    }

    const finishTLComfirmPassReject = data => {
      // 维修结束平台
      if (data.status == '01') {
        finishTLComfirmPassApi({
          db_id: insureInfo.value.db_id,
          db_finishTLComfirmNote: data.db_description
        }).then(x => {
          changeInfo(x)
        })
      } else {
        finishTLComfirmRejectApi({
          db_id: insureInfo.value.db_id,
          db_finishTLComfirmNote: data.db_description
        }).then(x => {
          changeInfo(x)
        })
      }
    }

    const settleAudit = data => {
      // 审核结算
      if (data.status == '01') {
        settleAuditApi({
          db_id: insureInfo.value.db_id,
          db_settleAuditNote: data.db_description
        }).then(x => {
          changeInfo(x)
        })
      } else {
      }
    }

    const payComfirm = data => {
      // 支付确认
      if (data.status == '01') {
        payComfirmApi({
          db_id: insureInfo.value.db_id,
          db_payComfirmNote: data.db_description
        }).then(x => {
          changeInfo(x)
        })
      } else {
      }
    }

    const filing = data => {
      // 归档
      filingApi({
        db_id: insureInfo.value.db_id
      }).then(x => {
        changeInfo(x)
      })
    }

    const cancelInsure = data => {
      // 取消
      ElMessageBox.confirm('确认取消任务?').then(() => {
        cancelApi({
          db_id: insureInfo.value.db_id
        }).then(x => {
          changeInfo(x)
        })
      })
    }

    const saveAddComment = data => {
      if (insureInfo.value.db_state == '03') {
        insureInfo.value.db_onSiteImgUrls = JSON.stringify({
          db_description: data.db_description,
          db_imagesUrls: data.db_imagesUrls,
          db_filesUrls: data.db_filesUrls,
          db_fileNames: data.db_fileNames
        })
      } else if (insureInfo.value.db_state == '04') {
        insureInfo.value.db_maintPlan = JSON.stringify({
          db_description: data.db_description,
          db_imagesUrls: data.db_imagesUrls,
          db_filesUrls: data.db_filesUrls,
          db_fileNames: data.db_fileNames
        })
        insureInfo.value.db_preDuration = data.db_preDuration
      } else if (insureInfo.value.db_state == '06') {
        insureInfo.value.db_quotation = JSON.stringify({
          db_description: data.db_description,
          db_imagesUrls: data.db_imagesUrls,
          db_filesUrls: data.db_filesUrls,
          db_fileNames: data.db_fileNames
        })
        insureInfo.value.db_scrapValueDeal = data.db_scrapValueDeal
        insureInfo.value.db_scrapValue = data.db_scrapValue
        insureInfo.value.db_partCost = data.db_partCost
        insureInfo.value.db_manhourCost = data.db_manhourCost
        insureInfo.value.db_totalCost = data.db_totalCost
        insureInfo.value.db_partList = data.db_partList
      }

      dialog.visiableDialog = false
    }
    const openuploadFileDialog = () => {
      if (insureInfo.value.db_state == '03') {
        objupfile.value = insureInfo.value.db_onSiteImgUrls
      } else if (insureInfo.value.db_state == '04') {
        objupfile.value = insureInfo.value.db_maintPlan
      } else if (insureInfo.value.db_state == '06') {
        objupfile.value = insureInfo.value.db_quotation
      }
      dialog.visiableDialog = true
    }

    const InsureList = computed(() => $route.meta.routerName == 'InsureList')
    const InsureInsuList = computed(
      () => $route.meta.routerName == 'InsureInsuList'
    )
    const InsureOnSite = computed(
      () => $route.meta.routerName == 'InsureOnSite'
    )
    const InsureSubmitPlan = computed(
      () => $route.meta.routerName == 'InsureSubmitPlan'
    )
    const InsureAudit = computed(() => $route.meta.routerName == 'InsureAudit')
    const InsureTLAudit = computed(
      () => $route.meta.routerName == 'InsureTLAudit'
    )
    const InsureInuserAudit = computed(
      () => $route.meta.routerName == 'InsureInuserAudit'
    )
    const Insurequotation = computed(
      () => $route.meta.routerName == 'Insurequotation'
    )
    const InsurequotationTLAudit = computed(
      () => $route.meta.routerName == 'InsurequotationTLAudit'
    )
    const InsureassessLoss = computed(
      () => $route.meta.routerName == 'InsureassessLoss'
    )
    const InsurefinishTLComfirm = computed(
      () => $route.meta.routerName == 'InsurefinishTLComfirm'
    )
    const InsuresettleAudit = computed(
      () => $route.meta.routerName == 'InsuresettleAudit'
    )
    const InsurePayComfirm = computed(
      () => $route.meta.routerName == 'InsurePayComfirm'
    )
    const Insurefiling = computed(
      () => $route.meta.routerName == 'Insurefiling'
    )
    const quotationAgree = computed(() => {
      const temp = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17']
      if (
        insureInfo.value.db_quotationTLAuditUserId &&
        (temp.findIndex(x => x == insureInfo.value.db_state) > -1 ||
          (insureInfo.value.db_assessLossUserId &&
            insureInfo.value.db_state == '07'))
      ) {
        return true
      }
      return false
    })
    const assessLossAgree = computed(() => {
      const temp = ['09', '10', '11', '12', '13', '14', '15', '16', '17']
      if (
        insureInfo.value.db_assessLossUserId &&
        temp.findIndex(x => x == insureInfo.value.db_state) > -1
      ) {
        return true
      }
      return false
    })
    const scrollDiv = el => {
      if (!isClick.value) {
        const scrollPosition = $(el.target).scrollTop() || 0
        currentStatus.forEach(step => {
          const dom = document.getElementById(`step${step.activestep}`)
          if (dom) {
            const sectionTop = dom.offsetTop
            if (
              scrollPosition >= sectionTop - sectionTop / 5 &&
              scrollPosition < sectionTop + sectionTop - sectionTop / 5
            ) {
              activestep.value = step.activestep
            }
          }
        })
      }
    }
    const throttlediv = throttle(scrollDiv, 800)
    const getDetailtpage = () => {
      if (insureInfo.value.db_taskId) {
        let url = $router.resolve({
          name: menulist.taskDetail.name,
          params: {
            id: insureInfo.value.db_taskId
          }
        }).href
        window.open(url, '_blank')
      }
    }
    const partscompute = computed(() => {
      if (insureInfo.value.db_partList) {
        return JSON.parse(insureInfo.value.db_partList)
      }
      return []
    })
    const changeUint = (val, item) => {
      item.ui_unit = ''
      if (val) {
        const tempUnit = unitlist.value.find(x => x.value == val)
        item.ui_unit = tempUnit?.label
      }
    }
    onMounted(() => {
      // selectByAllTypeApi({ constType: 'scrapValueDeal' }).then(x => {
      //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //     scrapValueDeals.value.push({
      //       value: key,
      //       label: v
      //     })
      //   })
      // })
      // selectByAllTypeApi({ constType: 'measure_unit' }).then(x => {
      //   Object.entries<string>(x.data.data).forEach(([key, v]) => {
      //     unitlist.value.push({
      //       value: key,
      //       label: v
      //     })
      //   })
      // })
      selectByIdApi({ id: $route.params.id }).then(x => {
        if (x.data.success) {
          insureInfo.value = x.data.data
          getCurrentStaus(insureInfo.value.db_state, true)
        }
      })
    })
    return {
      activestep,
      dialog,
      objupfile,
      insureInfo,
      saveAddComment,
      openuploadFileDialog,
      backComfirm,
      comfirmProceed,
      insureOnSite,
      currentStatus,
      clickstep,
      haveCancelBtn,
      submitMaintPlan,
      backToOnSite,
      getAgreeDialog,
      openAgreeDialog,
      submitQuotation,
      backMaintPlan,
      quotationTLAuditPassReject,
      currentAgree,
      scrapValueDeals,
      filing,
      cancelInsure,
      InsureList,
      InsureInsuList,
      InsureOnSite,
      InsureSubmitPlan,
      InsureAudit,
      InsureTLAudit,
      InsureInuserAudit,
      Insurequotation,
      InsurequotationTLAudit,
      InsureassessLoss,
      InsurefinishTLComfirm,
      InsuresettleAudit,
      InsurePayComfirm,
      Insurefiling,
      quotationAgree,
      assessLossAgree,
      scrollDiv,
      throttlediv,
      getDetailtpage,
      dialogName,
      unitlist,
      partscompute,
      changeUint
    }
  }
})
</script>

<style lang="scss" scoped>
.insure-edit {
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #f6f6ff;
  .step-insure {
    margin: 20px 0 20px 20px;
    background-color: white;
    border-radius: 10px;
    padding: 40px 0 40px 40px;
    box-shadow: 3px 4px 14px 1px rgba(51, 51, 51, 0.2);
    .step-action {
      cursor: pointer;
    }
    .el-step {
      width: 320px;
    }
    .step-title {
      cursor: pointer;
      label {
        font-weight: bold;
        font-size: 18px;
      }
      span {
        margin-right: 10px;
        font-size: 12px;
      }
      .record-list {
        margin-left: 20px;
        list-style: 18px;
        color: $p-color-primary;
        cursor: pointer;
      }
      .task-title {
        color: $p-color-primary;
      }
    }
  }
  .insure-footer {
    background-color: white;
    text-align: center;
    width: 100%;
    display: flex;
    height: 40px;
    border-radius: 10px;
    justify-content: center;
    z-index: 111;
    width: 100%;
    position: sticky;
    bottom: 0;
  }
  .insure-body-mian {
    margin: 20px 0 20px 20px;
    width: calc(100% - 420px);
    padding-top: 20px;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    border-radius: 10px;
    position: relative;
  }
  .insure-body {
    width: 100%;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
    position: relative;
    height: calc(100% - 40px);
    .title {
      margin-bottom: 10px;
      > label {
        font-weight: bold;
        display: flex;
        align-items: center;
        font-size: 16px;
        &::before {
          content: '';
          width: 4px;
          display: inline-flex;
          margin-right: 5px;
          background-color: $p-color-primary;
          height: 16px;
          margin-left: 10px;
        }
      }
    }
    .comment-aggree {
      display: flex;
      margin-top: 40px;
      justify-content: flex-start;
      padding-left: 70px;
      > div {
        width: 300px;
        height: 200px;
        box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
        margin-right: 20px;
        border-radius: 10px;
        padding: 20px;
        position: relative;
        h2 {
          font-weight: bold;
          color: #000000;
          text-align: center;
          font-size: 16px;
        }
        > div {
          width: 100%;
          height: 20px;
          display: inline-flex;
          margin-top: 18px;
          > label {
            width: 80px;
            padding-bottom: 20px;
            color: #666666;
          }
          > div {
            color: #666666;
          }
          > span {
            color: #666666;
          }
        }
        .note {
          > div {
            white-space: pre-wrap;
            word-break: break-all;
            flex: 1;
            height: 90px;
            overflow: auto;
          }
        }
        .status-pass-reject {
          width: 90px;
          height: 90px;
          display: inline-block;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          position: absolute;
          right: 5px;
          top: 5px;
          &.pass {
            background-image: url('../../public/images/insure/insure-pass.png');
          }
          &.no-process {
            background-image: url('../../public/images/insure/insure-no.png');
          }
          &.reject {
            background-image: url('../../public/images/insure/insure-ject.png');
          }
        }
      }
    }
    .part-list {
      display: flex;
      justify-content: flex-start;
      padding: 0 50px;
      flex-wrap: wrap;
      .part-title {
        width: 100%;
        > label {
          font-weight: bold;
          width: 100px;
          text-align: right;
          display: inline-flex;
          justify-content: flex-end;
        }
      }
      .part-body {
        width: 100%;
        display: flex;
        padding-left: 20px;
        margin-top: 10px;
        flex-wrap: wrap;
        > div {
          box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
          height: 100px;
          width: 260px;
          padding: 20px 10px 20px 20px;
          border-radius: 10px;
          margin-right: 10px;
          margin-bottom: 10px;
          > div {
            margin-bottom: 10px;
            display: flex;
            > label {
              width: 90px;
              margin-right: 10px;
            }
            .part-name {
              white-space: nowrap;
              overflow: hidden;
              flex: 1;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  :deep().el-step {
    .is-process {
      color: $p-color-primary;
      border-color: $p-color-primary;
      .el-step__icon {
        background-color: $p-color-primary;
      }
      .el-step__icon-inner {
        color: white;
      }
    }
    .is-success {
      color: #46ba6f;
      border-color: #46ba6f;
    }
    .el-step__line {
      width: 1px;
    }
    .el-step__icon {
      border: 1px solid;
    }
    .el-step__title {
      margin-bottom: 30px;
    }
  }
  .line {
    height: 1px;
    background: rgba(153, 153, 153, 0.5);
    width: 100%;
    margin: 20px 0;
    &.line-with {
      display: flex;
      background: white;
      justify-content: center;
      &::before {
        content: '';
        height: 1;
        display: inline-flex;
        width: calc(100% - 160px);
        background: rgba(153, 153, 153, 0.5);
      }
    }
  }
  .item {
    display: flex;
    align-items: flex-start;
    width: 530px;
    margin-bottom: 20px;
    label {
      width: 100px;
      margin-right: 20px;
      text-align: right;
      line-height: 40px;
      font-weight: bold;
    }
    span {
      width: 360px;
      background: #f7f8fa;
      border-radius: 10px;
      height: 40px;
      display: flex;
      padding-left: 10px;
      align-items: center;
    }
    .note {
      width: 350px;
      height: 120px;
      background: #f7f8fa;
      border-radius: 10px;
      padding: 5px;
      padding-right: 7px;
      word-break: break-all;
    }
  }
}
.upload-quotation {
  display: flex;
  flex-wrap: wrap;
  > div {
    margin-bottom: 10px !important;
    padding: 0 !important;
    padding-right: 25px !important;
  }
  .item-quotation {
    width: 320px;
    margin-right: 10px;
    > div {
      width: 320px !important;
    }
  }
  label {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
  }
}

.el-form {
  > div {
    margin: 0;
    padding: 0 !important;
  }
  .upload-quotation-part {
    background-color: #f7f8fa;
    display: flex;
    border-radius: 10px;
    margin-top: 10px;
    max-height: 170px;
    overflow: auto;
    &.have-data {
      padding-top: 10px;
    }
    > div {
      width: 100% !important;
      position: relative;
      justify-content: center;
      padding: 0 !important;
      &:first-child {
        margin-top: 10px;
      }
      &::before {
        content: '' attr(indexnum) '.';
        display: inline-flex;
        align-self: flex-start;
        margin-top: 6px;
      }
      .delete-item {
        color: $p-color-error;
        align-self: flex-start;
        margin-top: 7px;
        cursor: pointer;
      }
      .el-form-item {
        width: 180px !important;
        margin-left: 10px;
        &.frist-part-name {
          width: 240px !important;
          .item-quotation {
            display: flex;
            width: 240px;
            > div {
              width: 160px !important;
            }
          }
        }
        &.unit {
          width: 150px !important;
          .item-quotation {
            display: flex;
            width: 150px;
            > div {
              width: 100px !important;
            }
          }
        }
      }

      .item-quotation {
        display: flex;
        width: 180px;
        > div {
          width: 100px !important;
        }
      }
    }
    label {
      display: flex;
      max-width: 80px;
      margin-right: 10px;
    }
  }
  .item-dialog {
    width: 500px !important;
    label {
      margin-bottom: 10px;
      display: flex;
    }
  }
}
.add-part {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  > i {
    font-size: 20px;
    color: $p-color-primary;
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>
