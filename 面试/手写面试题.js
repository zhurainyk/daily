

/**
 * 实现一个 add(1)(2)(3) = 6无限调用的函数
 * 
 * 思路：用一个变量存所有的值 返回一个函数  这个函数有一个toString方法 alert的时候会转义  
 */

const { WeakMap } = require("globalthis/implementation");

function add(x){
    let sum = x;

    let temp = function(y){
        
        sum = sum + y;
        return temp;
    }

    temp.toString = ()=>sum;
    return temp
}

function testadd(x){
    
    let sum = 0;
    sum += x;
    let temp = function(y){
        return sum + y;
    }
    temp.toString = ()=> sum 
    return temp 
}


// alert(add(1)(2)(3)) 

/**
 * 防抖实现  在一段时间内，事件只会最后触发一次。  执行之前先清空  输入校验最后一次
 * 比如公交车  坐满才走  连续调用多次 ，只有最后一次生效   滚动条操作
 * 
防抖 (debounce): 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。

节流(throttle): 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。
 */

function debounce (fn,time=10){
    let timer = null;
    return function(){
        clearTimeout(timer);//先清空 
        timer = setTimeout(()=>{
            fn.apply(this,arguments)
        },time)
    }
}

function debounce2(fn,time=10){
    let timer = null
    return function (){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.call(this,...arguments);

        },time)
    }
}

function throttle(fn,time =10){
    let flag = null;
    return function(){
        if(flag) return ;
        flag = setTimeout(()=>{
            fn.apply(this,arguments);
            flag = null 
        },time)
    }
}

/**
 * 节流  按一定的时间**间隔**执行 
 * 连续调用多次 第一次生效  间隔
 */

function throttle(fn,time=10){
    let flag = null //通过闭包保存一个标记
    return function(){
        if(flag) return ; //如果改方法没有执行  就会被拒接 return 
        flag = setTimeout(()=>{
            fn.apply(this,arguments)
            flag = null;//执行后就会置为空 
        },time)
    }
}

const fn = (x)=>console.log(x) ;
const fnn = debounce(fn)
for(let i = 0 ;i<10;i++){
    fnn(i)  //输出9  //防抖 最后一次生效
}

const fnn2 = throttle(fn)
for(let i = 0 ;i<10;i++){
    fnn2(i)  //输出0  //节流 第一次生效 
}



/**
 * 正则 实现区号 
 * 023-88688868
 */

const reg = /(^\d{3})-(\d{8}$)/ //加了括号表示子表达式  可以调用RegExp.$1  RegExp.$2 获取匹配到的数据 
const value = '023-44446666';
const result = reg.test(value)
console.log(result,RegExp.$1,RegExp.$2) //true   023   44446666 

/**
 * 深拷贝 实现 
 */

//1 通过instanceof  普通对象类型的深拷贝 无法解决 RegExp Date Error 等类型

const isObj = (val)=>typeof val === 'object' && val !== null 
function deepClone(obj){
    const newObj = obj instanceof Array?[] :{}

    for(let key in obj){
        const value = obj[key]
        newObj[key] = isObj(value) ?deepClone(value):value;

    }
    return newObj;
}

const o1 = {
    a:1,
    b:2
}
const o2 = deepClone(o1)
o2.a = 3 ;
console.log(o1,o2)

 const isObj = (val)=>(typeof val === 'object' && val !== null)

function clone2(obj){
    const newObj =  obj instanceof Array ? [] :{};
    for(let key in obj){
        newObj[key] = isObj(obj[key])?clone2(obj[key]):obj;
    }
    return newObj;
}


const isObj = (val)=>typeof val ==='object' && val !==null;
function deepClone(obj){
    const newObj = Array.isArray(obj) ? []:{}
    Object.keys(obj).forEach(key=>{
        newObj[key] = isObj(obj[key]) ? deepClone(obj[key]):obj[key]
    })
    return newObj;
}


function deepClone(obj){
    const map = new WeakMap()
    map.set(obj,true)
    const copy = (obj)=>{
        
        return 
    }
    return copy(obj)
}

