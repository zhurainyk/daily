
import Watcher from './watcher.js'
export default class Compiler{
    constructor(vm){
        this.vm = vm;
        this.el = vm.$el;
        this.compile(this.el)
    }

    compile(el){
        const childNodes = el.childNodes;
        Array.from(childeNodes).forEach(node=>{
            if(this.isTextNode(node)){
                this.textCompile(node)
            }else if(this.isElementNode(node)){
                this.elementCompile(node)
            }
        })
    }

    compileText(node){ //解析插值表达式 
        const reg = /\{\{(.+?)\}\}/
        const value = node.textContent;
        if(reg.test(value)){
            const key = RegExp.$1.trim()
            node.textContent = value.replace(reg,this.vm[key])
            new Watcher(this.vm,key,(newValue)=>{
                node.textContent = newValue;
            })
        }
    }
    elementCompile(node){
        if(node.attributes.length){
            Array.from(node.attributes).forEach(attr=>{
                let  attrName  = attr.name;
                if(this.isDirective(attrName)){
                     attrName = attrName.indexOf(':')>-1?attrName.substr(5):attrName.startsWith('@')?attrName.substr(1):attrName.substr(2)
                    const key = attr.value 
                    this.update(node,key,attrName)
                }
            })
        }
    }

    update(node,key,attrName){
        const updateFn = attrName + 'Update'
        this[updateFn] && this[updateFn].call(this,node,this.vm[key],key,attrName) 
    }

    //解析v-text
    textUpdate(node,value,key,attrName){
         node.textContent = value
         new Watcher(this.vm,key,(newValue=>{
             node.textContent = newValue;
         }))
    }
    //解析v-html
    htmlUpdate(node,value,key,attrName){
        node.textContent = value;
        new Watcher(this.vm,key,(newValue)=>{
            node.textContent = newValue
        })
    }
    //解析 v-model
    modelUpdate(node,value,key,attrName){
        node.addEventlistener('input',()=>{})
    }

    isDirective(name){
        return name.startsWith('v-') || name.startsWith('@')
    }

    isTextNode(node){
        return node.nodeType ===3
    }

    isElementNode(node){
        return node.nodeType ===  1
    }
}



