# UnityFront

这是一个基于node开发的服务框架，纯前端可视化项目，支持pug前端模板引

# 依赖项

> node 当前依赖【v11.12.0】，其他暂未自测

# 查看文档教程

> UnityFront框架的文档介绍

开发文档需要先安装docsify-cli脚手架,具体参考[docsify文档工具](https://docsify.js.org/#/zh-cn/quickstart)

> 全局安装docsify-cli

```bash
 npm i docsify-cli -g
```

> 初始化项目

如果想在项目的 ./docs 目录里写文档，直接通过 init 初始化项目。


```bash
  docsify init ./docs
```

> 本地预览网站

运行一个本地服务器通过 docsify serve 可以方便的预览效果，而且提供 LiveReload 功能，可以让实时的预览。默认访问 http://localhost:3000 。


```bash
  docsify serve docs
```

# 参考文档

[MySql语法](http://c.biancheng.net/view/2548.html)

[mysql工具](https://www.npmjs.com/package/mysql#connection-options)

[pug模板语言](https://pugjs.org/api/getting-started.html)

[docsify文档工具](https://docsify.js.org/#/zh-cn/quickstart)

## 端口占用查看

```bash
    netstat -ano | findstr 81
    
    tasklist|findstr 82
```

## 技术支持

<a href="https://www.jetbrains.com/?from=UnityFront"><img width="120" src="./README/jetbrains/jetbrains.png"></a>
<a href="https://nodejs.org/?from=UnityFront"><img width="120" src="https://nodejs.org/static/images/logo.svg"></a>