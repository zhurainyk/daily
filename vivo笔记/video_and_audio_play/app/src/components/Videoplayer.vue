<template>
  <div>
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin"
      controls
      preload="auto"
      width="640"
      height="264"
    >
      <source :src="videoSrc" type="video/mp4" />
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank">
          supports HTML5 video
        </a>
      </p>
    </video>
  </div>
</template>

<script>
import videojs from 'video.js';

export default {
  name: 'VideoPlayer',
  props: {
    // videoSrc: {
    //   type: String,
    //   required: true,
    // },
  },
  data(){
    return {
        videoSrc: '../微信测试版 2021-01-06 10-15-22.mp4'
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, { /* options */ }, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style scoped>
/* 自定义播放器的样式 */
.video-js .vjs-control-bar {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
