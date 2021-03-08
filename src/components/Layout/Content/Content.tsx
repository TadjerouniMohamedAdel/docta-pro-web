import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import Overview from '../../../features/Overview';
import Patients from '../../../features/Patients';
import NotFound from '../../../features/NotFound';
import Appointments from '../../../features/Appointments';
import Settings from '../../../features/Settings';
import ProtectedRoute from '../../../features/Auth/ProtectedRoute/ProtectedRoute';

const Content: React.FC = () => {
  return (
    <main className="content" style={{ padding: 16 }}>
      <Switch>
        <ProtectedRoute
          accessCode="patients"
          type="section"
          path="/patients"
          component={Patients}
        />
        <ProtectedRoute
          accessCode="settings"
          type="section"
          path="/settings"
          component={Settings}
        />
        <ProtectedRoute
          accessCode="appointments"
          type="section"
          path="/appointments"
          component={Appointments}
        />
        <ProtectedRoute accessCode="appointments" type="section" exact path="/">
          <Redirect to="/appointments" />
        </ProtectedRoute>
        {/* <Route exact path="/" component={Overview} /> */}
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
  );
};

export default Content;
