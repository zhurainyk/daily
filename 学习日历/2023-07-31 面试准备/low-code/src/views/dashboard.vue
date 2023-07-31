<template>
  <div class="dashboard">
    <headtab></headtab>
    <div class="operation">
      <div class="complist">
        <complist></complist>
      </div>
      <div class="workspace">
        <workspace></workspace>
      </div>
      <div class="attributes">
        <attributes></attributes>
      </div>
    </div>
  </div>
</template>
<script setup>
import headtab from "./main/head.vue";
import workspace from "./main/workspace.vue";
import complist from "./main/complist.vue";
import attributes from "./main/attributes.vue";
</script>
<style lang="scss" scoped>
.dashboard{
  height:100vh;
  .operation{
    margin-top:5px;
    display: flex;
    height:calc(100% - 75px);
    .complist,.attributes{
      width:300px;
      height:100%;
      box-shadow: 0 0 2px #ddd;
    }
    .workspace{
      flex-grow: 1;
      margin:0 5px;
      height:100%;
      box-shadow: 0 0 2px #ddd;
    }
  }
}
  
</style>
