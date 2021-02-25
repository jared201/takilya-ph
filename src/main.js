import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'video.js/dist/video-js.css'
import titleMixin from './mixins/titleMixin'
import "./vee-validate"
import router from "./router"

Vue.use(Buefy);
Vue.mixin(titleMixin)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
