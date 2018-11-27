<template>
  <div class="resume-section" v-html="madeHtml">
  </div>
</template>

<script>
export default {
  name: 'ResumeSection',

  props: {
    level: Number,
    text: String,
  },

  computed: {
    madeHtml: function() {
      switch (this.level) {
        case 1:
          return this.makeElement('h2');
        case 2:
          return this.makeElement('h3');
        case 3:
          return this.makeElement('h4');
        default:
          return this.makeElement('p');
      }
    },
  },

  methods: {
    makeElement: function(type) {
      return '<' + type + '>' + this.text + '</' + type + '>';
    },
  },
}
</script>
