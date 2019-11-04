# 1, require.context()(处理引用多个组件或文件的问题；如store)
# 2, watch（数据监听执行相应操作，如input改变执行操作，有立即执行，深度监听）
# 3, render函数（通过js动态生成标签，如根据不同属性动态生成Dom元素）
# 4, 异步组件（项目过大导致加载缓慢,其本质就是执行2次或者2次以上的渲染， 开始注释节点，loading节点，要渲染的节点）
```
// 工厂函数执行 resolve 回调
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包, 这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})

// 工厂函数返回 Promise
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)

// 工厂函数返回一个配置化组件对象
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
路由按需加载异步组件
components:resolve=>require(['@/components/home'],resolve) 或者components:()=>import('@/components/home')
```
# 5, 动态组件（<component v-bind:is="currentTabComponent"></component>，每次都会从新加载）
```
避免重新加载
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
组件切换动画
<transition>
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
</transition>

```
# 6, 递归组件（被使用具有层级关系的，，必须设置name和结束的阀值）
# 7, 函数式组件（无状态，无法实例化， 使用functional）
# 8, 组件注册全局注册及局部注册（）
# 9, Vue.extend（将组件挂载到特定的元素上）
```
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{extendData}}</br>实例传入的数据为:{{propsExtend}}</p>',//template对应的标签最外层必须只有一个标签
  data: function () {
    return {
      extendData: '这是extend扩展的数据',
    }
  },
  props:['propsExtend']
})

// 创建的构造器可以挂载到元素上,也可以通过 components 或 Vue.component()注册使用
// 挂载到一个元素上。可以通过propsData传参.
new Profile({propsData:{propsExtend:'我是实例传入的数据'}}).$mount('#app-extend')

// 通过 components 或 Vue.component()注册
Vue.component('Profile',Profile)

```
# 10, mixins处理重复的js逻辑
# 11, extends单一拓展一个组件
# 12, Vue.use()(触发install方法)
# 13, Vue.nextTick(在下次Dom更新循环结束之后执行延迟回调)（mounted 只是 vue 挂载到 dom 上,所以视图并未渲染完毕）
```
mounted(){ //因为 mounted 阶段 dom 并未渲染完毕,所以需要$nextTick
  this.$nextTick(() => {
    this.$refs.inputs.focus() //通过 $refs 获取dom 并绑定 focus 方法
  })
}
```
# 14, Vue.directive(通过指令绑定在元素生命周期进行相关操作)
# 15, Vue.filter过滤（在双花括号和在v-bind使用）
# 16, Vue.compile编译模板字符串
```
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})

```
# 17, Vue.version（针对特定版本左兼容处理）
# 18, Vue.set（更改数组某项或者对象某项，解决不更新的问题）
# 19, Vue.config.keyCodes(全局自定义按键修饰符别名)
```
// 将键码为 113 定义为 f2
Vue.config.keyCodes.f2 = 113;
<input type="text" @keyup.f2="add"/>

```
# 20, Vue.config.performance = true(监听性能， 只适用于开发模式和支持 performance.mark API 的浏览器上)
# 21, Vue.config.errorHandler 设置全局错误处理函数
# 22, Vue.config.warnHandler 设置全局警告处理
# 23, v-pre（处理静态标签不需要多次编译）
```
<span v-pre>{{ this will not be compiled }}</span>   显示的是{{ this will not be compiled }}
<span v-pre>{{msg}}</span>     即使data里面定义了msg这里仍然是显示的{{msg}}

```
# 24, v-cloak(处理网速慢的情况下，渲染页面出现变量闪烁，解决闪烁但出现白屏)
```
// template 中
<div class="#app" v-cloak>
    <p>{{value.name}}</p>
</div>

// css 中
[v-cloak] {
    display: none;
}

```
# 25, v-once（只渲染一次，v-pre不编译，原样输出）
# 26, 事件修饰符（.stop, .prevent, .self）
# 27, 按键修饰符和按键码(.enter,.tab,.delete)
# 28, Vue-router
```
- 缓存和动画
  ```
  <transition>
  <keep-alive :include="['a', 'b']">
  //或include="a,b" :include="/a|b/",a 和 b 表示组件的 name
  //因为有些页面,如试试数据统计,要实时刷新,所以就不需要缓存
    <router-view/> //路由标签
  </keep-alive>
  <router-view exclude="c"/> 
  // c 表示组件的 name值
</transition>
  ```
  - 全局路由钩子
  - 组件路由钩子
  ```
  beforeRouteEnter (to, from, next) {
  // 这里还无法访问到组件实例，this === undefined
  next( vm => {
    // 通过 `vm` 访问组件实例
  })
}
  ```
  - router-view 的 key(由于Vue会复用相同的组件。处理相同路由组件的跳转)
  ```
  即 /page/1 => /page/2 或者 /page?id=1 => /page?id=2 这类链接跳转时, 将不在执行created, mounted之类的钩子
  <router-view :key="$route.fullpath"></router-view>

  ```
  ```
  # 29, 调试template
  ```
  // main.js
Vue.prototype.$log = window.console.log;

// 组件内部
<div>{{$log(info)}}</div>

  ```
  # 30, vue-loader 小技巧
  ```
  1, 开发vue代码一般会有空格，打包不去掉空格会加大包的体积。
  {
  vue: {
    preserveWhitespace: false
  }
} 去掉空格
2， transformToRequire处理图片的引用
transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
}
// 配置文件,如果是vue-cli2.x 在vue-loader.conf.js里面修改
  avatar: ['default-src']
  module.exports = {
  pages,
  chainWebpack: config => {
    config
      .module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
      options.transformAssetUrls = {
        avatar: 'img-src',
      }
      return options;
      });
  }
}
// page 代码可以简化为
<template>
  <div>
    <avatar img-src="./assets/default-avatar.png"></avatar>
  </div>
</template>
  ```
# 31, img加载失败（处理图片加载失败的默认图片）
```
// page 代码
<img :src="imgUrl" @error="handleError" alt="">
<script>
export default{
  data(){
    return{
      imgUrl:''
    }
  },
  methods:{
    handleError(e){
      e.target.src=reqiure('图片路径') //当然如果项目配置了transformToRequire,参考上面 27.2
    }
  }
}
</script>

```
# 32, css局部样式及deep属性
```
.demo /deep/ .content{
    color: blue;
  } 跨文件渲染样式
```