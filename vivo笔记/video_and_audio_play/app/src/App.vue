<template>
  <div id="app">
    <VideoPlayer :videoSrc="videoSrc" />
  </div>
</template>

<script>

import VideoPlayer from './components/Videoplayer'
export default {
  name: 'App',
  components: { 
    VideoPlayer
  },
  data(){
    return {
      videoSrc:'./微信测试版 2021-01-06 10-15-22.mp4'
    }
  }
}
</script>

<style>

</style>
