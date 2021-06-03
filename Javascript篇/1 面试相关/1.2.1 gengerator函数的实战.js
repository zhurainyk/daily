
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