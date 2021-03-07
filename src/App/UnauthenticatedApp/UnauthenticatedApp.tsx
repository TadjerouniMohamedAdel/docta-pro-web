import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth, { ForgetPassword } from '../../features/Auth';
import AuthWrapper from '../../features/Auth/AuthWrapper/AuthWrapper';

const UnauthenticatedApp: React.FC = () => {
  return (
    <AuthWrapper>
      <Switch>
        <Route path="/forget-password" component={ForgetPassword} />
        <Route exact path="*" component={Auth} />
      </Switch>
    </AuthWrapper>
  );
};

export default UnauthenticatedApp;
