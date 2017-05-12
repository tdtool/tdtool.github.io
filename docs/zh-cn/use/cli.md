# CLI

提供了基本 create/build/start 命令，同时提供一组管理脚手架的指令。

## 初始化(待实现)

### create <project-name> [generator-name]
创建项目目录并执行脚手架
```bash
# 创建一个 my-project 目录并运行 react 的脚手架
$ tdtool create my-project react
```

## 开发

### build
生产模式，生成最终的部署代码
```bash
$ process.env.NODE_ENV=production && tdtool build
```
* -c --config
默认读取 tdtool.config.js 配置，也可指定配置文件
```bash
$ tdtool build -c webpack.config.js
```
接受传入文件数组，用逗号分隔
```bash
$ tdtool build -c tdtool.config.dev.js,tdtool.config.server.js
```
* -w --watch
监控文件变化，自动编译
```bash
$ tdtool build -w -c tdtool.config.prod.js
```

### start
开发模式，所有配置文件中需要配置且只能配置一个devServer
```bash
$ tdtool start
```
* -c --config
默认读取 tdtool.config.js 配置，也可指定配置文件
```bash
$ tdtool start -c webpack.config.js
```
接受传入文件数组，用逗号分隔
```bash
$ tdtool start -c tdtool.config.dev.js,tdtool.config.server.js
```

## 插件(开发中)
多个插件用逗号分隔
### import
安装脚手架
```bash
# 安装脚手架
$ tdtool import react
```
### update
```bash
# 更新脚手架
$ tdtool update react
```
### remove
```bash
# 删除脚手架
$ tdtool remove react
```
### list
查看安装的脚手架列表
```bash
$ tdtool list
```

## 其他(开发中)

### freeze
锁定package.json中依赖包的版本号，例如 >=1.0.0 -> 1.0.0
```bash
$ tdtool freeze
```
也可制定具体某个包
```bash
$ tdtool freeze webpack
```

### unfreeze
解锁锁package.json中依赖包的版本号，例如 1.0.0 -> >=1.0.0
```bash
$ tdtool unfreeze
```
也可制定具体某个包
```bash
$ tdtool unfreeze webpack
```
