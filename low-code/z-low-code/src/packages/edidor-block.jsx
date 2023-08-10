import {defineComponent,computed,inject,onMounted,ref} from 'vue'
export default defineComponent({
    props:{
        block:{
            type:Object
        },
        formData:{
            type:Object 
        }
    },
    setup(props){
        const config = inject('config')
 
        const component = config.componentMap[props.block.key]
        console.log(props.block.props)
        const RenderComponent = component.render({ //属性回传 
            props:props.block.props ,
            model:Object.keys(component.model || {}).reduce((prev,moduleName)=>{
                let propName = props.block.model[moduleName] //username 
                console.log(propName)
                console.log(props.formData[propName])
                prev[moduleName] = { //实现输入框双向绑定
                    moduleValue:props.formData[propName],
                    "onUpdate:modelValue":(v)=>props.formData[propName] = v 
                }
                return prev 
            },{})
        })
 
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