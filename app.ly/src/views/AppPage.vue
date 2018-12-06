<template>
  <div>
    <!-- <p>URL path parameter: {{ $route.params.id }}</p> -->
    <!-- <br> -->
    <button a class="button" v-on:click="logout">Sign Out</button>
    <div class="field">
      <label class="label">Job Title:</label>
      <div class="control">
        <textarea class="textarea" v-model="title"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Job Description:</label>
      <div class="control">
        <textarea class="textarea" v-model="descript"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Company:</label>
      <div class="control">
        <textarea class="textarea" v-model="company"></textarea>
      </div>
    </div>
    
    <button class="button is-primary" v-on:click="save">Save</button>

  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main.js'

export default {
  name: 'AppPage',
  data () {
    return {
      name: String,
      title: 'some title',
      descript: 'some description',
      company: 'some company',
      app: []
    };
  },
  beforeCreate() {
    // grab the name from the route param
    this.name = this.$route.params.id;
    // console.log(this.name);
    var UID = 'user1';
    var docRef = db.doc('users/' + UID);

    docRef.get().then((documentSnapshot) => {
      // check and do something with the data here.
      if (documentSnapshot.exists) {
        // store the data locally
        var data = documentSnapshot.data();
        this.app = data.applications[this.$route.params.id];
        // console.log('-->data.applications[]: ', data.applications[this.$route.params.id]);
        
        this.title = this.app.title;
        this.descript = this.app.description;
        this.company = this.app.company;
      } else {
        console.log('document not found');
      }
    });
  },
  methods: {
    save() {
      console.log('entered save function');
      
      var UID = 'user1';
      var docRef = db.doc('users/' + UID);
      var apps = [];
      var mr = [];
      var total = 0;

      docRef.get().then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          //store current state of applications map
          var data = documentSnapshot.data();
          apps = data.applications;
          mr = data.master_resume;
          total = data.total_apps;

          // console.log('-->old apps: ', data.applications[this.$route.params.id]);

          apps[this.$route.params.id] = {
            title: this.title,
            description: this.descript,
            company: this.company
          };

          // set db arrays (need to set all fields)
          docRef.set({ applications: apps, master_resume: mr, total_apps: total});
          console.log('updated database');
          // console.log('-->new apps: ', apps);
        } else {
          console.log('document not found');
        }
      });
    },
    logout: function() {
        firebase.auth().signOut().then(()=> {
        this.$router.replace('/')
        })
    }
  }
}
</script>
