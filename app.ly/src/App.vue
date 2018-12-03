<template>
  <div id="app">
    <header>
      <div id="nav"> 
        <router-link to="/master-resume">Master Resume</router-link>
        |
        <router-link to="/applications">Applications</router-link>
      </div>
    </header>

    <h1>app.ly</h1>
    <router-view/>
    <Footer/>
  </div>
</template>


<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    Footer
  }
}
</script>