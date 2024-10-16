<template>
  <div class="dialog-mian">
    <div class="dialog-head">
      <label>新增</label>
      <i class="iconfont icon-huaban7" @click="closeDialog"></i>
    </div>
    <div class="dialog-body">
      <div>
        <label class="required-before">用户姓名</label><el-input clearable />
      </div>
      <div>
        <label class="required-before">用户手机</label><el-input clearable />
      </div>
      <div>
        <label class="required-before">用户岗位</label><el-input clearable />
      </div>
    </div>
    <div class="dialog-footer">
      <el-button plain @click="closeDialog">取消</el-button>
      <el-button type="primary">确认</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['close'],
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('close')
    }

    return {
      closeDialog
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-mian {
  padding: 10px;
  .dialog-head {
    display: flex;
    align-items: center;
    height: 30px;
    justify-content: space-between;
    padding-bottom: 20px;
    > i {
      font-size: 14px;
    }
  }
  .dialog-body {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    width: 100%;
    > div {
      display: flex;
      height: 40px;
      align-items: center;
      width: 100%;
      margin-bottom: 10px;
      > label {
        width: 100px;
      }
    }
  }
  .dialog-footer {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
