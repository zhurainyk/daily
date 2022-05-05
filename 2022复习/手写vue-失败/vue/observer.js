import Dep from "./dep.js";

export default class Observer{
    constructor(data){
        this.traverse(data)
    }

    traverse(data){
        if(!data || typeof data !=='object') {
            return
        } ;
        Object.keys(data).forEach(key=>{
            this.defineReactive(data,key,data[key])
        })
    }

    defineReactive(data,key,value){
        this.traverse(value)
        const dep = new Dep()
        const that = this;
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get(){
                Dep.target && dep.addSub(Dep.target)
                return value
            }
            ,
            set(newValue){
                if(newValue === value){
                    return
                }
                that.traverse(newValue) //设置的时候可能是个对象
                dep.notify()

            }
         
        })
    }
}