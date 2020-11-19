import { types } from 'redux/types';

export function setError(err){
  return {
    type: types.uiSetError,
    payload: err
  }
}

export function clearError(){
  return {
    type: types.uiClearError,
  }
}

export function startLoading(){
  return {
    type: types.uiStartLoading
  }
}

export function finishLoading(){
  return {
    type: types.uiFinishLoading
  }
}

export function changeUserLocation(location){

  return {
    type: types.uiChangeUserLocation,
    payload: {
      location
    }
  }
}