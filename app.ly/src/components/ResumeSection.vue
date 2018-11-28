<template>
  <h3>I am a Section {{ msg }}</h3>
</template>

<script>
export default {
  name: 'ResumeSection',
  props: {
    msg: String
  },
}
</script>
