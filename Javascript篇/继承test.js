// function father(){
//     this.name = 'zhuyu'
// }
// function child (){
    
// }
// child.prototype = new father()

// var child1 = new child()
// console.log(child1.name) //zhuyu



// function father(name){
//     this.name = name
// }
// function child (name,age){
//     father.call(this,name)
//     this.age = age;
// }


// var child1 = new child('zy',18)
// console.log(child1.name,child1.age) //zy 18



function father(name){
    this.name = name
    this.colors = ['red','blue']
}
function child (name,age){
    father.call(this,name)
    this.age = age;
}

child.prototype = new father()
child.prototype.constructor = child;


var child1 = new child('zy',18)
child1.colors.push('yellow')
console.log(child1.name,child1.age,child1.colors) //zy 18 ['red', 'blue', 'yellow']

var child2= new child('zy2',19)
child2.colors.push('green')
console.log(child2.name,child2.age,child2.colors)  //zy2 19  ["red", "blue", "green"]