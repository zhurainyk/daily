const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
console.log("333");

class MPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
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

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    switch (this.status) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach((cb) => {
          cb(this.value);
        });
        break;
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
    const realOnRejected = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };

    const promise2 = new MPromise((resolve, reject) => {
      const fulfillMicrotask = () => {
        queueMicrotask(() => {
          try {
            let x = realOnFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      const rejectMicrotask = () => {
        queueMicrotask(() => {
          try {
            let x = realOnRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };
      switch (this.status) {
        case FULFILLED: {
          fulfillMicrotask();
          break;
        }

        case REJECTED: {
          rejectMicrotask();
          break;
        }

        case PENDING: {
          this.FULFILLED_CALLBACK_LIST.push(fulfillMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejectMicrotask);
          break;
        }
      }
    });
    return promise2;
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(
        new TypeError("the promise and the return value are the same")
      );
    }
    if (x instanceof MPromise) {
      queueMicrotask(() => {
        x.then((y) => {
          this.resolvePromise(promise2, y, resolve, reject);
        }, reject);
      });
    } else if (typeof x === "object" || this.isFunction(x)) {
      if (x === null) {
        return resolve(x);
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
              if (called) {
                return;
              }
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } catch (error) {
          if (called) return;
          reject(error);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }

  isFunction(value) {
    return typeof value === "function";
  }
}

const test = new MPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
  }, 1000);
}).then(value=>{
    console.log(value)
})
console.log("333");
