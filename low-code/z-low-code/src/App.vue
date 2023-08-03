<template>
  <div class="app">
    <Editor v-model="state"></Editor>
  </div>
</template>
<script setup>
import { ref, provide } from "vue";
import data from "./data.json";
import Editor from "./packages/editor";
import { registerConfig as config } from "./utils/editor-config";
const state = ref(data);
provide("config", config);
/**
 * 
 * 1. 创建面板 样式分离
 * 2. 定义画布属性 定义组件属性 data.json 配置
 * 3. 定义编辑器 绑定数据 v-model  响应式更新
 * 4. 定义组件库 和 组件映射列表  全局引入并透传到所有子组件
 * 5. 通过组件库已有组件 渲染到画布中央 
 * 6. 通过组件库已有组件 渲染到菜单栏
 * 7. 编写拖拽逻辑
 *     1.菜单拖拽 onDragstart 传入当前拖拽的组件 记录拖拽组件 实现拖拽标记  所有可拖拽的组件添加蒙层防点击
 *     2.拖拽到画布上的时候 给画布添加监听事件 drop松手的时候  根据拖拽组件 添加一个组件
 *     3.
 * 
 * 
 * 
 */
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
