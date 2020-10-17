import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../../../features/Dashboard';
import Patients from '../../../../features/Patients';
import NotFound from '../../../../features/NotFound';

const Content: React.FC = () => {
  return (
    <main className="content" style={{ padding: 20 }}>
      <Switch>
        <Route path="/patients" component={Patients} />
        <Route exact path="/" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
  );
};

export default Content;
