<template>
  <div class="reload-memory">
    <div>
      <div>
        <div>
          <el-button plain @click="reloadRunningDataConst"
            >重载运行数据相关常量</el-button
          >
        </div>
        <div>
          电梯关联规则,供应商代码,接入技术,接入版本号,电梯运行方向,电梯是否有人,轿厢状态,开锁区域,开关门状态,状态来源等
        </div>
      </div>

      <div>
        <div>
          <el-button plain @click="reloadIotEventCode"
            >重载网关事件码</el-button
          >
        </div>
        <div>
          新增或修改网关事件码后点击重载到内存(必须redis更新后重载才有效)
        </div>
      </div>

      <div>
        <div>
          <el-button plain @click="reloadControlEventCode"
            >重载控制系统事件码</el-button
          >
        </div>
        <div>
          新增或修改控制系统事件码后点击重载到内存(必须redis更新后重载才有效)
        </div>
      </div>

      <div>
        <div>
          <el-button plain @click="reloadManualEventCode"
            >重载人工触发事件码</el-button
          >
        </div>
        <div>
          新增或修改人工触发事件码后点击重载到内存(必须redis更新后重载才有效)
        </div>
      </div>

      <div>
        <div>
          <el-button plain @click="reloadRunMonitorPlan"
            >重载运行监测方案</el-button
          >
        </div>
        <div>
          新增或修改运行监测方案后点击重载到内存(必须redis更新后重载才有效)
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import {
  reloadRunningDataConstApi,
  reloadIotEventCodeApi,
  reloadControlEventCodeApi,
  reloadManualEventCodeApi,
  reloadRunMonitorPlanApi
} from '@/api/module/reloadMemory'

export default defineComponent({
  setup() {
    const reloadRunningDataConst = () => {
      reloadRunningDataConstApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }

    const reloadIotEventCode = () => {
      reloadIotEventCodeApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }

    const reloadControlEventCode = () => {
      reloadControlEventCodeApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }

    const reloadManualEventCode = () => {
      reloadManualEventCodeApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }

    const reloadRunMonitorPlan = () => {
      reloadRunMonitorPlanApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }
    return {
      reloadRunningDataConst,
      reloadIotEventCode,
      reloadControlEventCode,
      reloadManualEventCode,
      reloadRunMonitorPlan
    }
  }
})
</script>

<style lang="scss" scoped>
.reload-memory {
  width: 100%;
  height: 100%;
  padding: 0 60px 0 60px;
  > div {
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 300px;
      height: 150px;
      margin-right: 80px;
      margin-top: 80px;
      > div:last-child {
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        margin-top: 10px;
        color: #999999;
        word-break: break-all;
        min-height: 100px;
      }
    }
  }
}
</style>
