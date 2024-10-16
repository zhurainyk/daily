<template>
    <div class="root">
        <div class="container-shell">
            <div class="container-shell-title">视频播放器 <span class="tag-version" v-if="version">({{
                version
            }})</span></div>
            <div id="container" ref="container"></div>
        </div>
    </div>
</template>
<script>

export default {
    name: "DemoPlayer",
    props: {},
    data() {
        return {
            jessibuca: null,
            version: '',
            playing: false,
            quieting: true,
            loaded: false, // mute
            err: ''
        };
    },
    mounted() {
        this.create();
        window.onerror = (msg) => (this.err = msg);
        this.play()
    },
    unmounted() {
        this.jessibuca.destroy();
    },
    methods: {
        create(options) {
            options = options || {};
            this.jessibuca = new window.Jessibuca(
                Object.assign(
                    {
                        container: this.$refs.container,
                        videoBuffer: 0.2, // 缓存时长this.$refs.buffer.value
                        isResize: false,
                        useWCS: false,
                        useMSE: true,
                        text: "",
                        // background: "bg.jpg",
                        loadingText: "疯狂加载中...",
                        // hasAudio:false,
                        debug: true,
                        supportDblclickFullscreen: true,
                        showBandwidth: false, // 显示网速
                        operateBtns: {
                            fullscreen: false,
                            screenshot: false,
                            play: false,
                            audio: false,
                        },
                        vod: this.vod,
                        forceNoOffscreen: true,
                        isNotMute: true,
                        timeout: 10
                    },
                    options
                )
            );

            this.jessibuca.on("error", function (error) {
                console.log("error", error);
            });

            this.jessibuca.on("timeout", function () {
                console.log("timeout");
            });

            this.jessibuca.on('start', function () {
                console.log('frame start');
            })

            this.jessibuca.on("play", () => {
                this.playing = true;
                this.loaded = true;
                this.quieting = this.jessibuca.isMute();
            });

        },
        play() {
            this.jessibuca.play('http://47.113.108.136:28000/rtp/34020000001110000002_34020000001110000002.flv');
        },
        mute() {
            this.jessibuca.mute();
        },
        destroy() {
            if (this.jessibuca) {
                this.jessibuca.destroy();
            }
        }
    },
};
</script>
<style>
#container {
    background: rgba(13, 14, 27, 0.7);
    width: 440px;
    height: 308px;
}
</style>
