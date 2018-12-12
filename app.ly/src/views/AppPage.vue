<template>
  <div class="field-container">
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
      <label class="label">Company:</label>
      <div class="control">
        <textarea class="textarea" v-model="company"
                                   placeholder="Enter company here"></textarea>
      </div>
    </div>

    <TodoList v-bind:app_name="getName"/>

    <div class="field">
      <label class="label">Upload Images:</label>
        <Camera />
    </div>

    <div>
      <router-link class="button is-primary is-large" :to="resumeBuilderUrl">
        Resume Builder
      </router-link>
    </div>

    <button class="button" v-on:click="deleteApp">Delete</button>
    <button class="button" v-on:click="save">Save</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main.js'
import Camera from '@/components/Camera.vue';

import TodoList from '@/components/ToDoList'

export default {
  name: 'AppPage',
  components: {
    TodoList,
    Camera
  },
  data () {
    return {
      title: String,
      descript: String,
      company: String,
      todos: [],
      app: []
    };
  },

  computed: {
    resumeBuilderUrl: function() {
      return '/app/' + this.$route.params.id + '/resume-builder';
    },
    getName() {
      return this.$route.params.id;
    }
  },

  beforeCreate() {
    let currentUser = firebase.auth().currentUser;
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
            this.todos = this.app.todos;
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

            // make sure to get updated todos if we've added any
            var new_todos = apps[this.$route.params.id].todos;

            console.log('updating app: ', this.$route.params.id);

            // update the map corresponding map item
            apps[this.$route.params.id] = {
              title: this.title,
              description: this.descript,
              company: this.company,
              todos: new_todos
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

<style>
@media only screen and (max-width: 1000px) {
  .field-container {
    width: 90%;
  }
}

@media only screen and (min-width: 1000px) {
  .field-container {
    width: 60%;
  }
}

.field-container {
  display: inline-block;
  margin: 2% auto;
}

.field-container .button {
  margin: 2%;
}
</style>
