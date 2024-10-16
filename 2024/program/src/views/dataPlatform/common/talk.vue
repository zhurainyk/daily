<template>
    <!-- <button @click="talk">开始</button>
    <button @click="stopTalk">停止</button> -->
    <div class="mik" title="开始语音通话" v-show="canTalk">
        <svg t="1683620394183" class=" mikicon icon" @mousedown="startRecord" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="2517" width="20" height="22">
            <path
                d="M511.752 70.5c-86.605 0-156.835 69.734-156.835 155.747l0 273.812c0 86.013 70.23 155.748 156.835 155.748 86.602 0 156.832-69.735 156.832-155.748L668.584 226.247C668.584 140.234 598.354 70.5 511.752 70.5L511.752 70.5 511.752 70.5zM243.854 461.102c-18.051 0-32.649 14.496-32.649 32.451 0 2.269 0.197 4.436 0.689 6.506l-0.689 0c0 151.605 113.922 276.578 261.386 295.713l0 80.687-52.275 0c-21.702 0-39.257 17.458-39.257 38.964 0 21.499 17.555 38.957 39.257 38.957l182.969 0c21.701 0 39.256-17.458 39.256-38.957 0-21.506-17.555-38.964-39.256-38.964L551.01 876.459l0-80.687c143.119-18.543 254.383-137.002 260.691-282.688 0.396-2.072 0.695-4.243 0.695-6.512 0-0.79-0.197-1.479-0.197-2.167 0-1.483 0.197-2.86 0.197-4.345l-0.695 0c-3.058-14.795-16.172-25.94-32.057-25.94-15.782 0-28.999 11.145-32.057 25.94l-0.688 0c0 129.019-105.344 233.572-235.249 233.572-129.903 0-235.249-104.554-235.249-233.572l-0.689 0c0.396-2.07 0.689-4.237 0.689-6.506C276.503 475.598 261.906 461.102 243.854 461.102L243.854 461.102 243.854 461.102zM243.854 461.102"
                :fill="state" p-id="2518"></path>
        </svg>
        <div class="wifi-symbol" v-if="isRecording == 1">
            <!-- <div class="wifi-circle first"></div> -->
            <div class="wifi-circle second"></div>
            <div class="wifi-circle third"></div>
        </div>
    </div>
    <!-- <button @click="startRecord">开始录音</button>
    <button @click="stopRecord">发送录音</button> -->
</template>
<script>
import { ElMessage, ElMessageBox } from 'element-plus'

