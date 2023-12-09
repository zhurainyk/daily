module.exports = ({types:t}) =>{ //types 内置了很多方法 
    return {
     //visitor设计模式 
     //AST遍历深度优先
        visitor: {
            //逻辑在这里

            //标识符
            Identifier(path){
                // console.log(path.node.name)
                /**
                 * 业务需求 
                 * 1. name必须是DEBUG 
                 * 2. path的父级必须是一个if语句
                 *  
                 * if(DEBUG){
                        const a = 10;
                        const b = 20;
                        console.log(a+b)
                    }
                    把DEBUG 转换为 "DEBUG" 即可执行 
                 */
                const parentIsIf = t.isIfStatement(path.parentPath)
                const isDebug = path.node.name === 'DEBUG'
                
                // console.log(parentIsIf,isDebug)
                if(parentIsIf && isDebug){
                 
                    //Identifier 转换成 string
                    const stringNode = t.stringLiteral("DEBUG");

                    //替换节点
                    path.replaceWith(stringNode)

                }
            },
            StringLiteral(path,state){ //接受用户参数 state
       
                const parentIsIf = t.isIfStatement(path.parentPath)
                 const isDebug = path.node.value === 'DEBUG'
                 if(parentIsIf && isDebug){
                     //控制生产环境下 才能移除 通过用户传参
                     console.log(state.opts)
                    //  if(process.env.NODE_ENV ==='production' ){
                    //      path.parentPath.remove() //直接移除if语句模块
                    //  }
                    if(state.opts.isRemove){
                         path.parentPath.remove() //直接移除if语句模块
                    }
                     
                 }
            }
        }
    }
}