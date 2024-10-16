<template>
  <div class="reload-memory">
    <div>
      <div>
        <div><el-button plain @click="reloadproject">重载项目</el-button></div>
        <div>
          在系统上新增或者修改项目信息后可以点击该按钮实时更新所有平台上的项目信息
        </div>
      </div>

      <div>
        <div><el-button plain @click="reloadElevator">重载电梯</el-button></div>
        <div>
          在系统上新增或者修改电梯信息后可以点击该按钮实时更新所有平台上的电梯信息
        </div>
      </div>

      <div>
        <div><el-button plain @click="reloadBrand">重载品牌</el-button></div>
        <div>
          在系统上新增或者修改电梯品牌信息后可以点击该按钮实时更新所有平台上的电梯品牌信息
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import {
  reloadProjectApi,
  reloadElevatorApi,
  reloadBrandApi
} from '@/api/module/reloadMemory'

export default defineComponent({
  setup() {
    const reloadproject = () => {
      reloadProjectApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }

    const reloadElevator = () => {
      reloadElevatorApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }

    const reloadBrand = () => {
      reloadBrandApi({}).then((x: any) => {
        if (x.data.success) {
          ElMessage.success(x.data.message || '成功')
        } else {
          ElMessage.error(x.data.message || '失败')
        }
      })
    }

    return {
      reloadproject,
      reloadElevator,
      reloadBrand
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
