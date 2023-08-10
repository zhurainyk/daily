
import { defineComponent, inject,reactive,watch } from "vue";
import { ElForm, ElFormItem, ElButton, ElInputNumber, ElInput, ElColorPicker, ElSelect, ElOption } from "element-plus";
import deepcopy from "deepcopy";
export default defineComponent({
    props: {
        block: {
            type: Object //最后选中的元素
        },
        data: { //所有的数据
            type: Object
        },
        updateContainer:{
            type:Function
        },
        updateBlock:{
            type:Function 
        }
    },
    setup(props, ctx) {
        const config = inject('config') //组件配置信息
        const state = reactive({
            editData:{},
            top:props.block?.top,//调整编辑后的位置
            left:props.block?.left
        }) 
        const reset = ()=>{
            if(!props.block){
                state.editData = deepcopy(props.data.container)
            }else{
                state.editData = deepcopy(props.block)
                console.log(state.editData )
            }
        }
        const apply = ()=>{
            if(!props.block){ //更改容器大小
                 props.updateContainer({...props.data,container:state.editData})
            }else{ //更改组件属性 
                state.editData.top = state.top?state.top:state.editData.top
                state.editData.left = state.left?state.left:state.editData.left
                console.log(state.editData)
                console.log(props.block )
                props.updateBlock(state.editData,props.block)
            }
        }
        watch(()=>props.block,reset,{
            immediate:true
        })
        return () => {
            let content = []
            if (!props.block) {
                content.push(
                    <>
                        <ElFormItem label='容器宽度'>
                            <ElInputNumber v-model={state.editData.width}></ElInputNumber>
                        </ElFormItem>
                        <ElFormItem label='容器高度'>
                            <ElInputNumber v-model={state.editData.height}></ElInputNumber>
                        </ElFormItem>
                    </>
                )
            } else {
                let component = config.componentMap[props.block.key]
                console.log(props,state)
                state.top = props.block.top 
                state.left = props.block.left 
                if (component && component.props) { //{text:{type:'xxxx'},size:{},color:{}}
                    let res = Object.entries(component.props).map(([propName, propConfig]) => {
                        return <ElFormItem label={propConfig.label}>
                            {{
                                input: () => <ElInput v-model={state.editData.props[propName]}></ElInput>,
                                color: () => <ElColorPicker v-model={state.editData.props[propName]}></ElColorPicker>,
                                select: () => <ElSelect v-model={state.editData.props[propName]}>
                                    {propConfig.option.map(opt => {
                                        return <ElOption label={opt.label} value={opt.value}></ElOption>
                                    })}
                                </ElSelect>
                            }[propConfig.type]()}
                        </ElFormItem>
                    })
                    content.push(res)
                }
                //渲染输入框
                if(component && component.model){
                
                    content.push(
                        Object.entries(component.model).map(([moduleName,label])=>{
                            return <ElFormItem label={label}>
                                <ElInput v-model={state.editData.model[moduleName]}></ElInput>
                            </ElFormItem>
                        })
                    )
                }
            }
            return <ElForm labelPosition='top' style='padding:30px'>
                {content}
                <ElFormItem>
                    <ElButton type='primary' onClick={()=>apply()}>应用</ElButton>
                    <ElButton onClick={reset}>重置</ElButton>
                </ElFormItem>
            </ElForm>
        }
    }
})