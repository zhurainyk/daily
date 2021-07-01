const PENDING = "pendong";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * then 的实现
 * 接收2个参数 onFulfilled onRejected
 * 检查参数类型
 * 根据promise状态 调用不同的函数
 * 用2个数组存储异步代码
 */
class MPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALL_LIST = [];
  _status = PENDING;
  constrctor(fn) {
    this.value = null;
    this.reason = null;
    this.status = PENDING;
    //同步执行
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
    switch (newStatus) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach((cb) => {
          cb(this.value);
        });
      }
      case REJECTED: {
        this.REJECTED_CALL_LIST.forEach((cb) => {
          cb(this.reason);
        });
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
    const fulfilledFn = this.isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value; //返回一个函数
    const rejectedFn = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };
    const fulFilledFnWithCatch = (res, rej) => {
      try {
        fulFilledFn(this.value);
        res(this.value)
      } catch (e) {
        rej(e);
      }
    };

    const rejectFnWithCatch = (res, rej) => {
      try {
        rejectedFn(this.value);
        if(this.isFunction(onRejected)){
            res()
        }
      } catch (e) {
        rej(e);
      }
    };

    switch (this.status) {
      case FULFILLED: {
          return new MPromise(fulFilledFnWithCatch)

        break;
      }
      case REJECTED: {
          return new MPromise(rejectFnWithCatch)
    
      }

      case PENDING: {
        return new MPromise((resolve, reject) => {
          this.FULFILLED_CALLBACK_LIST.push(()=>fulFilledFnWithCatch(resolve,reject));
          this.REJECTED_CALL_LIST.push(()=>rejectFnWithCatch(resolve,reject));
        });
      }
    }
  }

  isFunction(param) {
    return typeof param === "function";
  }
}

const promise = new MPromise((resolve, reject) => {
  resolve();
});
