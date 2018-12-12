<template>
  <div class="app">
    <article v-for="(t, idx) in todos" :key="idx">
      <div class="box">
        <input type="checkbox" v-model="t.isDone" @change="onCheck(idx, t.isDone)">
        {{ t.info }}
      </div>
    </article>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main.js'

export default {
  name: 'ToDoList',
  props: {
    app_name: String
  },
  data() {
    return {
      todos : []
    }
  },
  // load in the todos
  beforeCreate() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
        var UID = currentUser.uid;
        var docRef = db.doc('users/' + UID);

        docRef.get().then((documentSnapshot) => {
          // check and do something with the data here.
          if (documentSnapshot.exists) {
            // store the data locally
            var data = documentSnapshot.data();
            var app = data.applications[this.app_name];
            this.todos = app.todos;
          } else {
            console.log('document not found');
          }
        });
      } else {
        console.log('current user is null');
      }
  }, // END beforeCreate()
  methods: {
    onCheck(index, new_isDone) {
      // console.log('idx: ' , index);

      // Update the database
      let docRef = db.doc('users/' + firebase.auth().currentUser.uid);
      docRef.get().then((documentSnapshot) => {
        // check and do something with the data here.
        if (documentSnapshot.exists) {
          var data = documentSnapshot.data();
          let applications = data.applications;

          // if (new_isDone) {
          //   console.log('is now done');

            
          // } else {
          //   console.log('is now NOT done');


          // }

          applications[this.app_name].todos[index].isDone = new_isDone;

          docRef.update({ applications: applications });

        } else {
          console.log('document not found');
        }
      });

    } // END onCheck()
  } // END methods
}
</script>

<style scoped>
div.box {
  margin: 5px;
  text-align: left;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$box-padding: 1rem;

@import "../../node_modules/bulma/sass/utilities/_all.sass";
@import "../../node_modules/bulma/sass/base/_all.sass";
@import "../../node_modules/bulma/sass/elements/container.sass";
@import "../../node_modules/bulma/sass/elements/form.sass";
@import "../../node_modules/bulma/sass/elements/title.sass";
@import "../../node_modules/bulma/sass/elements/box.sass";
</style>