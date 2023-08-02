<template>
  <div class="dashboard">
    <div id="header">
      <div class="program">低代码平台</div>
      <div class="center">pc</div>
      <div class="submit">
        <button class="pre">预览</button>
        <button class="sub">确定</button>
      </div>
    </div>
    <div class="operation">
      <div class="complist">
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
      </div>
      <div class="workspace">
        <div>工作区</div>
      </div>
      <div class="attributes">
        <div>属性区</div>
      </div>
    </div>
  </div>
</template>
<script setup>
//  import {VueDraggableNext} from 'vue-draggable-next' 
// import { useLowCodeStore } from "@/stores/lowcode.js";
// import { computed, onMounted } from "vue";
// const store = useLowCodeStore();
// onMounted(() => {
//   console.log(store);
// });
</script>
<style lang="scss" scoped>
.dashboard {
  height: 100vh;
  #header {
    padding: 0 20px;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 2px 1px #ddd;
    .program {
      text-align: center;
      line-height: 60px;
    }
    .center {
      width: 1200px;
      flex-grow: 1;
      text-align: center;
      line-height: 60px;
    }
    .submit {
      min-width: 200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        width: 60px;
        height: 30px;
      }
    }
  }
  .operation {
    margin-top: 5px;
    display: flex;
    height: calc(100% - 75px);
    .complist {
      .grouplist {
        width: 100%;
        height: 100%;
      }
      .tem_btn {
        margin: 0 auto;
        width: 100px;
        background-color: #ddd;
        color: #333;
        border-radius: 5px;
        line-height: 30px;
        text-align: center;
        margin-bottom: 6px;
      }
    }
    .complist,
    .attributes {
      width: 300px;
      height: 100%;
      box-shadow: 0 0 2px #ddd;
    }
    .workspace {
      flex-grow: 1;
      margin: 0 5px;
      height: 100%;
      box-shadow: 0 0 2px #ddd;
    }
  }
}
</style>
