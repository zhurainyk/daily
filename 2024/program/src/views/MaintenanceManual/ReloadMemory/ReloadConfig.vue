<template>
  <div class="reload-memory">
    <div>
      <div>
        <div>
          <el-button plain @click="reloadXundaProject"
            >重载xunda_project</el-button
          >
        </div>
        <div>重载与迅达同步数据的项目id配置</div>
      </div>

      <div>
        <div>
          <el-button plain @click="reloadXundaDevice"
            >重载xunda_device</el-button
          >
        </div>
        <div>重载与迅达同步数据的电梯对应设备编号</div>
      </div>

      <div>
        <div>
          <el-button plain @click="reloadTable">重载tableds</el-button>
        </div>
        <div>重载实体对应的数据源信息(必须redis更新后重载才有效)</div>
      </div>

      <div>
        <div>
          <el-button plain @click="reloadCallbackUrl">重载回调地址</el-button>
        </div>
        <div>重载迅达和中科知行宏图回调地址(必须redis更新后重载才有效)</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import {
  reloadXundaProjectApi,
  reloadXundaDeviceApi,
  reloadCqzkDeviceApi,
  reloadCallbackUrlApi,
  reloadTableApi,
  reloadTable1Api,
  reloadTable2Api,
  reloadTable3Api
} from '@/api/module/reloadMemory'

export default defineComponent({
  setup() {
    const reloadXundaProject = () => {
      reloadXundaProjectApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }

    const reloadXundaDevice = () => {
      reloadXundaDeviceApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
      reloadCqzkDevice()
    }

    const reloadCqzkDevice = () => {
      reloadCqzkDeviceApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }

    const reloadCallbackUrl = () => {
      reloadCallbackUrlApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }

    const reloadTable = () => {
      reloadTableApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '重载表库关系（实体-数据源）成功')
        } else {
          ElMessage.error(x.data.message || '重载表库关系（实体-数据源）失败')
        }
      })

      reloadTable1Api({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '重载表库关系成功')
        } else {
          ElMessage.error(x.data.message || '重载表库关系失败')
        }
      })
      reloadTable2Api({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '重载表库关系成功')
        } else {
          ElMessage.error(x.data.message || '重载表库关系失败')
        }
      })
      reloadTable3Api({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '重载表库关系成功')
        } else {
          ElMessage.error(x.data.message || '重载表库关系失败')
        }
      })
    }
    return {
      reloadXundaProject,
      reloadXundaDevice,
      reloadCqzkDevice,
      reloadCallbackUrl,
      reloadTable
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