let num = 0;
let interval = setInterval(() => {
    num++
    if (num >= 20) {
        num = 0
    }
}, 100)
let maxMark = 0
export default {
    props: {
        url: {
            type: String,
            default: '',
            require: true
        }
    },
    name: 'talk',
    data() {
        return {
            recorder: null,
            isTalking: false,
            // talkWsUrl: 'wss://fsacam.tlzn-cq.com:10001/api/v1/stream/intercom?serial=05070002003ad1fab7c8&ch=1&stream=2',
            talkWS: null,
            mikOn: '#23fffc',
            mikOff: '#c1c1c1',
            isRecording: 0,
            temp: [],
            isSupport: false
        }
    },
    computed: {
        state() {
            return this.isRecording == 1 ? this.mikOn : this.mikOff
        },
        canTalk() {
            return this.url.startsWith('ws') ? true : false
        },
        talkWsUrl() {
            return this.url
        }
    },
    mounted() {
        setTimeout(() => {
            this.talk()
        }, 200)
        document.addEventListener('mouseup', () => {
            if (this.isRecording == 1) {
                this.stopRecord()
            }
        })
    },
    beforeUnmount() {
        document.removeEventListener('mouseup', () => {

        })
        clearInterval(interval)
    },
    methods: {
        // 语音对讲
        talk() {
            let _this = this
            if (!this.isTalking) {
                window.LiveRecorder.get((rec, err) => {
                    console.log(rec)
                    console.log(err)
                    if (err) {
                        this.isSupport = false
                        // ElMessage({
                        //     type: 'error',
                        //     message: '当前设备不支持',
                        // })
                        return
                    }
                    this.isSupport = true
                    this.createTalkWebsocket().then(res => {
                        console.log(res)
                        if (res) {
                            this.recorder = rec
                            this.recorder.start()
                        } else {
                            if (this.canTalk) {
                                ElMessage({
                                    type: 'warning',
                                    message: '语音通话无法接通',
                                })
                            }

                            console.log(err)

                            if (maxMark > 3) return
                            setTimeout(() => {
                                maxMark++
                                this.talk()
                            }, 1000)
                        }
                    }).catch(err => {
                        console.log(err)
                        if (this.canTalk) {
                            ElMessage({
                                type: 'warning',
                                message: '语音通话无法接通',
                            })
                        }
                        if (maxMark > 3) return
                        setTimeout(() => {
                            maxMark++
                            this.talk()
                        }, 1000)
                    })
                },
                    {
                        sampleBits: 16,
                        sampleRate: 8000,
                        pcmCallback: pcm => {
                            // console.log({ pcm })
                            console.log('声音采集中')
                            const reader = new window.FileReader()
                            reader.onloadend = () => {
                                // 截取有效数据
                                const base64 = reader.result.split(',')[1]
                                // console.log({ base64 })
                                // console.log('长度：', base64.length)
                                // console.log('时间：', new Date().getTime())
                                if (this.talkWS.readyState !== 0) {

                                    if (this.isRecording == 1) {
                                        // this.talkWS.send(base64)
                                        // console.log('存储录音')
                                        this.temp.push(base64)
                                    } else if (this.isRecording == 2) {
                                        this.temp.push(base64)
                                        const temp = JSON.parse(JSON.stringify(this.temp))
                                        this.sendMsg(temp)
                                        this.isRecording = 0
                                    }
                                    if (num % 3 == 0) {
                                        // console.log('心跳发送')
                                        this.talkWS.send('BADO/x8A+v/a/xoA/v/N/7L/uv8VAAEABQDS/')
                                    }

                                }
                            }
                            reader.readAsDataURL(pcm)
                        }
                    }
                )
            }
            //  else {
            //     console.log('确认关闭吗')
            //     console.log('yes 关闭')
            //     ElMessageBox.confirm(
            //         '关闭语音通话吗?',
            //         '提示',
            //         {
            //             confirmButtonText: '确认',
            //             cancelButtonText: '取消',
            //             type: 'warning',
            //         }
            //     )
            //         .then(() => {
            //             _this.stopTalk()

            //         })
            //         .catch(() => {
            //             ElMessage({
            //                 type: 'info',
            //                 message: '取消',
            //             })
            //         })
            // }
        },
        // 停止对讲
        stopTalk() {
            console.log('stop talk')
            if (this.recorder) {
                this.recorder?.stop()
            }
            if (this.talkWS) {
                this.talkWS.close()
                this.talkWS = null
                this.isTalking = false
                ElMessage({
                    type: 'success',
                    message: '语音通话已关闭',
                })
            }
        },
        // 建立对讲websocket连接
        createTalkWebsocket() {
            // ElMessage({
            //     type: 'success',
            //     message: '语音通话建立中，请稍后',
            // })
            return new Promise(resolve => {
                let ws = new WebSocket(this.talkWsUrl)
                this.talkWS = ws
                ws.onopen = evt => {
                    console.log('ws talk open')
                    this.isTalking = true
                    resolve(this.isTalking)
                    ElMessage({
                        type: 'success',
                        message: '语音通话建立成功',
                    })
                }
                ws.onclose = evt => {
                    console.log('ws talk close')
                    this.stopTalk()
                }
                ws.onerror = evt => {
                    console.log('ws talk error')
                    ElMessage({
                        type: 'error',
                        message: '语音通话异常',
                    })
                }
            })
        },
        startRecord() {
            if (!this.isSupport) {
                this.talk()
                return ElMessage({
                    type: 'error',
                    message: '当前麦克风无法识别，请检查设备后再试',
                })
            }
            if (!this.isTalking) {
                this.talk()
                return ElMessage({
                    type: 'warning',
                    message: '语音通话建立中，请稍后...',
                })

            }
            this.isRecording = 1
            this.temp = []
        },
        stopRecord() {
            this.isRecording = 2

        },
        async sendMsg(temp) {
            const sleep = () => {
                return new Promise((res, rej) => {
                    setTimeout(() => {
                        res()
                    }, 100)
                })
            }

            const send = (msg) => {
                this.talkWS.send(msg)
            }
            for (let i = 0; i < temp.length; i++) {
                const x = await sleep()
                send(temp[i])
                if (i == 0) {
                    ElMessage({
                        type: 'success',
                        message: '语音发送成功',
                    })
                }
            }


        }
    },
    watch: {
        '$route': {
            handler(v) {
                this.stopTalk()
            },
            deep: true
        }
    }
}
</script>
<style scoped>
.mik {
    height: 19px;
    position: relative;
    cursor: pointer;
    margin-top: -8px;
}

.mikicon {
    position: absolute;
    bottom: -10px; 
}

.wifi-symbol {
    position: absolute;
    top: -13px;
    left: -23px;
    width: 25px;
    height: 25px;
    box-sizing: border-box;
    overflow: hidden;
    transform: rotate(45deg);
}

.wifi-circle {
    border: 1px solid #23FFFC;
    border-radius: 50%;
    position: absolute;
}

.first {
    width: 3px;
    height: 3px;
    background: #23FFFC;
    top: 20px;
    left: 20px;
}

.second {
    width: 10px;
    height: 10px;
    top: 15px;
    left: 15px;
    animation: fadeInOut 1s infinite 0.2s;

}

.third {
    width: 20px;
    height: 20px;
    top: 10px;
    left: 10px;
    animation: fadeInOut 1s infinite 0.4s;
}

@keyframes fadeInOut {
    0% {
        opacity: 0;
        /*初始状态 透明度为0*/
    }

    100% {
        opacity: 1;
        /*结尾状态 透明度为1*/
    }
}
</style>