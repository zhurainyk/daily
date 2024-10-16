<template>
  <div class="task-edit-scheduing dialog-mian max-dialog">
    <div class="dialog-head">
      <div>
        <label>{{ $t('business.scheduling') }}</label>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="dialog-body">
      <el-form ref="ruleFormRef" :model="task">
        <div>
          <div>
            <label class="required-before">{{
              $t('business.projectName')
            }}</label>
            <el-form-item :rules="[]" :error="errMode['db_projectId']?.error">
              <el-select
                v-model="task.db_projectId"
                :placeholder="$t('business.projectName')"
                clearable
                filterable
                :popper-class="`auto-db_projectId-dialog-popper`"
                @change="changeProject"
              >
                <el-option
                  v-for="item in projects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <label class="required-before">{{ $t('business.executor') }}</label>
            <el-form-item
              :rules="[]"
              :error="errMode['db_followUserId']?.error"
            >
              <el-select
                v-model="task.db_followUserId"
                :placeholder="$t('business.executor')"
                clearable
                filterable
                :popper-class="`auto-db_followUserId-dialog-popper`"
                @change="getForecastTask"
              >
                <el-option
                  v-for="item in followUsers"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <label class="required-before">{{
              $t('business.internalNumber')
            }}</label>
            <el-form-item :rules="[]" :error="errMode['db_elevId']?.error">
              <el-select
                v-model="task.db_elevId"
                :placeholder="$t('business.internalNumber')"
                clearable
                filterable
                :popper-class="`auto-db_elevId-dialog-popper`"
                @change="changeElevtor"
              >
                <el-option
                  v-for="item in elevs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <label class="required-before">{{
              $t('business.lastAnnualMaintenanceTime')
            }}</label>
            <el-form-item
              :rules="[]"
              :error="errMode['db_upkeepInitTime']?.error"
            >
              <el-date-picker
                v-model="task.db_upkeepInitTime"
                type="date"
                value-format="YYYY-MM-DD"
                @change="getForecastTask"
              />
            </el-form-item>
          </div>

          <div>
            <label class="required-before">{{
              `${$t('business.scheduleDays')}(${$t('common.day')})`
            }}</label>
            <el-form-item
              :rules="[]"
              :error="errMode['db_maintInterval']?.error"
            >
              <el-select
                v-model="task.db_maintInterval"
                :placeholder="`${$t('business.scheduleDays')}(${$t(
                  'common.day'
                )})`"
                filterable
                :popper-class="`auto-db_elevId-dialog-popper`"
                @change="getForecastTask"
              >
                <el-option
                  v-for="item in days"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>

          <div>
            <label>{{ $t('business.maintenanceMode') }}</label>
            <div class="maintModel">
              <span>{{ task.ui_maintModel }}</span>
            </div>
          </div>
          <div class="result-list">
            <el-table
              ref="multipleTableRef"
              :data="resultTask"
              style="width: 100%"
              height="100%"
              row-key="times"
            >
              <el-table-column
                property="name"
                :label="$t('business.projectName')"
              />
              <el-table-column property="times" :label="$t('common.time')" />
              <el-table-column :label="$t('common.action')">
                <template #default="scope">
                  <span class="delete auto-delete" @click="deleteFn(scope)">{{
                    $t('common.delete')
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button plain class="cancel-btn" @click="closeDialog">{{
        $t('common.cancel')
      }}</el-button>
      <el-button type="primary" @click="submitForm">{{
        $t('common.confirm')
      }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref, watch } from 'vue'
import moment from 'moment'
import ElForm from 'element-plus/lib/components/form'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import useValidateRespone from '@/utils/hooks/formValidate'
import { getProjectMapLoginApi } from '@/api/module/login'
import { getwebEnginUserByProjectIdApi } from '@/api/module/projectManage'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import {
  getMaintenanceTimeApi,
  createTaskByTimeApi
} from '@/api/module/taskInfo'

export default defineComponent({
  components: {},
  emits: ['close-task'],
  setup(props, { emit }) {
    const task = reactive({
      db_projectId: '',
      db_followUserId: '',
      db_elevId: '',
      db_upkeepInitTime: '',
      db_maintModelCode: '',
      ui_maintModel: '',
      db_maintInterval: ''
    })
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const { errMode, showError, resetError, initErrorModel } =
      useValidateRespone(ruleFormRef?.value as any, task)
    const projects: any = ref([])
    const followUsers: any = ref([])
    const elevs: any = ref([])
    const resultTask: any = ref([])
    const days: any = ref([])
    const closeDialog = () => {
      emit('close-task')
    }
    const submitForm = async () => {
      resetError()
      await ruleFormRef.value?.validate((valid, fields) => {
        if (valid) {
          createTaskByTimeApi({ ...task, db_cycle: resultTask.value }).then(
            x => {
              if (x.data.success) {
                if (showError(x.data.data)) {
                  closeDialog()
                }
              }
            }
          )
        }
      })
    }
    const changeProject = args => {
      task.db_elevId = ''
      task.db_followUserId = ''
      followUsers.value = []
      elevs.value = []
      task.db_maintModelCode = ''
      task.ui_maintModel = ''
      task.db_upkeepInitTime = ''
      task.db_maintInterval = ''
      resultTask.value = []
      if (args) {
        const elevator = new Elevator_Elevator()
        elevator.db_projectId = args
        selectElevatorByConditionApi({
          ...elevator,
          ui_type: 'A0',
          ui_pageSize: 0,
          ui_currentPage: 0
        }).then(x => {
          const { objectList, condition } = x.data.data
          objectList.forEach(y => {
            elevs.value.push({
              value: y.db_id,
              label: y.db_id_projectNum,
              db_maintModelCode: y.db_maintModelCode,
              ...y
            })
          })
        })
      }
      getwebEnginUserByProjectIdApi({ db_id: args }).then(x => {
        if (x.data.success) {
          x.data.data.forEach(y => {
            followUsers.value.push({
              value: y.db_id,
              label: y.db_id_username
            })
          })
        }
      })
    }

    const changeElevtor = arg => {
      task.db_maintModelCode = ''
      task.ui_maintModel = ''
      task.db_upkeepInitTime = ''
      task.db_maintInterval = ''
      days.value = []
      if (arg) {
        let temElevtor = elevs.value.find(x => x.db_id == arg)
        task.db_maintModelCode = temElevtor.db_maintModelCode
        task.ui_maintModel = temElevtor.ui_maintModel
        if (temElevtor.db_maintModelCode == '01') {
          task.db_maintInterval = '28'
          for (let index = 10; index <= 31; index++) {
            days.value.push({
              value: `${index}`,
              label: index
            })
          }
        } else {
          task.db_maintInterval = '14'
          for (let index = 10; index <= 15; index++) {
            days.value.push({
              value: `${index}`,
              label: index
            })
          }
        }
        task.db_upkeepInitTime = temElevtor.db_upkeepInitTime
          ? moment(temElevtor.db_upkeepInitTime).format('YYYY-MM-DD')
          : ''
        getForecastTask()
        console.log(task.db_upkeepInitTime)
      }
    }

    const getForecastTask = () => {
      resultTask.value = []
      resetError()
      if (!task.db_elevId || !task.db_upkeepInitTime || !task.db_maintInterval)
        return
      getMaintenanceTimeApi(task).then(x => {
        if (x.data.success) {
          if (Array.isArray(x.data.data)) {
            resultTask.value = x.data.data
          } else {
            if (x.data.data) {
              showError(x.data.data)
            }
          }
        }
      })
    }

    const deleteFn = arg => {
      resultTask.value.splice(arg.$index, 1)
    }

    onMounted(() => {
      getProjectMapLoginApi({}).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          projects.value.push({
            value: key,
            label: v
          })
        })
      })
    })

    return {
      closeDialog,
      task,
      errMode,
      submitForm,
      projects,
      changeProject,
      elevs,
      followUsers,
      changeElevtor,
      resultTask,
      deleteFn,
      getForecastTask,
      ruleFormRef,
      days
    }
  }
})
</script>

<style lang="scss" scoped>
.task-edit-scheduing {
  background-color: white;
  height: 650px;
  width: 100%;
  padding: 20px 0;
  min-height: 650px;
  .result-list {
    width: calc(100% - 100px) !important;
    height: 350px;
  }
  .maintModel {
    height: 40px;
  }
  .delete {
    color: $p-color-error;
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>
