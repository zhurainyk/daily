console.log("start");

setTimeout(() => {
  console.log("setTimeout1");
}, 0);

(async function foo() {
  console.log("async 1");

  await asyncFunction(); //这里相当于是一个promise new Promise((resolve)=>{console.log((asyncFunction);)})

  console.log("async2");

})().then(console.log("foo.then"));

async function asyncFunction() {
  console.log("asyncFunction");

  setTimeout(() => {
    console.log("setTimeout2");
  }, 0);

  new Promise((res) => {
    console.log("promise1");

    res("promise2");
  }).then(console.log);
}

console.log("end");

