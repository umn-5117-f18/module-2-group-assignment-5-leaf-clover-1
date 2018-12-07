<template>
  <div class="home">
    <h2>Organize your job applications - get your dream job</h2>
    <br>
    <div class="columns">
      <div class="column">
        <button class="button is-primary is-large" v-on:click='googleSignIn'>Sign in with Google</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import firebase from 'firebase'
import {provider} from '../firebaseConfig'
export default {
  name: 'home',
  components: {},
  methods: {
      googleSignIn: function() {
        firebase.auth().signInWithRedirect(provider).then(
          (result=> {
            console.log("signed in with google")
          })
          .catch(err=>alert(err.message))
        )
      }
    }
}
</script>