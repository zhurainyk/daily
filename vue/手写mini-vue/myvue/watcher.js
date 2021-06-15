/**
 * 观察者对象类
 */

/**
 * vm  vue实例
 * key data中的属性名
 * cb 负责视图更新的回调函数
 */

import Dep from './dep.js'
export default class Watcher{
    constructor(vm,key,cb){ //CB执行更新视图的回调
        this.vm = vm;
        this.key = key ;
        this.cb = cb;

        Dep.target = this; ////....???
        //会触发get方法 在get方法里会做一些操作
        this.oldValue = vm[key] //触发getter 

        Dep.target = null;
    }
    /**数据更新的时候更新视图 */
    update(){
        let newValue = this.vm[this.key]
        if(this.oldValue == newValue){
            return;
        }
        this.cb(newValue)
    }
}
//watcher初始化获取oldValue的时候 会去做一些什么操作？
//通过vm[key] 获取oldValue前，为什么要将当前的实例挂载到Dep上，获取之后为什么又置为null
//update方法是在什么时候执行的
