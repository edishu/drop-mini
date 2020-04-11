import firebase from '../config/firebase/firebaseInit';

export const auth = firebase.auth();

auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log('not logged in');
    }
});