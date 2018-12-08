<template>
  <div class="resume-builder">
    <div v-html="loadedResume"></div>
    <router-link class="button is-primary" :to="parentApplicationUrl">
      Save
    </router-link>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main'
import { resumeParser } from '@/resumeTree'

export default {
  name: 'resume-builder',

  data: function() {
    return {
      resumeData: {},
    }
  },

  computed: {
    loadedResume: function() {
      let resumeList = resumeParser.resumeTreeList(this.resumeData, 0, false, 1);
      let output = '';
      for (let i in resumeList) {
        output += '<li class="resume-checkbox resume-checkbox-' +
          resumeList[i][1] + '"><input checked="true" name="' + i +
          '"type="checkbox"/><label for="' +
          i + '">' + resumeList[i][0] + '</label></li>';
      }
      return '<ul>' + output + '</ul>';
    },

    parentApplicationUrl: function() {
      return '/app/' + this.$route.params.id;
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
        console.log('document not found');
      }
    });
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
