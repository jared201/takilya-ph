<template>
  <div class="container">
      <br>
      <div class="columns">
        <div class="column">
            <div class="card">
                <div class="card-content">
                    <video-player :options="videoOptions"/>
                </div>
            </div>
            
        </div>  
      </div>
		<br>
	</div>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer.vue";

export default {
	name: "ViewPane",
	components: {
		VideoPlayer
	},
	created () {
		console.log("Video source: " + this.video_src);
		this.videoOptions.sources[0].src = this.video_src;
		if (this.poster != null || this.poster == undefined){
			this.videoOptions.poster = this.poster;
		}
	},
	data() {
		return {
			videoOptions: {
				autoplay: false,
				controls: true,
                poster:"orange_burst.png",
				sources: [
				{
					src: "https://takilya-videos.obs.ap-southeast-3.myhuaweicloud.com/videos/Takilya-Intro.mp4",
					//src: this.videoSrc,
					type: "video/mp4"
				}
				]
			}
		};
	},
	props: {
		author: String,
		video_id: String,
		video_src: String,
		poster: String,
	},
	
};
</script>