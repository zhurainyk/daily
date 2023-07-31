<template>
    <div class="bread">
        <div class="bread-item" v-for='x in breadList' >
            {{ x.to.meta.title }}
        </div>
    </div>
</template>
<script setup name="bread">
import { computed, onMounted } from 'vue'
import { useCrumbStore } from '@/store/bread.js'
const breadStore = useCrumbStore()
const breadList = computed(() => breadStore.breadList)

</script>
<style>
.bread {
    display: flex;
    padding:20px 0;

}

.bread-item {
    padding: 0 10px;
    position: relative;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
}

.bread-item::after {
    position: absolute;
    top: 0;
    right: -3px;
    content: '>';
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;

}

.bread-item:last-child::after {
    content: ''
}
</style>