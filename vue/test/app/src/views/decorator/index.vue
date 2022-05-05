<template>
  <div>
    <button @click="errorHandle">点击</button>
  </div>
</template>
<script>
import "./prototype";
import { before, after, around } from "./decorator";
export default {
  data() {
    return {};
  },
  methods: {
    @before("target", "index", {})
    errorHandle() {
      console.log("dddd");
      // 一些共用的异常处理方案
    }
  }
};
</script>