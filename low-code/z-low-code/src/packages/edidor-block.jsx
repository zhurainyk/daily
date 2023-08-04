import {defineComponent,computed,inject,onMounted,ref} from 'vue'
export default defineComponent({
    props:{
        block:{
            type:Object
        }
    },
    setup(props){
        const config = inject('config')
        console.log(config)
        const component = config.componentMap[props.block.key]
        const RenderComponent = component.render()
 
        const blockStyle = computed(()=>{
            return {
                top:`${props.block.top}px`,
                left:`${props.block.left}px`,
                zIndex:`${props.block.zIndex}`,
            }
        })
        const blockRef = ref(null)
        onMounted(()=>{
            let {offsetWidth,offsetHeight} = blockRef.value
            console.log(props)
            props.block.width = offsetWidth
            props.block.height = offsetHeight
            
            if(props.block.alignCenter){
                //拖拽松手的时候居中
                console.log('update')
                props.block.left = props.block.left - offsetWidth/2
                props.block.top = props.block.top - offsetHeight/2
                props.block.alignCenter = false 
            }
        })
        return ()=>{
            return  <div class='editor-block' ref={blockRef} style={blockStyle.value}>
                       {RenderComponent}
                    </div>
        }
    }
})