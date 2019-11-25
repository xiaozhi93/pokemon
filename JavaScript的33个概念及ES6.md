https://github.com/stephentian/33-js-concepts
执行原理  数据类型   函数    类和对象
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


# ES6
ecma为JavaScript指定的第6个版本，es2015,es2016,es2017，es2018，es2019及es提案统称为es6

## ES6更新内容
- 表达式： 声明，解构赋值
- 语句与运算： Class, Module, Iterator
- 内置对象： 字符串拓展，数值拓展
