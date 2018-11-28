<template>
  <div class="master-resume">
    <h2>I am the master resume</h2>
    <article v-for="item in ['Education', 'Work Experience', 'Skills']">
      <ResumeSection v-bind:msg="item"/>
    </article>
    <Footer/>
  </div>
</template>

<script>
import ResumeSection from '@/components/ResumeSection.vue'

export default {
  name: 'MasterResume',
  components: {
    ResumeSection
  }
};
</script>
