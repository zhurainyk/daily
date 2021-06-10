/**
 * vue 主文件
 * 初始化vue class
 * 包裹Vue构造函数 接收各种配置参数等
 */

export default class Vue{
    constructor(options = {}){
        this.$options = options;
        this.$data = options.data;
        this.$methods = options.$methods;
        this.initRootElement(options)
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
}