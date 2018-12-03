<template>
  <div class="add-resume-section">
    Applying {{ $route.query }} to user
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'add-resume-section',

  beforeCreate: function() {
    console.log(firebase.auth().currentUser);
    console.log(this.$route.query);
  },
}
</script>
