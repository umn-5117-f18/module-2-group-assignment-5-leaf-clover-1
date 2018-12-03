<template>
  <div class="home">
    <h2>Organize your job applications - get your dream job</h2>
    <br>
    <div class="columns">
      <div class="column">
        <a class="button is-primary is-large">Login</a>
      </div>
      <div class="column">
        <a class="button is-primary is-large">Register</a>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'home',
  components: {
    Calendar
  }
}
</script>