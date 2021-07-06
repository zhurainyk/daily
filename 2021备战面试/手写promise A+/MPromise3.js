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
    } catch (e) {}
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    switch (this._status) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach((cb) => {
          cb(this.value);
        });
      }

      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach((cb) => {
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
    const realOnFulfilled = this.isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;
    const realOnRjected = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };

    const promise2 = new MPromise((resolve, reject) => {
      let fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            let x = realOnFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      let rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            let x = realOnRjected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      switch (this.status) {
        case FULFILLED: {
          fulfilledMicrotask();
          break;
        }

        case REJECTED: {
          rejectedMicrotask();
        }

        case PENDING: {
          this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);
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
    return new MPromise((resolve, reject) => {
      return resolve(value);
    });
  }

  static reject(reason) {
    return new MPromise((resolve, reject) => {
      return reject(reason);
    });
  }

  static race(promiseList) {
        return new MPromise((resolve, reject) => {
            const length = promiseList.length;

            if (length === 0) {
                return resolve();
            } else {
                for (let i = 0; i < length; i++) {
                    MPromise.resolve(promiseList[i]).then(
                        (value) => {
                            return resolve(value);
                        },
                        (reason) => {
                            return reject(reason);
                        });
                }
            }
        });

    }

resolvePromise(promise2, x, resolve, reject) {
    // 如果 newPromise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 newPromise
    // 这是为了防止死循环
    if (promise2 === x) {
        return reject(new TypeError('The promise and the return value are the same'));
    }

    if (x instanceof MPromise) {
        // 如果 x 为 Promise ，则使 newPromise 接受 x 的状态
        // 也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
        queueMicrotask(() => {
            x.then((y) => {
                this.resolvePromise(promise2, y, resolve, reject);
            }, reject);
        })
    } else if (typeof x === 'object' || this.isFunction(x)) {
        // 如果 x 为对象或者函数
        if (x === null) {
            // null也会被判断为对象
            return resolve(x);
        }

        let then = null;

        try {
            // 把 x.then 赋值给 then 
            then = x.then;
        } catch (error) {
            // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
            return reject(error);
        }

        // 如果 then 是函数
        if (this.isFunction(then)) {
            let called = false;
            // 将 x 作为函数的作用域 this 调用
            // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
            try {
                then.call(
                    x,
                    // 如果 resolvePromise 以值 y 为参数被调用，则运行 resolvePromise
                    (y) => {
                        // 需要有一个变量called来保证只调用一次.
                        if (called) return;
                        called = true;
                        this.resolvePromise(promise2, y, resolve, reject);
                    },
                    // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                    (r) => {
                        if (called) return;
                        called = true;
                        reject(r);
                    });
            } catch (error) {
                // 如果调用 then 方法抛出了异常 e：
                if (called) return;

                // 否则以 e 为据因拒绝 promise
                reject(error);
            }
        } else {
            // 如果 then 不是函数，以 x 为参数执行 promise
            resolve(x);
        }
    } else {
        // 如果 x 不为对象或者函数，以 x 为参数执行 promise
        resolve(x);
    }
}

  isFunction(value) {
    return typeof value === "function";
  }
}

// const test = new MPromise((resolve,reject)=>{
//     console.log('eee')
//     setTimeout(()=>{

//         // resolve(111)
//         reject(222)

//     },1000)
// }).then(value=>{
//     console.log(value)
// }).catch(e=>{
//     console.log(e)
// })

// const test1 = new MPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(111);
//     }, 1000);
// });
// const test2 = new MPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(222);
//     }, 2000);
// });
// const test3 = new MPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(333);
//     }, 3000);
// });

let test1 = new MPromise((res,rej)=>{
    setTimeout(()=>{
        console.log(22)
        res(133)
    },3333)
})

let test2 = new MPromise((res,rej)=>{
    setTimeout(()=>{
         console.log(22)
        res(1234)
    },222)
})
let test3 = new MPromise((res,rej)=>{
    setTimeout(()=>{
         console.log(22)
        res(244)
    },113)
})

MPromise.race([test3, test2, test1]).then(console.log);

// const test = new MPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(111);
//     }, 1000);
// });

// const test2 = new MPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(222);
//     }, 2000);
// });

// const test3 = new MPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(333);
//     }, 3000);
// });

// MPromise.race([test, test2, test3]).then(console.log);
