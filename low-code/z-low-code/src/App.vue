<template>
  <div class="app">
    <Editor v-model="data"></Editor>
  </div>
</template>
<script setup>
import { ref, provide } from "vue";
import data from "./data.json";
import Editor from "./packages/editor";
import { registerConfig as config } from "./utils/editor-config";
const state = ref(data);
provide("config", config);
</script>
<style>
.app {
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  
}
</style>
