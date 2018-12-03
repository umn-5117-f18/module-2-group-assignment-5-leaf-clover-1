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
// import { db, auth } from '@/firebaseConfig'

export default {
  name: 'AppPage',
  data () {
    return {
      title: 'some title',
      descript: 'some description',
      company: 'some company'
    };
  },
  methods: {
    save() {
      console.log('eventually will save changes...');
    },
    logout: function() {
        firebase.auth().signOut().then(()=> {
        this.$router.replace('/')
        })
    }
  }
}
</script>
