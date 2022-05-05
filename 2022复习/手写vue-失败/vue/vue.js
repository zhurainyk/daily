import Observer from './observer.js'
import Compiler from './compiler.js'
export default class Vue {
    constructor(option){
        this.$option = option;
        this.$data = option.data;
        this.$methods = option.methods;
        this.initRootElement(option)
        this._proxyData(this.$data)
                // 实例化observer对象 监听数据变化
        new Observer(this.$data)
        //实例化编译模块 解析指令
        new Compiler(this)
    }
    initRootElement(option){
        if(typeof option.el === 'string'){
            this.$el = document.querySelector(option.el);
        }else if(option.el instanceof HTMLElement ){
            this.$el = option.el;
        }
        if(!this.$el){
            throw new Error('传入的根元素不合规,请传入正确的css selector 或者 html element');
        }
    }
    //利用Object.defineProperty 把data属性注入到vue的实例中
    _proxyData(data){
        if(Object.keys(data).length){
            Object.keys(data).forEach(key=>{
                this[key] = data[key]
                this.defineReactive(this,key,data[key])
            })
        }
    }

    // 绑定setter getter
    defineReactive(target,key,val){
        const _this = this;
        Object.defineProperty(_this,key,{
            enumerable:true,
            configurable:true,
            get(){
                return _this[key]
            },
            set(newValue){
                if(newValue === val){
                    return;
                }
                target[key] = newVlaue
            }
        })
    }
}