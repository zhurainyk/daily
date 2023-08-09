import { defineComponent, computed, inject, ref } from 'vue'
import { useMenuDragger } from './useMenuDragger'
import { ElButton } from 'element-plus'
import { useFocus } from './useFocus'
import './editor.scss'
import EditorBlock from './edidor-block'
import deepcopy from 'deepcopy';
import { useBlockDragger } from './useBlockDragger'
import { useCommand } from './useCommand.js'
import { $dialog } from '../components/Dialog.jsx'
import { $dropdown, DropdownItem } from '../components/Dropdown'
import EditorOperator from './editor-operator'
export default defineComponent({
    props: {
        modelValue: {
            type: Object
        }
    },
    emits: ['updata:modelValue'],
    setup(props, ctx) {
        //预览的时候不能操作 可以点击输入 
        const previewRef = ref(false)
        const editorRef = ref(true)
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

        const { containerMousedown, blockMousedown, focusData, lastSelectBlock, clearBlockFocus } = useFocus(data, previewRef, (e) => {
            mousedown(e, data)
        })

        //3.实现拖拽多个元素

        const { mousedown, markLine } = useBlockDragger(focusData, lastSelectBlock, data)


        // 右键菜单
        const onContextMenuBlock = (e, block) => {
            e.preventDefault()
            console.log('点击了')
            //为哪一个元素产生下拉框
            $dropdown({
                el: e.target,
                contents: () => <>
                <DropdownItem label='删除' icon='icon-delete' onClick={()=>commands.delete()}></DropdownItem>
                <DropdownItem label='置顶' icon='icon-place-top' onClick={()=>commands.placeTop()}></DropdownItem>
                <DropdownItem label='置底' icon='icon-place-bottom' onClick={()=>commands.placeBottom()}></DropdownItem>
                <DropdownItem label='查看' icon='icon-browse' onClick={() => {
                    $dialog({
                        title:'查看节点数据',
                        content:JSON.stringify(block)
                    })
                }}></DropdownItem>
                <DropdownItem label='导入' icon='icon-import' onClick={ ()=>{
                    $dialog({
                        title:'导入节点数据',
                        content:'',
                        footer:true,
                        onConfirm(text){
                            text= JSON.parse(text ) 
                            commands.updateBlock(text,block,data)
                        }
                    })
                }}></DropdownItem>
            </>
            })
        }
        //菜单配置
        const commands = useCommand(data, focusData)
        const buttons = [
            { label: '撤销', icon: 'icon-back', handler: () => commands.undo() },
            { label: '重做', icon: 'icon-forward', handler: () => commands.redo() },
            {
                label: '导入', icon: 'icon-import', handler: () => $dialog({
                    title: '导入json', footer: true, content: '', onConfirm(text) {

                        const _data = JSON.parse(text) //直接给data.value赋值  不会触发dom更新 需要单个赋值
                        Object.keys(data.value).forEach(k => {
                            data.value[k] = _data[k]
                        })
                        commands.updateContainer(data.value)
                        // 
                    }
                })
            },
            { label: '导出', icon: 'icon-export', handler: () => $dialog({ title: '导出json', content: JSON.stringify(data.value) }) },
            { label: '置顶', icon: 'icon-place-top', handler: () => commands.placeTop() },
            { label: '置底', icon: 'icon-place-bottom', handler: () => commands.placeBottom() },
            { label: '删除', icon: 'icon-delete', handler: () => commands.delete() },
            {
                label: () => previewRef.value ? '编辑' : '预览', icon: () => previewRef.value ? 'icon-edit' : 'icon-browse', handler: () => {

                    previewRef.value = !previewRef.value
                    clearBlockFocus()
                }
            },
            { label: '关闭', icon: 'icon-close', handler: () => editorRef.value = false },
        ]


        return () => !editorRef.value ?
            <>

                {/* 预览页面*/}
                <div className="editor-container-canvas">
                    <div className="editor-container-canvas-container" onMousedown={containerMousedown} ref={containerRef} style={`${containerStyle.value};margin0`}  >
                        {/* 内容区 */}
                        {
                            (data.value.blocks.map((block, index) => {
                                return <EditorBlock
                                    class={`${previewRef.value ? 'editor-block-preview' : ''}`}

                                    onMousedown={(e) => blockMousedown(e, block, index)} block={block}></EditorBlock>
                            }))
                        }

                    </div>
                </div>
                <ElButton type='primary' onClick={() => editorRef.value = true}>继续编辑</ElButton>

            </>
            :
            <div className='editor'>
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
                        let icon = typeof btn.icon == 'function' ? btn.icon() : btn.icon;
                        let label = typeof btn.label == 'function' ? btn.label() : btn.label;
                        return <div class='editor-top-button' onClick={btn.handler}>
                            <i class={icon}></i>
                            <span>{label}</span>
                        </div>
                    })}
                </div>
                <div className='editor-right'>
                    <EditorOperator data={data.value} block={lastSelectBlock.value}></EditorOperator>
                </div>
                <div className='editor-container'>
                    {/* 负责产生滚动条*/}
                    <div className="editor-container-canvas">
                        <div className="editor-container-canvas-container" onMousedown={containerMousedown} ref={containerRef} style={containerStyle.value}>
                            {/* 内容区 */}
                            {
                                (data.value.blocks.map((block, index) => {
                                    return <EditorBlock
                                        class={`${block.focus ? 'editor-block-focus' : ''} ${previewRef.value ? 'editor-block-preview' : ''}`}
                                        key={block.top+index}
                                        onMousedown={(e) => blockMousedown(e, block, index)} block={block}
                                        onContextmenu={(e) => onContextMenuBlock(e, block)}

                                    ></EditorBlock>
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