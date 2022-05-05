
import Dep from './dep.js'
export default class Watcher{
    constructor(vm,key,cb){
        /**
         * 先把参数保存起来
         *  @param vm {*} vue实例
         *  @param key data中的属性名
         *  @param cb 负责更新视图的回调函数
         */
        
        this.vm = vm;
        this.key = key 
        this.cb = cb;
        Dep.target = this;
        this.oldValue = vm[key];
        Dep.target = null; //避免重复添加watcher
    }

    //当前数据变化的时候更新试图
    update(){
        const newValue = this.vm[this.key]
        if(newValue === this.oldValue){
            return 
        }
        this.cb(newValue)

    }

}