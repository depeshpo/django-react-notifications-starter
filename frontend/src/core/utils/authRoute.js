import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authService } from '../services/auth';
import * as routes from '../constants/routes';

//Higher order component AuthRoute
export const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const hasUserToken = authService.getUserToken();
      const path = window.location.pathname;
      // If no token found then redirect user to login page
      if (!hasUserToken && path !== '/login') {
        return <Redirect to={{ pathname: routes.LOGIN }} />;
      }
      if (path === '/login' && hasUserToken)
        return <Redirect to={{ pathname: routes.HOME }} />;
      // if authenticated return component
      return <Component {...props} />;
    }}
  />
);
