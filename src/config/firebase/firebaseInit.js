import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmh7CQSPDdxp72cid1WkyBuPPaRussGmI",
  authDomain: "drop-mini.firebaseapp.com",
  databaseURL: "https://drop-mini.firebaseio.com",
  projectId: "drop-mini",
  storageBucket: "drop-mini.appspot.com",
  messagingSenderId: "576133109419",
  appId: "1:576133109419:web:fabc913025a17c6b07c9ee",
  measurementId: "G-QY2L691DPP"
};

firebase.initializeApp(firebaseConfig);

export default firebase;