import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCZ1FtcNHDviQiL9Kx5-0Ole0gFAOwp7ls",
    authDomain: "app-ly-5c24f.firebaseapp.com",
    databaseURL: "https://app-ly-5c24f.firebaseio.com",
    projectId: "app-ly-5c24f",
    storageBucket: "app-ly-5c24f.appspot.com",
    messagingSenderId: "1007082478240"
  };

const provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(config);

var storage = firebase.storage();
var storageRef = storage.ref();

export {provider, storageRef};
