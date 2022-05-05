

export default class Dep{
    constructor(){
        this.subs = []
    }

    //依赖搜集
    addSub(watcher){
        if(watcher&& watcher.notify){
            this.subs.push(wathcer)
        }
    }

    //派发更新
    notify(){
        this.subs.forEach(watcher=>{
            watcher.notify()
        })
    }
}