import { types } from 'redux/types';
import { REGISTER } from 'constants/uiLocations';

const initialState = {
  loading: true,
  error: false,
  location: REGISTER,
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * 
 * Error object should have the structure of:
 * 
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

    case types.uiChangeUserLocation:

      return {
        ...state,
        location: action.payload.location
      }
      
    default:
      return state;
  }
}