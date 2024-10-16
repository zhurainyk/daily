<template>
    <div>
        <div class='custom-card' :style="customeStyle">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { defineComponent, toRefs } from 'vue'
export default defineComponent({
    name: 'card',
    props: {
        bg: {
            type: String,
            default: 'rgb(21, 96, 150)'
        },
        sanjiaoColor: {
            type: String,
            default: '#23FFFC'
        },
        borderColor: {
            type: String,
            default: '#068583'
        },
        defaultbg: {
            type: String,
            default: 'rgb(14, 64, 130)'
        },
        customeStyle: {
            type: String
        }
    },
    setup(props) {
        const { bg, sanjiaoColor, borderColor, defaultbg, customeStyle } = toRefs(props)
        return { bg, sanjiaoColor, borderColor, defaultbg, customeStyle }
    }

})
</script>
<style lang="scss">
$bg: v-bind(bg); //卡片背景
$borderColor: v-bind(borderColor); //边框颜色
$sanjiaoColor: v-bind(sanjiaoColor); //三角形颜色
$defaultbg: v-bind(defaultbg); //间隙背景

.custom-card {
    position: relative;
    width: 240px;
    height: 53px;
    border: 1px solid $borderColor;
    color: $sanjiaoColor;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: $bg;

    span {
        font-family: PingFang-SC-Heavy;
        width: 40%;
        font-size: 24px;

    }

    span:nth-child(2) {
        font-weight: normal;
        font-size: 16px;
        text-align: right;
    }

    .label {
        font-family: PingFang-SC-Heavy;
        width: 40%;
        font-size: 16px;
    }

    .value {
        font-family: PingFang-SC-Heavy;
        width: 40%;
        font-weight: normal;
        font-size: 24px;
        text-align: right;
    }
}

.custom-card::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 16px;
    height: 16px;
    background: linear-gradient(to right bottom, $sanjiaoColor 5.5px, $defaultbg 6.5px, $defaultbg 9px, $bg 9px, $borderColor 10px, $borderColor 11px, $bg 11.5px);
}

.custom-card::after {
    content: '';
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: 16px;
    height: 16px;
    background: linear-gradient(to left top, $sanjiaoColor 5.5px, $defaultbg 6.5px, $defaultbg 9px, $bg 9px, $borderColor 10px, $borderColor 11px, $bg 11.5px);
}
</style>