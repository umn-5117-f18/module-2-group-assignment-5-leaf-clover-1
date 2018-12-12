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
      userInfo: {},
      pdfConfig: {
        lineSpacing: 8,
        minFontSize: 10,
      },
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
        this.userInfo = data.user_info;
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

      // Find the element in the resumeList
      let resumeListIndex = 0;
      for (let x in resumeList) {
        if (resumeList[x][0] === element) {
          resumeListIndex = x;
        }
      }

      // Add all the children to exclude/include
      let children = [];
      let i = resumeListIndex;
      let sameDepth = false;
      while (!sameDepth && i < resumeList.length) {
        children.push(resumeList[i][0]);
        i++;
        if (resumeList[i]) {
          sameDepth = resumeList[i][1] <= resumeList[resumeListIndex][1];
        } else {
          sameDepth = true;
        }
      }

      let index = this.exclude.indexOf(element);
      if (index < 0) {
        for (let i in children) {
          this.exclude.push(children[i]);
        }
      } else {
        for (let i in children) {
          this.exclude.splice(this.exclude.indexOf(children[i]), 1);
        }
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

      // Add the header to the pdf
      doc.setFontType('bold');
      doc.text(this.userInfo.name, 90, this.pdfConfig.lineSpacing);
      doc.setFontType('normal');
      doc.text(this.userInfo.email, 20, 2 * this.pdfConfig.lineSpacing);
      doc.text(this.userInfo.phone, 150, 2 * this.pdfConfig.lineSpacing);

      let resumeList = resumeParser.resumeTreeList(this.masterResumeData, 0, false, 5);
      let line = this.pdfConfig.lineSpacing * 5;
      let excludeParent = false;
      let excludeChild = false;
      let previousDepth = 0;
      for (let i in resumeList) {
        let resumeDepth = resumeList[i][1];
        let resumeItem = resumeList[i][0];

        // Exclude all children of de-selected parents
        if (previousDepth >= resumeDepth && resumeDepth == 0) {
          excludeParent = this.exclude.indexOf(resumeItem) >= 0;
        }

        // Exclude de-selected children
        if (!excludeParent && resumeDepth < 2) {
          excludeChild = this.exclude.indexOf(resumeItem) >= 0;
        }

        if (!excludeParent && !excludeChild) {
          doc.setFontSize(this.pdfConfig.lineSpacing + 2 * (5 - resumeDepth));
          if (resumeDepth < 1) {
            doc.setFontType('bold');
          } else {
            doc.setFontType('normal');
          }
          doc.text(resumeItem, this.pdfConfig.lineSpacing * (resumeDepth + 2), line);
          line += this.pdfConfig.lineSpacing;
        }
        previousDepth = resumeDepth;
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
  margin-top: 2%;
}

.resume-builder .button {
  margin: 2%;
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
