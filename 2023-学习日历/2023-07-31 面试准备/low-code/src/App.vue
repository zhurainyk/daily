<template>
  <div class="low_box">
    <div class="header">
      <div class="title">可视化系统</div>
      <div class="web">pc</div>
      <div class="btn">
        <el-button type="primary" @click="view">预览</el-button
        ><el-button type="primary">确定</el-button>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="title">组件</div>
        <VueDraggableNext
          v-model="store.component"
          :sort="false"
          :group="{
            name: 'components', //组名为icomponents
            pull: 'clone', //是否允许拖出当前组
            put: false, //是否允许拖入当前组
          }"
          @end="onEnd"
        >
          <div v-for="item in store.component" :key="item.id" class="tem_btn">
            {{ item.name }}
          </div>
        </VueDraggableNext>
      </div>
      <div ref="targetContent" class="center" id="targetContent">
        <VueDraggableNext
          :v-model="store.preview"
          :group="{
            name: 'template',
            pull: false,
            put: true,
          }"
          ghost-class="ghost"
          class="canvas"
        >
          <template v-for="(item,index) in store.preview" :key="index">
            <component
              :is="componentsList[item?.code]"
              :data="item"
            ></component>
          </template>
        </VueDraggableNext>
      </div>
      <div class="right">
        <component :is="componentsList[store?.nowComponent?.set]"></component>
      </div>
    </div>
  </div>
</template>
<script setup  >
import { shallowRef, ref, onBeforeMount, watch } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { useLowCodeStore } from "./store/lowcode";
import Button from "./components/Button/index.vue";
import Input from "./components/Input/index.vue";
import ButtonSet from "./components/Button/set.vue";
import InputSet from "./components/Input/set.vue";
const store = useLowCodeStore();
watch(store, (n, l) => {
  console.log("数据", n);
});
const componentsList = {
  button: Button,
  input: Input,
  "button-set": ButtonSet,
  "input-set": InputSet,
};
const view = () => {
  localStorage.setItem("lowcode", JSON.stringify(store.preview));
  window.open(location.href.replace("/#/", "/preview/#/"));
};
const onEnd = (obj ) => {
  console.log(obj)
  if(obj.to.className!=='canvas') return
  const { oldDraggableIndex } = obj;
  store.previewData(store.component[oldDraggableIndex]);
  store.nowComponentsData(store.component[oldDraggableIndex]);
};
</script>
<style lang="scss" scoped>
.low_box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f2f2f2;
  .header {
    height: 65px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  .content {
    display: flex;
    flex-direction: row;
    height: calc(100vh - 66px);
    .left {
      width: 300px;
      height: 100%;
      overflow: hidden;
      background-color: #fff;
      border-top: 1px solid #dddddd;

      .title {
        font-size: 16px;
        color: #333;
        line-height: 50px;
        width: calc(100% - 40px);
        margin-left: 20px;
        border-bottom: 1px solid #f2f2f2;
        clear: both;
      }

      .tem_btn {
        padding: 0px 10px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        color: #666;
        background-color: #f2f2f2;
        border-radius: 4px;
        cursor: move;
        user-select: none;
        margin-top: 20px;
        float: left;
        margin-left: 20px;
      }
    }
    .center {
      flex: 1;
      padding: 20px;
      background-color: #f2f2f2;
      .canvas {
        background-color: #fff;
        width: 100%;
        height: 100%;
      }
      .ghost {
        background-color: #f00 !important;
      }
    }
    .right {
      width: 300px;
      height: 100%;
      overflow: hidden;
      background-color: #fff;
      border-top: 1px solid #dddddd;
    }
  }
}
</style>

