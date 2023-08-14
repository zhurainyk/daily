+ onerror 可以做前端监控 
```js
    window.onerror = function(){

    }

    window.addEventListener('error',()=>{})

```

+ setTimeout / setInterval  能用setTimeout 写一个setInterval的功能吗 

+ isOnline 用于检测网络是否在线  websocket可能对于断网不是很敏感 所以需要用isOnline来检测

+ navigation 接口表示用户代理的状态和标识 

+ history 用户浏览记录

+ pushState  onPopState vue路由原理

+ 浏览器事件模型 事件捕获 冒泡

+ 浏览器面试相关 事件委托/代理

```js
    //捕获 -》 目标 =》 冒泡
    window -> body - > input -> body -> window 

    e.target.nodeName 当前点击的元素
    e.currentTarget.nodeName 绑定事件监听的元素

    addEventListenter 第三个参数如果为true 是捕获阶段 false 冒泡阶段 默认冒泡

    阻止事件的传递 (不仅仅是阻止冒泡还可以阻止捕获)
    e.stopPropagation()

```


+ 面试题目：
>>> 现有一个页面 ，页面上有许多元素，div p button 。。。 每个元素都有自己的点击事件，各不相同，
现在来了一个新需求，一个用户进入这个也面的适合 会有一个状态bannerd，
true：表示用户被封禁了，用户点击当前页面上的任何元素都不原有click逻辑 而是弹出一个
alert 
false：不做任何操作

```js
const bannerd = true;
window.addEventListener('click',(e)=>{
    if(bannerd){
        e.stopPropagation() //阻止事件传播
        alert('你被封禁')
        return
    }
})
```