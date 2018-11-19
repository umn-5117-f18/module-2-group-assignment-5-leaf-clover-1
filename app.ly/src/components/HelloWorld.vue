<template>
  <div class="hello">
    <h3>Testing</h3>
  </div>
</template>

<script>
import { db } from '../main.js'
console.log("db is " + db);
export default {
  name: 'HelloWorld',
  data () {
    return {
      locations: []
    }
  },
  firestore () {
    return {
      locations: db.collection('locations')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
