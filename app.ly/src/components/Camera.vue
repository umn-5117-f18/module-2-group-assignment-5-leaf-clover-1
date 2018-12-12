<template>
  <div>
    <input type="file" accept="image/*" capture @change="onChange($event.target.files)">
    <p><img :src="imgUrl" id="imageTag" width="240" height="180"></p>
  </div>
</template>

<script>
  import firebase from "firebase"
  import {storageRef} from "@/firebaseConfig.js"

  export default {
    data() {
      return {
        imgUrl: null
      }
    },
    methods: {
      onChange(files) {
        var uploadTask = storageRef.child('images/' + firebase.auth().currentUser.uid + '-' + this.$route.params.id).put(files[0]);
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.imgUrl = downloadURL;
        });
      }
    }
  }
</script>
