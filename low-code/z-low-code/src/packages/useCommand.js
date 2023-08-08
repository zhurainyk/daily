import deepcopy from "deepcopy"
import { events } from "./events"
import { onUnmounted } from "vue"

export function useCommand(data) {
    //栈存储
    const state = {//前进后退 需要指针
        current: -1,  //前进后退的索引值
        queue: [],//存放所有的操作命令
        commands: {},//制作命令和执行功能一个映射表 undo：()=>{}  redo:()=>{}
        commandArray: [],//存放所有命令
        destoryArray: [],//卸载时要执行的命令

    }
    const register = (command) => {
        state.commandArray.push(command)
        state.commands[command.name] = () => { //命令名字对应执行函数
            const { redo, undo } = command.execute()
            redo()
            if (!command.pushQueue) {  //不需要放到队列 跳过
                return
            }
            //如果操作顺序 组件1 -》组件2  -》 组件3 
            //组件1 -》 组件3 
            let { queue, current } = state;
            if (queue.length > 0) {
                queue = queue.slice(0, current + 1)
                //可能在放置的过程中有撤销操作，所以需要根据最新的current值来计算
                state.queue = queue
            }
            queue.push({ redo, undo }) //保存指令的前进后退
            state.current = current + 1
            console.log(queue)
        }
    }
    //注册我们需要的命令
    register({
        name: 'redo',
        keyboard: 'ctrl+y',
        execute() {
            return {
                redo() {
                    console.log('重做')
                    let item = state.queue[state.current + 1]//找到当前的下一步还原操作
                    if (item) {
                        item.redo && item.redo()
                        state.current++
                    }
                }
            }
        }
    })

        //注册导入更新容器事件
    
    register({
        name:'updateContainer',
        pushQueue:true,
        execute(newValue){
            let state= {
                before:data.value,
                after:newValue
            }
            return {
                redo:()=>{
                    data.value = state.after
                },
                undo:()=>{
                    data.value = state.before
                }
            }
        }
    })

    register({
        name: 'undo',
        keyboard: 'ctrl+z',
        execute() {
            return {
                redo() {
                    console.log('撤销')
                    if (state.current == -1) return;//没有可以撤销了
                    let item = state.queue[state.current]//找到上一步还原
                    if (item) {
                        item.undo && item.undo()
                        state.current--
                    }
                }
            }
        }
    })

    register({ //如果希望将操作放到队列中 可以增加一个属性，标识等会操作要放到队列中
        name: 'drag',
        pushQueue: true,
        init() {//初始化 默认会自动执行
            this.before = null //监听拖拽之前的状态
            const start = () => {
                console.log('start')
                this.before = deepcopy(data.value.blocks)
            }
            //监听拖拽之后 要触发对应的指令
            const end = () => {
                state.commands.drag()
                console.log('end')
            }

            events.on('start', start)
            events.on('end', end)
            return () => {
                events.off('start', start)
                events.off('end', end)
            }
        },
        execute() {  //state.commands.drag()
            let before = this.before
            let after = data.value.blocks //之后的状态
            return {
                redo() {//默认一松手 就直接把当前事情做了
                    console.log('redo')
                    data.value.blocks = after
                },
                undo() {//前一步的
                    console.log('undo')
                    data.value.blocks = before
                }
            }
        }
    });

    //监听键盘事件
    const keyboardEvent = (() => {
        const keyCodes = {
            '90': 'z',
            '89': 'y'
        }
        const onKeydown = (e) => { 
            const { ctrlKey, keyCode } = e; //ctrl+z ctrl+y
           
            let keyString = []
            if (ctrlKey) {
                keyString.push('ctrl')
                keyString.push(keyCodes[keyCode])
                keyString = keyString.join('+')

                state.commandArray.forEach(({ keyboard, name }) => {
                    if (!keyboard) return;
                    if (keyboard === keyString) {
                        state.commands[name]()
                        e.preventDefault();

                    }
                })
            }
        }
        const init = () => {//初始化事件 
            window.addEventListener('keydown', onKeydown)

            return () => {//销毁事件
                window.removeEventListener('keydown', onKeydown)
            }
        }
        return init
    })();
    ; (() => {
        //销毁键盘监听事件 
        state.destoryArray.push(keyboardEvent())
        state.commandArray.forEach(command => command.init && state.destoryArray.push(command.init()))
    })()
    onUnmounted(() => {//清理绑定的事件
        state.destoryArray.forEach(fn => fn && fn())
    })
    return state.commands
}