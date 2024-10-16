<template>
  <div class="task-order-detail-print">
    <div class="head-btn">
      <!-- <el-button type="primary" @click="editDetailFn">查看详情</el-button> -->
      <el-button v-print="printobj" type="primary">打印</el-button>
      <!-- <el-button type="primary">下载电子单</el-button> -->
    </div>
    <div class="print-body-mian">
      <div id="print-task" class="print-body">
        <div class="print-head" style="height: 60px; line-height: 60px">
          <label style="font-size: 21px; line-height: 60px"
            >{{ modelData.db_id_orderName }}记录单</label
          >
          <img
            style="width: 68px; left: 10px"
            class="logo"
            src="../../public/images/common/logo.png"
          />
        </div>
        <div class="print-task-body">
          <div>
            <div class="print-task-body-head">
              <div>
                <div>
                  <label>注册代码</label>
                  <span>{{ modelData.db_registCode }}</span>
                </div>
                <div>
                  <label>计划日期</label>
                  <span>{{ taskInfoData.ui_preEndtime }}</span>
                </div>
              </div>

              <div>
                <div>
                  <label>使用单位</label>
                  <span>{{ currentproject.ui_useCompanyName }}</span>
                </div>
                <div>
                  <label>维保公司</label>
                  <span>{{ currentproject.ui_maintCompanyName }}</span>
                </div>
              </div>

              <div>
                <div>
                  <label>电梯名称</label>
                  <span>{{ taskInfoData.db_projectNum }}</span>
                </div>
                <div>
                  <label>工单编号</label>
                  <span>{{ taskInfoData.db_id }}</span>
                </div>
              </div>

              <div>
                <div>
                  <label>开始时间</label>
                  <span>{{ modelData.ui_dealStarttime }}</span>
                </div>
                <div>
                  <label>完工时间</label>
                  <span>{{ modelData.ui_dealEndtime }}</span>
                </div>
              </div>

              <div>
                <div>
                  <label>保养时间</label>
                  <span
                    >{{
                      modelData.db_stopDuration
                        ? parseInt(modelData.db_stopDuration / 60)
                        : '0'
                    }}分钟</span
                  >
                </div>
              </div>
            </div>
            <div class="print-task-body-mian">
              <div class="item">
                <table>
                  <thead>
                    <tr>
                      <th align="left">检查项与要求</th>
                      <th align="left" width="100">结果</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template
                      v-if="
                        currentData.db_workItemList &&
                        currentData.db_workItemList.length > 0
                      "
                    >
                      <template
                        v-if="taskInfoData.db_taskTypeCode == 'RepairUpkeep'"
                      >
                        <template
                          v-for="(y, index) in currentData.db_workItemList"
                          :key="y.desc"
                        >
                          <tr v-if="index == 0">
                            <td colspan="2">工作项</td>
                          </tr>
                          <tr>
                            <td align="left">{{ y.desc }}</td>
                            <td align="left" width="100">
                              {{ getshow('option_normal', y.value) }}
                            </td>
                          </tr>
                        </template>
                      </template>
                      <template v-else>
                        <template
                          v-for="(x, index) in currentData.db_workItemList"
                        >
                          <tr v-if="index == 0">
                            <td colspan="2">工作项</td>
                          </tr>
                          <tr v-for="y in x.list" :key="y.db_code + x.tag">
                            <td align="left">{{ y.db_id_itemName }}</td>
                            <td align="left" width="100">
                              {{ getshow(y.db_itemContent, y.ui_value) }}
                            </td>
                          </tr>
                        </template>
                      </template>
                    </template>

                    <!-- <template v-if="currentData.db_environmentState">
                    <template v-for="(x, index) in currentData.db_environmentState.data" :key="x.space">
                      <tr v-if="index == 0">
                        <td colspan="3">环境信息</td>
                      </tr>
                      <tr>
                        <td align="left">{{ x.space }}</td>
                        <td align="left">{{ elevator_space[x.space] }}</td>
                        <td align="left"><img v-for="y in x.list" :key="y" :src="y" /></td>

                      </tr>
                    </template>
                  </template> -->

                    <!-- <template v-if="currentData.db_sysCompPartState">
                    <template v-for="(x, index) in currentData.db_sysCompPartState.data">
                      <tr v-if="index == 0">
                        <td colspan="3">健康表</td>
                      </tr>
                      <tr v-for="(y, indexy) in x.list" :key="y.db_id">
                        <td align="left">{{ indexy+ 1 }}</td>
                        <td align="left">{{ y.db_id_partInstanceName }}</td>
                        <td align="left">
                          {{ lossDegree[y.ui_lossDegree] }}
                        </td>
                      </tr>
                    </template>
                  </template> -->
                    <!-- 
                  <template v-if="currentData.db_partList && currentData.db_partList.length > 0">
                    <template>
                      <tr>
                        <td colspan="3">换件清单</td>
                      </tr>
                      <tr v-for="y in currentData.db_partList" :key="x.db_partInstanceName">
                        <td align="left">{{ y.db_partInstanceName }}</td>
                        <td align="left">
                          <label>换件前:</label>
                          <img :src="y.db_beforeImgUrl" />
                        </td>
                        <td align="left">
                          <label>换件后:</label>
                          <img :src="y.db_afterImgUrl" />
                        </td>
                      </tr>
                    </template>
                  </template> -->
                    <!-- 
                  <template v-if="currentData.db_issueList &&
                  currentData.db_issueList.length > 0">
                    <template>
                      <tr>
                        <td rowspan="3">问题清单</td>
                      </tr>
                      <tr v-for="x in currentData.db_issueList" :key="x.desc">
                        <td align="left">{{ x.desc }}</td>
                        <td align="left">{{ x.desc }}</td>
                        <td align="left">
                          <img v-for="img in x.imgUrls" :key="img" :src="img" />
                        </td>
                      </tr>
                    </template>
                  </template> -->
                    <tr>
                      <td colspan="2" class="message">
                        说明:记录时在相对应的编号，如作业过程中有未解决或须跟进的项目写入备注栏中，当不清楚具体要求是请参照该型号的详细及技术参数说明
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" class="message-2" style="height: 80px">
                        备注：
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" class="user">
                        <table>
                          <thead>
                            <th align="left">执行人</th>
                            <th align="left">工程验收人</th>
                            <th align="left">物业验收人</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td align="left">
                                {{ userExcuter }}
                              </td>
                              <td align="left">
                                {{ modelData.ui_superiorPassUserName }}
                              </td>
                              <td align="left">
                                <img
                                  v-if="taskInfoData.db_proElecSignatureUrl"
                                  :src="taskInfoData.db_proElecSignatureUrl"
                                />
                                <!-- {{ modelData.ui_propPassUserName }} -->
                              </td>
                              <!-- <td align="left"> </td>
                            <td align="left"> </td>
                            <td align="left"> </td> -->
                            </tr>
                            <tr>
                              <td align="left">
                                处理时间:{{ taskInfoData.ui_dealStarttime }}
                              </td>
                              <td align="left">
                                验收时间:{{ modelData.ui_superiorPassTime }}
                              </td>
                              <td align="left">
                                验收时间:{{ modelData.ui_propPassTime }}
                              </td>
                            </tr>
                            <!-- <tr class="qianshu">
                              <td align="left" style="height: 80px">
                                <div>签署:</div>
                              </td>
                              <td align="left" style="height: 80px">
                                <div>签署:</div>
                              </td>
                              <td align="left" style="height: 80px">
                                <div>签署:</div>
                              </td>
                            </tr> -->
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed } from 'vue'
import print from 'vue3-print-nb'
import moment from 'moment'
import { useRouter, useRoute } from 'vue-router'
import { uniq } from 'lodash'
import {
  selectOrderByIdApi,
  getOrderListByTaskIdApi
} from '@/api/module/taskedit'
import { selectByIdApi } from '@/api/module/taskInfo'
import { selectByIdApi as selectprojectByIdApi } from '@/api/module/projectManage'
import { menulist } from '@/router/menu'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  directives: {
    print
  },
  setup() {
    const selectTabs = ref('first1')
    const $route = useRoute()
    const list = ref([])
    const modelData = ref({})
    const currentData = ref({ baseInfo: {} })
    const taskInfoData: any = ref({})
    const activeName = ref([])
    const activeNameEnv: any = ref([])
    const currentproject: any = ref({})
    let taskType = {}
    const itemTag = ref({})
    let option_whether = {}
    let option_complete = {}
    let option_normal = {}
    let option_with = {}
    const lossDegree = ref({})
    const elevator_space = ref({})
    const $router = useRouter()
    const printobj = {
      id: 'print-task',
      popTitle: 'tkwl' // 打印配置页上方的标题
    }
    const editDetailFn = args => {
      const url = $router.resolve({
        name: menulist.taskDetail.name,
        params: {
          id: $route.params.id
        }
      }).href
      window.open(url, '_blank')
    }
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

    const getOrder = order => {
      if (!order.ui_typeOrder && order.ui_typeOrder.length <= 0) return
      selectOrderByIdApi(order.db_orderTypeCode)({
        id: order.ui_typeOrder[0].db_id
      }).then(x => {
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
            if (!temp.db_sysCompPartState.data) {
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
          if (temp.db_partList) {
            temp.db_partList = JSON.parse(temp.db_partList)
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
      })
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
      selectByIdApi({ db_id: $route.params.id }).then(x => {
        if (x.data.success) {
          if (x.data.data.db_evaluation) {
            x.data.data.db_evaluation = JSON.parse(x.data.data.db_evaluation)
            if (x.data.data.db_evaluation.imgUrls) {
              x.data.data.db_evaluation.imgUrls =
                x.data.data.db_evaluation.imgUrls.split(',')
            }
          }
          taskInfoData.value = x.data.data
          selectprojectByIdApi({ id: x.data.data.db_projectId }).then(t => {
            currentproject.value = t.data.data
          })
        }
      })
      const temporderList = await getOrderListByTaskIdApi({
        taskId: $route.params.id
      })
      if (temporderList.data.success) {
        const { objectList } = temporderList.data.data
        list.value = objectList
      }
      if (list.value.length <= 0) return
      let temorder: any = list.value[0]
      const tempvalidOrders = list.value.filter(
        (x: any) => x.db_orderState != '08'
      )
      if (tempvalidOrders.length > 0) {
        temorder = tempvalidOrders[0]
      }
      if (!temorder.ui_typeOrder && temorder.ui_typeOrder.length <= 0) return // 数据有问题？
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
      getOrder(temorder)
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
      editDetailFn,
      currentproject,
      printobj
    }
  }
})
</script>

