import { types } from '../types';

/**
 * Basic State:
 * 
 * {
 *    uid: 2655431656,
 *    name: 'User Name'
 * }
 * @param {Object} state The state with the user information, if no user logged. Default to `{}` if no user logged.
 * @param {*} action The reducer action. Writted using the FLux Standar Action cenvention (FSA). 
 * 
 * Example:
 * `
 * {
 *    type: '[Auth] Login', // Use of the '[Domain] Action Type' convention
 *    payload: {Object}, // this is were data will be
 *    meta: {Object}, // Aditional field for extra data
 *    error: {Object | Bool} // Indicate if the action represents an error
 * }
 * `
 */
export const authReducer = ( state = {/* Default Value */}, action) =>{

  switch(action.type){
    case(types.login):
      return {
        uid: action.payload.uid,
        name: action.payload.displayName
      }
    case(types.logout):
      return { /* No user data in the state */}
    
    default:
      return state;
  }
}