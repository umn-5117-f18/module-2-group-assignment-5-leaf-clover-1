<template>
  <div class="new-resume-section">
    <h2>New sub-section in {{ $route.params.section }}</h2>
    <form action="">
      <input id="subsection-name" v-on:change="sectionInputCallback" type="text"
          placeholder="Subsection name">

      <div class="sub-input" v-for="n in allInputs">
        <input v-bind:id="nDetailKey(n)" v-on:change="detailInputCallback"
            class="key" type="text" placeholder="Detail name">
        <p>:</p>
        <input v-bind:id="nDetailValue(n)" v-on:change="detailInputCallback"
               class="value" type="text" placeholder="Detail text">
      </div>

      <a class="button" v-on:click="addInput">+</a>

      <a class="button is-primary" v-on:click="saveToDb">Save</a>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main'

export default {
  name: 'new-resume-section',

  data: function() {
    return {
      subsectionName: '',
      details: {},
      numInputs: 1,
    }
  },

  computed: {
    allInputs: function() {
      return [...Array(this.numInputs).keys()];
    },
  },

  methods: {
    addInput: function() {
      this.numInputs++;
    },

    sectionInputCallback: function() {
      this.subsectionName = document.getElementById('subsection-name').value;
    },

    detailInputCallback: function(n) {
      let output = {};
      console.log(this.numInputs);
      for (let n in this.allInputs) {
        let keyElem = document.getElementById(this.nDetailKey(n));
        let valueElem = document.getElementById(this.nDetailValue(n));
        output[keyElem.value] = valueElem.value;
      }
      this.details = output;
    },

    nDetailKey: function(n) {
      return 'key' + n;
    },

    nDetailValue: function(n) {
      return 'value' + n;
    },

    saveToDb: function() {
      let docRef = db.doc('users/' + firebase.auth().currentUser.uid);
      console.log(firebase.auth().currentUser.uid);
      docRef.get().then((documentSnapshot) => {
        // check and do something with the data here.
        if (documentSnapshot.exists) {
          // do something with the data
          let newMasterResume = documentSnapshot.data().master_resume;
          newMasterResume[this.$route.params.section][this.subsectionName] =
            this.details;

          docRef.set({
            applications: documentSnapshot.data().applications,
            master_resume: newMasterResume,
          });

          this.$router.push('/master-resume');
        } else {
          console.log('document not found');
        }
      });
    }
  },
}
</script>

<style scoped>
.new-resume-section form * {
  display: block;
  margin: 10px auto;
}

a {
  width: 20%;
}

input[type="text"] {
  font-size: 16px;
  width: 40%;
}

.sub-input {
  width: 30%;
  display: flex !important;
  flex-direction: flex-row;
}

.sub-input * {
  flex-grow: 1;
  margin: 10px;
  font-size: 12px !important;
}
</style>
