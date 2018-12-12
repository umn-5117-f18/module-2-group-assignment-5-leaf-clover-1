<template>
  <div>
    <input type="file" accept="image/*" capture @change="onChange($event.target.files)">
    <div v-if="imgUrl"><img :src="imgUrl" id="imageTag" width="240" height="180"></div>
  </div>
</template>

<script>
  import firebase from "firebase"
  import { storageRef } from "@/firebaseConfig.js"

  export default {
    data() {
      return {
        imgUrl: null
      }
    },

    beforeCreate: function() {
      let imgName = 'images/' +
        firebase.auth().currentUser.uid + '-' +
        this.$route.params.id;
      storageRef.child(imgName).getDownloadURL().then((url) => {
        this.imgUrl = url;
      }).catch(() => {
        console.log('no image yet');
      });
    },

    methods: {
      onChange(files) {
        let imgName = 'images/' +
          firebase.auth().currentUser.uid + '-' +
          this.$route.params.id;
        var uploadTask = storageRef.child(imgName).put(files[0]);
        uploadTask.on('state_changed', () => {}, () => {}, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.imgUrl = downloadURL;
            this.getDocumentByID('imageTag').url = this.imgUrl;
          }).catch(() => {
            console.log('no object available');
          });
        })
      },
    }
  }
</script>
