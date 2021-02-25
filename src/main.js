import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'video.js/dist/video-js.css'
import titleMixin from './mixins/titleMixin'
import "./vee-validate"
import router from "./router"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret , faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faAngleDoubleRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Buefy);
Vue.mixin(titleMixin)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
