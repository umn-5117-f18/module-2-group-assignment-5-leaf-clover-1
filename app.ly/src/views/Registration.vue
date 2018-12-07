<template>
    <div class="registration">
        <h2>Registration</h2>

        <button a class="button" v-on:click="logout">Sign Out</button>
        


    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Registration',
  components: {
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