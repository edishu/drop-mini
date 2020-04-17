import firebase from '../config/firebase/firebaseInit';

export const auth = firebase.auth();

export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const fbAuth = new firebase.auth.FacebookAuthProvider();;

// auth.onAuthStateChanged(firebaseUser => {
//     if(firebaseUser) {
//       null;
//     } else {
//       null;
//     }
// });