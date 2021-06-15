/**
 * 数据劫持
 */
import Dep from "./dep.js";
export default class Observer {
  constructor(data) {}
  /**递归遍历data的所有属性 */
  traverse(data) {
    if (!data && typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
  /**给传入的数据设置 getter setter */
  defineReactive(obj, key, value) {
    //TODO 递归遍历
    this.traverse(value);
    const dep = new Dep(); //实例化Dep
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(Dep.target);
        Dep.target && dep.addSub(Dep.target); //get的时候收集依赖
        return value;
      },
      set(newValue) {

        if (newValue === value) {
          return;
        }
        value = newValue;
        this.traverse(newValue); //设置的时候可能是一个对象
        dep.notify(); //通知所有依赖更新
      },
    });
  }
}
