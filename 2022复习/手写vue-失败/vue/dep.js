
export default class Dep{
    constructor(){
        this.subs = []
    }

    addSub(watcher){
        if(watcher.notify){
            this.subs.push(watcher)
        }
    }

    notify(){
        this.subs.forEach(watcher=>{
            watcher.notify()
        })
    }
}