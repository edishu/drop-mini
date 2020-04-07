import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvBqSxHlJ-TDvyJu_Eqc7R-PyoIPXpMoA",
  authDomain: "drop-mini-dev.firebaseapp.com",
  databaseURL: "https://drop-mini-dev.firebaseio.com",
  projectId: "drop-mini-dev",
  storageBucket: "drop-mini-dev.appspot.com",
  messagingSenderId: "904747922032",
  appId: "1:904747922032:web:c38e7b5248f8a3201c3ab5",
  measurementId: "G-H4YRVWNF2Y"
};

firebase.initializeApp(firebaseConfig);

export default firebase;