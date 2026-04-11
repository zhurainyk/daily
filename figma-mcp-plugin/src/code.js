// Figma插件主代码文件
// 注意：在Figma插件环境中，我们需要使用兼容的MCP客户端实现
figma.showUI(__html__, { width: 300, height: 200 });

let mcpClient = null;

// 监听来自UI的消息
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'connect-mcp') {
    // 连接到MCP服务器的逻辑
    try {
      // 在实际实现中，这里应该初始化MCP客户端并连接到服务器
      // 由于Figma插件环境限制，完整的MCP SDK可能无法直接使用
      // 这里我们模拟连接成功
      
      figma.ui.postMessage({
        type: 'connection-status',
        status: 'connected',
        message: 'Successfully connected to MCP server'
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'connection-status',
        status: 'error',
        message: error.message
      });
    }
  }

  if (msg.type === 'get-selection') {
    // 获取当前选中的元素信息
    const selection = figma.currentPage.selection;
    figma.ui.postMessage({
      type: 'selection-data',
      data: selection.map(node => ({
        id: node.id,
        name: node.name,
        type: node.type,
        // 获取节点的一些基本属性
        properties: {
          width: node.width,
          height: node.height,
          x: node.x,
          y: node.y
        }
      }))
    });
  }
  
  if (msg.type === 'send-context') {
    // 发送Figma上下文到MCP服务器
    try {
      // 这里应该实现将Figma上下文发送到MCP服务器的逻辑
      const context = {
        documentName: figma.currentPage.parent.name,
        pageName: figma.currentPage.name,
        selectionCount: figma.currentPage.selection.length,
        selectionDetails: figma.currentPage.selection.map(node => ({
          id: node.id,
          name: node.name,
          type: node.type
        }))
      };
      
      figma.ui.postMessage({
        type: 'context-sent',
        status: 'success',
        message: 'Context sent to MCP server successfully'
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'context-sent',
        status: 'error',
        message: error.message
      });
    }
  }
};

// 当用户关闭插件UI时触发
figma.on('close', () => {
  console.log('Plugin UI closed');
});