const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MPromise {
  FULFILLED_CALLBACK_LIST = []
  REJECTED_CALLBACK_LIST = []
  _status = PENDING;
  constructor(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  get _status(){
    return this._status
  }

  set _status(newStatus){
    this._status = newStatus;
    switch(newStatus){
      case FULFILLED:{
        this.FULFILLED_CALLBACK_LIST.forEach(cb=>{
          cb(this.value)
        })
      }
      case REJECTED:{
        this.REJECTED_CALLBACK_LIST.forEach(cb=>{
          cb(this.reason)
        })
      }
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
    }
  }

  then(onFulfilled, onRejected) {
    const fulfilledFn = this.isFunction(onFulfilled)? onFulfilled: value => value;
    const rejectedFn = this.isFunction(onRejected)? onRejected :reason => {
          throw reason;
        };

    const fulFilledFnWithCatch = (resolve,reject)=>{
      try{
        fulfilledFn(this.value)
        resolve(this.value)
      }catch(e){
        reject(e)
      }
    }
    const rejectedFnWithCatch = (resolve,reject)=>{
      try{
        rejectedFn(this.reason)
       if(this.isFunction(onRejected)){
          resolve()
       }
      }catch(e){
        reject(e)
      }
    }




    switch (this.status) {
      case FULFILLED: {
        // fulfilledFn(this.value)
        // fulFilledFnWithCatch(this.value)
        const newPromise =    new MPromise((resolve,reject)=>fulFilledFnWithCatch(resolve,reject,newPromise))
        return newPromise
        break;
      }
      case REJECTED: {
        // rejectedFn(this.reject)
        // rejectedFnWithCatch(this.reason)
        const newPromise = new MPromise((resolve,reject)=>rejectedFnWithCatch(resolve,reject,newPromise))
        return newPromise
        break;
      }
      case PENDING:{
        // // this.FULFILLED_CALLBACK_LIST.push(fulfilledFn)
        // this.FULFILLED_CALLBACK_LIST.push(()=>fulFilledFnWithCatch(resolve,reject))
        // // this.REJECTED_CALLBACK_LIST.push(rejectedFn)
        // this.REJECTED_CALLBACK_LIST.push(()=>rejectedFnWithCatch(resolve,reject))
      const newPromise = new MPromise((resolve,reject)=>{
             this.FULFILLED_CALLBACK_LIST.push(()=>fulFilledFnWithCatch(resolve,reject))
              this.REJECTED_CALLBACK_LIST.push(()=>rejectedFnWithCatch(resolve,reject))
        })
        return newPromise
      }
    }
  }
  isFunction(param) {
    return typeof param === "function";
  }
}
