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

function deepclone3(obj){
    const map = new WeakMap()
    map.set(obj,true)
    const copy = (obj)=>{ 
        if(!obj && typeof obj === 'object' ){
            return obj 
        }
        let result =  obj instanceof Array ? [] :{}
        for (const k in obj){
            const value = obj[k] 
            if(typeof value !=='object' || value === null){
                result[k] = value 
            }else{
                if(map.has(value)){
                    result[k] = null 
                }else{
                    map.set(value,true)
                    result[k] = copy(value)
                }
            } 
        } 
        return result 
    }
    return copy(obj)
}

function deepClone4(obj){
    const map = new WeakMap()
    map.set(obj,true )
    const isObj = (o)=>(typeof o === 'object' && o !== null )
    const copy = (obj)=>{ 
        if(!isObj(obj)){
            return obj 
        } 
        let result  = Array.isArray(obj)?[]:{} 
        for(const k in obj){
            const value = obj[k]
            if(!isObj(value)){
                result[k] = value 
            }else{
                if(map.has(value)){
                    result[k] = null
                }else{
                    map.set(value,true )
                    result[k] = copy(value) 
                }
                
            }
        }
        return result
    } 
    return copy(obj)
}

//instanceof
function myInstanceof(left,right){
    let _proto_ = Object.getPrototypeOf(left)
    let prototype = right.prototype;
    while(true){
        if(!_proto_) return false 
        if(_proto_ === prototype) return true ;
        _proto_ = _proto_.getPrototypeOf(_proto_)
    }
}






function deepClone5(obj){
    const map = new WeakMap()
    map.set(obj,true)
    const isObj = (val)=>typeof val === 'object' && val !== null 
    const copy = (obj)=>{
        if(!isObj(obj))
           return obj 
        const result = Array.isArray(obj) ? [] : {}
        for (const k in obj){
            const value = obj[k]
            if(!isObj(value)){
                result[k] = value 
            }else{
                if(map.has(value)){
                    result[k] = null 
                }else{
                    result[k] = copy(value)
                }
            }
        }
    }
    return copy(obj)
}

function myInstanceof2(left,right){
    let  _proto_ = Object.getPrototypeOf(left)
    const prototype = right.prototype
    while(true){
        if(!_proto_){
            return false 
        } 
        if(_proto_ === prototype) return true ;
        _proto_ = Object.getPrototypeOf(_proto_)
    }
}

