<template>
  <div class="master-resume">
    <a id="edit-button" v-on:click="toggleEdit" class="spacious button is-primary">Edit Master Resume</a>
    <div v-html="buildResumeTree"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { testResume } from '@/testResume'
import { resumeParser } from '@/resumeTree'

export default {
  name: 'MasterResume',

  data: function() {
    return {
      editing: false,
    }
  },

  computed: {
    buildResumeTree: function() {
      let resumeList = resumeParser.resumeTreeList(testResume, 0, false, 5);
      let depths = resumeList.map((item) => item[1]);

      let output = '';
      for (let i in resumeList) {
        let resumeDepth = resumeList[i][1];
        let resumeItem = resumeList[i][0];
        let extra = '';
        if (this.editing && (resumeDepth == 0 && depths.slice(0, i).filter((d) => d === resumeDepth).length === 0
          || resumeDepth == 1)) {
          extra = '<a class="button resume-section-' +
            resumeDepth + '">Add Section</a>';
        }
        output += '<li class="resume-section resume-section-' +
          resumeDepth + '">'
            + extra
            + resumeItem
          + '</li>';
      }
      return '<ul>' + output + '</ul>';
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

    toggleEdit: function() {
      this.editing = !this.editing;
      if (!this.editing) {
        document.getElementById('edit-button').innerHTML = 'Edit Master Resume';
      } else {
        document.getElementById('edit-button').innerHTML = 'Stop Editing';
      }
    },
  },
};
</script>

<style>
@media only screen and (max-width: 1000px) {
  .master-resume {
    width: 90%;
  }
}

.spacious {
  margin: 20px auto;
  font-weight: bold;
}

.master-resume a {
  display: block;
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
