

//解析指令

export default class Compiler{
    constructor(vm){
        this.vm = vm;
        this.el = vm.$el;
        this.compiler( this.el)
    }
    compiler(el){

        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node=>{
            if(this.isElementNode(node)){
                this.compilerElement(node)
            }else if(this.isTextNode(node)){
                this.compilerText(node)
            }
        })
    }

    compilerText(node){
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent;
        if(reg.test(value)){
            const key = RegExp.$1.trim()
            node.textContent = value.replace(reg,this.vm[key]);
            //设置监听
        }
    }
    compilerElement(node){
        if(node.attributes){
            Array.from(node.attributes).forEach(attr=>{
                const attrName = attr.name;
                if(this.isDirective(attrName)){
                    const directiveName = attrName.indexOf(':')>-1 ?attrName.substr(5):attrName.startsWith('@')?attrName.substr(1):attrName.substr(2);
                    const key = attr.value;
                    this.update(node,key,directiveName)
                }
            })
        }
    }

    update(node,key,directiveName){
        const updateFn = this[directiveName + 'Updater'];
        console.log({updateFn})
        updateFn&&updateFn.call(this,node,this.vm[key],key,directiveName)
    }

    modelUpdater(node,value,key){
        node.value = value;
        node.addEventListener('input',()=>{
            this.vm[key] = node.value;
        })
    }

    //判断是文本节点
    isTextNode(node){
        return node.nodeType ===3
    }   
    //判断是元素节点
    isElementNode(node){
        return node.nodeType ===1
    }
    isDirective(directiveName){
        return directiveName.startsWith('v-') || directiveName.startsWith('@')
    }
    //判断属性是是否指令
}