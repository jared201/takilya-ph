<template>
    <b-navbar>
        <template #brand>
            <sidebar/>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/orange_burst.png"
                    alt="Takilya"
                >
            </b-navbar-item>
            
        </template>
        <template #start>
            <b-navbar-item><router-link to="/">
                Home</router-link>
            </b-navbar-item>
            <b-navbar-item href="/">
                Library
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item><router-link to="/about">
                    About</router-link> 
                </b-navbar-item>
                <b-navbar-item href="/">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
            
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <!-- <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a> -->
                    <a class="button is-light">
                        Log in Not Required For Now
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
<script>
import Sidebar from './Sidebar.vue'


export default {
  name: 'NavBarHeader',
  components: {
    Sidebar
      
  },
  props: {
    msg: String
  }
  , title: 'Takilya Video Streaming'
}
</script>