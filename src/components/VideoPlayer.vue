<template>
    <div class="container">
        <video ref="videoPlayer" class="video-js vjs-16-9 vjs-big-play-centered"></video>
    </div>
</template>
<script>
import videojs from 'video.js'

export default {
    name: "VideoPlayer",
    props: {
        options: {
            type: Object,            
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
            console.log('onPlayerReady', this);
        })
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>
<style scoped>

</style>
