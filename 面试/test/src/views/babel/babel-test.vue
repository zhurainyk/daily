<template>
    <h1>babel插件开发</h1>
    <div>
        <button @click='handleClick'>点击</button>
    </div>
</template>
<script setup>
 const handleClick = ()=>{
     //有些逻辑只能dev环境
     //
     console.log('click')
     const a = 10;
     const b = 20;
     if(DEBUG){ //prod生产环境不允许执行
         console.log(a+b)
     }
 }
</script>