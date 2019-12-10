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

```
// 对object的每个值定义
function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }
    
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}

function cb (val) {
    console.log("视图更新啦～", val);
}
// 将object的key定义可监听的
function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            return val;         
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            val = newVal;
            cb(newVal);
        }
    });
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
    }
}

let o = new Vue({
    data: {
        test: "I am test."
    }
});
o._data.test = "hello,test.";
```
### Virtual Dom
### Template模板编译



### Vue编程范式
mixin


Vue路由动态渲染路由组件，，，或者路由容器页面组件-根据状态渲染状态组件或者业务容器组件


Vue单页面组件组件对象状态及方法，，，及依赖分离（组件，方法，状态）, 组件事件

Vue组件构造器及Vue组件实例及组件挂载


## mvvm中的VM 主要做了两件微小的事情：
从 M 到 V 的映射（Data Binding），这样可以大量节省你人肉来 update View 的代码
从 V 到 M 的事件监听（DOM Listeners），这样你的 Model 会随着 View 触发事件而改变
- M 到 V 实现
- V 到 M 实现
  从 V 到 M 主要由两类（ 虽然本质上都是监听 DOM ）构成，一类是用户自定义的 listener， 一类是 VM 自动处理的含有 value 属性元素的 listener