/**
 * 手写instanceOf
 * 思路：查找原型上的__proto__属性是否等于
 */

function instanceOf(target,type){
    console.log(arguments)
    type = type.prototype; //实例有一个prototype属性
    target = target.__proto__; //原型链有一个__proto__
    while(true){
        if(target === null){
            return false
        }
        if(target === type){
            return true ;
        }
        target = target.__proto__
    }
}

console.log(instanceOf([1,2,3],Array))

function myInstanceOf(target,type){
    let target = target.__proto__;
    let type = type.prototype;
    while(true){
        if(target === null){
            return false;
        }
        if(target === type){
            return true;
        }
        target = target.__proto__;
    }
}
function instanceOf(target,type){
    let target = target.__proto__
    let type = type.prototype;
    while(true){
        if(target === null){
            return false;
        }
        if(target === type){
            return true;
        }
        target = target.__proto__
    }
}
/**
 * 手写 new的过程 
 * 1. 创建一个空对象
 * 2. 对象的 __proto__隐式原型 指向 构造函数的prototype显示原型
 * 3. 执行这个构造函数里的代码
 * 4. 返回这个函数执行的结果或者返回对象
 */
function myNew(fn,...args){
    let obj = Object.create({})
    obj.__proto__ = fn.prototype;
    const res = fn.call(obj,...args);
    return res;
}
 
 function myNew(fn,...args){
     const obj = Object.create({})
     obj.__proto__ = fn.prototype ; 
     const res = fn.call(obj,...args)
     return res && (typeof res === 'function' || typeof res === 'object' ) ? res:obj
 }

 function person(name){
     this.name = name;
     this.do = function(){
         console.log(this.name)
     }
 }

 const  newPerson = myNew(person,'zhuyu')
 newPerson.do()

 function myNew(fn){
     const obj = Object.create({})
     obj.__proto__ = fn.prototype;
     const res = fn.call(obj,...arguments)
     return res&& (typeof res ==='function' || typeof res === 'object') ?res:obj;
 }


//new的过程复习

 function mNew(fn,...args){
     const obj = Object.create({})
     obj.__proto__ = fn.prototype;
     const res = fn.call(this,...args);
     return res&& (typeof res === 'function' || typeof res === 'object') ? res :obj;
 }


/**
 * 手写 call  apply  bind
 * 思路：1. 判断this是否是一个function  
 * 2. 判断上下文是否存在 不存在赋值为window 
 * 3. 用一个key来存this （一般用symbol）
 * 4. 获取参数 除开this
 * 5. 执行函数并携带参数
 * 6. 删除之前的this
 * 7. 返回函数执行的结果  bind返回一个函数
 */

Function.prototype.myCall = function(context){
    if(typeof this !== function){
        throw new Error('类型不对')
    }
    if(context === null || context === undefined){
        context = window;
    }else{
        context = Object(context)
    }
    const fn = Symbol()
    context[fn] = this;
    const args = arguments.slice(1)
   const result =  context[fn](...args)
   delete context[fn];
   return result
}

function mCall(context){
    if(typeof context !== 'function'){
        throw new Error('type error');
    }
    if(context === null || context === undefined){
        context = window;
    }else{
        context = Object(context);
    }
    const args = [...arguments].slice(1)
    const fn = Symbol()
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn]
    return result 
}
















function myCall(context){
    if(typeof this !== 'function'){
        throw new Error('type error')
    }
    if(context === null || context === undefined){
        context = window;
    }
    context.fn =this;
    const args = arguments.slice(1)
    const res = context.fn(...args);
    delete context.fn;
    return res 
}

Function.prototype.myBind = function(context){
    if(typeof context !=='function'){
        throw new Error('type error')
    }
    if(context === null ||context ===undefined){
        context = window;
    }else{
        context = Object(context)
    }
    const fn = Symbol()
    const that  = this;
    const args = [...arguments].slice(1)
    
    return function(){
        context[fn] = that;
      const res =  context[fn].call(that,...args);
       delete context[fn]
        return res
    }
}























