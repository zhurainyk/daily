<template>
    <div id="header">
        <div class="program">低代码平台</div>
        <div class="center">pc</div>
        <div class="submit">
            <button class="pre">预览</button>
            <button class="sub">确定</button>
        </div>
    </div>
</template>
<script setup></script>
<style lang="scss" scoped>
#header{
    padding:0 20px;
    display: flex;
    width:100%;
    box-sizing: border-box;  
    box-shadow: 0 2px 1px #ddd;
    .program{
        text-align: center;
        line-height: 60px;
    }
    .center{
        width:1200px;
        flex-grow: 1;
        text-align: center;
        line-height: 60px;
    }
    .submit{  
        min-width: 200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button{
            width:60px;
            height: 30px;
        }
    }
}
    
</style>