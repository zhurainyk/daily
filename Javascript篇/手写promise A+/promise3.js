const PENDING = "PENDING";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MPromise {
    FULLFILLED_CALLBACK_LIST = []
    REJECTED_CALLBACK_LIST = []
    _status = PENDING
  constructor(fn) {
    this.value = null;
    this.reason = null;
    this.status = PENDING;
    try{
        fn.apply(this.resolve.bind(this),this.reject.bind(this))
    }catch(e){
        this.reject(e)
    }
  }

 get  status (){
      return this._status;
  }

  set status(newStatus){
      this._status = newStatus;
      switch(this._status){
          case:{
              
          }
      }
  }


  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
    }
  }

  then(onFulfilled,onRejected){
     const onFulfilledFn = this.isFunction(onFulfilled)?onFulfilled:(value)=>value;
     const onRejectedFn = this.isFunction(onRejected) ? onRejected:reason=>{
         throw reason;
     }

    //  const promise2 = new MPromise();

    switch(this.status){
        case FULFILLED:{
            onFulfilledFn(this.value)
            break;
        }
        case REJECTED:{
            onRejectedFn(this.reason)
            break;

        }

        case PENDING :{
            this.FULLFILLED_CALLBACK_LIST.push(onFulfilledFn)
            this.REJECTED_CALLBACK_LIST.push(onRejectedFn)
        }


    }
    //  return promise2;
  }

  isFunction(f){
      return typeof f === 'function'?true:false
  }
}
