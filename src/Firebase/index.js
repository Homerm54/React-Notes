import React from 'react';
import Firebase from './firebase';

export const FirebaseContext = React.createContext(null);

export function FirebaseContextProvider({ children }){
  return(
    <FirebaseContext.Provider value={new Firebase()}>
      { children }
    </FirebaseContext.Provider>
  )
}