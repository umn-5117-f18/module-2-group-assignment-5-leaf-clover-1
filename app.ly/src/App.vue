<template>
  <div id="app">
    <header>
      <div id="nav">
        <router-link to="/master-resume">Master Resume</router-link>
        |
        <router-link  to="/applications">Applications</router-link>

        <button a class="button" v-on:click="logout" style="float: right;">Sign Out</button>
      </div>
    </header>
    <router-view/>
    <Footer/>
  </div>
</template>


<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'
import firebase from 'firebase'

export default {
  name: 'app',
  components: {
    Footer
  },
  data () {
    return {
      isHidden: true
    };
  },
  methods: {
    logout: function() {
      this.isHidden = true;
      firebase.auth().signOut().then(()=> {   
      this.$router.replace('/')
      })
    }
  }
}
</script>
