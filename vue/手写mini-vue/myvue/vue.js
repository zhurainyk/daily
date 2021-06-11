import Observer from './observer.js'
import Compiler from './compiler.js'
/**
 * vue 主文件
 * 初始化vue class
 * 包裹Vue构造函数 接收各种配置参数等
 */

export default class Vue{
    constructor(options = {}){
        this.$options = options;
        this.$data = options.data;
        this.$methods = options.methods;
        this.initRootElement(options)
        this._proxyData(options.data)

        // 实例化observer对象 监听数据变化
        new Observer(this.$data)
        //实例化编译模块 解析指令
        new Compiler(this)
    }

    /**
     * 获取根元素 并存储到vue实例 简单检查一下el是否合法
     * @param {} options 
     */
    initRootElement(options){
        if(typeof options.el ==='string'){
            this.$el = document.querySelector(options.el)
        }else if(options.el instanceof HTMLElement){//判断是不是一个node 节点  
            this.$el = options.el;
        }
        if(!this.$el){//防止以上情况都不对 
            throw new Error('传入el参数不合法,请传入css selector 或者HTMLElement ')
        }
    }
    _proxyData(data){//这一步只需要把data挂在到实例上 
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
                    data[key] = newValue
                }
            })
        })
    }
}