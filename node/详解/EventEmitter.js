
class EventEmitter{
    constructor(){
        this.events = {}
    }
    //触发监听
    emit(event,...args){
        const cbs = this.events[event]
        if(!cbs){
            console.log('当前事件未注册')
            return this
        }
        cbs.forEach(cb=>cb.apply(this,args))
        return this
    }
    //创建监听
    on(event,cb){
        if(!this.events[event]){
            this.events[event] = []
        }
        this.events[event].push(cb)
        return this//链式调用
    }
    //创建一次性监听
    once(event,cb){
        const func = (...args)=>{
            this.off(event,func)
            cb.apply(this,args)
        }
        this.on(event,func)
        return this;
    }
    //移除监听
    off(event,cb){

    }
    
}

const test = new EventEmitter()
test.on("t",(data)=>console.log(data))
test.emit('t','123')
console.log('3333')



//手写版本
class EventEmitter2 {
    constructor(){
        this.events = {}
    }

    on(event,cb){
        if(!this.events[event]){
            this.events[event] = []
        }
        this.events[event].push(cb)
        return this;
    }

    emit(event,...args){
        const cbs = this.events[event]
        if(!cbs){
            console.log('event未注册')
            return this;
        }
        cbs.forEach(cb=>cb.apply(this,args))
        return this;
    }
}

const t2 = new EventEmitter2()
// t2.on('t2',(data)=>console.log('t2',data))
t2.emit('t2','3333333')


process.on('exit',function(code){
    setTimeout(()=>{
        console.log('位置1') //这句不会执行 
    },0)
    console.log('位置2',code)
})
console.log('程序结束')