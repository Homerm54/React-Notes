import React from 'react';
import { DASHBOARD } from 'constants/routes';

/**
 * 
 * @param {Bool} isAuthenticated 
 * @param {func} component
 */
export default function LoginRouter({
  isAuthenticated,
  component: Component,
  ...rest
}) {

  return (
    <Route {...rest} component={props => (
      // props are the history, router etc.
      !isAuthenticated // If user authenticated, do not render
        ?
        <Component {...props} />
        :
        <Redirect to={localStorage.getItem('Last Entry') || DASHBOARD} /> 
        /* Edit this to redirect to last entry */
    )} />
  )
}


// To make sure it's used the correct way

LoginRouter.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}