

import Dep from './dep.js'
export default class Observer{
    constructor(data){
        this.traverse(data)
    }

    traverse(data){
        if(!data && typeof data !== 'object'){
            return 
        }
        Object.keys(data).forEach(key=>{
            this.defineReactive(data,key,data[key])
        })
    }

    defineReactive(data,key,val){
        this.traverse(val);
        const that = this;
        const dep = new Dep()
        Object.defineProperty(target,key,{
            enumerable:true,
            configurable:true,
            get(){
                //依赖收集
                Dep.target&&dep.addSub(Dep.target)
                return val
            },
            set(newValue){
                if(newValue === val){
                    return;
                }
                data[key] = newValue;
                that.traverse(newValue)
                dep.notify()
            }
        })
    }
}