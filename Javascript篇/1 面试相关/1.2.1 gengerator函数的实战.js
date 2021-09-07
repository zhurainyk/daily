
function* test(i){
    let a = 5;
    while(true){
        i++;
        if(i>a) break;
        yield i   //这个i就是每次执行next后返回的参数{value:''}

    }
}

let t = test(0)                                          
 t.next()
// {value: 1, done: false}

 t.next()
// {value: 2, done: false}

 t.next()
// {value: 3, done: false}

 t.next() 
// {value: 4, done: false}

 t.next()
// {value: 5, done: false}

 t.next()
// {value: undefined, done: true}




function* loop(total){
    for(let i =0;i<total;i++){
        console.log(`我是${i}`)
        yield i;
    }
}


let i = 0;
function task(fn){
   let n =  fn.next()
   console.log(n)
   while(!n.down){
       i++;
       if(i>3)
            break;
       task(fn)
       
   }
   console.log('结束')
  
   
  

}

task(loop(5))

