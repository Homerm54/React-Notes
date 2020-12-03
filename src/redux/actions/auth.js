import { types } from 'redux/types';
import { firebase, googleAuthProvider } from 'firebase_folder';
import { startLoading, finishLoading, setError } from './ui';



export function initSignUpWithEmail(email, password, name) {

  return dispatch => {
    dispatch(startLoading());

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());

      }).catch(err => {

        console.log(`Error Signing User: ${err}`);
        dispatch(setError(`Error Signing User: ${err}`));
        dispatch(finishLoading());
      })
  }
}

export function startLoginEmailPassword(email, password) {
  return dispatch => { // Callback function that will be fired by thunk
    dispatch(startLoading());

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(finishLoading());
        dispatch(login(user.uid, user.displayName));
      }).catch(err => {
        
        console.log(`Error Signing User: ${err}`);
        dispatch(setError(`Error Signing User: ${err}`));
        dispatch(finishLoading());
      })
  }
}


export function initGoogleLogIn() {

  return (dispatch) => {

    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(userCredential => {
        const { user } = userCredential;

        dispatch(login(user.uid, user.displayName))
      })
      .catch( err =>{

        console.log(`Error Signing User with Google: ${err}`);
        dispatch(setError(`Error Signing User with Google: ${err}`));
        dispatch(finishLoading());
      })
  }
}



/**
 * @param {*} uid 
 * @param {*} displayName 
 */
export function login(uid, displayName) {
  // Parameters to be provided by firebase

  return {
    type: types.login,
    payload: {
      uid,
      displayName
    }
  }
}


export function startLogout(){
  return dispatch =>{
    firebase.auth().signOut()
    .then(()=>{
      dispatch(logout())
    })
    .catch(err =>{

      console.log(`Error Signing out User: ${err}`);
      dispatch(setError(`Error Signing out User: ${err}`));
      dispatch(finishLoading());
    })
  }
}


/**
 * 
 */
export function logout() {
  // Parameters to be provided by firebase

  return {
    type: types.logout,
  }
}