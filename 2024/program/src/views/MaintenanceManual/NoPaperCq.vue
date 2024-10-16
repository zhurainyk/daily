<template>
  <div class="no-paper-cq">
    <div class="step-head">
      <el-steps :active="stepStatus" finish-status="success">
        <el-step title="步骤1" description="注册登录" />
        <el-step title="步骤2" description="选择合同" />
        <el-step title="步骤3" description="更新合同" />
        <el-step title="步骤4" description="查看维保人员" />
        <el-step title="步骤5" description="上传" />
      </el-steps>
    </div>
    <div class="step-body">
      <div v-if="stepStatus == 0">
        <div class="body">
          <div>
            <label class="required-before">维保公司</label>
            <el-select
              v-model="login.db_id"
              placeholder=""
              clearable
              filterable
            >
              <el-option
                v-for="item in maintCompanys"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div>
            <label class="required-before">平台名称</label>
            <el-input v-model="login.username"></el-input>
          </div>

          <div>
            <label class="required-before">平台key</label>
            <el-input v-model="login.key"></el-input>
          </div>

          <div>
            <label class="required-before">平台编码</label>
            <el-input v-model="login.appcode"></el-input>
          </div>

          <div>
            <label class="required-before">平台secret</label>
            <el-input v-model="login.secret"></el-input>
          </div>

          <div>
            <label class="required-before">认证地址</label>
            <el-input v-model="login.lginurl"></el-input>
          </div>
        </div>
        <div class="footer">
          <el-button type="primary" @click="loginApi">下一步</el-button>
        </div>
      </div>

      <div v-if="stepStatus == 1">
        <div class="body">
          <div>
            <label class="required-before">选择合同</label>
            <el-select
              v-model="contrat.db_id"
              placeholder=""
              clearable
              filterable
            >
              <el-option
                v-for="item in contracts"
                :key="item.db_id"
                :label="item.db_id_contNum"
                :value="item.db_id"
              />
            </el-select>
          </div>
        </div>
        <div class="footer">
          <el-button type="primary" @click="getcontratApi">下一步</el-button>
        </div>
      </div>

      <div v-if="stepStatus == 2">
        <div class="body">
          <div>
            <label class="required-before">更新合同</label>
            <el-select v-model="contrat.db_id" disabled>
              <el-option
                v-for="item in contracts"
                :key="item.db_id"
                :label="item.db_id_contNum"
                :value="item.db_id"
              />
            </el-select>
          </div>
        </div>
        <div class="footer">
          <el-button type="primary" @click="getUpdatecontratApi"
            >下一步</el-button
          >
        </div>
      </div>

      <div v-if="stepStatus == 3">
        <div class="body">
          <div>
            <label class="required-before">状态</label>
            <el-select
              v-model="searchPerson.changState"
              placeholder=""
              clearable
              filterable
            >
              <el-option label="有效" value="1" />
              <el-option label="无效" value="0" />
            </el-select>
          </div>

          <div>
            <label class="required-before">时间</label>
            <el-date-picker
              v-model="searchPerson.workEndDate"
              type="date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </div>
          <div>
            <el-button type="primary" @click="getContratPersonApi"
              >查看</el-button
            >
            <el-button type="primary" @click="nextSetp">下一步</el-button>
          </div>
        </div>
        <div class="footer-table">
          <el-table
            ref="multipleTableRef"
            :data="listperson"
            style="width: 100%"
            height="100%"
          >
            <el-table-column property="workManName" label="名字" />
            <el-table-column property="workStat" label="状态" />
            <el-table-column property="workManPhone" label="电话" />
            <el-table-column
              property="workStartDate"
              label="劳务合同生效日期"
            />
            <el-table-column property="workEndDate" label="劳务合同截止日期" />
          </el-table>
        </div>
      </div>

      <div v-if="stepStatus == 4">
        <div class="body">
          <div>
            <label class="required-before">上传合同</label>
            <el-select v-model="contrat.db_id" disabled>
              <el-option
                v-for="item in contracts"
                :key="item.db_id"
                :label="item.db_id_contNum"
                :value="item.db_id"
              />
            </el-select>
          </div>
        </div>
        <div class="footer">
          <el-button type="primary" @click="updateloadContratApi"
            >上传</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'

