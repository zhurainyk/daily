/**
 * 发布订阅的模式
 * 存储所有的观察者 watcher
 * 每个watcher都有一个update
 * 收集依赖关系 存储观察者 以发布订阅的形式实现
 */

export default class Dep{
    constructor(){
        //存储所有观察者
        this.subs = []
    }
    //添加观察者
    addSub(watcher){

    }
    //发送通知
    notify()
}