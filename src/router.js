import Vue from "vue";
import Router from "vue-router";
import About from "./views/Info.vue"
import MainBody from "./components/MainBody.vue"
import ViewPane from "./views/ViewPane.vue"
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"
import Upload from "./components/UploadPage.vue"
import Library from "./components/Library.vue"
import TestPane from "./views/TestPane.vue"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/about",
            name: "about",
            component: About
        },
        {
            path: "/",
            name: "home",
            component: MainBody
        },
        {
            path: "/watch",
            name: "watch",
            component: ViewPane,
            props: route => ({author: route.query.author, video_id: route.query.video_id, video_src: route.query.video_src, poster: route.query.poster})
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/register",
            name: "register",
            component: Register
        },
        {
            path: "/upload",
            name: "upload",
            component: Upload
        },
        {
            path: "/library",
            name: "library",
            component: Library
        },
        {
            path: "/japs",
            name: "japs",
            component: TestPane
        }
    ]
})