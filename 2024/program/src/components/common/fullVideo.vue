<template>
    <div id="videoSteam">
    </div>
</template>
 
<script>
export default {
    name: 'wssplayer',

    data() {
        return {
            url: '',
            debounce: true,
            cvh5lib: null,
            script1: false,
            script2: false
        }
    },
    computed: {
        onAll() {
            return this.script1 && this.script2
        }
    },
    mounted() {
        console.log(this.$route.query)
        this.url = this.$route.query.id
        if (this.url) {
            this.init()
        }

    },
    watch: {
        onAll: {
            handler(v) {
                if (v) {
                    this.initPlayer()
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        init() {
            if (!window.CVH5Lib) {
                let script1 = document.createElement('script')
                script1.type = 'text/javascript'
                script1.src = '/elevator/h5player.js'
                document.getElementsByTagName('head')[0].appendChild(script1)
                script1.onload = () => {
                    this.script1 = true
                }

                let script2 = document.createElement('script')
                script2.type = 'text/javascript'
                script2.src = '/elevator/canvas_alpha.js'
                document.getElementsByTagName('head')[0].appendChild(script2)
                script2.onload = () => {
                    this.script2 = true
                }
            } else {
                this.initPlayer()
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
        }
    }
}
</script>
<style scoped lang="scss">
#videoSteam {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>