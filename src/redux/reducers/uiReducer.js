import { types } from 'redux/types';

const initialState = {
  loading: false,
  error: false,
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * 
 * Error object should have the structure of:
 * 
 * {
 *    where: <Location in the UI tree where should be displayed the error>
 *            '[Auth] Log In'
 *    // extra fields that should be know by the component that originated the error and the component where the error will be displayed.
 * 
 * 
 * 
 * }
 */
export default function uiReducer(state = initialState, action) {

  switch (action.type) {
    case types.uiSetError:

      return {
        ...state,
        error: action.payload
      };

    case types.uiClearError:

      return {
        ...state,
        error: null
      };

    case types.uiStartLoading:
      //Should load even if error?
      return {
        ...state,
        loading: true
      };

    case types.uiFinishLoading:
      //Should load even if error?
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}