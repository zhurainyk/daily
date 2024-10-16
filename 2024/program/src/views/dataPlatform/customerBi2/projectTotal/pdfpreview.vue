<template>
    <div class="pdf-preview">
        <div class="pdf-wrap">
            <vue-pdf-embed @click="showPdf" v-if="state.type == 'pdf'" :source="state.source" :style="scale"
                class="vue-pdf-embed" :page="state.pageNum" />
            <img @click="showPdf" class="vue-pdf-embed" :src="state.source.url" v-else alt="" />
            <el-dialog v-model="pdfdialog" :show-close="true" width="1300px" class='pdf-dialog' :modal="false"
                :close-on-click-modal="false" @close="closepdfdialog">
                <div class="pdf-main">
                    <vue-pdf-embed v-if="state.type == 'pdf'" :source="state.source" :style="scale" class="vue-pdf-embed"
                        :page="state.pageNum" />
                    <img class="vue-pdf-embed" :src="state.source.url" v-else alt="" />
                </div>
            </el-dialog>

        </div>
        <!-- <div class="page-tool">
       <div class="page-tool-item" @click="lastPage()">上一页</div>
       <div class="page-tool-item" @click="nextPage()">下一页</div>
       <div class="page-tool-item">{{ state.pageNum }}/{{ state.numPages }}</div>
       <div class="page-tool-item" @click="pageZoomOut()">放大</div>
       <div class="page-tool-item" @click="pageZoomIn()">缩小</div>
       <div class="page-tool-item" @click="$emit('close')">关闭</div>
     </div> -->
    </div>
</template>
<script setup lang="ts">
import VuePdfEmbed from "vue-pdf-embed";
//import { createLoadingTask } from "vue3-pdfjs/esm/vue-pdf.js"; 
import * as pdfjsLib from "pdfjs-dist";
import { reactive, onMounted, computed, ref } from "vue";

const props = defineProps({
    pdfUrl: {
        type: String,
        required: true
    }
})
const pdfdialog = ref(false)
const closepdfdialog = () => {
    pdfdialog.value = false
}
const showPdf = () => {
    pdfdialog.value = true
}

const state = reactive({
    // source: props.pdfUrl, //预览pdf文件地址 
    // Error during font loading: The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.
    // 直接路径报错，改用对象
    source: {
        url: props.pdfUrl,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.0.279/cmaps/',
        cMapPacked: true,
    },
    pageNum: 1, //当前页面
    scale: 1, // 缩放比例
    numPages: 0, // 总页数
    type: 'pdf' //pdf  img
});
const scale = computed(() => `transform:scale(${state.scale})`)
function lastPage() {
    if (state.pageNum > 1) {
        state.pageNum -= 1;
    }
}
function nextPage() {
    if (state.pageNum < state.numPages) {
        state.pageNum += 1;
    }
}
function pageZoomOut() {
    if (state.scale < 2) {
        state.scale += 0.1;
    }
}
function pageZoomIn() {
    if (state.scale > 0.8) {
        state.scale -= 0.1;
    }
}
onMounted(() => {

    const type = state.source.url.slice(state.source.url.lastIndexOf('.') + 1)
    if (type !== 'pdf') {
        state.type = 'img'//图片
    } else {
        state.type = 'pdf'// pdf
        pdfjsLib.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/legacy/build/pdf.worker.entry.js");
        setTimeout(() => {
            const loadingTask = pdfjsLib.getDocument(state.source.url);
            loadingTask.promise.then((pdf) => {
                state.numPages = pdf.numPages;
            });
        })
    }

});

</script>
<style lang="css" scoped>
.pdf-preview {
    /* position: fixed;
       height: 100vh;
       width: 100vw;
       padding: 20px 0 100px 0;
       box-sizing: border-box;
       background-color: rgba(0, 0, 0, 0.5);
       left: 0;
       top: 0;
       z-index: 99999999;
       overflow-y: auto; */
    width: 100%;
    height: 100%
}

.pdf-wrap {
    overflow-y: auto;
}

.pdf-dialog {
    background-color: #000;

}

.pdf-main::-webkit-scrollbar-thumb {

    background-color: rgb(32, 91, 167);

}

.pdf-main::-webkit-scrollbar-track {
    background-color: #000;

}

.pdf-main {
    height: 750px;
    margin-top: 12px;
    box-sizing: border-box;
    padding: 8px 25px 20px 25px;
    overflow-y: auto;
    background-color: #000;
}

.vue-pdf-embed {
    text-align: center;
    width: 80%;
    /* border: 1px solid #e5e5e5; */
    margin: 0 auto;
    box-sizing: border-box;
    display: block;
}

.page-tool {
    position: fixed;
    bottom: 35px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    background: rgb(66, 66, 66);
    border-radius: 19px;
    z-index: 100;
    cursor: pointer;
    margin-left: 50%;
    transform: translateX(-50%);
}

.page-tool-item {
    padding: 8px 15px;
    padding-left: 10px;
    cursor: pointer;
    color: #fff !important;
}
</style>
