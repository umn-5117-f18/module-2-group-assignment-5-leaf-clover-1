<template>
  <div class="app">
    <article v-for="(t, idx) in todos" :key="idx">
      <div class="box">
        <input type="checkbox" v-model="t.isDone" @change="markDone()">
        {{ t.info }}
        <!-- <div class="columns">
          
          <div class="column is-half text">
            {{ t.info }}
          </div> -->
          <!-- <div class="edit">
            <router-link :to="path" class="button">
              Edit
            </router-link>
          </div> -->
        <!-- </div> -->
  
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

            // console.log('app_name: ' , this.app_name);

            var app = data.applications[this.app_name];

            this.todos = app.todos;

            // console.log('todos: ' , this.todos);
          } else {
            console.log('document not found');
          }
        });
      } else {
        console.log('current user is null');
      }
  }, // END beforeCreate()
  methods: {
    markDone() {
      console.log('will mark done eventually');
    }
  }
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