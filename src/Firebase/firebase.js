import app from 'firebase/app';
import 'firebase/auth';

// Keys saved in a .env file, not tracked by Git, create yours to fill it with your own data
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

/**
 * Firebase Class, following the Singleton Design, the Firebase will be 
 * created once per app instance. This Singleton is recommended to be passes
 * using React's Context API, so that the instance is available across the
 * app.
 * 
 * This class is created to present a single object that will encapsulate all
 * the methods needed to make use of firebase.
 * 
 * Part of the methods inside this class are:
 * * User Authenticatino
 * * Database Management
 * * Error Handling
 */
class Firebase {
  constructor() {
    console.log('Firebase Class Fired');
    try {
      app.initializeApp(config);
    } catch (err) {
      if (/already exists/.test(err.message)) { // Firebase instance already created
        console.error('Firebase initialization error, already exist');
      } else {
        throw err
      }
    }

    this.auth = app.auth();
    this.name = app.app().name;
  }

  /*** AUTH API INTERFACE ***/

  createUserWithEmailAndPassword  = (email, password) =>{
    this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword = (email, password) =>{
    this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut = () => this.auth.signOut();

  passwordReset = email => this.auth.sendPasswordResetEmail(email);

  passwordUpdate = password => this.auth.currentUser.updatePassword(password);
}

// Expose the Firebase class to be used along the App
export default Firebase;

/**
 * @todo
 * Configura un observador de estado de autenticación y obtén datos del usuario (https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data)
 * 
 * firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
  }
});

  * Maybe use this to update app and know if the user is loged in, or logged out.
 */