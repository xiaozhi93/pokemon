https://github.com/stephentian/33-js-concepts
执行原理  数据类型  变量及表达式和语句  函数    类和对象
# javascript如何工作（执行机制）-调用栈堆

## 知识点
- JavaScript是按照语句出现的顺序执行的
- JavaScript是一门单线程的语言
- Javascript执行机制 事件循环Event Loop
- JavaScript事件循环(单线程)，主线程读取代码执行代码，或者进入宏任务列队，或者进入微任务队列。一轮读取完毕主线程再次从宏任务队列中读取任务。。读取完毕再次读取，，循环着读取。。
- 同步任务及异步任务
- 任务队列（Event Queue），宏任务队列，微任务队列
- 宏任务（script,setTimeout, setInterval）及微任务(Promise, process.nextTick)（属于某个宏任务的微任务）
- 主线程（代码都在主线程执行，主线程执行同步任务）
- 页面中script这个宏任务作为第一个进入主线程执行



# javascript 原始数据或者基本类型
一种既非对象也无方法的数据，多数情况下，基本类型直接代表最底层的语言实现。
- string
- number
- boolean
- null
- undefined
- symbol
- bigint

## 特征
- 原值是不可改变的，不能像数组，对象以及函数那样被改变
- 无对象无方法
- 占用空间固定，保存在栈中（内容直接存储在栈中，大小固定位置连续的存储空间），记录的是该数据类型的值，即直接访问,基础类型赋值时复制。
- 基本类型数据是值类型
- 使用typeof 检测数据的类型
- 作为函数的参数时，被传递的值会被复制给一个局部变量

## 注意
基本类型本身和一个赋值未基本类型的变量的区别，，，，变量是对值的引用
```
// 使用字符串方法不会改变一个字符串
var bar = "baz";
console.log(bar);               // baz
bar.toUpperCase();
console.log(bar);               // baz

// 使用数组方法可以改变一个数组
var foo = [];
console.log(foo);               // []
foo.push("plugh");
console.log(foo);               // ["plugh"]

// 赋值行为可以给基本类型一个新值，而不是改变它
bar = bar.toUpperCase();       // BAZ
```
## 基本类型包装对象(除null和undefined)
- String
- Number
- BigInt
- Boolean
- Symbol


# 值类型（基本类型）和引用类型
引用类型通常也可以叫做类（class）,引用类型的实例相当于对象。但是也并不是传统上的类。
- 对象Object
- 数组Array
- 函数Function

## 特征
- 占用空间不固定，保存在堆中(堆所对应的栈中记录的时指针（堆的地址）)
- 保存与赋值的是指向对象的一个指针（基本类型复制的是值）
- 使用instanceof 检测数据类型
- 使用new() 方法构造出的对象是引用型
- 作为函数参数时，会把这个值在内存中的地址复制给一个局部变量（局部变量的变化反应在函数的外部）


# 隐式，显式，名义和鸭子类型（动态类型语言，使用全等运算符 === 进行条件判断规避隐式转换的问题）
隐式转换在遇到算数运算符（-，*，/和%）的时候，运算之前将参与运算的双方转换成数字
在加号运算符式，，当遇到字符串的时候进行字符串拼接
强制类型转换 String, Number Boolean,


# == vs ===, typeof vs instanceof

=== 全等运算符会比较两个值的类型及值
== 相等运算符会先进行类型转换，然后再比较值

instanceof 简单理解 一个对象是否是另一个对象new出来的实例,（instanceof 检测左侧的 __proto__ 原型链上，是否存在右侧的 prototype 原型） 实际instanceof运算时会递归查找左边对象的原型链，直到找到了或者到顶层为止。
```
//假设instanceof运算符左边是L，右边是R
L instanceof R //instanceof运算时，通过判断L的原型链上是否存在R.prototype
L.__proto__.__proto__ ..... === R.prototype ？ //如果存在返回true 否则返回false

```

# this, call, apply 和bind
this 表示当前上下文环境
this 允许复用函数时使用不同的上下文
this 会随着函数调用方式的变化而变化，哪个对象调用它就是哪个对象。

## 知识点
- 上下文
- 函数调用方式
## 查找引用（函数调用方式判断this）
- 隐式绑定
- 显式绑定
- new绑定
- window绑定
- 事件处理器当前上下文

## 隐式绑定
哪个对象调用它就是哪个对象
## 显示绑定
通过apply绑定当前对象

## 更改this指向
使用apply, call，bind进行显示绑定，或者使用箭头函数，，或者_this = this

call， apply, bind都可以改变this的指向。
apply, call的区别式传递参数的形式不同， call接受若干个参数， apply接受包含多个参数的数组
bind创建一个新的函数，，需要手动调用

## 函数对象方式
- 作为一个函数调用
- 作为对象的方法调用
- 使用new 关键词嗲用
- 在一个函数内被调用

# 函数作用域， 块级作用域和词法作用域
作用域就是一套规则，用于确定在何处以及如何查找变量（标识符）的规则”
作用域（Scope）即代码执行过程中的变量、函数或者对象的可访问区域，作用域决定了变量或者其他资源的可见性；
## 作用域
- 全局作用域
- 函数作用域
- 块级作用域
- 词法作用域

