<template>
  <div class="master-resume">
    <div v-html="buildResumeTree"></div>
    <Footer/>
  </div>
</template>

<script>
import firebase from 'firebase'
import ResumeSection from '@/components/ResumeSection.vue'
import { testResume } from '@/testResume'

export default {
  name: 'MasterResume',

  components: {
    ResumeSection
  },

  computed: {
    buildResumeTree: function() {
      return this.eachRecursive(testResume, 0, '');
    }
  },

  methods: {
    logout: function() {
      firebase.auth().signOut().then(()=> {
      this.$router.replace('/')
      })
    },

    resumeTree: function(obj, level) {
      for (let x in obj) {
        if (typeof(obj[x])== 'object' && obj[x] !== null) {
          return this.resumeTree(obj[x], level + 1);
        } else {
          return this.makeElement(level, obj[x], level);
        }
      }
    },

    eachRecursive: function(obj, level, result) {
      if (typeof obj == 'object' && obj !== null) {
        let tmpResult = '';
        for (var k in obj) {
          tmpResult += this.makeElement(level, k) + this.eachRecursive(obj[k], level + 1, result);
        }
        return tmpResult;
      } else {
        return this.makeElement(level, obj);
      }
    },

    makeElement: function(level, text) {
      return '<div class="resume-section resume-section-' + level + '">' + text + '</div>';
    },
  }
};
</script>

<style>
@media only screen and (max-width: 1000px) {
  .master-resume {
    width: 90%;
  }
}

.master-resume {
  display: inline-block;
}

.resume-section {
  text-align: left;
}

.resume-section-0 {
  font-size: 20pt;
  font-weight: bold;
}
.resume-section-1 {
  font-size: 18pt;
  padding-left: 10pt;
}
.resume-section-2 {
  font-size: 16pt;
  padding-left: 20pt;
}
.resume-section-3 {
  font-size: 12pt;
  padding-left: 30pt;
}
.resume-section-4 {
  font-size: 10pt;
  padding-left: 40pt;
}
</style>
