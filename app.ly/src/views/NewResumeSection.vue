<template>
  <div class="new-resume-section">
    <h2>New sub-section in {{ $route.params.section }}</h2>
    <form action="/master-resume/new-section">
      <input name="subsection-name" type="text" placeholder="Subsection name">

      <div class="sub-input" v-for="n in allInputs">
        <input v-bind:name="nDetailKey(n)" class="key" type="text" placeholder="Detail name">
        <p>:</p>
        <input v-bind:name="nDetailValue(n)" class="value" type="text" placeholder="Detail text">
      </div>

      <a class="button" v-on:click="addInput">+</a>

      <input class="button is-primary" value="Save" type="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'new-resume-section',

  data: function() {
    return {
      numInputs: 1,
    }
  },

  computed: {
    allInputs: function() {
      return [...Array(this.numInputs).keys()];
    },
  },

  methods: {
    addInput: function() {
      this.numInputs++;
    },

    nDetailKey: function(n) {
      return 'key' + n;
    },

    nDetailValue: function(n) {
      return 'value' + n;
    },
  },
}
</script>

<style scoped>
.new-resume-section form * {
  display: block;
  margin: 10px auto;
}

a {
  width: 20%;
}

input[type="text"] {
  font-size: 16px;
  width: 40%;
}

.sub-input {
  width: 30%;
  display: flex !important;
  flex-direction: flex-row;
}

.sub-input * {
  flex-grow: 1;
  margin: 10px;
  font-size: 12px !important;
}
</style>
