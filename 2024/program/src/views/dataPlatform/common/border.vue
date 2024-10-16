<template>
    <div class="dashborder">
        <div class="dashborder2">
            <slot></slot>
        </div>
    </div>
</template>
<script  >
import { defineComponent } from "vue";
export default defineComponent({
    name: 'border',
})
</script>
<style lang="scss" scoped>
.dashborder {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid rgb(16, 76, 138);
    border-radius: 2px;
    box-sizing: border-box;
}

.dashborder::before {
    content: '';
    position: absolute;
    bottom: 1px;
    left: -1px;
    width: 2px;
    height: 30px;
    background: linear-gradient(to bottom, rgb(27, 150, 250) 6px, transparent 6px, transparent 10px, rgb(27, 150, 250) 10px);
}

.dashborder::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 0px;
    width: 30px;
    height: 2px;
    background: linear-gradient(to right, rgb(27, 150, 250) 20px, transparent 20px, transparent 24px, rgb(27, 150, 250) 24px);
}

.dashborder2 {
    position: relative;
    width: 100%;
    height: 100%;
}

.dashborder2::before {
    content: '';
    position: absolute;
    right: -1px;
    top: 0;
    width: 2px;
    height: 30px;
    background: linear-gradient(to bottom, rgb(27, 150, 250) 20px, transparent 20px, transparent 24px, rgb(27, 150, 250) 24px);
}

.dashborder2::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -1px;
    width: 30px;
    height: 2px;
    background: linear-gradient(to left, rgb(27, 150, 250) 20px, transparent 20px, transparent 24px, rgb(27, 150, 250) 24px);
}
</style>