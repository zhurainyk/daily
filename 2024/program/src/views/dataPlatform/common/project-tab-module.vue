<template>
  <div class="project-tab-module">
    <div class="title">
      <slot name="title"></slot>
    </div>
     <slot></slot>
  </div>
</template>

<script  >
import { defineComponent } from "vue";
export default defineComponent({
  name: 'projecttabmodule'
})


</script>

<style lang='scss' scoped>
.project-tab-module {
  width: 280px;
  height: 320px;
  background-color: #fff;

  .title {
    color: #23FFFC;
    font-size: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 154, 252, .2);
  }

  .content {
    color: red;
  }
}
</style>