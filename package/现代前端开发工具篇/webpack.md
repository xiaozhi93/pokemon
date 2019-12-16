模块化打包构建工具，其实其更像一个模块出来工厂,将一个一模块按照有序的顺序组装最后输出成最终需要的
解决应用支持模块化。。。
## 工作流程
读取入口文件分析模块依赖
对模块进行解析执行(深度遍历)
针对不同的模块使用相应的loader
编译模块，生成抽象语法树AST。
循环遍历AST树，拼接输出js。
## webpack打包原理
- 在最外层的匿名函数中会初始化浏览器执行环境，包括定义installedModules对象

## webpack特点
- 默认支持Commonjs和Es Module打包
- 打包时会为每一个文件包装一层函数作用域来避免全局污染
## 项目应用
- 打包应用
- 打包js库

## 概念点
- 模块
- 循环依赖
- 代码分割 code splitting(有效地降低首屏加载资源的大小)
- tree shaking
- webpack-dev-server
- chunk(是对一组有依赖关系的模块的封装)
- bundle
- publicPath
- 一切皆模块（通过使用loader进行处理）
- loader本质是一个函数 output = loader(input) output = loaderA(loaderB(loaderC(input)))
- manifest webpack运行时模块 必须出现在最后，否则webpack将无法正常提取模块，在html中最先被引入，用来初始化webpakc环境

```
使应用模块化的解决方案有Amd, Cmd， Umd（通用模块标准，模块集合，一个模块能运行在Commojs,AMD， 非模块环境下）, CommonJs, , Es Module（每个文件作为一个模块），npm模块（模块的包装及管理），目前比较流行通用的方案CommonJs, ES Module, 他们两者的区别在于模块依赖关系前者时动态的，后者时静态的，前端模块的导入,导出发生在代码的运行阶段，后者模块的导入导出语句是声明式的，有明确的依赖关系, 前者式值拷贝，后者是值映射，方法修改值不能直接修改，只读的
模块打包原理
webpack-dev-server主要作用令webpack进行模块化打包，并且还可以作为本地开发服务器，当有请求时将webpack打包的资源返回给浏览器，并且具有live-reloading及热更新及代理服务和路径重写的功能

webpack中publicPath(请求路径)，webpack-dev-server中publickPath, vue-router中base,及nginx配置
location /admin {
    root /xkdata/test/admin/dist; （域名根目录对应的资源）
    try_files $uri $uri/ /admin.html;
}
location /mobile {
    root /xkdata/test/admin;  （域名根目录对应的资源）
    try_files $uri $uri/ /mobile/index.html;
}

base对应nginx根路径/admin和/mobile, webpack中publicPath请求路径，对应的时nginx的root路径，如果publickPath为/(域名+打包资源)，如果/xkdata/test/admin/dist是域名根目录对应的资源，即访问（域名 + dist里面的资源）。如果publickPath为/mobile(域名/mobile+打包资源)，如果/xkdata/test/admin是域名根目录对应的资源，即访问（域名 + admin里面的资源）。

```

## 浏览器支持的模块化
浏览器不支持以上的模块化解决方案，使用模块化工具打包才能使其运行在浏览器中。

## 打包优化