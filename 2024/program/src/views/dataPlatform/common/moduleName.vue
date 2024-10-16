<template>
  <div class="modulename">{{ moduleName }}</div>
</template>

<script lang="ts">
// import { ref, reactive, toRef } from "vue";
import { defineComponent, toRefs, } from "vue";
export default defineComponent({
  name: 'moduleName',
  props: {
    moduleName: {
      type: String,
      default: "员工",
    },
    onClick: {
      type: Function,
      default: () => { },
    },
  },
  emits: ["handleClick"],
  setup(props, context) {
    // 其中props是响应式不能随便使用es6解构，context不是响应式可以使用es6解构
    let { moduleName } = toRefs(props); // 将props转化为响应式，因为 props 是响应式的，你不能使用 ES6 解构，因为它会消除 prop 的响应性。
    // let name = toRef(props, 'name'); // 针对单个相应式数据
    let handleClick = () => {
      console.log(props, context);
      context.emit("handleClick", 324343);
      // context.attrs
      // context.slots
      // context.expose
    };
    return {
      handleClick,
      moduleName,
    };
  },
});
</script>

<style lang='scss'>
.modulename {
  font-family: SourceHanSansCN-Regular;
  position: relative;
  // margin-top: 15px;
  // margin-left: 40px;
  font-size: 16px;
  color: #f3fcff;
  transform: translateX(40px) translateY(15px);
}

.modulename::before {
  content: "";
  position: absolute;
  top: 4px;
  left: -22px;
  width: 16px;
  height: 16px;
  background: url("../../../public/images/dataplatform/bg/pointcircle.png") no-repeat 100%/100%;
}
</style>