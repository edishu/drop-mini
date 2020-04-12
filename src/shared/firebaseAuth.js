import firebase from '../config/firebase/firebaseInit';

export const auth = firebase.auth();

// auth.onAuthStateChanged(firebaseUser => {
//     if(firebaseUser) {
//       null;
//     } else {
//       null;
//     }
// });