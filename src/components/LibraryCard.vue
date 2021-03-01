<template>
            
                <div class="card">
                    <div class="card-image" v-if="poster != null">
                        <figure class="image is-4by3">
                        <router-link v-bind:to="link"><img v-bind:src="poster" alt="Placeholder image"></router-link>
                        </figure>
                    </div>
                    <div class="card-image" v-else>
                        <figure class="image is-4by3">
                        <router-link v-bind:to="link"><img src="orange_burst.png" alt="Placeholder image"></router-link>
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
                            <p class="title is-4">{{title}}</p>
                            <p class="subtitle is-6">{{author}}</p>
                        </div>
                        </div>

                        <div class="content">
                            {{desc}}
                        <br>
                        <time datetime="2021-06-24">{{created_on}}</time>
                        </div>
                    </div>
                </div>
             
</template>
<script>
export default {
    name: 'library-card',
    props: {
        desc: String,
        title: String,
        author: String,
        created_on: String,
        video_id: String,
        video_src: String,
        poster: String,
    },
    data () {
        return {
            link: "/watch?author=" + this.author + '&video_id=' + this.video_id + '&video_src=' + this.video_src + '&poster=' + this.poster,
        };
    }
}
</script>