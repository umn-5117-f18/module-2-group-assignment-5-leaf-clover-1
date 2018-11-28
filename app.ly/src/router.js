import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MasterResume from './views/MasterResume.vue'
import Applications from './views/Application.vue'
import Registration from './views/Registration.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/master-resume',
      name: 'master-resume',
      component: MasterResume
    },
    {
      path: '/applications',
      name: 'applications',
      component: Applications
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
