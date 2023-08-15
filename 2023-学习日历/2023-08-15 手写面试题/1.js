//手写防抖
function debounce(fn,delay){
    let timer  = null; 
    return function (){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(this,arguments)
            timer = null 
        },delay)
    }
}

//手写防抖
function throllte(fn,delay){

    let timer = null ;
    return function(){
        if(timer) return ;
        timer = setTimeout(()=>{
            fn.apply(this,arguments)
            timer = null 
        },delay)
    }
}

//手写深拷贝
const isObj = (o)=>typeof o !== null && typeof o === 'object'
function deepClone(obj){
    const isobj = isObj(obj)
    if(!isobj) return obj 
    const result = obj instanceof Array ?[]:{}
    for ( const key in obj){
        result[key] = obj[key] ;
        if(obj.hasOwnProperty(key)){
            result[key] = deepClone(obj[key])
        }
    }
    return result 
}
//解决深拷贝中循环引用的问题

function deepClone2(obj){

    const map = new WeakMap() //键必须是对象
    map.set(obj,true) ;//初始化的时候就设置初始值
    const clone = (obj)=>{
        if(!obj && typeof obj === 'object'){
            return obj 
        }
        const result = obj instanceof Array ? [] :{}
        for(const k in obj ){
            const v = obj[k]
            // 如果拷贝的是简单类型的值直接进行赋值
            if (typeof v !== 'object') {
               result[k] = v
            } else {
                // 如果拷贝的是复杂数据类型第一次拷贝后存入 map
               // 第二次再次遇到该值时直接赋值为 null，结束递归
               if (map.has(v)) {
                result[k] = null
               } else {
                  map.set(v, true)
                  result[k] = copy(v)
               }
            }
    
        }
        return result
    }
    return clone(obj)
}