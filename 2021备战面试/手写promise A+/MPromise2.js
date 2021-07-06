const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _status = PENDING;
  constructor(fn) {
    // 初始状态为pending
    this.status = PENDING;
    this.value = null;
    this.reason = null;
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
        this.FULFILLED_CALLBACK_LIST.forEach((callback) => {
          callback(this.value);
        });
        break;
      }

      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach((cb) => {
          cb(this.reason);
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
    const realOnFulfilled = this.isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;
    const realOnRejected = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };
    let promise2 = new MPromise((resolve, reject) => {
      let fulfilledMicrotask = () => {
        try {
          let x = realOnFulfilled(this.value);
          this.resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      };

      let rejectedMicrotask = () => {
        try {
          let x = realOnRejected(this.reason);
          this.resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      };

      switch (this.status) {
        case FULFILLED: {
          fulfilledMicrotask();
          break;
        }

        case REJECTED: {
          rejectedMicrotask();
          break;
        }

        case PENDING: {
          this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);
          break;
        }
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    if (value instanceof MPromise) {
      return value;
    }
    return new MPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static race(promiseList) {
    return new MPromise((resolve, reject) => {
      let length = promiseList.length;
      if (length === 0) {
        return  resolve()
      }
      for(let i=0;i<length;i++){
          MPromise.resolve(promiseList[i]).then(value=>{
              return resolve(value)
          },
             reason=>{
                return reject(reason)
             }
          )
      }
    });
  }

  isFunction(value) {
    return typeof value === "function";
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError("报错"));
    }
    if (x instanceof MPromise) {
      x.then((y) => {
        this.resolvePromise(promise2, y, resolve, reject);
      }, reject);
    } else if (typeof x === "object" || this.isFunction(x)) {
      if (x === null) {
        resolve(x);
      }
      let then = null;
      try {
        then = x.then;
      } catch (error) {
        return reject(error);
      }

      if (this.isFunction(then)) {
        let called = false;
        try {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } catch (e) {
          if (called) return;
          called = true;
          reject(e);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }
}

let test = new MPromise((resolve, reject) => {
  setTimeout(() => {
    console.log("33");
    resolve(111);
  }, 1000);
})
  .then((value) => {
    console.log(value, test);
  })
  .catch((e) => {
    console.log("catch", e, test);
  });

console.log(test);
