import React, { useState, useEffect } from 'react';
import * as ROUTES from '../constants/routes';
import { Switch, Route } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { firebase } from "firebase_folder";
import { auth } from 'redux/actions';

// Pages
import Navbar from 'pages/Navbar';
import Dashboard from 'pages/Dashboard';
import Note from 'pages/NotePage';
import Landing from 'pages/Landpage';
import Register from 'pages/Register';
import Account from 'pages/Account';
import FixAccount from 'pages/AccountFix';
import NotFound404 from 'pages/NotFound404';
import Loading from 'loading';


export function AppRouter() {

  // Display special loging screen
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false); // To protect routes
  const dispatch = useDispatch();

  /**
   * This useEffect will make sure that if the user is logged,
   * the app will save if logged instance, instead of losing it on reload
   */
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {

      //Check if user exist and extract the uid
      if (user?.uid) {
        dispatch(auth.login(user.uid, user.displayName));
        setIsLogged(true);

      } else { // If no user, make sure it's logged out
        dispatch(auth.logout())
        setIsLogged(false);
      }

      setLoading(false); // No matter the result, the load has finished
    });
  }, [dispatch]);

  console.log('Is user logged? ', isLogged)
  if (loading) return <Loading />

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
        <Route path={ROUTES.NOTE} component={Note} />
        <Route path={ROUTES.REGISTER} component={Register} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.FIX_ACCOUNT} component={FixAccount} />
        <Route path='/' component={NotFound404} />
      </Switch>
    </>
  )
}