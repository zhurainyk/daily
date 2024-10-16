<template>
    <div class="idcard">
        <div class="picture" :class="{ border: userInfo[userkeys.k0] ? false : true }">
            <img :src="userInfo[userkeys.k0]" alt="">
        </div>
        <div class="form">
            <div class="tab">
                <div class="label">
                    姓名：
                </div>
                <div class="value">{{ userInfo[userkeys.k1] }}</div>
            </div>
            <div class="tab">
                <div class="label">
                    电话：
                </div>
                <div class="value">{{ userInfo[userkeys.k2]}}</div>
            </div>
            <div class="tab">
                <div class="label">
                    技能等级：
                </div>
                <div class="value">{{ userInfo[userkeys.k3] }}</div>
            </div>
            <div class="tab">
                <div class="label">证书：</div>
            </div>
            <div class="tab">
                <div class="certs" v-if="userInfo[userkeys.k4]?.length">
                    <div class="cert" v-for="x in userInfo[userkeys.k4] || []">
                        <!-- <img :src="x" alt="" @click="showPdf(x)"> -->
                        <pdfpreview class="pdf" v-if="x" :pdfUrl="x"></pdfpreview>
                        <!-- <div @click="showPdf(x)">{{ x }}</div> -->

                    </div>
                </div>
            </div>
        </div>
        <!-- <pdfpreview :pdfUrl="pdfUrl" ref="pdfview"></pdfpreview> -->
    </div>

</template>
<script setup>
import pdfpreview from './pdfpreview'
import { computed, ref } from 'vue'
const props = defineProps({
    userInfo: {
        type: Object,
        default: {
            name: '',
            phone: '',
            level: '',
            avator: '',
            maintPersonnelCertificate: []
        }
    },
    userKeys: {
        type: Object,

    }
})
const pdfview = ref()
const pdfUrl = ref('')
const userInfo = computed(() => props.userInfo)
const userkeys = computed(() => props.userKeys)

</script>
<style lang="scss" scoped>
.idcard {
    width: 452px;
    height: 236.4px;
    background-color: rgba(0, 154, 252, .2);
    display: flex;
    box-sizing: border-box;
    padding: 20px;

    .picture {
        width: 163px;
        height: 194px;
        overflow: hidden;
        box-sizing: border-box;

        &.border {
            border: 1px solid #888;
        }

        img {

            width: 100%;

        }
    }


    .form {
        margin-left: 30px;

        .tab {
            display: flex;
            margin-bottom: 16px;
            color: #FFFFFF;
            font-size: 16px;

            .certs {
                display: flex;
                justify-content: space-evenly;

                .cert {
                    width: 78px;
                    height: 55px;
                    background-color: #000;

                    .pdf {
                        margin: 0 auto;
                        width: 45px;
                        height: 100%;
                    }

                }
            }
        }
    }

}
</style>