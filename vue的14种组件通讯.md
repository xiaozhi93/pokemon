记录保存状态和状态发送事件
------------------------
# props通信（父传子）
# $emit(子传父)
# vuex全局数据共享
# attrs和listeners（获取父组件传递的属性和事件）
```
attrs场景：父传子有很多值，那么在子组件需要定义多个props解决；attrs获取父传子种未props定义的值
// 父组件
<home title="这是标题" width="80" height="80" imgUrl="imgUrl"/>
// 子组件
mounted() {
  console.log(this.$attrs) //{title: "这是标题", width: "80", height: "80", imgUrl: "imgUrl"}
}
如果在子组件定义了props，则$attrs剔除

// 父组件
<home @change="change"/>

// 子组件
mounted() {
  console.log(this.$listeners) //即可拿到 change 事件
}

inheritAttrs默认值为true，true的意思是将父组件中除了props外的属性添加到子组件的根节点上(说明，即使设置为true，子组件仍然可以通过$attr获取到props意外的属性)
将inheritAttrs:false后,属性就不会显示在根节点上了

```
# provide和inject（祖先组件传递数据或者方法，适用于高级插件组件库）
# parent和children获取组件实例
# $refs（获取特定子组件实例）
# $root(获取根节点属性)
# .sync(子组件直接修改父组件的值)
```
/ 父组件
<home :title.sync="title" />
//编译时会被扩展为
<home :title="title"  @update:title="val => title = val"/>

// 子组件
// 所以子组件可以通过$emit 触发 update 方法改变
mounted(){
  this.$emit("update:title", '这是新的title')
}
```
# v-slot（向子组件传递元素）
# EventBus(全局Vue实例变量EventBus,所有数据通信，事件监听通过这个实例，原理利用on和emit)(事件总线来进行任意两个组件的通信)
```
// 在 main.js
Vue.prototype.$eventBus=new Vue()

// 传值组件
this.$eventBus.$emit('eventTarget','这是eventTarget传过来的值')

// 接收组件
this.$eventBus.$on("eventTarget",v=>{
  console.log('eventTarget',v);//这是eventTarget传过来的值
})

```
# broadcase和dispatch(向子组件广播事件和向父组件派发事件)
```
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
}

```
# 路由传参通信
```
// 方案1
this.$router.push({
  path: `/describe/${id}`,
})
this.$route.params.id

// 方案2 页面刷新数据丢失
// 页面传参
this.$router.push({
  name: 'Describe',
  params: {
    id: id
  }
})
// 页面获取
this.$route.params.id

this.$router.push({
  path: '/describe',
    query: {
      id: id
  `}
)
// 页面获取
this.$route.query.id
```

# Vue.observable让一个对象可响应(实现简易的vuex)
```
// 文件路径 - /store/store.js
import Vue from 'vue'

export const store = Vue.observable({ count: 0 })
export const mutations = {
  setCount (count) {
    store.count = count
  }
}

```

const listeners = context.listeners[eventName];