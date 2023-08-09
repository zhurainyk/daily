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
 *     3.画布上的组件拖拽实现 首先是获取焦点 支持单选和多选  选中给一个标识 拖拽的时候 记录初始位置，拖动的时候动态计算所有标记元素的位置 
 * 
 * 8. 辅助线贴合对其 
 * 9.撤销 和 重做是重点 也是难点 
 *  9.1安装 mitt事件通信
 *     事件记录框架 编写是难点
 *      监听键盘事件
 * 
 * 10. 导入导出功能 
 *   10.1弹窗设计（封装重点）
 * 
 * 
 * 11.菜单完善
 * 12.属性栏控制 置顶 置底 删除 
 * 13. 预览实现
 * 14. 右键菜单导入实现无法刷新视图   (所有问题已解决 都是因为没有绑定key的原因)
 * 15. 右侧元素属性控制栏
 * 
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
