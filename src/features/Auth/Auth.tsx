import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthWrapper from './components/AuthWrapper/AuthWrapper';
import ForgetPassword from './views/ForgetPassword/ForgetPassword';
import Login from './views/Login/Login';

const Auth: React.FC = () => {
  return (
    <AuthWrapper>
      <Switch>
        <Route path="/forget-password" component={ForgetPassword} />
        <Route exact path="*" component={Login} />
      </Switch>
    </AuthWrapper>
  );
};

export default Auth;
