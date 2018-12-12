<template>
  <div class="column ">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
        {{ title }}
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          {{ descript }}
        </div>
      </div>
      <footer class="card-footer">
        <router-link :to="appPath" class="card-footer-item">
          Edit
        </router-link>
        <a v-on:click="deleteCard" class="card-footer-item">
          Delete
        </a>
      </footer>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main.js'

export default {
  name: 'Card',
  props: {
    app_name: String,
    title: String,
    descript: String
  },
  computed:{
    appPath() {
      return '/app/' + this.app_name;
    }
  },
  methods: {
    deleteCard() {
      let currentUser = firebase.auth().currentUser
      if (currentUser) {
        var UID = currentUser.uid;
        var docRef = db.doc('users/' + UID);
        var apps = [];
        var mr = [];
        var user_stuff = {};
        var total = 0;

        docRef.get().then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            // store current state of applications map
            var data = documentSnapshot.data();
            apps = data.applications;
            mr = data.master_resume;
            total = data.total_apps;
            user_stuff = data.user_info;

            console.log('deleting app: ', this.app_name);

            // delete property from JSON object
            delete apps[this.app_name];

            docRef.set({ applications: apps, master_resume: mr, total_apps:
              total, user_info: user_stuff })
            console.log('updated database');
          } else {
            console.log('document not found');
          }
        });
      } else {
        console.log('current user is null');
      }
    } // END deleteCard()
  }
}
</script>
