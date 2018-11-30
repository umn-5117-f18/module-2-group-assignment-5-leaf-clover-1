<template>
  <div class="resume-builder">
    <div v-html="loadedResume"></div>
    <a class="button">Save</a>
  </div>
</template>

<script>
import { testResume } from '@/testResume'
import { resumeParser } from '@/resumeTree'

export default {
  name: 'resume-builder',

  computed: {
    loadedResume: function() {
      let resumeList = resumeParser.resumeTreeList(testResume, 0, false, 1);
      let output = '';
      for (let i in resumeList) {
        output += '<li class="resume-checkbox resume-checkbox-' +
          resumeList[i][1] + '"><input checked="true" name="' + i +
          '"type="checkbox"/><label for="' +
          i + '">' + resumeList[i][0] + '</label></li>';
      }
      return '<ul>' + output + '</ul>';
    },
  },
}
</script>

<style>
@media only screen and (max-width: 1000px) {
  .resume-builder {
    width: 90%;
  }
}

.resume-builder {
  display: inline-block;
  text-align: left;
}

.resume-checkbox-0 {
  font-size: 20pt;
  font-weight: bold;
}

.resume-checkbox-1 {
  font-size: 18pt;
  padding-left: 10pt;
}
.resume-checkbox-2 {
  font-size: 16pt;
  padding-left: 20pt;
}
.resume-checkbox-3 {
  font-size: 12pt;
  padding-left: 30pt;
}
.resume-checkbox-4 {
  font-size: 10pt;
  padding-left: 40pt;
}
</style>
