import {defineComponent,computed,inject} from 'vue'
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
        const block = computed(()=>props.block)
        const blockStyle = computed(()=>{
            return {
                top:`${block.value.top}px`,
                left:`${block.value.left}px`,
                zIndex:`${block.value.zIndex}`,
            }
        })
        return ()=>{
            return  <div className='editor-block' style={blockStyle.value}>
                       {RenderComponent}
                    </div>
        }
    }
})