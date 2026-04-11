# MCP Figma Plugin

这是一个Figma插件，用于连接到Model Context Protocol (MCP)服务器，允许在Figma和AI模型之间传递上下文信息。

## 功能

1. 连接到MCP服务器
2. 获取当前选中的Figma元素信息
3. 将Figma设计上下文发送到MCP服务器

## 安装

1. 在Figma中打开Plugins菜单
2. 选择"Development" > "Import plugin from manifest..."
3. 选择本项目中的`manifest.json`文件

## 使用方法

1. 安装插件后，在Figma中运行它
2. 点击"Connect to MCP Server"按钮连接到MCP服务器
3. 选择画布中的元素
4. 点击"Get Selection Info"获取选中元素的信息
5. 点击"Send Context to MCP"将当前上下文发送到MCP服务器

## 开发

### 文件结构

```
figma-mcp-plugin/
├── manifest.json     # 插件配置文件
├── package.json      # npm包配置
├── README.md         # 说明文档
└── src/
    ├── code.js       # 插件主逻辑
    └── ui.html       # 插件UI界面
```

### 配置MCP连接

要配置MCP服务器连接，需要修改`src/code.js`文件中的连接逻辑。当前实现包含以下功能：

1. 基本的MCP连接框架
2. 获取Figma选中元素的功能
3. 发送上下文到MCP服务器的功能

由于Figma插件环境的限制，完整的MCP SDK可能无法直接使用。您可能需要：

1. 使用WebSocket或HTTP请求直接与MCP服务器通信
2. 实现必要的MCP协议消息格式
3. 处理身份验证和会话管理

### MCP集成要点

1. 插件需要网络访问权限来连接MCP服务器 (`networkAccess`在manifest.json中已配置)
2. 确保MCP服务器正在运行并且可以从插件访问
3. 根据您的MCP服务器实现调整连接参数和消息格式

## 注意事项

1. 插件目前只是一个基础框架，需要根据具体需求扩展功能
2. 在生产环境中，需要添加适当的错误处理和安全措施
3. 可能需要根据您的MCP服务器实现调整代码

## 故障排除

如果遇到连接问题，请检查：

1. MCP服务器是否正在运行
2. 网络连接是否正常
3. 防火墙设置是否阻止了连接
4. 插件权限是否正确配置