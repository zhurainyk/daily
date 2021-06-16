

export default class Vue{
    constructor(options={}){
        this.$options = options;
        this.$el = options.el;
        this.$data = options.data;
        this.$methods = options.methods;
        this.initRootElement(options.el)
        this._proxyData(options.data)
    }
    initRootElement(el){
        if(typeof el ==='string'){
            this.$el = document.querySelector(el);
        }else if(el instanceof HTMLElement){
            this.$el  = el;
        }
        if(!this.$el){
            throw new Error('传入的根元素不合法')
        }
    }
    _proxyData(data){
        Object.keys(data).forEach(key=>{// 将data属性注入到vue中
            Object.defineProperty(this,key,{
                enumerabel:true,
                configurable:true,
                get(){
                    return data[key]
                },
                set(newValue){
                    if(newValue === data[key]){
                        return newValue
                    }else{
                        data[key] = newValue
                    }
                }
            })
        })
    }
}