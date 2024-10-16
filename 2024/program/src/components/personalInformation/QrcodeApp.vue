<template>
  <div v-loading="loading" class="dialog-mian">
    <div class="dialog-head">
      <div>
        <label>APP 下载</label>
      </div>
      <span class="cancel-img" @click="closeDialog"></span>
    </div>
    <div class="dialog-body">
      <div>
        <canvas id="qrcode"></canvas>
      </div>
    </div>
    <div class="dialog-footer">
      <!-- <el-button plain @click="closeDialog">取消</el-button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import QRCode from 'qrcode'
import { getLastVersionsAppApi } from '@/api/module/versionAndroid'

export default defineComponent({
  emits: ['close'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('close')
    }
    const loading = ref(false)
    onMounted(async () => {
      loading.value = true
      let tempVersion = await getLastVersionsAppApi()
      if (tempVersion.data.success) {
        if (tempVersion.data.data && tempVersion.data.data.length > 0) {
          await QRCode.toCanvas(
            document.getElementById('qrcode'),
            tempVersion.data.data[0].db_appUrl
          )
        }
      }
      loading.value = false
    })
    return {
      closeDialog
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-mian {
  .dialog-body {
    justify-content: center;
  }
}
</style>
