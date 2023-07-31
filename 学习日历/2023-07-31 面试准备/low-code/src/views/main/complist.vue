<template>
  <div class="sub-titel">组件</div>
  <div class="grouplist">
    <VueDraggableNext
      v-model="store.component"
      :sort="false"
      :group="{
        name: 'components', //组名为icomponents
        pull: 'clone', //是否允许拖出当前组
        put: false, //是否允许拖入当前组
      }"
    >
      <div v-for="item in store.component" :key="item.id" class="tem_btn">
        {{ item.name }}
      </div>
    </VueDraggableNext>
  </div>
</template>
<script setup>
import {VueDraggableNext} from 'vue-draggable-next' 
import { useLowCodeStore } from "@/stores/lowcode.js";
import { computed, onMounted } from "vue";
const store = useLowCodeStore();
onMounted(() => {
  console.log(store);
});
</script>
<style lang="scss" scoped>
.grouplist{
width:100%;
height: 100%;

}
.tem_btn{
    margin:0 auto;
    width:100px;
    background-color: #ddd;
    color:#333;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 6px;
}

</style>
