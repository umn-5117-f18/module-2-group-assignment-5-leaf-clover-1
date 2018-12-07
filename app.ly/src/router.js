import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import { db } from './main.js'

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


  // if(!foundDoc){    

  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  //   db.collection('users').doc(uid).set({
  //     'master_resume': {
  //       'Publications': {},  
  //       'Education': {},
  //       'Skills': {},
  //       'Work Experience': {},
  //       'Interests': {},
  //     },
  //     'applications': {}
  //   });
  //   console.log("created new document");
  //   next('/master-resume')
  // }
  

  if (requiresAuth && !currentUser) {
    
    next('/')
  } else if (!requiresAuth && currentUser) {

    //Creating new user document or going to applications page
    var userId = currentUser.uid;
    if (userId) {
      console.log('currentUser.uid: ', userId);
      var docRef = db.doc('users/' + userId);
      docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log('Doc already exists!');
            console.log("Document data:", doc.data());
            console.log("going to applications");
            next('/applications')

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            db.collection('users').doc(userId).set({
                done: [],
                incomplete: []
            });

            db.collection('users').doc(userId).set({
                  'master_resume': {
                    'Publications': {},  
                    'Education': {},
                    'Skills': {},
                    'Work Experience': {},
                    'Interests': {},
                  },
                  'applications': {}
            });

            console.log("created new document and going to master-resume");

            next('/master-resume')

        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });

    }
    
  } else {
    next()  //Must always reach this case eventually or you get a stack overflow
  }
})

export default router