Function.prototype.mCall = function(context){
    if(typeof this !== 'function'){
        throw Error('类型不对')
    }
    if(context === null || context === undefined){
        context = window 
    }else{
        context = Object(context);
    }
    context['that'] = this;
    const args = arguments.slice(1)
    const result = context['that'](...args)
    delete context['that']
    return result ;
}

Function.prototype.myApply = function(context){
    if(typeof this !== 'function'){
        throw new Error('type error')
    }
    if(context === null || context === undefined){
        context = window;
    }else{
        context = Object(context);
    }
    context['that'] = this;
    const args = arguments.slice(1)
    const result = context['that'](args);
    delete context['that'];
    return result ;
}

Function.prototype.myBind = function(context){
    if(typeof this !== 'function'){
        throw new Error('type error')
    }
    if(context === undefined || context === null){
        context = window;
    }else{
        context = Object(context);

    }
    const self =this;
    const args = arguments.slice(1)
    const newFn = function(...rest){
        return self.call(context,...args,...rest);
    }
    if(self.prototype){//复制原函数的prototype给新函数，防止有些函数没有prototype 比如箭头函数
        newFn.prototype = Object.create(self.prototype)
    }
    return newFn 
    
}

Function.prototype.mBind = function(context){
    if(typeof this !== 'function'){
        throw new Error('type error')
    }
    if(context === null || context === undefined){
        context = window
    }else{
        context = Object(context);

    }

    const self = this;
    const args = arguments.slice(1)
    const newFn = function (...rest){
        return self.call(context,...args,...rest)
    }

    if(self.prototype){
        newFn.prototype = Object(self.prototype);
    }
    return newFn
}




/**
 * 实现继承
 */
//1. 原型链继承 暴露的问题：引用类型的属性被所有实例共享，不能传参

{
    function father(){
        this.colors = ['yellow','white','blue'];
    }
    function son(){

    }
    son.prototype = new father() //引用类型的属性会被所有实例共享
    const s = new son()
    s.colors.push('red')
}

//2. 借用构造函数（经典继承） 优点：避免了引用类型的属性被共享 2. 可以传递参数 缺点：每次创建实例都会创建一遍方法

{
    function father(){
        this.numbers = [1,2]
    }
    function son(){
        father.call(this);
        this.numbers.push(3)
    }

    let s = new son()
    s.numbers.push(4)
    let s2 = new son()
    
}

//3.组合继承 （原型链继承和经典继承双剑合璧。）；是js中的常用继承方式，融合了经典继承和原型链继承

{
    function father(name){
        this.name =name;

    }
    function son (name,age){
        father.call(this,name) //经典继承
        this.age = age;
    }

    son.prototype = new father() //原型链继承

    const s1 = new son('zy',19)
    console.log(s1)
    const s2 = new son('xx',20)
    console.log(s2)
}

//4.原型式继承  创建一个函数来继承 包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样
{
     function father(obj){
         function fn(){}
         fn.prototype = obj;
         return new fn()
     }
     const p1 = {
         name:'zy',
         age:18
     }
     const s1 = father(p1)
     const s2 = father(p1)
     s1.name = 'xxx'
     console.log(s1.name,s1.age,s2.age,s2.name)

}

//5.寄生式继承 创建一个对象用于寄生 ；并返回这个对象 缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
{
    function createObj(o){
        const obj = Object.create(o)
        obj.say = function(){
            console.log('xxx')
        }
        return obj;
    }

}

//6. 寄生组合继承   
{
    function parent(name){
        this.name = name
    }
    function son (name,age){
        parent.call(this,name) //
        this.age = age;
    }
    const fn = function(){}
    fn.prototype = parent.prototype;
    son.prototype = new fn()


}

 
/**
 * 全局错误拦截 Promise.reject 
 */

window.addEventListener('unhandledrejection',(event)=>{
    event&&event.preventDefault()
    console.log(event)
})

/**
 * 原型 原型链 
 */

