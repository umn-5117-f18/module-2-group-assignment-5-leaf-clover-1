import Vue from 'vue';
import VueFire from "vuefire";
import firebase from 'firebase/app';
import 'firebase/firestore';

import App from './App.vue';
import router from './router';
import "./firebaseConfig";


// Require the main Sass manifest file
require('./assets/sass/main.scss');

Vue.use(VueFire);

Vue.config.productionTip = false;

export const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

let app;

//Wrap app creation in onAuthStateChanged or page reloads dont work
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
        el: '#app',     
        router,
        render: h => h(App)

    })
  }
})

export const DEFAULT_USER_DATA = {
  'master_resume': {
    'Publications': {},
    'Education': {},
    'Skills': {},
    'Work Experience': {},
    'Interests': {},
  },
  'applications': {},
  'total_apps': 0,
  'user_info': {},
};
