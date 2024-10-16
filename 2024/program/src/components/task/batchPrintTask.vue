<template>
  <div class="batch-print">
    <div class="print-body-mian" id="batch-print-task">
      <div class="print-body" v-for="x in arrList" :key="x.db_id">
        <div
          class="print-head"
          style="height: 60px; line-height: 60px; width: 100%"
        >
          <img
            style="width: 68px; left: 10px"
            class="logo"
            src="../../public/images/common/logo.png"
          />
          <label style="font-size: 21px; line-height: 60px"
            >{{ x.db_id_orderName }}记录单</label
          >
        </div>
        <div class="print-task-body">
          <div>
            <div class="print-task-body-head">
              <div>
                <div>
                  <label>注册代码</label>
                  <span>{{ x.db_registCode }}</span>
                </div>
                <div>
                  <label>计划日期</label>
                  <span>{{ x.ui_preEndtime }}</span>
                </div>
              </div>

              <div>
                <div>
                  <label>使用单位</label>
                  <span>{{ x.ui_useCompanyName }}</span>
                </div>
                <div>
                  <label>维保公司</label>
                  <span>{{ x.ui_maintCompanyName }}</span>
                </div>
              </div>

              <div>
                <div>
                  <label>电梯名称</label>
                  <span>{{ x.db_projectNum }}</span>
                </div>
                <div>
                  <label>工单编号</label>
                  <span>{{ x.db_id }}</span>
                </div>
              </div>

              <div>
                <div>
                  <label>开始时间</label>
                  <span>{{ x.ui_dealStarttime }}</span>
                </div>
                <div>
                  <label>完工时间</label>
                  <span>{{ x.ui_dealEndtime }}</span>
                </div>
              </div>

              <div>
                <div>
                  <label>保养时间</label>
                  <span
                    >{{
                      x.db_stopDuration
                        ? parseInt(x.db_stopDuration / 60)
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
                      v-if="x.db_workItemList && x.db_workItemList.length > 0"
                    >
                      <template v-if="x.db_taskTypeCode == 'RepairUpkeep'">
                        <template
                          v-for="(y, index) in x.db_workItemList"
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
                        <template v-for="(y, index) in x.db_workItemList">
                          <tr v-if="index == 0">
                            <td colspan="2">工作项</td>
                          </tr>
                          <tr v-for="z in y.list" :key="z.db_code + y.tag">
                            <td align="left">{{ z.db_id_itemName }}</td>
                            <td align="left" width="100">
                              {{ getshow(z.db_itemContent, z.ui_value) }}
                            </td>
                          </tr>
                        </template>
                      </template>
                    </template>
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
                                {{ x.ui_executeUserName }}
                              </td>
                              <td align="left">
                                {{ x.ui_superiorPassUserName }}
                              </td>
                              <td align="left">
                                <img
                                  v-if="x.db_proElecSignatureUrl"
                                  :src="x.db_proElecSignatureUrl"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td align="left">
                                处理时间:{{ x.ui_dealStarttime }}
                              </td>
                              <td align="left">
                                验收时间:{{ x.ui_superiorPassTime }}
                              </td>
                              <td align="left">
                                验收时间:{{ x.ui_propPassTime }}
                              </td>
                            </tr>
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
import { defineComponent, onMounted } from 'vue'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'

export default defineComponent({
  props: {
    arrList: {
      type: Array<any>,
      default: () => []
    }
  },
  setup(props) {
    let option_whether = {}
    let option_complete = {}
    let option_normal = {}
    let option_with = {}
    onMounted(async () => {
      const tempoption_complete = await selectByAllTypeApi({
        constType: 'option_complete'
      })
      const tempoption_with = await selectByAllTypeApi({
        constType: 'option_with'
      })
      if (tempoption_with.data.data) {
        option_with = tempoption_with.data.data
      }
      const tempoption_normal = await selectByAllTypeApi({
        constType: 'option_normal'
      })
      if (tempoption_normal.data.data) {
        option_normal = tempoption_normal.data.data
      }
      if (tempoption_complete.data.data) {
        option_complete = tempoption_complete.data.data
      }
      const tempoption_whether = await selectByAllTypeApi({
        constType: 'option_whether'
      })
      if (tempoption_whether.data.data) {
        option_whether = tempoption_whether.data.data
      }
    })
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
    return {
      getshow
    }
  }
})
</script>

<style lang="scss" scoped>
.batch-print {
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: white;
  align-items: center;
}
.print-body-mian {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 800px;
  flex-wrap: wrap;
  font-size: 16px;
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
    position: relative;
    width: 100%;
    > label {
      font-size: 21px;
      color: white;
      line-height: 60px;
    }
    .logo {
      position: absolute;
      left: 10px;
      object-fit: contain;
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
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;

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
            border: 1px solid;
            padding: 0 2px;
            padding-left: 5px;

            > table {
              width: 100%;
              margin-right: 20px;
              border-collapse: collapse;
              table-layout: fixed;
            }
          }

          th {
            border: 1px solid;
            padding-left: 5px;
          }
        }

        .message {
          height: 40px;
          vertical-align: top;
        }

        .message-2 {
          height: 40px;
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
</style>
