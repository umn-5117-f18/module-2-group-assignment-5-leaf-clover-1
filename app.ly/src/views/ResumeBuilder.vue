<template>
  <div class="resume-builder">
    <div v-html="loadedResume"></div>
    <button>Save</button>
  </div>
</template>

<script>
import { testResume } from '@/testResume'
import { resumeParser } from '@/resumeTree'

export default {
  name: 'resume-builder',

  computed: {
    loadedResume: function() {
      return resumeParser.resumeTreeList(testResume, 0);
    },
  },
}
</script>
