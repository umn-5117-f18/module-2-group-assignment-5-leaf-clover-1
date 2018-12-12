<template>
    <div class="application">
        <button a class="button is-primary" v-on:click="addCard">Add</button>
        <div class="columns is-centered">
            <!-- display applications as Card components -->
            <article v-for="(val, idx) in user.applications" :key="idx">
                <Card v-bind:app_name='idx' v-bind:title='val.title' v-bind:descript='val.description'/>
            </article>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'
import firebase from 'firebase'
import { db } from '@/main.js'

export default {
  name: 'home',
  data() {
      return {
          user: []
      }
  },
  firestore() {
      let currentUser = firebase.auth().currentUser;
      if (currentUser) {
          var UID = currentUser.uid;
      } else {
          console.log('current user is null');
          return;
      }
      return {
        user: db.doc('users/' + UID)
      }
  },
  components: {
    Card
  },
  methods: {
    logout: function() {
        firebase.auth().signOut().then(()=> {
            this.$router.replace('/')
        })
    },
    addCard() {
        let currentUser = firebase.auth().currentUser
        if (currentUser) {
            var UID = currentUser.uid;
            var docRef = db.doc('users/' + UID);
            var apps = [];
            var mr = [];
            var total = 0;

            docRef.get().then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    // store current state of applications map
                    var data = documentSnapshot.data();
                    apps = data.applications;
                    mr = data.master_resume;
                    total = data.total_apps;

                    var new_name = 'app' + (total + 1);

                    console.log('adding new app: ', new_name);

                    // add a new map to the applications map
                    apps[new_name] = {
                        title: '',
                        description: '',
                        company: '',
                        todos: []
                    };

                    docRef.set({ applications: apps, master_resume: mr, total_apps: total + 1 })
                    console.log('updated database');

                    // redirect to editing page
                    this.$router.push('/app/' + new_name);
                } else {
                    console.log('document not found');
                }
            });
        } else {
            console.log('current user is null');
        }
    }
  }
}
</script>
