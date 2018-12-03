import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from './views/Home.vue'
import MasterResume from './views/MasterResume.vue'
import Applications from './views/Application.vue'
import Registration from './views/Registration.vue'
import AppPage from './views/AppPage.vue'

Vue.use(Router)

let router = new Router({
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
      component: MasterResume,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/applications',
      name: 'applications',
      component: Applications,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/app/:id',
      id: '0',
      component: AppPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(function(to, from, next) {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record=>record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('/')
  } else if (!requiresAuth && currentUser) {
    console.log("going to applications");
    next('/applications')
    // next()
  } else {
    console.log("going to next");
    console.log("requiresAuth " + requiresAuth);
    console.log("currentUser" + currentUser);
    next()  //Must always reach this case eventually or you get a stack overflow
  }
})

export default router