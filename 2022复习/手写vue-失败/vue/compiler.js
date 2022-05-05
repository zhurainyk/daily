/**
 * 辨析模板 解析指令 v-model v-text v-html v-on:click 
 */

import Watcher from './watcher.js'
export default class Compiler{
    constructor(vm){
        this.el = vm.$el;
        this.vm = vm;
        this.methods = vm.$methods;
        this.compiler (vm.$el)
    }
    /**编译模板 */
    compiler(el){
        const childNodes = el.childNodes;

        Array.from(childNodes).forEach(node=>{
            //文本节点
      
            if(this.isTextNode(node)){
                this.compilerText(node)
            }else if((this.isElementNode(node))){//元素节点
                this.compilerElement(node)
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
        const value = node.textContent ; 
 
        if(reg.test(value)){
           
            const key = RegExp.$1.trim() //RegExp.$1 就是表示reg匹配的第一个内容
            node.textContent = value.replace(reg,this.vm[key])
            new Watcher(this.vm,key,(newValue)=>{
                node.textContent = newValue
            })
        }
    }
    compilerElement(node){
        if(node.attributes){
             Array.from(node.attributes).forEach(attr=>{
                 //遍历元素节点的所有属性；
                 const attrName = attr.name;
                 console.log({attrName})
                if(this.isDirective(attrName)){ //先判断了是否是指令 v- @ 
                    //v-model='msg' v-text v-on:click  @click v-html
                let directiveName = attrName.indexOf(':')>-1 ?  attrName.substr(5): attrName.startsWith('@')?attrName.substr(1):attrName.substr(2);
                    let key = attr.value;  // msg 获取真正的值 
                    console.log({directiveName})
                    this.update(node,key,directiveName)
                }
             })
        }
    }
    update(node,key,directiveName){
        console.log('进来了',directiveName)
        //v-model v-html v-text v-on:click @click
        const updateFn = this[directiveName+'Updater']
        // console.log(updateFn)
        updateFn&&updateFn.call(this,node,this.vm[key],key,directiveName)
    }

    //解析v-text
    textUpdater(node,value,key){
        node.textContent = value;
        new Watcher(this.vm,key,(newValue)=>{
            node.textContent = newValue;
        })
    }
    htmltUpdater(node,value,key){
        node.innerHTML = value;
        new Watcher(this.vm,key,(newValue)=>{
            node.innerHTML = newValue
        })
    }
    modelUpdater(node,value,key){
    
        node.value = value;
        new Watcher(this.vm,key,(newValue)=>{
            node.value = newValue;
        })
        node.addEventListener('input',()=>{
            console.log('22')
            this.vm[key] = node.value
        })
    }
    clickUpdater(node,value,key,directiveName){
        node.addEventListener(directiveName,this.methods[key])
    }

    isTextNode(node){

        return node.nodeType === 3
    }
    isElementNode(node){
        return node.nodeType === 1;
    }

    //判断元素属性是否是指令
    isDirective(attrName){
        return attrName.startsWith('v-') || attrName.startsWith('@')
    }
}