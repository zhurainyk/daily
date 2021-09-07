const { type } = require("os");

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _status = PENDING;
  constructor(fn) {
    this.value = null;
    this.status = PENDING;
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
        this.FULFILLED_CALLBACK_LIST.forEach((cb) => cb());
        break;
      }

      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach((cb) => cb());
      }
    }
    return this._status;
  }

  resolve(value) {
    if (this.status == PENDING) {
      this.value = value;
      this.status = FULFILLED;
    }
  }

  reject(reason) {
    this.reason = reason;
    this.status = REJECTED;
  }

  then(onFulfilled, onRejected) {
    const fulfilledFn = this.isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;
    const rejectedFn = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };

    let promise2 = new MPromise((resolve, reject) => {
      let fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            let x = fulfilledFn(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };
      let rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            let x = rejectedFn(this.reason);
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

  isFunction(param) {
    return typeof param === "function";
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new Error("promise error"));
    }
    if (x instanceof MPromise) {
      queueMicrotask(() => {
        x.then((y) => {
          this.resolvePromise(promis2, y, resolve, reject);
        }, reject);
      });
    } else if (typeof x === "object" || this.isFunction(x)) {
      if (x === null) {
        return resolve(x);
      }

      let then = null;
      try {
        then = x.then;
      } catch (e) {
        return reject(e);
      }
      if (this.isFunction(then)) {
        let called = false;
        then.call(
          x,
          (y) => {
            if (called == true) return;
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }
}

class MyPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _stauts = PENDING;
  constructor(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    try {
      fn(this.reaove.bind(this), this.reject.bind(this));
    } catch (error) {}
  }

  get status() {
    return this._status;
  }
  set status(newStatus) {
    this._stauts = newStatus;
    switch (this._stauts) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach((cb) => cb());
        break;
      }
      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach((cb) => cb());
        break;
      }
    }
    return this._stauts;
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
    const fufilledFn = this.isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;
    const rejectedFn = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };
    let promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          const x = fufilledFn(this.value);
          this.resolvePromise(promise2, x, resolve, reject);
        });
      };
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          const x = rejectedFn(this.reason);
          this.resolvePromise(promise2, x, resolve, reject);
        });
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

  isFunction(param) {
    return typeof param === "function";
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (typeof promise2 === x) {
      return reject(new TypeError("xxxxxx"));
    }

    if (x instanceof MyPromise) {
      queueMicrotask(() => {
        x.then((y) => {
          this.resolvePromise(promise2, y, resolve, reject);
        }, reject);
      });
    } else if (typeof x === "object" || this.isFunction(x)) {
      if (x === null) {
        resolve(x);
      }
      let then = null;
      try {
        then = x.then;
      } catch (error) {
        reject(error);
      }
      if (this.isFunction(then)) {
        //防止重复执行
        let called = false;
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
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }
}
 let test1 = new MyPromise((res, rej) => {
      setTimeout(() => {
        console.log(22);
        res(133);
      }, 3333);
    });

    let test2 = new MPromise((res, rej) => {
      setTimeout(() => {
        console.log(22);
        res(1234);
      }, 222);
    });
    let test3 = new MPromise((res, rej) => {
      setTimeout(() => {
        console.log(22);
        res(244);
      }, 113);
    });
