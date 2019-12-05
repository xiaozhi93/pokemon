编写高质量的js代码
链接 [https://www.zcfy.cc/article/clean-code-javascript-readme-md-at-master-ryanmcdermott-clean-code-javascript-github-2273.html]
## 变量
- 使用有准确意义的变量名
- 变量的值不会改变时使用ES6的常量
- 对统一类型的变量使用相同的词汇
- 使用可检索的名称
- 使用解释性的变量
- 避免暗示
- 不要添加没必要的上下文
- 短路语法比条件语句更清晰


## 函数
- 函数参数 (理论上少于等于2个)
- 一个函数只做一件事
- 函数名称要说明它做的事
- 函数应该只抽象一个层次
- 删除重复的代码
- 使用默认参数代替短路表达式
- 用Object.assign设置默认对象
- 不要把标记用作函数参数（标记告诉函数做的事情不止一件）
- 避免副作用（写入文件，修改全局变量，等副作用；不修改元数据）
- 不要写入全局函数
- 喜欢上命令式编程之上的函数式编程（filter,map,reduce）
- 使用函数封装条件
- 避免否定条件
- 避免条件（多个条件多个事情）
- 避免类型检查（避免类型条件）
- 使用typescript避免类型检查
- 不要过度优化
- 删除不用的代码（需要从代码库的历史版本找）

## 对象和数据结构
- 使用getter和setter对对象数据进行访问和修改
- 让对象拥有私有成员（通过闭包实现）
  ```
  var Employee = (function() {
  function Employee(name) {
    this.getName = function() {
      return name;
    };
  }

  return Employee;
}());

var employee = new Employee('John Doe');
console.log('Employee name: ' + employee.getName()); // Employee name: John Doe
delete employee.name;
console.log('Employee name: ' + employee.getName()); // Employee name: John Doe
  ```

## 类
- 单一职责原则(SRP)
- 开放封装原则（OCP）
- 里氏替换原则（LSP)
- 接口分离原则（ISP）
- 依赖倒置原则（DIP）
- 多用ES6类语法，少用ES5构造函数语法
- 使用方法链
- 多用组合，少用继承

## 测试
- 每次测试一个概念


## 并发和异步
- 使用Promise而不是回调
- async/await 比Promise还整洁
- 


## 错误处理
- 不要忽略捕捉道的错误
- 不要忽视被拒绝的Promise
- 


## 格式（统一的代码风格）
- 使用一直的大小写
- 函数调用者和被调用者应该尽可能放在一起


## 注释
- 只注释业务逻辑复杂的内容
- 不要把注释掉的代码留在代码库中
- 不需要日志式的注释（可以从版本控制获取日志）
- 避免位置标记
- 避免在源文件中添加版权注释
  

## 重构
- 不改变软件可观察行为的前提下，改善其内部结构
- 以提高理解性和降低修改成本