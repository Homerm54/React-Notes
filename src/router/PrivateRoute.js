import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { REGISTER } from 'constants/routes';

import PropTypes from 'prop-types';

export default function PrivateRoute({
  isAuthenticated,
  component: Component,
  ...rest
}) {

  // This value is passed by react router dom
  localStorage.setItem('Last Entry', rest.location.pathname);

  return (
    <Route {...rest} component={props => (
      // props are the history, router etc.
      isAuthenticated
        ?
        <Component {...props} />
        :
        <Redirect to={REGISTER} />
    )} />
  )
}

// To make sure it's used the correct way

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}