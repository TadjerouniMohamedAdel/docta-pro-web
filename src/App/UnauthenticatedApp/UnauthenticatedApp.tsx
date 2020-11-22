import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth, { ForgetPassword } from '../../features/Auth';

const UnauthenticatedApp: React.FC = () => {
  return (
    <Switch>
      <Route path="/forget-password" component={ForgetPassword} />
      <Route exact path="*" component={Auth} />
    </Switch>
  );
};

export default UnauthenticatedApp;
