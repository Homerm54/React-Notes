import React, { useState, useEffect } from 'react';

import * as ROUTES from '../constants/routes';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SignInRoute from './LoginRouter';

import { useDispatch } from "react-redux";
import { firebase } from "firebase_folder";
import { auth, ui, note } from 'redux/actions';

// Pages
import Navbar from 'pages/Navbar';
import Dashboard from 'pages/Dashboard';
import Note from 'pages/NotePage';
import Register from 'pages/Register';
import NotFound404 from 'pages/NotFound404';
import Loading from 'loading';


export function AppRouter() {


  const [isLoading, setIsLoading] = useState(true); // While firebase check
  const [isLogged, setIsLogged] = useState(false); // To protect routes
  const dispatch = useDispatch();


  useEffect(() => {

    /**
     * This useEffect will make sure that if the user is logged,
     * the app will save if logged instance, instead of losing it on reload
     */

    firebase.auth().onAuthStateChanged(async (user) => {

      console.log('Firebase User State changed');

      if (user?.uid) {    // Check if user exist

        dispatch(ui.startLoading());
        dispatch(auth.login(user.uid, user.displayName));

        setIsLogged(true);
        dispatch(note.loadNotes()); // This will call the stop loading
        setIsLoading(false);

      } else { // If no user, make sure it's logged out

        dispatch(note.clearNotesOnMemory()); // Security thing
        dispatch(auth.logout());
        dispatch(ui.finishLoading());

        setIsLogged(false);
        setIsLoading(false);

      }
    });
  }, [dispatch]);


  if (isLoading) return <Loading />

  return (
    <>
      <Navbar />
      <Switch>

        <SignInRoute
          isAuthenticated={isLogged}
          path={ROUTES.REGISTER}
          component={Register}
        />

        <PrivateRoute
          exact
          isAuthenticated={isLogged}
          path={ROUTES.DASHBOARD}
          component={Dashboard}
        />

        <PrivateRoute
          path={ROUTES.NOTE}
          component={Note}
          isAuthenticated={isLogged}
        />

        {/*
          <PrivateRoute
            isAuthenticated={isLogged}
            path={ROUTES.FIX_ACCOUNT}
            component={FixAccount}
          />
        */}

        <Route path='/' component={NotFound404} />
      </Switch>
    </>
  )
}