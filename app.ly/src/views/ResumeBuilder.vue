<template>
  <div class="resume-builder">
    <ul v-for="resumeItem in resumeList">
      <li v-bind:class="liClasses(resumeItem[1])">
        <input v-bind:checked="isChecked(resumeItem[0])" type="checkbox"
        v-bind:name="resumeItem[0]" v-on:click="updateNotIncluded"/>
        <label v-bind:for="resumeItem[0]">
          {{ resumeItem[0] }}
        </label>
      </li>
    </ul>

    <router-link class="button is-primary" :to="parentApplicationUrl">
      Save
    </router-link>

    <button class="button" v-on:click="buildPdf">Save PDF</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import jsPDF from 'jspdf'
import { db } from '@/main'
import { resumeParser } from '@/resumeTree'

export default {
  name: 'resume-builder',

  data: function() {
    return {
      exclude: [],
      masterResumeData: {},
      pdfLineSpacing: 10,
    }
  },

  computed: {
    resumeList: function() {
      return resumeParser.resumeTreeList(this.masterResumeData, 0, false, 1)
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
        // Add the full master resume if there hasn't been one defined yet
        var data = documentSnapshot.data();
        let exclude = data.applications[this.$route.params.id].exclude;
        this.exclude = exclude ? exclude : [];
        this.masterResumeData = data.master_resume;
      } else {
        console.log('document not found');
      }
    });
  },

  methods: {
    liClasses: function(level) {
      return 'resume-checkbox resume-checkbox-' + level;
    },

    isChecked: function(name) {
      return this.exclude.indexOf(name) < 0 ? 'checked' : '';
    },

    updateNotIncluded: function(event) {
      let resumeList = resumeParser.resumeTreeList(this.masterResumeData, 0, false, 1);
      let element = event.target.name;
      let index = this.exclude.indexOf(element);
      if (index < 0) {
        this.exclude.push(element);
      } else {
        this.exclude.splice(index, 1);
      }

      // Update the database
      let docRef = db.doc('users/' + firebase.auth().currentUser.uid);
      docRef.get().then((documentSnapshot) => {
        // check and do something with the data here.
        if (documentSnapshot.exists) {
          // Add the full master resume if there hasn't been one defined yet
          var data = documentSnapshot.data();
          let applications = data.applications;
          let thisApplication = applications[this.$route.params.id];
          thisApplication.exclude = this.exclude;
          applications[this.$route.params.id] = thisApplication;
          docRef.update({
            applications: applications,
          });
        } else {
          console.log('document not found');
        }
      });
    },

    buildPdf: function() {
      let doc = new jsPDF();
      console.log(doc);
      let resumeList = resumeParser.resumeTreeList(this.masterResumeData, 0, false, 5);
      let line = this.pdfLineSpacing;
      for (let i in resumeList) {
        let resumeDepth = resumeList[i][1];
        let resumeItem = resumeList[i][0];
        if (this.exclude.indexOf(resumeItem) < 0) {
          console.log(resumeItem);
          doc.text(resumeItem, this.pdfLineSpacing * (resumeDepth + 1), line);
          line += this.pdfLineSpacing;
        }
      }
      doc.save('resume-' + this.$route.params.id + '.pdf');
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
