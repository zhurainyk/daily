<template>
  按钮名字
  <el-input type="text" v-model="label" />
  <el-button @click="() => set('primary')">默认</el-button>
  <el-button @click="() => set('success')">成功</el-button>
</template>
<script setup>
import {ref} from 'vue'
const label = ref('')
import { useLowCodeStore } from "../../store/lowcode";
const store = useLowCodeStore();
const set = (str) => { 
  const value = store.nowComponent;
  console.log(value)
  value.props.type = str;
  value.props.value = label.value
  store.updateNowComponents(value);
 
};
</script>
