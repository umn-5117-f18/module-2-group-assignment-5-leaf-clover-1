<template>
  <div class="master-resume">
    <a id="edit-button" v-on:click="toggleEdit"
      class="spacious button is-primary">Edit Master Resume</a>
    <div id="builtResume" v-html="buildResumeTree"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db , DEFAULT_USER_DATA } from '@/main'
import { resumeParser } from '@/resumeTree'

export default {
  name: 'MasterResume',

  data: function() {
    return {
      resumeData: {},
      editing: false,
    }
  },

  computed: {
    buildResumeTree: function() {
      let resumeList = resumeParser.resumeTreeList(
        this.resumeData,
        0,
        false,
        5,
      );
      let output = '';
      for (let i in resumeList) {
        let resumeDepth = resumeList[i][1];
        let resumeItem = resumeList[i][0];
        let extra = '';
        if (this.editing && resumeDepth == 0) {
          extra = '<a href="/master-resume/new-section/'
            + resumeItem
            + '" class="button resume-section-' + resumeDepth
            + '">Add Section</a>';
        }
        output += '<li class="resume-section resume-section-' +
          resumeDepth + '">'
            + resumeItem
            + extra
          + '</li>';
      }
      return '<ul>' + output + '</ul>';
    },
  },

  beforeCreate: function() {
    // Build the resume tree for the current user, if it exists. If not,
    // populate an empty resume.
    let docRef = db.doc('users/' + firebase.auth().currentUser.uid);
    console.log(firebase.auth().currentUser.uid);
    docRef.get().then((documentSnapshot) => {
      // check and do something with the data here.
      if (documentSnapshot.exists) {
        // do something with the data
        var data = documentSnapshot.data();
        this.resumeData = data.master_resume;
      } else {
        console.log('document not found, adding default user data');
        docRef.set( DEFAULT_USER_DATA );
      }
    });
  },

  methods: {
    logout: function() {
      firebase.auth().signOut().then(()=> {
        this.$router.replace('/')
      })
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

    updateResumeHtml: function(html) {
      document.getElementById('builtResume').innerHTML = html;
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

@media only screen and (min-width: 1000px) {
  .master-resume {
    width: 60%;
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
