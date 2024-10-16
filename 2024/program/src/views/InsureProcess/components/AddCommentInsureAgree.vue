<template>
  <div class="dialog-mian min-dialog min-dialog-height reply-dialog">
    <div class="dialog-head">
      <div>
        <label>{{ titleName }}</label>
      </div>
      <span class="cancel-img" @click="closeDialogFn"></span>
    </div>
    <div class="dialog-body">
      <div class="commemt">
        <div>
          <label
            v-if="
              insureInfo.db_state == '12' ||
              insureInfo.db_state == '13' ||
              insureInfo.db_state == '14'
            "
            >确认描述</label
          >
          <label v-else>审核描述</label>
          <el-input
            v-model="addComment.db_description"
            :autosize="{ minRows: 10, maxRows: 14 }"
            type="textarea"
          ></el-input>
        </div>
      </div>
    </div>
    <div>
      <div class="dialog-footer">
        <el-button
          v-if="insureInfo.db_state != '13' && insureInfo.db_state != '14'"
          type="primary"
          @click="cancel"
          >{{
            insureInfo.db_state == '13' || insureInfo.db_state == '14'
              ? '取消'
              : '不同意'
          }}</el-button
        >
        <el-button type="primary" @click="save">{{
          insureInfo.db_state == '13' || insureInfo.db_state == '14'
            ? '确定'
            : '同意'
        }}</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: String,
      default: ''
    },
    titleName: {
      type: String,
      default: '审核'
    },
    insureInfo: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['close-dialog', 'save-data', 'cancel-data'],
  setup(props, { emit }) {
    const closeDialogFn = () => {
      emit('close-dialog')
    }
    const addComment = reactive({
      db_description: '',
      status: ''
    })
    const cancel = () => {
      addComment.status = '02'
      emit('cancel-data', addComment)
      closeDialogFn()
    }
    const save = () => {
      addComment.status = '01'
      emit('save-data', addComment)
      closeDialogFn()
    }
    return {
      closeDialogFn,
      addComment,
      save,
      cancel
    }
  }
})
</script>

<style lang="scss" scoped>
.reply-dialog {
  height: 600px;

  .commemt {
    width: 100%;
    padding: 0 50px;
    > div {
      padding: 0 0 20px 0;
      display: flex;
      flex-wrap: wrap;
      label {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
