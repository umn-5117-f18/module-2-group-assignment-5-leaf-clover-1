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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
