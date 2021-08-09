function foo(){
    console.log('foo的this',this)
}

foo() //this => window


//

function fn(){
    console.log(this.a)
}

const obj = {
    a:1
}

obj.fn = fn;
obj.fn() // 1 


//

const obj = {
    bar:10,
    fn:function(){
        console.log(this.bar)
        console.log(this)
    }
}

const fn = obj.fn;
fn() // undefined  window 


//

const o1 = {
    text:'o1',
    fn:function(){
        console.log(this.text)
    }
}

const o2 = {
    text:'02',
    fn:function(){
        return o1.fn()
    }
}

const o3 = {
    text:'o3',
    fn:function(){
        let fn = o1.fn;
        return fn()
    }

}

console.log(o1.fn())
console.log(o2.fn())
console.log(o3.fn())