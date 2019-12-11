https://juejin.im/post/5d548b83f265da03ab42471d?utm_source=gold_browser_extension#heading-24
# 代码-webpack-web层面或者开发-构建资源-运行层面
# Vue代码层面的优化（代码质量，交互性能）
## v-if和v-show区分使用场景
> v-if在初始渲染条件为真才会渲染，假什么都不会做,v-show不管条件为什么，都会被渲染，v-show基于css的display属性进行切换。v-if适用于运行时很小改变条件，v-show适用频繁切换条件
## computed和watch区分使用场景
## v-for遍历必须未item添加key,且避免同时使用v-if
> 方面Vue.js内部机制精准找到该条列表数据。当state更新时，新的状态值和旧的状态值兑雪碧，较快地定位到diff
> v-for 比 v-if优先级高，每一次都遍历整个数组，将会影响速度。可以使用computed计算属性
## 长列表性能优化
## 事件的销毁
## 图片资源懒加载
## 预加载
## 路由懒加载
## 第三方插件的按需引入
## 优化无限列表性能
## 服务端渲染SSR or预渲染
> 服务端渲染是整个html文档在服务端完成，然后再返回浏览器端
> 预渲染是在构建时简单地生成针对特定路由的静态HTML文档，，主要用于完全静态的页面，比如营销页面（/about,/contact）等，也有利于seo，使用prerender-spa-plugin

# webpack配置层面的优化（资源优化）
## webpack对图片进行压缩
## 提取组件的Css
## 减少ES6转为ES5的冗余代码
## 提取公共代码
## 模板预编译
## 优化SourceMap
## Vue项目的编译优化
## 构建结果输出分析 （观察构建性能）

# 基础的web技术层面的优化
## 开启gzip压缩
## 浏览器缓存（强制缓存和协商缓存）
## CDN的使用
由于大部分服务器的带宽有限，超过限制，网页半天反应不过来。而CDN可以通过不同的域名加载文件，从而使下载文件的并发连接数大大增加。并且更低的网络延迟和丢包率。

## 使用 Chrome Performance 查找性能瓶颈（观察运行性能）