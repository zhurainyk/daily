export  function timeSlice (generatorFun, duration = 12) {
  if (typeof generatorFun !== "function") return;
  const fun = generatorFun();
  if (!fun || typeof fun.next !== "function") return;
  const next = () => {
    const start = performance.now();
    do {
      const res = fun.next();
      if (res.done) return;
    } while (performance.now() - start < duration);
    setTimeout(next, 1);
  };
  return setTimeout(next, 1);
}

// let i = 0;
// const f = (i)=>{

//    setTimeout((x,y)=>{
//        console.log(x,y)
//    },1000, i,i+1)
// }
// f(i)
