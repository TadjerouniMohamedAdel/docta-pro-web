import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Overview from '../../../features/Overview';
import Patients from '../../../features/Patients';
import NotFound from '../../../features/NotFound';
import Appointments from '../../../features/Appointments';
import Settings from '../../../features/Settings';

const Content: React.FC = () => {
  return (
    <main className="content" style={{ padding: 16 }}>
      <Switch>
        <Route path="/appointments" component={Appointments} />
        <Route path="/patients" component={Patients} />
        <Route path="/settings" component={Settings} />
        <Route exact path="/" component={Overview} />
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
  );
};

export default Content;
