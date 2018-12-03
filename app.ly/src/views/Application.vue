<template>
    <div class="application">
        <button a class="button" v-on:click="logout">Sign Out</button>
        <div class="columns is-centered">
            <article v-for="value in [1, 2, 3]" :key="value">
                <Card v-bind:idx='value'/>
            </article>
        </div>
    </div>
</template>


<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'
import firebase from 'firebase'

export default {
  name: 'home',
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