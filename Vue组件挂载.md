## 通过extend组件构造器
Vue实例在实例化时没有收到el选项，则它处理”未挂载“状态，没有关联的DOM元素。使用$mount（）方法手动股灾一个未挂载的实例
```
// 组件构造器
var MyComponent = Vue.extend({
  template: '<div>Hello!</div>'
})
// var MyComponent = Vue.extend(Modal)
// 生成Dom并且挂载上去

// 创建一个未挂载的组件并挂载到 #app (会替换 #app)
new MyComponent().$mount('#app')

// 同上
new MyComponent({ el: '#app' })

// 或者，在文档之外渲染并且随后挂载
var component = new MyComponent().$mount()
document.getElementById('app').appendChild(component.$el)

// 或者
var component = new MyComponent(
  el: document.createElement('div')
)
document.getElementById('app').appendChild(component.$el)
```

## 通过Vue
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
})