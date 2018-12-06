<template>
    <div class="application">
        <button a class="button" v-on:click="logout">Sign Out</button>
        <div class="columns is-centered">
            <!-- <article v-for="value in [1, 2, 3]" :key="value">
                <Card v-bind:idx='value'/>
            </article> -->
            <article v-for="(val, idx) in user.applications" :key="idx">
                <Card v-bind:name='idx' v-bind:title='val.title' v-bind:descript='val.description'/>
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
      return {
        user: db.doc('users/user1')
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
    }
  }
}
</script>