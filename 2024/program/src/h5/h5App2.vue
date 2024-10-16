<template>
    <div>
        <div id="vlc-wrapper"></div>
        <button @click="togglePlayback">Toggle Playback</button>
    </div>
</template>
  
<script>
// import { Client } from 'vlc.js';

export default {
    data() {
        return {
            client: null,
            mediaPlayer: null,
            playing: false
        }
    },
    mounted() {
        this.client = new Client('https://fsacam.tlzn-cq.com:10001/api/v1/stream/hls/060900020042d7e0d7ff_1_2.m3u8', 'rosebud');
        // Create a new media player object
        this.mediaPlayer = this.client.mediaPlayer;
        // Set up the video output
        this.mediaPlayer.video.output = '#vlc-wrapper';
        this.mediaPlayer.events.on('MediaEndReached', () => {
            console.log('Media Ended');
            this.playing = false;
        });
    },
    methods: {
        togglePlayback() {
            if (this.playing) {
                this.mediaPlayer.stop();
            } else {
                this.mediaPlayer.play({
                    options: ['--no-audio']
                });
            }
            this.playing = !this.playing;
        }
    }
}
</script>