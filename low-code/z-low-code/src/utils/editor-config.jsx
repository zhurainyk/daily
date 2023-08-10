
import { ElButton, ElInput } from 'element-plus'

function createEditorConfig() {
    const componentList = []
    const componentMap = {}
    return {
        register: (component) => {
            componentList.push(component)
            componentMap[component.key] = component

        },
        componentList,
        componentMap
    }
}

export const registerConfig = createEditorConfig()

const createInputProp = (label) => ({ type: 'input', label })
const createColorProp = (label) => ({ type: 'color', label })
const createSelectProp = (label, option) => ({ type: 'select', label, option })

registerConfig.register({
    label: '文本',
    preview: () => '预览文本',
    render: ({props}) =>  <span style={{color:props.color,fontSize:props.size}}>{props.text || '渲染文本'}</span>, //动态渲染
    key: 'text',
    props: {
        text: createInputProp('文本内容'),
        color: createColorProp('字体颜色'),
        size: createSelectProp('字体大小', [
            { label: '14px', value: '14px'  },
            { label: '18px', value: '18px' },
            { label: '24px',  value: '24px' },
        ])
    }
})
registerConfig.register({
    label: '按钮',
    preview: () => (<ElButton>预览按钮</ElButton>),
    render: ({props}) => (<ElButton type={props.type} size={props.size}>{props.text ||'按钮x'}</ElButton>),
    key: 'button',
    props: {
        text: createInputProp('按钮内容'), 
        type: createSelectProp('按钮类型', [
            { label: '基础', value: 'primary'  },
            { label: '成功', value: 'success' },
            { label: '警告',  value: 'warning' },
            { label: '危险',  value: 'danger' },
            { label: '文本',  value: 'text' },
        ])
    }
})
registerConfig.register({
    label: '输入框',
    preview: () => (<ElInput placeholder='请输入...'></ElInput>),
    render: ({model}) =>{
        console.log(model.default)
        return  (<ElInput placeholder='请输入...'    {...model.default} ></ElInput>)
    },
    key: 'input',
    model:{ //输入框必备字段
        default:'绑定字段'
    }
})
