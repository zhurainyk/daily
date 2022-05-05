<template>
  <el-dialog
    title="提示"
    :visible.sync="cspToastVisible"
    v-if="cspToastVisible"
    width="30%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :modal="false"
    :fullscreen="false"
    class="csptoast"
  >
    <div class="csptoast-tip">
      <div class="csptoast-bg"></div>
      <span>数据库服务异常</span>
    </div>

    <el-collapse
      class="csptoast-more"
      v-model="activeNames"
      @change="handleChange"
    >
      <el-collapse-item title="更多信息" name="1">
        <span class="collapse-title" slot="title">
          更多信息
        </span>
        <div class="collapse-content">
          <div v-for="item in 2" :key="item" class="collapse-content-item">
            <div class="item-time">2021-12-15 12:20:22</div>
            <div class="item-infor">
              在界面中一致
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      cspToastVisible: false,
      activeNames: []
    };
  },

  methods: {
    handleClose() {
      this.cspToastVisible = false;
    },
    handleChange(v) {
      if (v.length) {
      } else {
      }
    }
  }
};
</script>

<style  scoped>
/* $bgcolor:#f7f9fc; */
/deep/ .csptoast {
  z-index: 999;
}
.el-collapse {
  border: none;
}
.collapse-title {
  flex: 1 0 90%;
  order: 1;
  margin-left: -20px;
}
/deep/ .el-icon-arrow-right:before {
  content: "" !important;
}
/deep/ .el-collapse-item__arrow.is-active {
  transform: rotate(-180deg);
}
/deep/ .el-collapse-item__arrow {
  transition: transform 0.1s;
  padding: 0 20px;
  color: #606266 !important;
}
.collapse-content-item {
  display: flex;
  flex-wrap: nowrap;
}
.collapse-content-item .item-time {
  width: 145px;
  line-height: 24px;
  padding-left:40px;
  padding-right:10px;
  font-size: 14px;
  color:#4e5969;
}
.collapse-content-item .item-infor {
  width: 198px;
  line-height: 24px;
  font-size: 14px;
  white-space: wrap;
    color:#4e5969;
}

.el-collapse-item__header {
  flex: 1 0 auto;
  order: -1;
}

/deep/ .el-dialog {
  width: 440px !important;
}
/deep/ .el-dialog__title {
  color: #303133;
  font-weight: 700;
  font-size: 16px;
}
/deep/ .el-dialog__close.el-icon-close {
  color: #303133;
}

.csptoast-tip {
  display: flex;
  margin: 0 auto;
  width: 230px;
  align-items: center;
  padding-bottom: 50px;
}
/deep/ .el-dialog__body {
  padding: 0 !important;
}
/deep/.el-collapse-item__header {
  height: 37px;
  line-height: 37px;
  font-size: 14px;
  color: #4e5969;
  font-weight: 400;
  background-color: #f7f9fc;
}
/deep/ .el-collapse-item__wrap {
  background-color: #f7f9fc;
  max-height: 287px;
  overflow-y: auto;
}
.csptoast-tip .csptoast-bg {
  width: 78px;
  height: 80px;
  background-color: pink;
}
.csptoast-tip span {
  color: #606266;
  font-size: 16px;
  font-weight: 400;
  padding-left: 35px;
}
</style>