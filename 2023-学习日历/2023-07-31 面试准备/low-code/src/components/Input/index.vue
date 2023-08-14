<template>
  <el-input
    :value="props.data.props.value"
    :placeholder="props.data.props.placeholder"
  ></el-input>
</template>
<script setup>
import { watch } from "vue";
const props = defineProps({
  data: Object,
});
</script>
 
