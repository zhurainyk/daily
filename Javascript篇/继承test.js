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

// function father(name){
//     this.name = name
//     this.colors = ['red','blue']
// }
// function child (name,age){
//     father.call(this,name)
//     this.age = age;
// }

// child.prototype = new father()
// child.prototype.constructor = child;

// var child1 = new child('zy',18)
// child1.colors.push('yellow')
// console.log(child1.name,child1.age,child1.colors) //zy 18 ['red', 'blue', 'yellow']

// var child2= new child('zy2',19)
// child2.colors.push('green')
// console.log(child2.name,child2.age,child2.colors)  //zy2 19  ["red", "blue", "green"]


// function createObj(o) {
//   function F() {}
//   F.prototype = o;
//   return new F();
// }

// let person = {
//   name: "zy",
//   habits: ["eat", "sleep"],
// };

// let person1 = createObj(person);
// let person2 = createObj(person);

// person1.name = "zy1";

// person2.habits.push("read");

//   console.log(person1.name,person1.habits,person2.name,person2.habits)


// function createObj(o){
//     let clone = Object.create(o)
//     clone.sayHi = ()=>console.log('hi')
//     return clone;
// }

// let p = {a:1,b:2}
// let p1 = new createObj(p)
// p1.sayHi()


// function father(name){
//     this.name = name;
//     this.colors = [3,5,6,7]
// }

// function child(name,age){
//     father.call(this,name)
//     this.age = age;
// }
// child.prototype = new father()

// let c1 = new child('zhuyu',19)
// let c2 = new child('xiaoming',20)
// c2.colors.push(44)
// console.log(c1.name,c1.colors,c2.name,c2.age,c2.colors)


function Father(name){
    this.name = name;
    this.nums = [2,3,5]
}

Father.prototype.getName = function(){
  console.log(this.name)
}

function Child(name,age){
    Father.call(this,name)
    this.age = age
}

function F(){}
F.prototype = Father.prototype;

Child.prototype = new F()

let child1 = new Child('zhuy',19)
console.log(child1.name,child1.age,child1.nums)
