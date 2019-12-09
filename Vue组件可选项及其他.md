## computed（计算属性）
为了解决模板表达式逻辑复杂难以维护
### 计算属性getter方法和setting方法
```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

### 计算属性特征
- 计算属性式基于他们的响应式依赖进行缓存的，只有在相关响应式依赖发生改变时他们才会重新求值


### 计算属性缓存 vs 方法 及 计算属性 vs侦听属性

## watch(侦听器)
响应数据变化， 数据变化执行异步或开销较大的操作。
- 立即执行
- 深度监听

### 监听基本类型

### 监听引用类型


# 表单输入绑定及事件
change事件及input事件： change事件在input失去焦点才会考虑触发，缺点无法实时响应。与blur不同的是change事件如何值未改变并不会触发；input是实时响应输入的。
v-model指令在表单input,textarea,select创建双向数据绑定，v-model负责监听用户的输入事件已更新数据，并对一个极端场景进行一些特殊处理。。v-model会忽略所有表单元素的value,checked,selected特性的初始值
v-model在 text和textarea元素使用value属性和input事件，checkbox和radio使用checked属性和change事件；select字段将value作为prop将change作为事件。。
## 表单元素
- 文本
  <input v-model="message" placeholder="edit me">
- 多行文本
  <textarea v-model="message" placeholder="add multiple lines"></textarea> 
- 复选框
  <input type="checkbox" id="checkbox" v-model="checked">或者
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
- 单选框
   <input type="radio" id="one" value="One" v-model="picked">
- 选择框
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
## 自定义输入组件
- 原生事件
- $listeners
- .sync修饰符
- inheritAttrs
v-on:focus.native直接将事件绑定在组件的根元素上的
将原生事件绑定在组件中(对原生输入组件进行二次包装，属性和事件继承)
```
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```
.sync修饰符 用于 update:myPropName,用于修改组件prop值
```
<text-document v-bind.sync="doc"></text-document>
this.$emit('update:doc.title', newTitle)
```
# 可复用性 & 组合
## directive(指令)
代码复用和抽象的主要形式时组件； 当需要对普通DOM元素进行底层操作，需要用到自定义指令
## mixin(混入)
分发Vue组件中的可复用功能
- 选项合并
- 全局混入

## filter(过滤器)
模板文本数据格式化

## 插件
为Vue添加全局功能
- 全局方法和属性
- 实例方法
- 全局资源例如组件/指令/过滤器/混合/过渡
- 库（以上的集合）

# 组件（通信及内容分发及动态化）
组件是可复用的Vue实例，与new Vue接收相同的选项，如data,computed，watch,methods及生命周期，，只有el不同

## 通过 Prop 向子组件传递数据
## 监听子组件事件
## 通过插槽分发内容
## 动态组件及异步组件
## 组件注册
## 处理组件边界
- 访问元素和组件
  - $root访问根节点
  - $parent访问父节点
  - $refs访问子节点
  - 依赖注入访问祖先节点（provide提供组件节点，inject获取组件节点）
- 程序化事件监听器
- 循环应用
- 控制更新
## 组件可选项
## 组件属性及方法（数据方法/事件方法/生命周期方法）