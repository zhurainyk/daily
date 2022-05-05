<template>
  <div class="csp-drawer-section">
    <div class="el-drawer-public">
      <el-drawer
        custom-class="costom-drawer"
        :wrapperClosable="false"
        :visible.sync="drawer"
        :modal="false"
        :direction="direction"
        :with-header="false"
      >
        <slot></slot>
        <div v-show='showCloseDrawer' class="costom-drawer-close" @click="changeState">
          <el-button type="text"><i :class="icon"></i></el-button>
        </div>
      </el-drawer>
      <div v-show='!drawer' class="costom-drawer-open" @click="changeState">
        <el-button type="text"><i :class="icon"></i></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      direction: "ltr",
      icon: "el-icon-arrow-right",
      showCloseDrawer:true
    };
  },
  watch: {
    drawer(v) {
      if (v) {
        this.icon = "el-icon-arrow-left";
        this.setStyle()
      } else {
        this.icon = "el-icon-arrow-right";
      }
    }
  },
  computed: {},
  activated(){
      this.setStyle()
  },
  methods: {
    setStyle() {
      this.$nextTick(()=>{
              const dom = document.querySelectorAll(".el-drawer__wrapper");
      dom[0].style.cssText = `    position: fixed;
                                        top: 200px;
                                        width:500px;
                                        bottom: 50px;
                                        left: 200px;
                                        overflow: initial;
                                        margin: 0;`;
      })
    },
    changeState() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style  scoped>
.csp-drawer-section {
  width: calc(100% - 200px);
  height: calc(100vh - 200px);
  background-color: #fff;
  /* border: 1px solid red; */
  margin-left: 200px;
  margin-top: 200px;
  position: relative;
}
.csp-drawer-section .el-drawer-public .costom-drawer-open {
  position: absolute;
  width: 12px;
  height: 80px;
  top: 50%;
  left: 0;
  margin-top: -40px;
  border-radius: 0 8px 8px 0;
  background-color: #f5fafd;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.csp-drawer-section .el-drawer-public /deep/ .costom-drawer {
  /* background: pink; */
  width: 500px !important;
  position: relative;
}
.csp-drawer-section .el-drawer-public /deep/ .el-drawer__wrapper {
  overflow: initial;
}
.csp-drawer-section .el-drawer-public /deep/ .costom-drawer-close {
  position: absolute;
  width: 12px;
  height: 80px;
  top: 50%;
  right: -12px;
  margin-top: -40px;
  border-radius: 0 8px 8px 0;
  background-color: #f5fafd;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.csp-drawer-section .el-drawer-public /deep/ .el-drawer {
  overflow: initial;
}
</style>