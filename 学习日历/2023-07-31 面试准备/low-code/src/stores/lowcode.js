import { defineStore } from "pinia";
export const useLowCodeStore = defineStore({
  id: "lowcode", // id必填，且需要唯一
  state: () => {
    return {
      component: [
        {
          code: "button",
          set: "button-set",
          name: "按钮",
          id: 1, //组件编号不可重复且递增
          props: {
            type: "primary",
          },
        },
        {
          code: "input",
          set: "input-set",
          name: "输入框",
          id: 2, //组件编号不可重复且递增
          props: {
            value: "",
            placeholder: "请输入内容",
          },
        },
      ],
      preview: {},
      nowComponent: {},
    };
  },
  actions: {},
}); 