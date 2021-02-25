
<template>    
    <div class="container" id="body">
        <hero/>
        
        <router-view/>
        <div class="tile">
            
<div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
    
    <div class="tile is-parent">
      <article class="tile is-child notification is-danger">
        <p class="title">The Double Standards</p>
        <p class="subtitle">We had enough</p>
        <div class="content">
          <!-- Content -->
          It's all about mind control. If you can control the mind, you can control the body. "You can't do that here...", "You're not supposed to look like that!", "You're not supposed to act like that!". All bulshit! We had enough of this censorship bullshit, we had enough of self-deprecating, biased fact checkers that is not open to arguments. Anyone can build a community! And no power tripping big tech can stop us!
        </div>
      </article>
    </div>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child ">
                      
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
        
     
    </article>
  </div>
</div>
            
        </div>        
    </div>
</template>
<script>
import Hero from "./Hero.vue"

export default {
    name: 'Body',
    components: {
        Hero,
           
    }
}
</script>