/**
 * @info Father.prototype就是原型，他是一个对象，我们称为原型对象， 原型的作用：就是共享方法
 * @info 原型链，原型与原型层层相连接的过程即为原型链，
 * 
 */

/**
 *  手写数组的 flat
 */

function flat(arr){

    const result = []
    arr.forEach(item=>{
        if(Array.isArray(item)){
            result = result.concat(flat(item))
        }else{
            result.push(item)
        }
    })
    return result
}

function flat2(arr,deep=1){//解构层数
    let result = []
    arr.forEach(item=>{
        if(Array.isArray(item) && deep>0){
            result = result.concat(flat(item,deep-1))
        }else{
            result.push(item)
        }
    })
    return result;
}

/**
 * 时间分片
 */

{
    const ul = document.createElement('ul')
    document.appendChild(ul)
    const total = 100000
    const once = 20;
    function loop(currentTotal,currentIndex){
        if(currentTotal<=0) return ;
        const pageCount = Math.min(currentTotal,once)
        setTimeout(()=>{
            for(let i = 0 ;i<pageCount ;i++){
                const li = document.createElement('li')
                li.innerText =~~( Math.random() * total)
                ul.appendChild(li)
            }
            loop(currentTotal-pageCount,currentIndex+pageCount)
        })
    }

}

/**
 * 数组分组
 */
{
    const arr = [
        {
            age:20,
            name:'xx'
        },
        {
            age:21,
            name:'yy'
        },
        {
            age:20,
            name:'xy'
        },{
            name:'ssy',
            age:21
        }
    ]
    const groupBy = function (arr,key){
        const result =    arr.reduce((pre,cur)=>{
            if(pre[key]){
                
            }
        },{})
        return result 
    }
}

/**
 * 二分法查找
 */

function binarySearch(arr,value){
    let min = 0 ;
    let max = arr.length -1 ;
    while(min <=max){
        let mid = Math.floor((min+max)/2);
        if(arr[mid] === value){
            return mid;
        }else if(arr[mid] > value){
            max = mid - 1;
        }else{
            min = mid + 1;
        }
    }
    return 'not found'
}


/**
 * 斐波那契数列实现的形式
 * 1,1,2,3,5,8,13,21,34... 
 */
{
    function fib(n){
        if(n == 0){
            return 1;
        }
        if(n == 1){
            return 1;
        }
        return fib(n-1) + fib(n-2);
    }

    //优化

    function fib2(n,cache = {}){
        if(cache[n]){
            return cache[n]
        }
         if(n == 0){
            return 1
        }
        if(n == 1){
            return 1
        }
        
        const v = fib2(n-1,cache) + fib2(n-2,cache);
           cache[n] = v; 
        return  v
    }
}



/**
 *  ssr了解吗
 */

/**
 * 时间分片
 */

let total = 1000000;
let once = 20;
let ul = document.createElement('ul')
const time = Date.now()
for(let i =0;i<total;i++){
    let li = document.createElement('div')
    li.innerHTML = ~~(Math.random*total)
    ul.appendChild(li)
}
document.body.appendChild(ul)
console.log(Date.now - time)



/**
 * 浏览器输入 url 到页面渲染发生了什么
 */


/**
 * 微前端
 */

/**
 * webpack性能优化 原理？
 */


/**
 * 可视化拖拽生成页面
 */

/**
 * 常用设计模式
 */

/**
 * CI-CD devOp了解吗
 */

/**
 * 手写promise 以及其生态
 */


/**
 * vue3有了解过吗 
 * 
 */ 


/**
 * v8引擎  垃圾回收机制 
 */


/**
 * 前端安全 xss csrf
 */

/**
 * 组件升级如何让使用该组件的人知道
 *  @plugin update-notifier 该插件会异步在背后默默检查npm包的可用最新版
 */




/**
 * 手写 webpack插件或者loader 或者babel插件
 * 
 */


/**
 * 项目中的难点 如何解决
 */


/**
 * 技术优势，新技术研究方向 ，职业规划 ， 希望公司能提供什么
 */



