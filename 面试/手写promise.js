
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class  MyPromise{
    FULFILLED_CALLBACK_LIST = []
    REJECTED_CALLBACK_LIST = []
    constructor(fn){
        this._state = PENDING
        this.reason = null;
        this.value = null;
        try{
            fn(this.resolve.bind(this),this.rejected.bind(this))
        }catch(e){
            this.rejected(e)
        }

    }

    get  status(){
        return this._state
    }
    set status(newState){
        switch(newState){
            case FULFILLED:{
                this.FULFILLED_CALLBACK_LIST.forEach(cb=>{
                    cb(this.value)
                })
                break;
            }
            case REJECTED:{
                this.REJECTED_CALLBACK_LIST.forEach(cb=>{
                    cb(this.reason)
                })
            }
        }
    }

    resolve(value){
        if(this.state ===PENDING){
            this.value = value;
            this.state = FULFILLED
        }
    }
    rejected(reason){
        if(this.state === PENDING){
            this.reason = reason ;
        }
    }

    then(onFulfilled,onRjected){
        const fulfilledFn = this.isFunction(onFulfilled) ? onFulfilled:(value)=>value;
        const rejectedFn = this.isFunction(onRjected) ? onRjected:(reason)=>{
            throw reason 
        }
        const fulfilledFnWithCatch = (resolve,reject,newPromise)=>{
            try{
                if(this.isFunction(onFulfilled)){
                    resolve(this.value)
                }else{
                    const x = fulfilledFn(this.value)
                    this.resolvePromise(newPerson,resolve,reject)
                }
  
            }catch(e){
                reject(e)
            }
        }
        const rejectedFnWithCatch = (resolve,reject)=>{
            try{
                rejectedFn(this.reason)
                if(this.isFunction(onRjected)){
                    resolve()
                }
            }catch(e){
                reject(e)
            }
        }


        switch(this.state){
            case FULFILLED:{
                return new MyPromise(fulfilledFnWithCatch)
                break;
            }
            case REJECTED:{
                return new MyPromise(rejectedFnWithCatch)
                break;
            }
            case PENDING:{
                return new MyPromise((resolve,reject)=>{
                    this.FULFILLED_CALLBACK_LIST.push(()=>{
                        fulfilledFnWithCatch(resolve,reject)
                    })
                    this.rejectedFnWithCatch.push(()=>{
                        rejectedFnWithCatch(resolve,reject)
                    })
                })
            }
        }

    }

    isFunction(param){
        return typeof param === 'function'
    }
}