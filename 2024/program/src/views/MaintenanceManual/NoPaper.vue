<template>
  <div class="no-paper">
    <div>
      <div>
        <label>项目:</label>
        <el-select v-model="data.projectid" placeholder="" clearable filterable>
          <el-option
            v-for="item in projects"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div>
        <label>时间:</label>
        <el-date-picker
          v-model="data.time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </div>
      <div>
        <el-button type="primary" @click="updatashenzhenClick">上传</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'

import { defineComponent, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { shenzhengNoPaperApi } from '@/api/module/syscontroller'
import { selectByConditionApi as selectByConditionForelevatorApi } from '@/api/module/projectManage'

export default defineComponent({
  setup() {
    const data = reactive({
      time: '',
      projectid: ''
    })
    const projects: any = ref([])
    const updatashenzhenClick = () => {
      if (!data.time) {
        ElMessage.warning('时间不能为空')
        return
      }
      if (data.projectid) {
        shenzhengNoPaperApi(data).then(x => {
          if (x.data.success) {
            ElMessage.success(x.data.message)
          } else {
            ElMessage.error(x.data.message || '失败')
          }
        })
      } else {
        ElMessageBox.confirm('是否报送当前所选时间下所有项目的数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          shenzhengNoPaperApi(data).then(x => {
            if (x.data.success) {
              ElMessage.success(x.data.message)
            } else {
              ElMessage.error(x.data.message || '失败')
            }
          })
        })
      }
    }
    onMounted(() => {
      selectByConditionForelevatorApi({
        ui_type: 'A0',
        ui_pageSize: 0,
        ui_currentPage: 0
      }).then(x => {
        const { objectList, condition } = x.data.data
        objectList.forEach((y: IElevator_Project) => {
          if (y.db_platformTypeCode == '02') {
            projects.value.push({
              value: y.db_id,
              label: y.db_id_proName
            })
          }
        })
      })
    })
    return { updatashenzhenClick, data, projects }
  }
})
</script>

<style lang="scss" scoped>
.no-paper {
  display: flex;
  padding: 10px;
  > div {
    display: flex;
    > div {
      margin-left: 20px;
      label {
        margin-right: 10px;
      }
    }
  }
}
</style>
