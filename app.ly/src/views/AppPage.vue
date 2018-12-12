<template>
  <div>

    <div class="field">
      <label class="label">Job Title:</label>
      <div class="control">
        <textarea class="textarea" v-model="title"
                                   placeholder="Enter title here"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Job Description:</label>
      <div class="control">
        <textarea class="textarea" v-model="descript"
                                   placeholder="Enter description here"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Upload Images:</label>
        <Camera />
    </div>

    <div class="field">
      <label class="label">Company:</label>
      <div class="control">
        <textarea class="textarea" v-model="company"
                                   placeholder="Enter company here"></textarea>
      </div>
    </div>

    <div>
      <router-link class="button" :to="resumeBuilderUrl">
        Resume Builder
      </router-link>
    </div>

    <button class="button" v-on:click="deleteApp">Delete</button>
    <button class="button is-primary" v-on:click="save">Save</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main.js'
import Camera from '@/components/Camera.vue';

export default {
  name: 'AppPage',
  components: {
    Camera
  },

  data () {
    return {
      name: String,
      title: String,
      descript: String,
      company: String,
      app: []
    };
  },

  computed: {
    resumeBuilderUrl: function() {
      return '/app/' + this.$route.params.id + '/resume-builder';
    },
  },

  beforeCreate() {
    // grab the name from the route param
    this.name = this.$route.params.id;
    let currentUser = firebase.auth().currentUser
    if (currentUser) {
        var UID = currentUser.uid;
        var docRef = db.doc('users/' + UID);

        docRef.get().then((documentSnapshot) => {
          // check and do something with the data here.
          if (documentSnapshot.exists) {
            // store the data locally
            var data = documentSnapshot.data();
            this.app = data.applications[this.$route.params.id];

            this.title = this.app.title;
            this.descript = this.app.description;
            this.company = this.app.company;
          } else {
            console.log('document not found');
          }
        });
      } else {
        console.log('current user is null');
      }
  },

  methods: {
    save() {
      let currentUser = firebase.auth().currentUser;
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

            console.log('updating app: ', this.$route.params.id);

            // update the map corresponding map item
            apps[this.$route.params.id] = {
              title: this.title,
              description: this.descript,
              company: this.company
            };

            // set db arrays (need to set all fields)
            docRef.set({ applications: apps, master_resume: mr, total_apps: total});
            console.log('updated database');

            // redirect to applications page now that we've saved
            // this needs to be inside then() because async db stuff
            this.$router.push('/applications');
          } else {
            console.log('document not found');
          }
        });
      } else {
          console.log('current user is null');
      }
    }, // END save()
    logout: function() {
        firebase.auth().signOut().then(()=> {
          this.$router.replace('/')
        })
    }, // END logout()
    deleteApp() {
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

                  console.log('deleting app: ', this.$route.params.id);

                  // delete property from JSON object
                  delete apps[this.$route.params.id];

                  docRef.set({ applications: apps, master_resume: mr, total_apps: total })
                  console.log('updated database');

                  // redirect to applications view
                  this.$router.push('/applications');
              } else {
                  console.log('document not found');
              }
          });
      } else {
          console.log('current user is null');
      }
    } // END deleteApp()
  }
}
</script>
