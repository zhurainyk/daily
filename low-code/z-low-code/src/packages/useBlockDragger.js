export function useBlockDragger(focusData){//实现组件的拖拽
    let dragData = {
        startX: 0,
        startY: 0
    }

    const mousedown = (e) => {
        dragData = {
            startX: e.clientX,
            startY: e.clientY,
            startPos:focusData.value.focusList.map(({top,left})=>({top,left})) //记录开始位置
        }
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
    }
    const mousemove = (e) => {
        let {clientX:moveX,clientY:moveY} = e;
        let durX = moveX - dragData.startX 
        let durY = moveY - dragData.startY;
        focusData.value.focusList.forEach((block,idx)=>{
            block.top = dragData.startPos[idx].top + durY 
            block.left = dragData.startPos[idx].left + durX  
        }) 
    }
    const mouseup = (e) => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      
    }
    return {
        mousedown
    }
}