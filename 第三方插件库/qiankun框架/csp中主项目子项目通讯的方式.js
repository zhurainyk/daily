import Vue from 'vue'
class MainEventBus{
    static eventBus = new Vue()
    static setEventBus(eventBus){
        MainEventBus.eventBus = eventBus;
    }
    static on(...arg){
        MainEventBus.eventBus.$on(...arg)
    }
    static off(...arg){
        MainEventBus.eventBus.$off(...arg)
    }
    static emit(...arg){
        MainEventBus.eventBus.$emit(...arg)
    }

    static once(...arg){
        MainEventBus.eventBus.$once(...arg)
    }
}

export default MainEventBus

/**
 * 使用方法
 * 主项目引入  发布  
 * import MainEventBus from '@/Maintools/MainEventBus.js'
 * MainEventBus.on('getRouter',(routerInfo)=>{
 *      console.log(routerInfo)
 * })
 * 
 * 子项目监听  订阅
 *  import MainEventBus from '@/childtools/MainEventBus.js'
 * MainEventBus.emit('getRouter','test')
 * 
 */