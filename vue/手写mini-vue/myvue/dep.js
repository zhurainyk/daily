/**
 * 发布订阅的模式
 * 存储所有的观察者 watcher
 * 每个watcher都有一个update
 * notify通知subs的每个实例更新watcher方法
 * 收集依赖关系 存储观察者 以发布订阅的形式实现
 */

export default class Dep{
    constructor(){
        //存储所有观察者
        this.subs = []
    }
    //添加观察者
    addSub(watcher){
        if(watcher && watcher.update){
            this.subs.push(watcher)
        }
    }
    //发送通知
    notify()
}

/**
 * Dep 在哪里实例化  在哪里 addSub
 * Dep.notify在哪里调用
 */