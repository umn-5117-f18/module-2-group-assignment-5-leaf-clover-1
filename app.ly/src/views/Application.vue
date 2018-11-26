<template>
    <div class="application">
        <h3>I am the application cards.</h3>
        <article v-for="value in [1, 2, 3]">
            <Card/>
        </article>
        <Footer/>
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