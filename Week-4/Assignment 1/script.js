const STATE = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
};

const isThenable = (val) => {
  return val instanceof MyPromise;
};

class MyPromise {
  constructor(callback) {
    this.state = STATE.PENDING;
    this.value = undefined;
    this.handlers = [];
    try {
      callback(this._resolve, this._reject);
    } catch (err) {
      this._reject(err);
    }
  }

  _resolve = (value) => {
    this.updateResult(value, STATE.FULFILLED);
  };

  _reject = (error) => {
    this.updateResult(error, STATE.REJECTED);
  };

  updateResult(value, state) {
    setTimeout(() => {
      if (this.state !== STATE.PENDING) {
        return;
      }
      if (isThenable(value)) {
        return value.then(this._resolve, this._reject);
      }

      this.value = value;
      this.state = state;

      this.executeHandlers();
    }, 0);
  }

  addHandlers(handlers) {
    this.handlers.push(handlers);
    this.executeHandlers();
  }

  executeHandlers() {
    if (this.state === STATE.PENDING) {
      return null;
    }

    this.handlers.forEach((handler) => {
      if (this.state === STATE.FULFILLED) {
        return handler.onSuccess(this.value);
      }
      return handler.onFail(this.value);
    });
    this.handlers = [];
  }

  then(onSuccess, onFail) {
    return new MyPromise((res, rej) => {
      this.addHandlers({
        onSuccess: function (value) {
          if (!onSuccess) {
            return res(value);
          }
          try {
            return res(onSuccess(value));
          } catch (err) {
            return rej(err);
          }
        },
        onFail: function (value) {
          if (!onFail) {
            return rej(value);
          }
          try {
            return res(onFail(value));
          } catch (err) {
            return rej(err);
          }
        },
      });
    });
  }

  catch(onFail) {
    return this.then(null, onFail);
  }

  finally(callback) {
    return new MyPromise((res, rej) => {
      let val;
      let wasRejected;
      this.then(
        (value) => {
          wasRejected = false;
          val = value;
          return callback();
        },
        (err) => {
          wasRejected = true;
          val = err;
          return callback();
        }
      ).then(() => {
        if (!wasRejected) {
          return res(val);
        }
        return rej(val);
      });
    });
  }
}

// Main Function
function getNumber() {
  return parseInt(Math.random() * 100, 10);
}
function IsDivisableByFive() {
  return new MyPromise((resolve, reject) => {
    const random = getNumber();
    if (random % 5 !== 0) resolve(`Resolve - ${random}`);
    else reject(`Reject - ${random}`);
  });
}

IsDivisableByFive().then(console.log).catch(console.log);
