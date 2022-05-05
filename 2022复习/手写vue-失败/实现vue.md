1. 新建一个目录
    * index.html 页面
    * vue.js Vue主文件
    * compiler.js 编译模板 解析指令 v-model v-click v-html v-text v:on-click
    * dep.js 搜集依赖 存储观察者对象  以发布订阅的形式
    * observer.js 数据劫持
    * watcher.js 观察者对象
```js
//vue构造函数 接收各种配置参数 
export default class Vue {
    constructor(option){
        this.$option = option;
        this.$data = option.data;
        this.$methods = option.methods;
        this.initRootElement(option)
    }
    /**
     * 根元素判断是否合规 判断el 
    */
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
}
```

2. 创建各个js文件
    * compiler.js
    * observer.js
    * dep.js
    * watcher.js
