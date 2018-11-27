<template>
  <div class="master-resume">
    <h2>Your Master Resume</h2>
    <article v-for="item in resumeSections">
      <ResumeSection v-bind:msg="item"/>
    </article>
    <Footer/>
  </div>
</template>

<script>
import firebase from 'firebase'
import ResumeSection from '@/components/ResumeSection.vue'
import { testResume } from '@/testResume'

export default {
  name: 'MasterResume',

  components: {
    ResumeSection
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
