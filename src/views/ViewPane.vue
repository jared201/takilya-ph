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
	data() {
		return {
			videoOptions: {
				autoplay: false,
				controls: true,
                poster:"poster.png",
				sources: [
				{
					src: "https://takilya-videos.obs.ap-southeast-3.myhuaweicloud.com/videos/helmet-test.mov",
					type: "video/mp4"
				}
				]
			}
		};
	}
};
</script>