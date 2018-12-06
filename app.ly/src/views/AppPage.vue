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
        // do something with the data
        var data = documentSnapshot.data();
        console.log('-->data.applications[]: ', data.applications[this.$route.params.id]);
        this.title = data.applications[this.$route.params.id].title;
        this.descript = data.applications[this.$route.params.id].description;
        this.company = data.applications[this.$route.params.id].company;
      } else {
        console.log('document not found');
      }
    });
  },
  methods: {
    save() {
      console.log('eventually will save changes...');
      console.log(app);
    },
    logout: function() {
        firebase.auth().signOut().then(()=> {
        this.$router.replace('/')
        })
    }
  }
}
</script>
