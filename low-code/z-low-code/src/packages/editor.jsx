import { defineComponent, computed, inject, ref } from 'vue'
import { useMenuDragger } from './useMenuDragger'

import { useFocus } from './useFocus'
import './editor.scss'
import EditorBlock from './edidor-block'
import deepcopy from 'deepcopy';
import { useBlockDragger } from './useBlockDragger'
export default defineComponent({
    props: {
        modelValue: {
            type: Object
        }
    },
    emits: ['updata:modelValue'],
    setup(props, ctx) {
        console.log(props.modelValue)
        const data = computed({
            get() {
                return props.modelValue
            },
            set(newValue) { //v-model 双向绑定 从新渲染页面 
                console.log('双向绑定', deepcopy(newValue))
                ctx.emit('updata:modelValue', deepcopy(newValue))
            }
        })
        const config = inject('config')

        const containerStyle = computed(() => {
            return {
                width: data.value.container.width + 'px',
                height: data.value.container.height + 'px'
            }
        })
        const containerRef = ref(null)

        //1. 实现菜单拖拽
        const { dragstart, dragend } = useMenuDragger(data, containerRef)

        //2. 实现获取焦点 

        const { containerMousedown, blockMousedown, focusData,lastSelectBlock } = useFocus(data, (e) => {
            mousedown(e)
        })

        //3.实现拖拽多个元素

        const {mousedown} = useBlockDragger(focusData)


        return () => <div className='editor'>
            {/* h5拖拽 */}
            <div className="editor-left">
                {(config.componentList.map(component => {
                    return <div className='editor-left-item' draggable
                        onDragstart={e => dragstart(e, component)}
                        onDragend={e => dragend(e)}
                    >
                        <span>{component.label}</span>
                        <div>{component.preview()}</div>
                    </div>
                }))}
            </div>
            <div className='editor-top'>菜单栏</div>
            <div className='editor-right'>属性栏</div>
            <div className='editor-container'>
                {/* 负责产生滚动条*/}
                <div className="editor-container-canvas">
                    <div className="editor-container-canvas-container" onMousedown={containerMousedown} ref={containerRef} style={containerStyle.value}>
                        {/* 内容区 */}
                        {
                            (data.value.blocks.map((block,index) => {
                                return <EditorBlock class={block.focus ? 'editor-block-focus' : ''} onMousedown={(e) => blockMousedown(e, block,index)}  block={block}></EditorBlock>
                            }))
                        }
                    </div>
                </div>
            </div>

        </div>
    }
})