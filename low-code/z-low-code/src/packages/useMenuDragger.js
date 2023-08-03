export function useMenuDragger(data,containerRef ){
    let currentComponent = null
    const dragenter = (e) => {
        e.dataTransfer.dropEffect = 'move' //H5拖动的图标
    }
    const dragover = (e) => {
        e.preventDefault()
    }
    const dragleave = (e) => {
        e.dataTransfer.dropEffect = 'none'
    }
    const drop = (e) => {
        console.log(data.value.blocks)
        let blocks = data.value.blocks;
        blocks.push({
            top: e.offsetY,
            left: e.offsetX,
            zIndex: 1,
            key: currentComponent.key,
            alignCenter:true,//松手的时候居中
        })
        data.value.blocks = blocks
        data.value = {
            ...data.value
        } 
        currentComponent = null 
    }
    const dragstart = (e, component) => {
        //dragenter 进入元素中 添加一个移动的标识
        //dragover 在目标元素经过 必须要阻止默认行为 否者不能触发drop
        //dragleave 离开元素的时候 需要增加一个禁用标识
        //drop松手的时候  根据拖拽组件 添加一个组件
        console.log(containerRef.value)
        containerRef.value.addEventListener('dragenter', dragenter)
        containerRef.value.addEventListener('dragover', dragover)
        containerRef.value.addEventListener('dragleave', dragleave)
        containerRef.value.addEventListener('drop', drop)
        currentComponent = component;
    }
    const dragend = (e)=>{
        containerRef.value.removeEventListener('dragenter', dragenter)
        containerRef.value.removeEventListener('dragover', dragover)
        containerRef.value.removeEventListener('dragleave', dragleave)
        containerRef.value.removeEventListener('drop', drop)
    }

    return {
        dragstart,
        dragend
    }
}