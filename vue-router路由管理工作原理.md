## 要点
- vue路由管理
- 不能与其他框架使用


## 运行机制
- 通过use机制注入vue实现依赖然后全局保存vue,将store实例通过vue带入进去（this.$options.store）
- 使用Vue.mixin混淆进Vue实例，在boforeCreate与destroyed钩子上混淆,是每个组件有$router和$route对象，每个实例能访问$router及$route对象
- 在install里面的方法注册 RouterView及RouterLink连个组件





## 代码
```
 /* 在Vue的prototype上面绑定$router，这样可以在任意Vue对象中使用this.$router访问，同时经过Object.defineProperty，访问this.$router即访问this._routerRoot._router */
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  /* 以上同理，访问this.$route即访问this._routerRoot._route */
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
```