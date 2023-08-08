import { defineComponent, computed, inject, ref } from 'vue'
import { useMenuDragger } from './useMenuDragger'

import { useFocus } from './useFocus'
import './editor.scss'
import EditorBlock from './edidor-block'
import deepcopy from 'deepcopy';
import { useBlockDragger } from './useBlockDragger'
import { useCommand } from './useCommand.js'
import { $dialog } from '../components/Dialog.jsx'
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

        const { containerMousedown, blockMousedown, focusData, lastSelectBlock } = useFocus(data, (e) => {
            mousedown(e, data)
        })

        //3.实现拖拽多个元素

        const { mousedown, markLine } = useBlockDragger(focusData, lastSelectBlock, data)

        //菜单配置
        const commands = useCommand(data)
        const buttons = [
            { label: '撤销', icon: 'icon-back', handler: () => commands.undo() },
            { label: '重做', icon: 'icon-forward', handler: () => commands.redo() },
            {
                label: '导入', icon: 'icon-import', handler: () => $dialog({
                    title: '导入json', footer: true, content: '', onConfirm(text) {
                 
                        const _data= JSON.parse(text) //直接给data.value赋值  不会触发dom更新 需要单个赋值
                        Object.keys(data.value).forEach(k=>{
                            data.value[k] = _data[k]
                        })
                        commands.updateContainer(data.value)
                        // 
                    }
                })
            },
            { label: '导出', icon: 'icon-export', handler: () => $dialog({ title: '导出json',  content: JSON.stringify(data.value) }) },
        ]


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
            <div className='editor-top'>
                {buttons.map((btn, index) => {
                    return <div class='editor-top-button' onClick={btn.handler}>
                        <i class={btn.icon}></i>
                        <span>{btn.label}</span>
                    </div>
                })}
            </div>
            <div className='editor-right'>属性栏</div>
            <div className='editor-container'>
                {/* 负责产生滚动条*/}
                <div className="editor-container-canvas">
                    <div className="editor-container-canvas-container" onMousedown={containerMousedown} ref={containerRef} style={containerStyle.value}>
                        {/* 内容区 */}
                        {
                            (data.value.blocks.map((block, index) => {
                                return <EditorBlock class={block.focus ? 'editor-block-focus' : ''} onMousedown={(e) => blockMousedown(e, block, index)} block={block}></EditorBlock>
                            }))
                        }
                        {
                            markLine.x !== null && <div class='line-x' style={{ left: markLine.x + 'px' }}></div>

                        }
                        {
                            markLine.y !== null && <div class='line-y' style={{ top: markLine.y + 'px' }}></div>
                        }
                    </div>
                </div>
            </div>

        </div>
    }
})