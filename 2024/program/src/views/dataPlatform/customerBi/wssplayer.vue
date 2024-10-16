<template>
    <div v-if="!videoShow" class="nocam">{{ url }}</div>
    <div v-if="videoShow" @dblclick="fullScreen" id="videoSteam" style="width:100%;height:100%">
    </div>
    <div class="isloading" v-loading="true" v-if="isLoading"></div>
    <div class="play-model" @click='playFn' v-if="isPlay"></div>
</template>
 
<script>
export default {
    name: 'wssplayer',
    props: {
        url: {
            type: String
        },
        isLoading: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            debounce: true,
            cvh5lib: null
        }
    },
    computed: {
        videoShow() {
            return this.url && this.url.startsWith('wss') || false
        },
        isLoading() {
            return this.isLoading
        },
        isPlay() {
            return this.videoShow && this.debounce
        }
    },
    mounted() {
        this.init()
    },
    unmounted(){
        this.cvh5lib.stop()
            this.cvh5lib = null
    },
    methods: {
        init() {
            if (!window.CVH5Lib) {
                let script1 = document.createElement('script')
                script1.type = 'text/javascript'
                script1.src = '/elevator/h5player.js'
                document.getElementsByTagName('head')[0].appendChild(script1)

                let script2 = document.createElement('script')
                script2.type = 'text/javascript'
                script2.src = '/elevator/canvas_alpha.js'
                document.getElementsByTagName('head')[0].appendChild(script2)
            }
        },
        playFn() {
            if (!this.debounce) return
            this.debounce = false
            if (this.videoShow) {
                this.initPlayer()
            }
        },
        initPlayer() {
            const t = this;
            let el = document.getElementById('videoSteam')
            this.cvh5lib = new window.CVH5Lib.CreateLivePlayer({
                name: 'ws',
                el: el,
                render_type: 'AUTO',
                use_smart: true
            })
            // player 初始化完毕
            this.cvh5lib.on('player_ready', () => {
                this.cvh5lib.attach(el)
                this.cvh5lib.play({
                    // url参数构成
                    // 127.0.0.1:11112    服务端地址
                    // 05070002000bb0ee77eb   开流设备的序列号
                    // ch=1   开流设备的通道号
                    // stream=0   码流类型，0为主码流，1为子码流

                    url: t.url,
                    protocols: ['video-stream'],
                    cmd: {
                        Type: 0,
                        Ch: 0,
                        Dev: 0,
                        Data: {
                            StreamId: 0,
                            Video: true,
                            Audio: false,
                            Smart: true
                        }
                    }
                })
            })
        },
        destroy() {
            this.cvh5lib.stop()
            this.cvh5lib = null
        },
        fullScreen() {
            const { href } = this.$router.resolve({ name: "FullVideo", query: { id: encodeURI(this.url) } });

            window.open(href, '_blank');
        }
    }
}
</script>
<style scoped lang="scss">
.nocam {
    width: 100%;
    height: 100%;
    line-height: 260px;
    color: #C0DFFF;
    text-align: center;
    background: url('../../../public/images/dataplatform/customer2/nocam.png') no-repeat 50% 40%;
}

.isloading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    :deep().el-loading-mask {
        background-color: rgb(28, 40, 59);
    }
}

.play-model {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    background: rgb(28, 40, 59) url('@/public/images/dataplatform/customer2/play.png') no-repeat 50% 50% / 32px 32px;
}
</style>