<style lang="scss" scoped>
.task-order-detail-print {
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: white;
  align-items: center;

  .head-btn {
    padding: 20px;
    height: 40px;
    width: 100%;
  }

  .print-body-mian {
    display: flex;
    justify-content: center;
    height: calc(100% - 100px);
    overflow: auto;
    width: 900px;
  }
}

.print-body {
  width: 100%;
  background-color: white;
  page-break-after: always;
  img {
    width: 50px;
    height: 50px;
  }

  .print-head {
    height: 60px;
    background-color: $p-color-primary;
    text-align: center;
    line-height: 60px;
    margin-bottom: 20px;
    position: relative;

    > label {
      font-size: 21px;
      color: white;
      line-height: 60px;
    }
    .logo {
      position: absolute;
      left: 10px;
      object-fit: contain;
      top: 50%;
      transform: translateY(-50%);
      width: 68px;
    }
  }

  .print-task-body {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: white;

    > div {
      margin-top: 10px;
    }

    .print-task-body-head {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      > div {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;

        > div {
          width: 50%;
          padding-right: 10px;

          > label {
            font-weight: bold;
            margin-right: 10px;

            &::after {
              content: ':';
              margin-left: 5px;
              display: inline-block;
              width: 2px;
            }
          }
        }
      }
    }

    .print-task-body-mian {
      margin-top: 20px;

      .item {
        width: 100%;
        display: flex;

        > table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;

          td {
            border: 2px solid;
            padding: 2px;
            padding-left: 5px;

            > table {
              width: 100%;
              margin-right: 20px;
              border-collapse: collapse;
              table-layout: fixed;
            }
          }

          th {
            border: 2px solid;
            padding-left: 5px;
          }
        }

        .message {
          height: 40px;
          vertical-align: top;
        }

        .message-2 {
          height: 80px;
          vertical-align: top;
        }
        .user {
          padding: 0;

          > table {
            > thead {
              th {
                border-top: 0;

                &:first-child {
                  border-left: 0;
                }

                &:last-child {
                  border-right: 0;
                }
              }
            }

            > tbody {
              > tr:last-child {
                > td {
                  border-bottom: 0;
                }
              }

              > tr {
                > td:first-child {
                  border-left: 0;
                }

                > td:last-child {
                  border-right: 0;
                }

                > td {
                  height: 40px;
                }
              }
              .qianshu {
                > td {
                  border-bottom: 0;
                  height: 80px;
                  vertical-align: top;
                  > div {
                    height: 80px;
                  }
                }
              }
              .qianshu-time {
                > td {
                  border-top: 0;
                  vertical-align: bottom;
                }
                > div {
                  height: 40px;
                }
              }
            }
          }
        }
      }
    }
  }
}
@page {
  size: auto; /* auto is the initial value */
  margin-top: 3mm;
  margin-bottom: 3mm;
}
</style>
