<script setup>

</script>

<template>
<!-- 添加标题 -->
<div class="module-box">
    <div style="flex: 0 1 30%">
        <dv-decoration-10 style="height:5px;" />
    </div>
    <div style="flex: 0 1 40%">
        <div class="d-flex">
            <dv-decoration8 style="height:50px;flex:1" />
            <div style="flex:1" >
                <dv-button border="Border2" color="#4c8045">智慧政务</dv-button>
            </div>
            <dv-decoration8 :reverse="true" style="height:50px;flex:1" />

        </div>
    </div>
    <div style="flex: 0 1 30%">
        <dv-decoration-10 style="height:5px;transform:rotateY(180deg);" />
    </div>
</div>
</template>
<style>
</style>