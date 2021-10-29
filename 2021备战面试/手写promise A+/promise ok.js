const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _status = PENDING;
  constructor(fn) {
    this.value = null;
    this.reason = null;
    this.status = PENDING;

    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    switch (this._status) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach((cb) => {
          cb();
        });
        break;
      }
      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach((cb) => {
          cb();
        });
        break;
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
    const fulFilledFn = this.isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;
    const rejectedFn = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };

    const fulfilledFnWithCatch = (resolve, reject, newPromise) => {
      try {
        if (!this.isFunction(onFulfilled)) {
          resolve(this.value);
        } else {
          const x = fulFilledFn(this.value);
          this.resolvePromise(newPromise, x, resolve, reject);
        }
      } catch (e) {
        reject(e);
      }
    };

    const rejectedFnWithCatch = (resolve, reject, newPromise) => {
      try {
        if (!this.isFunction(onRejected)) {
          resolve();
        } else {
          const x = rejectedFn(this.value);
          this.resolvePromise(newPromise, x, resolve, reject);
        }
      } catch (e) {
        reject(e);
      }
    };

    switch (this.status) {
      case FULFILLED: {
        const newPromise = new MPromise((resolve, reject) =>
          fulfilledFnWithCatch(resolve, reject, newPromise)
        );
        return newPromise;
        break;
      }
      case REJECTED: {
        const newPromise = new MPromise((resolve, reject) =>
          rejectedFnWithCatch(resolve, reject, newPromise)
        );
        return newPromise;
        break;
      }
      case PENDING: {
        const newPromise = new MPromise((resolve, reject) => {
          this.FULFILLED_CALLBACK_LIST.push(() =>
            fulfilledFnWithCatch(resolve, reject, newPromise)
          );
          this.REJECTED_CALLBACK_LIST.push(() =>
            rejectedFnWithCatch(resolve, reject, newPromise)
          );
        });

        break;
      }
    }
  }

  resolvePromise(newPromise,x,resolve,reject){
      if(x === newPromise){
          return reject(new TypeError('xxxxx'))
      }
      if(x instanceof MPromise){
          x.then((y)=>{
              this.resolvePromise(newPromise,y,resolve,reject);
          },reject)
      }else if(typeof x === 'object' || this.isFunction(x)){
          if(x === null){
              return resolve(x)
          }

          let then = null;
          try{
              then = x.then;
          }catch(e){
              return reject(e)
          }
          if(this.isFunction(then)){
              let called = false;
              try{
                  then.call(x,y=>{
                      if(called) return;
                      called = true;
                      this.resolvePromise(newPromise,y,resolve,reject)
                  },r=>{
                      if(called) return;
                      called = true;
                      reject(r)
                  })
              }catch(e){
                  if(called) return ;
                  reject(error)
              }
          }else{
              resolve(x)
          }
      }else{
          resolve(x)
      }
  }

  isFunction(param) {
    return typeof param === "function";
  }


}
