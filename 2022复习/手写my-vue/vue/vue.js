
import Observer from './observer.js'
import Compiler from './Compiler.js'


export default class Vue{
    constructor(options={}){
        this.$options = options;
        this.$data = options.data;
        this.$methods = options.methods;

        this.initRootElement(options)//初始化根元素

        this._proxyData(this.$data)//new vue的时候 会把data属性通过Object.defineProperty 设置getter和setter

        new Observer(this.$data); // // 实例化observe对象，监听数据变化
        new Compiler(this)  // 实例化Compiler对象 解析模板和插值表达式 
    }

    initRootElement(options){
        if(typeof options.el === 'string'){
            this.$el = document.querySelector(options.el)
        }else if(options.el instanceof HTMLElement){
            this.$le = options.el;
        }
        if(!this.$el){
            throw new Error('传入的根元素不合规')
        }
    }

    _proxyData(data){
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                enumerable:true,
                configurable:true,
                get(){
                    return data[key]
                },
                set(newValue){
                    if(newValue === data[key]){
                        return 
                    }
                    data[key] = newValue;
                } 
            })
        })
    }


}