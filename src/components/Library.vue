<template>
    <div class="container">
        <br>
        <div class="columns">
            <div class="column">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                        <router-link to="/watch"><img src="orange_burst.png" alt="Placeholder image"></router-link>
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">Welcome from the Founder</p>
                            <p class="subtitle is-6">@jarednofilter</p>
                        </div>
                        </div>

                        <div class="content">
                            Takilya's first video upload.
                        <br>
                        <time datetime="2021-06-24">11:09 PM - 24 Feb 2021</time>
                        </div>
                    </div>
                </div>
           </div>
            <div class="column">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                        <router-link to="/japs"><img src="japoster.png" alt="Placeholder image"></router-link>
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">A Japanese Love Story</p>
                            <p class="subtitle is-6">@jarednofilter</p>
                        </div>
                        </div>

                        <div class="content">
                            A Japanese Love Story
                        <br>
                        <time datetime="2021-06-24">11:09 PM - 28 Feb 2021</time>
                        </div>
                    </div>
                </div>                
            </div>
            <div class="column">
                
            </div>
            <div class="column">
                
            </div>
        </div>
        <br>
    </div>
</template>
<script>
export default {
    created() {
        console.log ("page loaded");
    }
}
</script>