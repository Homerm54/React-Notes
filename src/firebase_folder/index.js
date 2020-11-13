import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Keys saved in a .env file, not tracked by Git, create yours to fill it with your own data

const config = {
  apiKey: "AIzaSyC59yYTvYnKwrC7gBuXC4gjzUc1PksuSL8",
  authDomain: "react-notes-beta.firebaseapp.com",
  databaseURL: "https://react-notes-beta.firebaseio.com",
  projectId: "react-notes-beta",
  storageBucket: "react-notes-beta.appspot.com",
  messagingSenderId: "850529595592",
  appId: "1:850529595592:web:b7ce9e6d11d1b4633975fd",
};

try {

  // Firebase configuration
  firebase.initializeApp(config);

}catch(e){

  if(/already exists/.test(e.message)){
    console.log("Firebase already init.");
  }else{
    throw e;
  }
  
}

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase,
}