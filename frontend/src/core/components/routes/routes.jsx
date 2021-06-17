import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthRoute } from '../../utils/authRoute';
import * as routes from '../../constants/routes';
import LoginComponent from '../accounts/login';
import HomeComponent from '../home';
import NotFoundComponent from '../notFound';
import NotificationListComponent from '../notification/NotificationListComponent';
import AboutComponent from '../about';

export default function Routes(props) {
  return (
    <>
      <Switch>
        {/* <AuthRoute
            exact
            path={routes.HOME}
            component={HomeComponent}
          ></AuthRoute> */}
        <Route exact path={routes.HOME} component={HomeComponent}></Route>
        <Route exact path={routes.ABOUT} component={AboutComponent}></Route>

        <AuthRoute
          exact
          path={routes.LOGIN}
          component={LoginComponent}
        ></AuthRoute>

        <AuthRoute
          exact
          path={routes.NOTIFICATIONS_LIST}
          component={NotificationListComponent}
        ></AuthRoute>

        <Route path={routes.NOT_FOUND}>
          <NotFoundComponent />
        </Route>
        <Redirect to={routes.NOT_FOUND} />
      </Switch>
    </>
  );
}
