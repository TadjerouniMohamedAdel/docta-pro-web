import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import Overview from '../../../features/Overview';
import Patients from '../../../features/Patients';
import NotFound from '../../../features/NotFound';
import Appointments from '../../../features/Appointments';
import ProtectedRoute from '../../../features/Auth/components/ProtectedRoute/ProtectedRoute';
import PageLoader from '../../PageLoader/PageLoader';

const Settings = React.lazy(() => import('../../../features/Settings'));

const Content: React.FC = () => {
  return (
    <main className="content" style={{ padding: 16 }}>
      <React.Suspense fallback={<PageLoader />}>
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
          <Route exact path="/">
            <Redirect to="/appointments" />
          </Route>
          <Route path="*" component={NotFound} />
          {/* <Route exact path="/" component={Overview} /> */}
        </Switch>
      </React.Suspense>
    </main>
  );
};

export default Content;
