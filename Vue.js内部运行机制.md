# Vue内部运行机制

## 全局概览
- 初始化及挂载
  new Vue()实例化之后调用_init原型方法进行初始化，它会初始化生命周期，事件，初始化render,props，方法，data等可选项。其他最重要通过Object.defineProperty设置setter与getter函数，实现【响应式】以及【依赖收集】。
  初始化过后调用$mount挂载Vue组件。 vm.$mount(vm.$options.el) -> mountComponent(this, el, hydrating)
- 模板编译
  编译分为parse,optimize与generate三个阶段，最终需要得到render function
- 执行render function生成Virtual Dom， render function => VNode tree
- 再进行响应式依赖收集，render functon => getter, setter => Watcher.update => patch.
- 通过diff算法后进行patch更新视图。

## 基本概念
### 响应式系统-Vue的核心实现
- 基于Object.defineProperty实现响应式
- 实现observer使对象变成可观察的
- 响应式的依赖收集追踪原理
### Virtual Dom
### Template模板编译



### Vue编程范式
mixin


Vue路由动态渲染路由组件，，，或者路由容器页面组件-根据状态渲染状态组件或者业务容器组件


Vue单页面组件组件对象状态及方法，，，及依赖分离（组件，方法，状态）