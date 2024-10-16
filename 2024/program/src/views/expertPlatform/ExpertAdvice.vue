<template>
  <div class="new-advices">
    <div class="left">
      <div class="projects">
        <el-select
          v-model="project.project"
          clearable
          @change="changeProjectEdit"
          filterable
          placeholder="请选择项目"
        >
          <el-option
            v-for="x in projectlist"
            :key="x.value"
            :value="x.value"
            :label="x.label"
          ></el-option>
        </el-select>
      </div>
      <div class="elevators">
        <!-- <div class="select-item"><label>ss</label></div> -->
        <div
          v-for="x in elevatorlist"
          :key="x.value"
          :class="{ 'select-item': project.elevator == x.value }"
          @click="clikcElevatorFn(x.value)"
        >
          <label>{{ x.label }}</label>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="elevator-issue">
        <div class="head"><label>电梯问题清单</label></div>
        <div class="list">
          <ul>
            <li v-for="x in issueLists" :key="x.db_id">
              <div>
                <label>{{ x.db_content }}</label>
                <div class="time-icon">
                  <span>{{ x.ui_dataDate }}</span>
                  <span
                    v-if="x.db_classifyCode == 'A'"
                    class="icon delete-icon"
                    @click="deleteFn(x.db_id)"
                  ></span>
                  <span v-else class="icon"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="add-content">
        <div class="head"><label>描述内容</label></div>
        <div class="content">
          <div class="message">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 10 }"
              v-model="contentIssue"
            ></el-input>
          </div>
          <div class="add-btn">
            <el-button type="primary" @click="addIssue">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Elevator_Elevator } from '@/module.ts/Elevator_Elevator'
import { Elevator_IssueList } from '@/module.ts/Elevator_IssueList'
import { selectByConditionApi as selectElevatorByConditionApi } from '@/api/module/elevator'
import { getProjectMapLoginApi, getUserMapLoginApi } from '@/api/module/login'
import {
  selectByConditionApi,
  deleteByIdApi,
  saveApi
} from '@/api/module/issueList'

export default defineComponent({
  setup() {
    const elevatorlist: any = ref([])
    const contentIssue = ref('')
    const project = reactive({
      project: '',
      elevator: ''
    })
    const projectlist: any = ref([])
    const issueLists: any = ref([])
    const changeProjectEdit = args => {
      const elevator = new Elevator_Elevator()

      elevator.db_projectId = args
      elevatorlist.value = []
      project.elevator = ''
      issueLists.value = []
      if (!args) return
      selectElevatorByConditionApi({
        ...elevator,
        ui_type: 'A0',
        ui_pageSize: 0,
        ui_currentPage: 0
      }).then(x => {
        const { objectList, condition } = x.data.data
        objectList.forEach(y => {
          elevatorlist.value.push({
            value: y.db_id,
            label: y.db_id_projectNum,
            db_maintModelCode: y.db_maintModelCode,
            ...y
          })
        })
        if (objectList && objectList.length > 0) {
          project.elevator = objectList[0].db_id
          clikcElevatorFn(objectList[0].db_id)
        }
      })
    }
    const deleteFn = (args: any) => {
      ElMessageBox.confirm('是否删除', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(() => {
          deleteByIdApi({ id: args }).then(x => {
            if (x.data.success) {
              clikcElevatorFn(project.elevator)
            }
          })
        })
        .catch(() => {})
    }
    const clikcElevatorFn = id => {
      const issueList = new Elevator_IssueList()
      issueList.db_elevId = id
      issueLists.value = []
      project.elevator = id
      if (id) {
        selectByConditionApi({
          ...issueList,
          ui_type: 'A0',
          ui_pageSize: 0,
          ui_currentPage: 0
        }).then(x => {
          const { objectList } = x.data.data
          issueLists.value = objectList
        })
      }
    }
    const addIssue = () => {
      const tempIssue = new Elevator_IssueList()
      const tmepEle = elevatorlist.value.find(x => x.db_id == project.elevator)
      if (tmepEle) {
        tempIssue.db_classifyCode = 'A'
        tempIssue.db_detailTypeCode = 'A0001'
        tempIssue.db_weightCode = '03'
        tempIssue.db_dealLabelCode = '00'
        tempIssue.db_dayLabel = '0'
        tempIssue.db_projectId = tmepEle.db_projectId
        tempIssue.db_elevId = tmepEle.db_id
        tempIssue.db_projectNum = tmepEle.db_projectNum
        tempIssue.db_registCode = tmepEle.db_registCode
        tempIssue.db_content = contentIssue.value
        saveApi(tempIssue).then(x => {
          if (x.data.success) {
            clikcElevatorFn(project.elevator)
          } else {
            ElMessage.error('失败')
          }
        })
      }
    }
    onMounted(() => {
      getProjectMapLoginApi({}).then(x => {
        Object.entries<string>(x.data.data).forEach(([key, v]) => {
          projectlist.value.push({
            value: key,
            label: v
          })
        })
      })
    })
    return {
      changeProjectEdit,
      projectlist,
      project,
      elevatorlist,
      clikcElevatorFn,
      issueLists,
      deleteFn,
      addIssue,
      contentIssue
    }
  }
})
</script>

<style lang="scss" scoped>
.new-advices {
  display: flex;
  height: calc(100% - 24px);
  width: calc(100% - 50px);
  margin: 12px 25px;
  .left {
    width: 420px;
    margin-right: 20px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    .projects {
      width: 380px;
      height: 60px;
      background: #ffffff;
      box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
      border-radius: 10px;
      :deep().el-select {
        width: 100%;
        height: 100%;
        input {
          height: 60px;
        }
      }
    }
    .elevators {
      height: calc(100% - 100px);
      overflow: auto;
      margin-top: 18px;
      > div {
        width: 380px;
        height: 60px;
        background: #ffffff;
        border-radius: 10px;
        margin-bottom: 18px;
        line-height: 60px;
        cursor: pointer;
        > label {
          margin-left: 26px;
        }
        &.select-item {
          background: linear-gradient(-30deg, #6158ff, #6427de);
          box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
          > label {
            color: white;
          }
        }
      }
    }
  }

  .right {
    height: 100%;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    > div {
      width: 100%;
      border-radius: 10px;
    }
    .elevator-issue {
      padding-left: 50px;
      background-color: white;
      height: 50%;
      margin-bottom: 20px;

      .head {
        margin: 30px 0;

        > label {
          font-weight: bold;
        }
      }
      .list {
        padding-bottom: 10px;
        height: calc(100% - 100px);
        overflow: auto;
        ul {
          list-style: decimal-leading-zero;
          margin-left: 23px;
          > li {
            margin-bottom: 25px;
            > div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 10px;
              .time-icon {
                display: flex;
                align-items: center;
              }
              .icon {
                width: 24px;
                height: 24px;
                display: inline-block;
                margin-left: 11px;
                &.delete-icon {
                  background-image: url(../../public/images/common/delete.png);
                  display: inline-block;
                  width: 24px;
                  height: 24px;
                  background-repeat: no-repeat;
                  background-size: cover;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }

    .add-content {
      background-color: white;
      padding-left: 50px;
      padding-right: 40px;
      height: calc(50% - 20px);
      .head {
        margin: 40px 0 20px 0;

        > label {
          font-weight: bold;
        }
      }
      .content {
        height: calc(100% - 80px);
        .message {
          height: calc(100% - 80px);
        }
        .add-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
        }
      }
    }
  }
}
</style>
