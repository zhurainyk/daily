import { defineComponent, computed, inject } from 'vue'
import './editor.scss'
import EditorBlock from './edidor-block'
export default defineComponent({
    props: { modelValue: { type: Object } },
    setup(props) {
        console.log(props.modelValue)
        const data = computed({
            get() {
                return props.modelValue
            }
        })
        const config = inject('config')

        const containerStyle = computed(() => {
            return {
                width: data.value.container.width + 'px',
                height: data.value.container.height + 'px'
            }
        })
        return () => <div className='editor'>
            {/* h5拖拽 */}
            <div className="editor-left">
                {(config.componentList.map(component => {
                    return <div className='editor-left-item' draggable>
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
                    <div className="editor-container-canvas-container" style={containerStyle.value}>
                        {/* 内容区 */}
                        {
                            (data.value.blocks.map(block => {
                                return <EditorBlock block={block}></EditorBlock>
                            }))
                        }
                    </div>
                </div>
            </div>

        </div>
    }
})