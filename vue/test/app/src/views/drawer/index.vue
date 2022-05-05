<template>
  <div>
    <cspdrwaer>
      <h1>{{ text }}</h1>
      <el-button @click="showToast">测试弹窗</el-button>
    </cspdrwaer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "xxxxx"
    };
  },
  methods: {
    showToast(){
      console.log('xxx')
      this.$toastShow()
    }
  }
};
</script>

<style  >
</style>