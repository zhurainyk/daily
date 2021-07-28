//联合类型
let x: string | number = 1;
x = "abc";
// x = true  这就会报错

// 任意类型
let y: any = true;
y = 123;
y = "abc";

//定义数组类型

let arr: number[] = [2, 3, 4, 5];
let arr2: string[] = ["a", "b", "c"];
let arr3: object[] = [{ a: 1 }, { a: 2 }];

let arr4: any[] = [2, "3", {}, [], true];

//泛型  类型 + 尖括号 加类型 可用联合类型
let arr5: Array<string | number> = [2, 3, 4, "a", "b"];

//接口

//定义文章的接口
interface Artical {
  title: string;
  content: string;
  pageSize: number;
  paseNum: number;
  readNum?: number; //该属性表示可有可无
}

let artical: Artical = {
  title: "ni",
  content: "22",
  pageSize: 1,
  paseNum: 2,
  readNum: 1,
};

let artical2: Artical = {
  title: "ni",
  content: "22",
  pageSize: 1,
  paseNum: 2,
};

//任意类型的接口属性

interface Bag {
  size: number; //必填
  color: string; //必填
  money?: number; //可填可不填
  [propName: string]: any; //propName可以是任意字符 这里是语义化写法
}

let myBag: Bag = {
  size: 11,
  color: "red",
  money: 123,
  pay() {
    //可以是任意类型
    console.log(this.money, this.color);
  },
};

myBag.pay();

//函数

function sum(a: number, b: number): object {
  //   return a + b;
  return {
    value: a + b,
  };
}

// sum(1,'3')
sum(1, 2);

//返回数据类型绑定接口
interface Value {
  value: number;
  type: string;
}

function sum2(a: number, b: number): Value | string {
  //定义了输出类型必须是接口或者字符串
  return {
    value: a + b,
    type: "number",
  };
}
// console.log(sum2(1,2))

function arrs(a: number, b: number): number[] {
  //定义了输出类型数组
  return [a, b];
}

function noReturn(a: number, b: number): void {
  //无返回值 void
  if (a > b) {
    console.log(a > b);
  }
}

//泛型的使用

//t 表示参数的类型
function fanxing<t>(a: t, b: t): t[] {
  return [a, b];
}
//使用的时候  传入参数
console.log(fanxing<string>("a", "b"));

//泛型传多个类型

function fn<t1, t2, t3>(a: t1, b: t2): any {
  return [a, b];
}

console.log(fn<string, number, boolean>("a", 1));

//typeof  typeof操作符可以用来获取一个变量或对象的类型。

interface Cup {
  color: string;
  shape: string;
  money: number;
}

let myCup: Cup = {
  color: "red",
  shape: "round",
  money: 123,
};

type newType = typeof myCup;

let b: newType = {
  color: "blue",
  shape: "aaa",
  money: 233,
};
// console.log(b)

interface Person2 {
  name: string;
  age: number;
  height?: number;
}

type personKey = keyof Person2;

let tom: personKey = "name";
let Ais: personKey = "age";
let s: personKey = "height";

// in 操作符

type Mykeys = "a" | "b" | "c";

type obj = {
  [s in Mykeys]: any; //obj中的所有属性必须包含Mykeys中的key
};

let o: obj = {
  a: 2,
  b: 3,
  c: true,
};

//extends

interface Length {
  length: number;
}

function test1<T extends Length>(param: T): T {
  console.log(param);
  return param;
}

test1("abcd");

//Partial

interface MyParitial {
  name: string;
  age: number;
  sex: string;
}

type mParitial = Partial<MyParitial>; //将类型中的所有属性变为 可选项

const person: mParitial = {
  name: "zhuy",
  age: 12,
};

//Required 将所有属性变为必选项

interface Person1{
    name:string,
    age?:number,
    height?:number
}

const Tom:Required<Person1> = {
    name:'zhuu',
    age:19,
    height:20 //
}

//Readonly

interface Name{
    length:number,

}
type Name1 = Readonly<Name>;
let Tom2:Name1 = {
    length:22
}
// Tom2.length = 33 //报错 只读

//Record

interface Mykey {
    title:string
}
type artical = 'a' | 'b' | 'c'

const myArtical:Record<artical,Mykey> = {
    a:{title:'2'},
    b:{title:'333'},
    c:{title:'xxx'}
}

//Exclude 
type T0 = Exclude<'a'|'b','a'> //从 a|b 中移除 a  得到b

const t:T0 = 'b'

//Extract 

type T1 = Extract<'a'|'b'|'c','a'|'c'>
const t1:T1 = 'a'
const t2:T1 = 'c'

interface User{
  age:string,
  sex:string
}

type Name2 = {
  name:string
}

interface User2 extends Name2{
  sex:string
}

const tt : User2 = {
  name:'sss',
  sex:'222'
}

type User3 = User2 & {
  age:number
}

//Pick

type User4 = Pick<User3,'age'>
const Tos :User4 = {
  age:44
}

//Omit 

type User5 = Omit<User3,'sex'>

const Z5 :User5 = {
  name:'ss',
  age:3
}

//泛型

interface S<T,TT>{
  name:T,
  age:TT
}

type SS = S<string,number>

const t23:SS = {
  age:22,
  name:'ss'
}

import {measure} from './装饰器'

measure(test,test,test)
test()
function test(){
  console.log('test')
}


