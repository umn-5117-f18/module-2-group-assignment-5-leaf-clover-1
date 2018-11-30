<template>
    <div class="application">
        <button v-on:click="logout">Sign Out</button>
        <div class="columns is-centered">
            <article v-for="value in [1, 2, 3]">
                <Card/>
            </article>
        </div>
    </div>
</template>


<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'

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