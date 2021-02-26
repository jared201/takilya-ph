<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <NavBarHeader/> 
    <router-view/>
    
    <nav-footer/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import NavBarHeader from './components/NavBarHeader.vue'
import NavFooter from './components/NavFooter.vue'


export default {
  name: 'App',
  components: {
    // HelloWorld,
    NavBarHeader,
    NavFooter,
    
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  background-color:rgb(247, 247, 239);
}
</style>
