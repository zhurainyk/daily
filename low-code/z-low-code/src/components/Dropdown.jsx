import { computed, createVNode, defineComponent, inject, onBeforeUnmount, onMounted, provide, reactive, ref, render } from "vue"

export const  DropdownItem = defineComponent({
    props:{
        label:String,
        icon:String 
    },
    setup(props){
        let {label,icon} = props 
        const hide =   inject('hide')
        return ()=>{
            return <div class='dropdown-item' onClick={hide}>
                <i class={icon}></i>
                <span>{label}</span>
            </div>
        }


    }
})

const DropdownComponent = defineComponent({
    props:{
        option:{type:Object}
    },
    setup(props,ctx){
        const state = reactive({
            isShow:false,
            option:props.option,
            top:0,
            left:0
        })
        ctx.expose({
            showDropdown(option){
                state.option = option 
                state.isShow = true;
                let {top,left,height} = option.el.getBoundingClientRect()
                state.top = top + height ;
                state.left = left ;
            
                
            }
        })
        provide('hide',()=>state.isShow = false )
        const classes =computed(()=>['dropdown',{'dropdown-isshow':state.isShow}])
        const style = computed(()=>{
            return {
                top:state.top+'px',
                left:state.left+'px'
            }
        })
        let el = ref(null)
        const onMousedownDocument = (e)=>{
            if(!el.value.contains(e.target)){ //如果点击的是dropdown内部 什么都不做
                state.isShow = false 
            }
        }
        onBeforeUnmount(()=>{
            document.removeEventListener('mousedown',onMousedownDocument,true )
        })
        onMounted(()=>{
            //事件传递 先捕获再冒泡.
            //之前为了阻止事件传播 给block都增加了stopPropagation
            document.addEventListener('mousedown',onMousedownDocument,true )
        })
        return ()=>{
            return <div  class={classes.value} style={style.value} ref={el}>
                  {state.option?.contents()}
            </div>
        }
    }
})

let vm 
export function $dropdown(option){

    if(!vm){

        let el = document.createElement('div')
        vm = createVNode(DropdownComponent,option)
        document.body.appendChild((render(vm,el),el))
    }
    let {showDropdown} = vm.component.exposed;
    showDropdown(option)
}