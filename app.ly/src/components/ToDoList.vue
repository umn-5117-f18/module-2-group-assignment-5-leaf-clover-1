<template>
  <div class="app">
    <article v-for="(t, idx) in todos" :key="idx">
      <div class="box">
        <input type="checkbox" v-model="t.isDone" @change="onCheck(idx, t.isDone)">
        <div class="text"> {{ t.info }} </div>
      </div>
    </article>

    <div class="box">
      <button id="left" class="button is-primary" v-on:click="addToDo">Add</button>
      <input id="right" class="input" type="text" v-model="item" placeholder="Enter a new to-do">
    </div>

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
      todos : [],
      item: ''
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
      // Update the database
      let docRef = db.doc('users/' + firebase.auth().currentUser.uid);
      docRef.get().then((documentSnapshot) => {
        // check and do something with the data here.
        if (documentSnapshot.exists) {
          var data = documentSnapshot.data();
          let applications = data.applications;

          // update the todo in the applications array
          applications[this.app_name].todos[index].isDone = new_isDone;
          docRef.update({ applications: applications });
        } else {
          console.log('document not found');
        }
      });
    }, // END onCheck()
    addToDo() {
      // Update the database
      let docRef = db.doc('users/' + firebase.auth().currentUser.uid);
      docRef.get().then((documentSnapshot) => {
        // check and do something with the data here.
        if (documentSnapshot.exists) {
          var data = documentSnapshot.data();
          let apps = data.applications;
          let myTodos = apps[this.app_name].todos;

          // add to the applications array
          if (myTodos) {
            myTodos.push({ 'info': this.item, 'isDone': false });
          } else {
            // if we don't already have a todos array
            apps[this.app_name].todos = [{ 'info': this.item, 'isDone': false }];
          }
          
          docRef.update({ applications: apps });

          // update();
          this.item = '';
          this.todos = apps[this.app_name].todos;
        } else {
          console.log('document not found');
        }

      });
    }, // END addToDo()
  }, // END methods
}
</script>

<style scoped>
div.box {
  margin: 5px;
  text-align: left;
  display: inline-flex;
  width: 100%;
}
input.input {
  margin-left: 10px;
}
div.text {
  margin-left: 10px;
}

/* to get the todo text input box to adjust nicely */
#left {
  float:left;
}
#right {
  width: calc(100% - 65px);
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