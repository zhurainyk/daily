import {reactive} from 'vue'
import { events } from './events';
export function useBlockDragger(focusData,lastSelectBlock,data){//实现组件的拖拽 辅助线
    
    let dragData = {
        startX: 0,
        startY: 0,
        dragging:false ,//正在拖拽的标识
    }
    let markLine = reactive({
        x:null,
        y:null
    })

    const mousedown = (e, ) => {
    
        const {width:BWidth,height:BHeight} = lastSelectBlock.value; 

        dragData = {
            startX: e.clientX,
            startY: e.clientY,
            startPos:focusData.value.focusList.map(({top,left})=>({top,left})) ,//记录开始位置
            startLeft:lastSelectBlock.value.left, //拖拽前的位置
            startTop:lastSelectBlock.value.top,
            dragging:false,//正在拖拽的标识
            lines:(()=>{//辅助线业务
                let {unfocusedList} = focusData.value;
                unfocusedList = [...unfocusedList,{ //画布也具有居中辅助线
                    top:0,
                    left:0,
                    width:data.value.container.width,
                    height:data.value.container.height
                }]
                let lines = {x:[],y:[]} //计算横线的位置用y来存放 计算竖线的位置用x来存放
                unfocusedList.forEach(block=>{
                    const {top:ATop,left:ALeft,width:AWidth,height:AHeight} = block
                    //当B元素拖拽到与A 元素top一致的时候 ，要显示这根辅助线，辅助线的位置就是ATop
                    lines.y.push({showTop:ATop,top:ATop}) //顶 对 顶
                    lines.y.push({showTop:ATop,top:ATop - BHeight}) //顶对底
                    lines.y.push({showTop:ATop+AHeight/2,top:ATop+AHeight/2 - BHeight/2}) //中对中
                    lines.y.push({showTop:ATop+AHeight,top:ATop+AHeight-BHeight})//底对底
                    lines.y.push({showTop:ATop+AHeight,top:ATop+AHeight })//底对顶 

                    lines.x.push({showLeft:ALeft,left:ALeft}) //左对左
                    lines.x.push({showLeft:ALeft+AWidth,left:ALeft+AWidth}) //右对左
                    lines.x.push({showLeft:ALeft + AWidth/2 ,left :ALeft + AWidth/2 - BWidth/2 }) //横 中对中
                    lines.x.push({showLeft:ALeft + AWidth ,left :ALeft + AWidth - BWidth }) // 右对右
                    lines.x.push({showLeft:ALeft   ,left :ALeft - BWidth  }) // 左对右
                })
                console.log(lines)
                return lines
            })()
        }
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
    }
    const mousemove = (e) => {
        let {clientX:moveX,clientY:moveY} = e;
        if(!dragData.dragging){
            dragData.dragging = true ;
            events.emit('start')//触发事件  记录拖拽前的位置 
        }
        //计算当前元素最新的left和top，去线里找 找到就显示
        //鼠标移动后 - 鼠标移动前 + left
        let left = moveX - dragData.startX + dragData.startLeft 
        let top = moveY - dragData.startY + dragData.startTop

        //先计算横线 距离参照物5px 就显示线
        let y = null 
        let x = null 
        for(let i =0;i<dragData.lines.y.length;i++){
            const {top:t,showTop:s } = dragData.lines.y[i]
            if(Math.abs(t-top)<5){
                y = s   //线要实现的位置
                moveY = dragData.startY - dragData.startTop + t  //容器距离顶部的距离 + 目标的高度 就是最新的moveY
                 //直接重置  实现快速贴在一起
                break; //跳出循环
            }
        }
        for(let i =0;i<dragData.lines.x.length;i++){
            const {left:l,showLeft:s } = dragData.lines.x[i]
            if(Math.abs(l-left)<5){
                x = s  
                moveX = dragData.startX - dragData.startLeft + l  //容器距离顶部的距离 + 目标的高度 就是最新的moveY
                 //直接重置  实现快速贴在一起
                break; //跳出循环
            }
        }
        markLine.x = x;
        markLine.y = y;//响应式数据


        let durX = moveX - dragData.startX  //之前和之后的距离
        let durY = moveY - dragData.startY;
        focusData.value.focusList.forEach((block,idx)=>{
            block.top = dragData.startPos[idx].top + durY 
            block.left = dragData.startPos[idx].left + durX  
        }) 
    }
    const mouseup = (e) => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
        markLine.x = null;
        markLine.y = null 
        if(dragData.dragging){
            events.emit('end')
        }
    }
    return {
        mousedown,
        markLine
    }
}