/**
 * 辨析模板 解析指令 v-model v-text v-html v-on:click 
 */

import Watcher from './watcher.js'
export default class Compiler{
    constructor(vm){
        this.el = vm.$el;
        this.vm = vm;
        this.methods = vm.$methods;
        this.Compiler (vm.$el)
    }
    /**编译模板 */
    compiler(el){
        const childNodes = this.el.childNodes 
        Array.from(childNodes).forEach(node=>{
            //文本节点
            if(this.isTextNode(node)){

            }else if((this.isElementNode(node))){//元素节点

            }
            if(node.childNodes && node.childNodes.length>0){
                this.compiler(node)
            }
            
            //子节点  递归调用

        })
    }
    compilerText(node){
        // {{msg}}
        const reg = /\{\{(.+?)\}\}/
        const value = node.textNode ; 
        if(reg.test(value)){
            const key = RegExp.$1.trim() //RegExp.$1 就是表示reg匹配的第一个内容

        }
    }
    compilerElement(node){
        if(node.attributes){
             Array.from(node.attributes).forEach(attr=>{
                 //遍历元素节点的所有属性；
                 const attrName = attr.name;
                if(this.isDirective(attrName)){ //v-model='msg' v-text v-on:click 
                    let directiveName = attrName.indexOf(':')>-1 ?attrName.substr(5):attrName.substr(2)
                    let key = attr.value;  // msg 获取真正的值 
                    this.update(node,key,directiveName)
                }
             })
        }
    }
    update(node,key,directiveName){
        const updateFn = this[directiveName+'Updater']
    }
    isTextNode(node){
        return node.nodeType === 3
    }
    isElementNode(node){
        return node.nodeType === 1;
    }

    //判断元素属性是否是指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
}