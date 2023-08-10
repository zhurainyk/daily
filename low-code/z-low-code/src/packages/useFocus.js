import {computed,ref} from 'vue'
export function useFocus(data,previewRef,callback,){ //获取焦点
    const selectIndex = ref(-1) //表示没有一个被选中
    const focusData = computed(()=>{
        let focusList = []
        let unfocusedList = []
        data.value.blocks.forEach(block=>(block.focus?focusList:unfocusedList).push(block))
    
        return {
            focusList,
            unfocusedList
        }
    })
    const clearBlockFocus = ()=>{
        data.value.blocks.forEach(block=>(block.focus = false ))
    }
    //最后选中的哪一个
    const lastSelectBlock = computed(()=>data.value.blocks[selectIndex.value])
   
    const blockMousedown = (e, block,index) => {
         if(previewRef.value) return //预览
        e.preventDefault()
        e.stopPropagation()
        //block上设置一个属性 focus  获取焦点后 focus置为true

        if(e.shiftKey){ //shfit 多选
            //当前只有一个元素被选中的时候 就不要取消了
            if(focusData.value.focusList.length<=1){
                block.focus = true 
            }else{
                block.focus = !block.focus;
            }
           
        }else{
            if (!block.focus) {
                clearBlockFocus()
                block.focus = true //清空其他元素的focus
            } 
            //再次点击的时候 依然是focus
            // else {
            //     block.focus = false
            // }
        } 
        selectIndex.value =index ;
        if(callback){
            callback(e)
        }
    }
    const containerMousedown = ()=>{ //点击画布清空所有focus
        if(previewRef.value) return //预览
        clearBlockFocus()
    }
    return {
        clearBlockFocus,
        focusData,
        blockMousedown,
        containerMousedown,
        lastSelectBlock
    }
}