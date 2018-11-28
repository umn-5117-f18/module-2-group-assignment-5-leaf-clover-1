<template>
    <div class="application-list">
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
  name: 'application-list',
  components: {
    Card
  }
}
</script>
