<template>
  <el-dialog v-if="dialog.dialogVisiable" v-model="dialog.dialogVisiable" class="min-dialog" :show-close="false"
    :close-on-click-modal="false">
    <div class="dialog-mian">
      <div id="qrcode-eletor">
        <div class="dialog-head">
          <div>
            <label>
              <slot>电梯详细二维码</slot>
            </label>
          </div>
          <span class="cancel-img" @click="closeDialog"></span>
        </div>
        <div class="dialog-body">
          <div>
            <img :src="getqrurl" />
          </div>
        </div>
      </div>

      <div class="dialog-footer">
        <el-button v-print="'#qrcode-eletor'" plain @click="printqr">打印</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch, nextTick } from 'vue'
import QRCode from 'qrcode'
import print from 'vue3-print-nb'

export default defineComponent({
  directives: {
    print
  },
  props: {
    qrurl: {
      type: String,
      required: true
    },
    dialogVisiable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('close')
    }
    const printqr = () => {
      // emit('close')
    }
    const dialog = reactive({
      dialogVisiable: false
    })
    const getqrurl = ref('')
    watch(
      () => props.dialogVisiable,
      new_data => {
        dialog.dialogVisiable = new_data
        if (dialog.dialogVisiable) {
          nextTick(() => {
            let opts = {
              errorCorrectionLevel: 'H',
              type: 'image/jpeg',
              quality: 0.3,
              margin: 1,
              color: {
                dark: '#010599FF',
                light: '#FFBF60FF'
              }
            }
            QRCode.toDataURL(props.qrurl, opts).then(url => {
              getqrurl.value = url
            })
          })
        }
      },
      { immediate: true }
    )
    onMounted(async () => { })
    return {
      closeDialog,
      dialog,
      printqr,
      getqrurl
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

canvas {
  height: 200px;
  width: 200px;
  background-color: rosybrown;
}
</style>
