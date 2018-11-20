<template>
  <h2>I am a Section {{ msg }}</h2>
</template>

<script>
export default {
  name: 'ResumeSection',
  props: {
    msg: String
  },
}
</script>
