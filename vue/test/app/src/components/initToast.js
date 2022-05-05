import Vue from "vue";
import cspToast from "../components/cspToast.vue";
const csptoast = {
  install: function(Vue) {
    const CSPToastContructor = Vue.extend(cspToast);
    const instance = new CSPToastContructor();
    instance.$mount(document.createElement("div"));
    document.body.appendChild(instance.$el);
    Vue.prototype.$toastShow = () => {
      instance.cspToastVisible = true;
    };
    Vue.prototype.$toastHide = () => {
      instance.cspToastVisible = false;
    };
  },
};

export default csptoast
