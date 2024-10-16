<template>
  <div class="sys-bi">
    <el-button v-for="x in list" :key="x.name" @click="onDclick(x)">{{
      x.name
    }}</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { lotsDataSendApi, closeThreaddApi } from '@/api/module/syscontroller'

export default defineComponent({
  setup() {
    const list = reactive([
      {
        api: lotsDataSendApi,
        name: '开始'
      },
      {
        api: closeThreaddApi,
        name: '结束'
      }
    ])
    const onDclick = args => {
      args.api().then(x => {
        ElMessage.success(x.data.message)
      })
    }

    return {
      onDclick,
      list
    }
  }
})
</script>

<style lang="scss" scoped>
.sys-bi {
  background: white;
}
</style>
