<template>
    <div class="ScaleBox" ref="ScaleBox" :style="{
        width: defaultWidth + 'px',
        height: defaultHeight + 'px',
    }">
        <slot></slot>
    </div>


</template>

<script lang="ts">
import { ref, reactive, onMounted, nextTick, toRefs } from 'vue'
function debounce(fn: Function, delay: number) {
    let timer: NodeJS.Timeout;
    return function (this: any): void {
        if (timer) {
            clearTimeout(timer)
        }
        const that: Function = this;
        const args: any = [...arguments]
        timer = setTimeout(() => {
            fn.call(that, ...args)
        }, delay)
    }
}
// function throttle(fn: Function, delay: number) {

//     let timer: any = null;

//     return function (this: any) {

//         if (timer == null) {

//             fn.apply(this, arguments);

//             timer = setTimeout(function () {

//                 timer = null;

//             }, delay);

//         }

//     }

// }

export default {
    name: "ScaleBox",
    props: {
        defaultWidth: {
            type: Number,
            default: 1920

        },
        defaultHeight: {
            type: Number,
            default: 1080
        },
        noset:{//开启缩放
            type:Boolean,
            default:true 
        },
        typeByObj:{//缩放方式
            type:Boolean,
            default:false 
        }
    },
    setup(props) {
        let { defaultWidth, defaultHeight ,noset,typeByObj} = toRefs(props);
        let scale: any = ref(0);


        // const typeByObj = false//缩放方式
        const ScaleBox: any = ref(null)
        const getScale = () => {
            try {
                const width = ScaleBox.value.clientWidth
                const height = ScaleBox.value.clientHeight;
                const wh = window.innerHeight / height;
                const ww = window.innerWidth / width;
                console.log(`scalebox实际宽高：${width} - ${height};window宽高：${window.innerWidth} - ${window.innerHeight}`);
                if (typeByObj) {
                    return {
                        wh,
                        ww
                    }
                } else {
                    return ww < wh ? ww : wh;
                }
            } catch (e) {
                console.log(e)
                return typeByObj ? {
                    wh: 0,
                    ww: 0
                } : 0
            }
        }
        const setScale = () => {
            // 获取到缩放比例，设置它
            console.log({noset:noset.value})
            if(!noset.value)return 
            scale = getScale()
            if (ScaleBox.value) {
                ScaleBox.value.style.setProperty("--scale", typeByObj?`(${scale.ww},${scale.wh})`:scale);
            }


        }
        onMounted(() => {
            nextTick(() => {
                console.log(ScaleBox.value.clientWidth)
                setScale();
                window.addEventListener("resize", debounce(setScale, 30));
            })
        })
        return {
            scale,
            defaultHeight,
            defaultWidth,
            ScaleBox
        }
    },


};
</script>
 
<style lang="scss">
#ScaleBox {
    --scale: 1;
}

.ScaleBox {
    position: fixed;
    transform: scale(var(--scale));
    display: flex;
    flex-direction: column;
    transform-origin: 0 0;
    // left: 50%;
    // top: 50%;
    transition: 0.3s;
    z-index: 999;
    // background: rgba(255, 0, 0, 0.3);
}
</style>

