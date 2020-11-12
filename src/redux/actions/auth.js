import { types } from '../types';


export function startLoginEmailPassword(email, password){
  return dispatch =>{ // Callback function that will be fired by thunk

    setTimeout(()=>{
      dispatch(login(1234, 'Omer'))
    }, 3500);
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