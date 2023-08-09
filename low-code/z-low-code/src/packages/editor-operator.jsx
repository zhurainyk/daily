
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
        }
    },
    setup(props, ctx) {
        const config = inject('config') //组件配置信息
        const state = reactive({
            editData:{}
        })
        console.log({props})
        const reset = ()=>{
            if(!props.block){
                state.editData = deepcopy(props.data.container)
            }else{
                state.editData = deepcopy(props.block)
                console.log(state.editData )
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
                if (component && component.props) { //{text:{type:'xxxx'},size:{},color:{}}
                    let res = Object.entries(component.props).map(([propName, propConfig]) => {
                        return <ElFormItem label={propName}>
                            {{
                                input: () => <ElInput v-model={state.editData.props[propName]}></ElInput>,
                                color: () => <ElColorPicker v-model={state.editData.props[propName]}></ElColorPicker>,
                                select: () => <ElSelect v-model={state.editData.props[propName]}>
                                    {propConfig.options.map(opt => {
                                        return <ElOption label={opt.label} value={opt.value}></ElOption>
                                    })}
                                </ElSelect>
                            }[propConfig.type]()}
                        </ElFormItem>
                    })
                    content.push(res)
                }
            }
            return <ElForm labelPosition='top' style='padding:30px'>
                {content}
                <ElFormItem>
                    <ElButton type='primary'>应用</ElButton>
                    <ElButton>重置</ElButton>
                </ElFormItem>
            </ElForm>
        }
    }
})