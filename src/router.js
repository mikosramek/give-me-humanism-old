import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Home from './views/Home.vue';
import Post from './views/Post.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/post/:uid',
      name: 'post',
      component: Post
    },
    {
      path: '*',
      redirect: { name: 'not-found' }
    }
  ]
})
