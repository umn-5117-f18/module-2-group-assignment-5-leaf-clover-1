<template>
  <div class="home">
    <br>
    <div class="columns">
      <div class="column">
        <a class="button is-primary is-large">Login</a>
      </div>
      <div class="column">
        <a class="button is-primary is-large">Register</a>
      </div>
    </div>
    <article v-for="value in [1, 2, 3]">
      <Card/>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'

export default {
  name: 'home',
  components: {
    Card
  }
}
</script>
