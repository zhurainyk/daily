<template>
  <div v-loading="loading" class="dialog-mian max-dialog">
    <div class="dialog-head">
      <div>
        <label>个人信息</label>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="dialog-body">
      <el-form>
        <div>
          <div>
            <label>用户名:</label>
            <div>{{ information.db_id_username }}</div>
          </div>
          <div>
            <label>部门:</label>
            <div>{{ information.ui_depName }}</div>
          </div>

          <div>
            <label>职位类型:</label>
            <div>{{ information.ui_posiTypeName }}</div>
          </div>
          <div>
            <label>上级:</label>
            <div>{{ information.ui_superiorName }}</div>
          </div>

          <div>
            <label>职位:</label>
            <div>{{ information.ui_posiName }}</div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="dialog-footer">
      <!-- <el-button plain @click="closeDialog">取消</el-button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getLoginUserInfoApi } from '@/api/module/login'

export default defineComponent({
  emits: ['close'],
  setup(props, { emit }) {
    const information = ref({})
    const closeDialog = () => {
      emit('close')
    }
    const loading = ref(false)
    const store = useStore()

    onMounted(() => {
      loading.value = true
      getLoginUserInfoApi({}).then(x => {
        if (x.data.success) {
          information.value = x.data.data
        }
        loading.value = false
      })
    })
    return {
      information,
      closeDialog
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-mian {
  height: 650px;
  .dialog-body {
    display: flex;
    .el-form {
      > div {
        > div {
          margin-top: 30px;
          flex-wrap: nowrap;
          align-items: center;
          > label {
            text-align: right;
            margin: 0 10px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
