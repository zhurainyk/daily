<template>
    <button @click="talk">开始</button>
    <button @click="stopTalk">停止</button>

</template>
<script>
export default {
    data() {
        return {
            recorder: null,
            isTalking: false,
            talkWsUrl: 'wss://fsacam.tlzn-cq.com:10001/api/v1/stream/intercom?serial=05070002003ad1fab7c8&ch=1&stream=2',
            talkWS: null
        }
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
                        //   this.$message({
                        //     showClose: true,
                        //     message: err,
                        //     type: 'warning',
                        //     center: true
                        //   })
                        console.log(err) //此处要返回 return
                        // return
                    }
                    this.createTalkWebsocket().then(res => {
                        if (res) {
                            this.recorder = rec
                            this.recorder.start()
                        } else {
                            // this.$message({
                            //   showClose: true,
                            //   message: this.$t('device.player.ConnFail'),
                            //   type: 'error',
                            //   center: true
                            // })
                            console.log(err)
                        }
                    }).catch(err => {
                        console.log(err)
                        //   this.$message({
                        //     showClose: true,
                        //     message: this.$t('device.player.ConnFail'),
                        //     type: 'error',
                        //     center: true
                        //   })
                    })
                },
                    {
                        sampleBits: 16,
                        sampleRate: 8000,
                        pcmCallback: pcm => {
                            const reader = new window.FileReader()
                            reader.onloadend = () => {
                                // 截取有效数据
                                const base64 = reader.result.split(',')[1]
                                if (this.talkWS.readyState !== 0) {
                                    this.talkWS.send(base64)
                                }
                            }
                            reader.readAsDataURL(pcm)
                        }
                    }
                )
            } else {
                console.log('确认关闭吗')
                console.log('yes 关闭')
                _this.stopTalk()
                // this.$confirm(this.$t('device.player.TalkStop'), this.$t('public.Hint'), {
                //     confirmButtonText: this.$t('public.Confirm'),
                //     cancelButtonText: this.$t('public.Cancel'),
                //     type: 'warning'
                // }).then(() => {
                //     console.log('关闭')
                //     _this.stopTalk()
                // }).catch(() => { })
            }
        },
        // 停止对讲
        stopTalk() {
            console.log('stop talk')
            if (this.recorder) {
                this.recorder.stop()
            }
            if (this.talkWS) {
                this.talkWS.close()
                this.talkWS = null
                this.isTalking = false
            }
        },
        // 建立对讲websocket连接
        createTalkWebsocket() {
            return new Promise(resolve => {
                let ws = new WebSocket(this.talkWsUrl)
                this.talkWS = ws
                ws.onopen = evt => {
                    console.log('ws talk open')
                    this.isTalking = true
                    resolve(this.isTalking)
                    // this.$message({
                    //     showClose: true,
                    //     message: this.$t('device.player.TalkTips1'),
                    //     type: 'success',
                    //     center: true
                    // })
                }
                ws.onclose = evt => {
                    console.log('ws talk close')
                    // this.$message({
                    //     showClose: true,
                    //     message: this.$t('device.player.TalkTips2'),
                    //     type: 'success',
                    //     center: true
                    // })
                    this.stopTalk()
                }
                ws.onerror = evt => {
                    console.log('ws talk error')
                    // this.$message({
                    //     showClose: true,
                    //     message: this.$t('device.player.TalkTips3'),
                    //     type: 'error',
                    //     center: true
                    // })
                }
            })
        }
    }
}
</script>