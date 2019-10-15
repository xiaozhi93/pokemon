## reactivity（数据响应式系统）(通过侦测数据变化，来驱动更新视图))
它是一个数据响应式系统。其暴露的主要API有ref(数据容器)，reactive(基于Proxy实现的响应式数据),computed（计算数据）,effect(副作用)等几部分


## runtime-core， 与平台无关的运行时，实现的功能有虚拟DO渲染器，Vue组件和Vue的各种API,可以利用这个runtime自定义渲染器

## runtime-dom, 针对浏览器的runtime，处理原生DOM API， DOM事件，DOM属性等


## 模板编译


## vue框架设计