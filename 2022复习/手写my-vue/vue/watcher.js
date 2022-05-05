

export default class Watcher{//负责更新视图  
    constructor(vm,key,cb){ //vm 是vue实例  key  ，cb是视图更新回调函数
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        this.oldValue = vm[key];//先存储旧值

    }

    update(newValue){
        if(newValue === this.oldValue){
            return;
        }
        this.cb(newValue)
    }
}