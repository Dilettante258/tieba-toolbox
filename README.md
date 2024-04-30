# 贴吧数据查询工具

这是一个贴吧数据查询工具，目前仍处于开发阶段。

![首页](https://pic.wang1m.tech/uploads/2404/663057f54f7a1.png)
## 在本地运行

要本地部署这个项目，请

1. 克隆这个仓库并前往项目目录
```bash
git clone https://github.com/Dilettante258/tieba-tools.git
cd tieba-tools
```
2. 安装依赖
```bash
pnpm install
```
3. 运行项目
```bash
npm run dev
```

或Fork这个仓库后，在Vercel部署。（其他平台如Netlify，请参考`vercel.json`自行定制相关的配置文件，不然会有跨域(CORS)问题。


## 贡献

欢迎提出各种需求和意见，也欢迎提出PR。




## 致谢
 - [aiotieba](https://github.com/Starry-OvO/aiotieba/) 提供了原始API参考
 - [Hono](https://hono.dev/)：后端服务器框架
 - [protobuf.js](https://github.com/protobufjs/protobuf.js)：用到了它的Cli工具，使得JavaScript环境下也能解析protobuf！
 - [NextUI](https://nextui.org/)
 - [phosphoricons](https://phosphoricons.com/)

 

## 许可证

这个项目遵循 [MIT](https://choosealicense.com/licenses/mit/) 许可证。详情请见 `LICENSE` 文件。
## 相关

以下是一些相关项目

 - [Tieba-API-SCF](https://github.com/Dilettante258/Tieba-API-SCF)：后端服务器。API文档编写中。只需简单部署，你也能方便便捷地通过调API地方式获取贴吧数据！（可以本地/服务器/云函数部署，只需要Nodejs环境）
 - [serverless-jieba](https://github.com/Dilettante258/serverless-jieba)：部署在云函数上的Jieba分词，使用了[@node-rs/jieba](https://github.com/napi-rs/node-rs/tree/main/packages/jieba),速度比Python的jieba库应该是快6倍！


## 路线图

- 发言留档，转换为卡片样式

- 贴子转换为Html或Markdown

- 高级搜索：在吧内遍历贴子列表筛选某人发言。即使隐藏了发言也不怕！

