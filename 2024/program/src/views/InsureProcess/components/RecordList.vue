<template>
  <div class="dialog-mian min-dialog max-dialog-height">
    <div class="dialog-head">
      <div>
        <label>作业流程</label>
      </div>
      <span class="cancel-img" @click="closeDialogFn"></span>
    </div>
    <div class="dialog-body">
      <div class="record-list-dialog">
        <el-timeline>
          <el-timeline-item
            v-for="x in recordlist"
            :key="x.nowTime"
            center
            :timestamp="x.nowTime"
            placement="top"
            type="success "
          >
            <el-card>
              <h4>{{ x.describe }}</h4>
              <h5 v-if="x.comments">:{{ x.comments }}</h5>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div>
      <div class="dialog-footer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    baseinfo: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['close-dialog'],
  setup(props, { emit }) {
    const closeDialogFn = () => {
      emit('close-dialog')
    }
    const recordlist = computed(() => {
      if (props.baseinfo.db_flowRecords) {
        return JSON.parse(props.baseinfo.db_flowRecords)
      }
      return []
    })
    return {
      closeDialogFn,
      recordlist
    }
  }
})
</script>

<style lang="scss" scoped>
.record-list-dialog {
  padding: 10px 20px;
  height: 700px;
  overflow: auto;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px;
}
</style>