## 知识点
- 作用域就是执行上下文（每个执行上下文分为内存分配与执行两个阶段）

# 闭包（访问函数内部变量，避免全局变量污染）
变量的作用域： 全局变量和局部变量；
函数内部能够读取全局变量，函数的外部无法读取函数内的局部变量。。外部读取函数的局部变量，将函数内部返回一个函数，然后给外部。。
闭包就是能够读取其他函数内部变量的函数 或者也可以理解成定义在一个函数内部的函数。。闭包会在父函数外部，改变父函数内部变量的值
本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。。
闭包的两个用处： 读取函数内部的变量，让变量的值始终保存在内存中。
## 闭包特征
- 闭包会在父函数外部，改变父函数内部变量的值
- 闭包会导致内存消耗很大
```
function f1(){

　　　　var n=999;

　　　　nAdd=function(){n+=1}

　　　　function f2(){
　　　　　　alert(n);
　　　　}

　　　　return f2;

　　}

　　var result=f1();

　　result(); // 999

　　nAdd();

　　result(); // 1000
```
result实际就是闭包f2函数。 变量n一直保存在内存中，不会在f1调用被自动清除。。
f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收
nAdd前面没有使用var关键字，因此nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。
# 变量提升
函数及变量的声明都将被提升到函数的最顶部;变量可以在使用后声明，也就是变量可以先使用再声明。
```
x = 5; // 变量 x 设置为 5

elem = document.getElementById("demo"); // 查找元素
elem.innerHTML = x;                     // 在元素中显示 x

var x; // 声明 x


等于
var x; // 声明 x
x = 5; // 变量 x 设置为 5

elem = document.getElementById("demo"); // 查找元素
elem.innerHTML = x;                     // 在元素中显示 x

```

# 表达式，运算符和语句，声明
表达式都有返回值（如果没有返回值就是undefined）。
语句就是整句或命令。js语句是以分号结束；把表达式当做语句的用法也称作表达式语句，类似的语句还有声明语句（用来声明变量或定义新函数）


# 立即执行函数，模块化，命名空间

# Promise
异步解决方案之一，Promise 是一个对象，它代表了一个异步操作的最终完成或者失败
## Promise的基本使用

## Promise实现原理

# 构造函数，原型，继承与原型链
## 关键字
- 构造函数及new关键字
- prototype
- constructor属性
- _proto_
- 原型链
  
### 构造函数
> 构造函数用来创建新对象。构造函数本身就是一个函数，与普通函数没有任何区别，只不过为了区分，将首字母大写.
- 不适用new调用函数就是普通函数，直接执行内部代码，使用new, 函数的角色就成为构造函数，创建一个对象并返回。
new关键字的内部实现机制(创建一个新对象，函数与对象绑定关系，函数执行，并且返回)：
- 创建一个新对象
- 将构造函数的作用域赋值给新对象
- 执行构造函数中的代码
- 返回新对象
  var obj = {}
  obj._proto_=constructor.prototype
  consturctor.call(this)
  return obj
### prototype
> 每一个函数都有一个prototype属性；
只要创建一个新函数，根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。
{
  constructor: f Fn()，
  _proto_:Object
}
### constructor属性
> 每一个原型对象都有一个constructor属性
创建自定义构造函数后，其原型对象值会默认取得constructor属性，这个属性解决了对象识别问题，及通过该属性判断出实例时有哪个构造函数创建的
Foo.prototype.constructor === Foo

### _proto_
> 每一个实例都有一个_proto_指针，指向构造函数的原型对象。

### 原型链
原型链的理论主要基于构造函数，实例和原型对象的关系

# 函数式编程，偏函数（partial），柯里化(curry)，Compose和Pipe
偏函数指的式固定一个函数的一些参数，然后产生另一个更小元的函数
```
function add(a, b) {
    return a + b;
}

// 执行 add 函数，一次传入两个参数即可
add(1, 2) // 3

// 假设有一个 partial 函数可以做到局部应用
var addOne = partial(add, 1);

addOne(2) // 3
```

柯里化就是将一个多参数函数转换成多个单参数函数，也就是将一个n元函数转换成n个一元函数
柯里化： 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
```
var curry = require('lodash').curry;

var match = curry(function(what, str) {
  return str.match(what);
})

match(/\s+/g, "hello world");
// [ ' ' ]

match(/\s+/g)("hello world");
// [ ' ' ]
```

# 代码整洁之道与重构（编写可复用，可重构的JavaScript软件）


# ES6
ecma为JavaScript指定的第6个版本，es2015,es2016,es2017，es2018，es2019及es提案统称为es6

## ES6更新内容
- 表达式： 声明，解构赋值
- 语句与运算： Class, Module, Iterator
- 内置对象： 字符串拓展，数值拓展，对象拓展，数组拓展，函数拓展，正则拓展，Symbol,Set,Map,Proxy,Reflect
- 异步编程： Promise, Generator, Async


## 表达式