import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { selectByAllApi, selectByAllTypeApi } from '@/api/module/commont'
import {
  cqNoPaperCertificationApi,
  cqNoPaperUpdateContratApi,
  cqNoPaperupdateWorkStateApi,
  cqNoPaperqueryWorkListApi,
  cqNoPaperMaintenanceRecordApi
} from '@/api/module/syscontroller'

export default defineComponent({
  setup() {
    const login = reactive({
      db_id: '',
      username: '',
      key: '',
      appcode: '',
      secret: '',
      lginurl: ''
    })
    const contrat = reactive({
      db_id: '',
      cqToken: ''
    })
    const searchPerson = reactive({
      changState: '',
      workEndDate: '',
      cqToken: ''
    })
    const listperson = ref([])
    const stepStatus = ref(0)
    const maintCompanys: any = ref([])
    const contracts: any = ref([])
    const loginApi = () => {
      cqNoPaperCertificationApi(login).then(x => {
        if (x.data.success) {
          contracts.value = x.data.data.elevator_contractList
          contrat.cqToken = x.data.data.cqtoken
          searchPerson.cqToken = x.data.data.cqtoken
          nextSetp()
        } else {
          ElMessage.error('失败')
        }
      })
    }

    const getcontratApi = () => {
      cqNoPaperUpdateContratApi(contrat).then(x => {
        if (x.data.success) {
          nextSetp()
        } else {
          ElMessage.error('失败')
        }
      })
    }

    const getUpdatecontratApi = () => {
      cqNoPaperupdateWorkStateApi(contrat).then(x => {
        if (x.data.success) {
          nextSetp()
        } else {
          ElMessage.error('失败')
        }
      })
    }

    const getContratPersonApi = () => {
      listperson.value = []
      cqNoPaperqueryWorkListApi(searchPerson).then(x => {
        if (x.data.success) {
          listperson.value = x.data.data
        } else {
          ElMessage.error('失败')
        }
      })
    }

    const updateloadContratApi = () => {
      listperson.value = []
      cqNoPaperMaintenanceRecordApi(contrat).then(x => {
        if (x.data.success) {
          nextSetp()
          ElMessage.success('上传成功')
        } else {
          ElMessage.error('失败')
        }
      })
    }

    const nextSetp = () => {
      stepStatus.value++
    }
    const changemaincompany = arg => {
      console.log(arg)
      if (arg) {
        let temp = maintCompanys.value.find(x => x.value == arg)
        login.username = temp.label
      } else {
        login.username = ''
      }
    }
    onMounted(() => {
      selectByAllApi({ tableName: 'Elevator_MaintCompany' }).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          maintCompanys.value.push({
            value: key,
            label: v
          })
        })
      })
    })
    return {
      stepStatus,
      login,
      maintCompanys,
      changemaincompany,
      loginApi,
      getcontratApi,
      getUpdatecontratApi,
      getContratPersonApi,
      updateloadContratApi,
      listperson,
      contrat,
      nextSetp,
      searchPerson,
      contracts
    }
  }
})
</script>

<style lang="scss" scoped>
.no-paper-cq {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  flex-wrap: wrap;
  .step-head {
    width: calc(100% - 40px);
  }
  .step-body {
    padding: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
    height: calc(100% - 90px);
    .body {
      display: flex;
      flex-wrap: wrap;
      > div {
        display: flex;
        width: 500px;
        margin-top: 20px;
        margin-right: 10px;
        align-items: center;
        > label {
          width: 100px;
          margin-right: 10px;
        }
        > div {
          width: 300px;
        }
      }
    }
    .footer {
      width: 100%;
      margin-top: 30px;
      display: flex;
      justify-content: center;
    }
    .footer-table {
      margin-top: 20px;
      height: calc(100% - 200px);
    }
  }
}
</style>
