<template>
    <div class="container">
        <br>        
        <div class="columns is-multiline">
            <div class="column is-4" v-for="lib in library" :key="lib.username">
               <library-card :desc="lib.description" :author="lib.username" :title="lib.title" :created_on="lib.created_on" 
                       :video_id="lib.video_id" :video_src="lib.link" :poster="lib.poster"/>            
            </div>
                
            
            <!-- <div class="column">
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
            </div> -->
            
                
        </div>
        <br>
    </div>
</template>
<script>
import LibraryCard from './LibraryCard.vue';

export default {
    components: {LibraryCard},
    created() {
        console.log ("page loaded");
        
        this.getLibrary();
    },
    data () {
        return {
            library: []
        };
    },
    methods: {
        getLibrary () {
        let url = '/get_library';
        fetch(url, {method : 'GET' ,
                headers: {
                "Content-type": "application/json; charset=UTF-8"
                },
                }).then((response)=>{
                if (response.ok){
                response.text().then((text)=>{
                    let lib = JSON.parse(text);
                    this.library = lib;
                    //console.log (text);     
                    //this.$buefy.dialog.alert(text);
               
                });
                } else {
                response.text().then((text)=>{                    
                    console.log (text);
                    this.$buefy.dialog.alert({
                    title: 'Error',
                    message: text,
                    type: 'is-danger',
                    hasIcon: false,
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
                });
                }
            })
                .catch((error)=>{
                    console.log(error);
                });            
        }
    }
}
</script>